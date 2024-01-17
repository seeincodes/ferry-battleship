import React from "react";
import { Cell } from "../utils/placeships";

interface GameBoardProps {
  grid: Cell[][];
  onCellClick: (row: number, col: number) => void;
}

export default function GameBoard({ grid, onCellClick }: GameBoardProps) {
  return (
    <div className='grid grid-cols-10 gap-1 p-4 bg-blue-200 rounded-lg shadow-md'>
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          let cellStyle = "w-8 h-8 border border-gray-200 ";
          if (cell.isHit) {
            cellStyle += cell.isShip ? "bg-red-500" : "bg-blue-300";
          } else {
            cellStyle += "bg-blue-500 hover:bg-blue-600";
          }
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={cellStyle}
              onClick={() => onCellClick(rowIndex, colIndex)}
            />
          );
        })
      )}
    </div>
  );
}
