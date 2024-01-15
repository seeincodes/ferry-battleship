import React from "react";

interface Cell {
  isShip: boolean;
  isHit: boolean;
}

interface GameBoardProps {
  grid: Cell[][];
  onCellClick: (row: number, col: number) => void;
}

export default function GameBoard({ grid, onCellClick }: GameBoardProps) {
  return (
    <div className='grid grid-cols-10 gap-1 p-4 bg-blue-200 rounded-lg shadow-md'>
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`w-8 h-8 border border-blue-700 cursor-pointer ${
              cell.isShip
                ? "bg-gray-400"
                : cell.isHit
                ? "bg-red-500"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={() => onCellClick(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
}
