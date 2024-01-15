import React, { useState, useEffect } from "react";
import GameBoard from "./components/GameBoard";
import { Cell, canPlaceShip, placeShip } from "./utils/placeships";

interface ShipPlacementScreenProps {
  onPlay: () => void;
}

export default function ShipPlacementScreen({
  onPlay,
}: ShipPlacementScreenProps) {
  const gridSize = 10;

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

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-4xl text-center font-bold my-4'>Battleship Game</h1>
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
            Ship Length {ship.length}
          </button>
        ))}
      </div>
      <GameBoard grid={playerGrid} onCellClick={handleCellClick} />
      {allShipsPlaced && (
        <button
          onClick={onPlay}
          className='m-2 p-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
        >
          Play
        </button>
      )}
    </div>
  );
}
