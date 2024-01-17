import React, { useState, useEffect } from "react";
import { initializeGrid, placeShipsRandomly } from "./utils/gameHelpers";
import GameBoard from "./components/GameBoard";
import { Cell, canPlaceShip, placeShip } from "./utils/placeships";

const MainGameScreen = () => {
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

  const handleCellClick = (row: number, col: number) => {
    if (computerViewGrid[row][col].isHit) return; // Prevent re-hitting the same cell

    const hit = computerGrid[row][col].isShip; // Check if there's a ship in the actual computer grid
    const newGrid = [...computerViewGrid];
    newGrid[row] = [...newGrid[row]];
    newGrid[row][col] = { ...newGrid[row][col], isHit: true, isShip: hit };

    setComputerViewGrid(newGrid);

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

  const selectShipForPlacement = (index: number) => {
    setSelectedShipIndex(index);
  };

  useEffect(() => {
    // Randomly place ships for the computer
    setComputerGrid(placeShipsRandomly(computerGrid));
  }, []);

  const handlePlayerAttack = (row: number, col: number) => {
    // TODO: Implement logic for player's attack on the computer's grid
  };

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
        <div>
          {shipsToPlace.map((ship, index) => (
            <button
              key={index}
              disabled={ship.placed}
              onClick={() => selectShipForPlacement(index)}
              className='m-2 p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              Ship {ship.length}
            </button>
          ))}
        </div>
        <GameBoard
          grid={playerGrid}
          onCellClick={handleCellClick}
          showShips={true}
        />
      </div>
      {/* Computer's board */}
      <div className='text-center md:w-1/2'>
        <h2 className='text-2xl font-bold mb-4'>Enemy Ships</h2>
        <GameBoard
          grid={computerViewGrid}
          onCellClick={handlePlayerAttack}
          showShips={false}
        />
      </div>
    </div>
  );
};

export default MainGameScreen;
