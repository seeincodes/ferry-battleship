import React from "react";
import { Cell } from "../utils/placeships";

interface GameBoardProps {
  grid: Cell[][];
  onCellClick: (row: number, col: number) => void;
  showShips: boolean; // New prop to determine if ships should be shown
}

export default function GameBoard({
  grid,
  onCellClick,
  showShips,
}: GameBoardProps) {
  return (
    <div className='inline-block'>
      {grid.map((row, rowIndex) => (
        <div className='flex' key={rowIndex}>
          {row.map((cell, colIndex) => {
            let cellStyle = "w-8 h-8 ";
            if (cell.isHit) {
              cellStyle += cell.isShip ? "bg-green-500" : "bg-red-500";
            } else if (showShips && cell.isShip) {
              cellStyle += "bg-gray-500";
            } else {
              cellStyle += "bg-blue-500 hover:bg-blue-600";
            }

            // Apply border styles
            cellStyle += " border-gray-200 ";
            if (rowIndex === 0) cellStyle += " border-t ";
            if (colIndex === 0) cellStyle += " border-l ";
            cellStyle += " border-b border-r ";

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={cellStyle}
                onClick={() => onCellClick(rowIndex, colIndex)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
