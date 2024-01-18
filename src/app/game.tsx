import React, { useState, useEffect } from "react";
import { initializeGrid, placeShipsRandomly } from "./utils/gameHelpers";
import GameBoard from "./components/GameBoard";
import { Cell, canPlaceShip, placeShip } from "./utils/placeships";

export default function MainGameScreen() {
  const gridSize = 10;
  const [computerGrid, setComputerGrid] = useState(initializeGrid(gridSize));
  const [computerViewGrid, setComputerViewGrid] = useState(
    initializeGrid(gridSize)
  ); // Grid for player to attack

  const [playerGrid, setPlayerGrid] = useState<Cell[][]>(
    Array.from({ length: gridSize }, () =>
      Array.from(
        { length: gridSize },
        (): Cell => ({ isShip: false, isHit: false })
      )
    )
  );

  const [shipsToPlace, setShipsToPlace] = useState([
    { length: 5, placed: false },
    { length: 4, placed: false },
    { length: 3, placed: false },
    { length: 3, placed: false },
  ]);

  const allShipsPlaced = shipsToPlace.every((ship) => ship.placed);

  const [selectedShipIndex, setSelectedShipIndex] = useState<number | null>(
    null
  );

  const [orientation, setOrientation] = useState("horizontal");

  const placePlayerShip = (row: number, col: number) => {
    if (selectedShipIndex !== null) {
      const shipLength = shipsToPlace[selectedShipIndex].length;

      if (
        canPlaceShip(
          playerGrid,
          row,
          col,
          shipLength,
          orientation === "horizontal",
          gridSize
        )
      ) {
        const newGrid = placeShip(
          playerGrid,
          row,
          col,
          shipLength,
          orientation === "horizontal"
        );
        setPlayerGrid(newGrid);

        const newShips = shipsToPlace.map((ship, index) =>
          index === selectedShipIndex ? { ...ship, placed: true } : ship
        );
        setShipsToPlace(newShips);
        setSelectedShipIndex(null);
      }
    }
  };

  const renderShipButtons = () => {
    return shipsToPlace.map((ship, index) => (
      <button
        key={index}
        disabled={ship.placed}
        onClick={() => selectShipForPlacement(index)}
        className={`m-2 p-2 text-white font-bold py-2 px-4 rounded ${
          ship.placed ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
        }`}
      >
        Ship {ship.length}
      </button>
    ));
  };

  const selectShipForPlacement = (index: number) => {
    setSelectedShipIndex(index);
  };

  useEffect(() => {
    // console.log("Placing ships for computer"); // For debugging

    // Create a new initialized grid to ensure immutability
    const initializedGrid = initializeGrid(gridSize);

    // Randomly place ships for the computer
    const newComputerGrid = placeShipsRandomly(initializedGrid);
    setComputerGrid(newComputerGrid);
  }, []);

  const handlePlayerAttack = (row: number, col: number) => {
    if (!allShipsPlaced) {
      alert("Please place all your ships first.");
      return;
    }

    // Check if the cell has already been hit
    if (computerViewGrid[row][col].isHit) {
      alert("You've already attacked this location.");
      return;
    }

    // Check if the attack hits a ship
    const hit = computerGrid[row][col].isShip;

    // Update the computer's view grid to reflect the hit or miss
    const newGrid = computerViewGrid.map((gridRow, idx) =>
      idx === row
        ? gridRow.map((cell, cellIdx) =>
            cellIdx === col ? { ...cell, isHit: true, isShip: hit } : cell
          )
        : gridRow
    );

    setComputerViewGrid(newGrid);
    handleComputerTurn();
  };

  // Add state to track the last hit position and direction
  const [lastHit, setLastHit] = useState({
    row: null,
    col: null,
    direction: null,
  });

  function handleComputerTurn() {
    let row, col, direction;
    if (lastHit.row !== null && lastHit.col !== null) {
      // Logic to guess adjacent cells
      // You can add more sophisticated logic to cycle through directions
      // For simplicity, this example just guesses the next cell in a row

      ({ row, col, direction } = getNextGuess(lastHit));
    } else {
      do {
        row = Math.floor(Math.random() * gridSize);
        col = Math.floor(Math.random() * gridSize);
      } while (playerGrid[row][col].isHit);
    }

    const hit = playerGrid[row][col].isShip;
    const newGrid = [...playerGrid];
    newGrid[row] = [...newGrid[row]];
    newGrid[row][col] = { ...newGrid[row][col], isHit: true, isShip: hit };

    setPlayerGrid(newGrid);

    if (hit) {
      setLastHit({ row, col, direction: direction || "horizontal" });
    } else {
      setLastHit({ row: null, col: null, direction: null });
    }
  }

  function getNextGuess(lastHit: any) {
    // Example logic for guessing the next cell in a row
    let { row, col, direction } = lastHit;
    if (direction === "horizontal") {
      col =
        col + 1 < gridSize && !playerGrid[row][col + 1].isHit
          ? col + 1
          : col - 1;
    } else {
      // Add logic for vertical guessing if needed
    }
    return { row, col, direction };
  }

  return (
    <div className='flex flex-col md:flex-row justify-around my-8 w-full'>
      <div className='text-center mb-8 md:mb-0 md:w-1/2'>
        <h2 className='text-2xl font-bold mb-4'>Your Ships</h2>
        <button
          onClick={() => setOrientation("horizontal")}
          className='m-2 p-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
        >
          Horizontal
        </button>
        <button
          onClick={() => setOrientation("vertical")}
          className='m-2 p-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
        >
          Vertical
        </button>
        <div>{renderShipButtons()}</div>
        <GameBoard
          grid={playerGrid}
          onCellClick={placePlayerShip}
          showShips={true}
          allowClicks={!allShipsPlaced}
        />
      </div>
      {/* Computer's board */}
      <div className='text-center md:w-1/2'>
        <h2 className='text-2xl font-bold mb-4'>Enemy Ships</h2>
        <GameBoard
          grid={computerViewGrid}
          onCellClick={handlePlayerAttack}
          showShips={false}
          allowClicks={allShipsPlaced}
        />
      </div>
      {allShipsPlaced && (
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={() => {
              /* handle start game logic */
            }}
          >
            Play
          </button>
        </div>
      )}
    </div>
  );
}
