import React from "react";
import { Cell } from "../utils/placeships";

interface GameBoardProps {
  grid: Cell[][];
  onCellClick: (row: number, col: number) => void;
  showShips: boolean; // New prop to determine if ships should be shown
  allowClicks: boolean; // New prop to determine if clicks should be allowed
}

export default function GameBoard({
  grid,
  onCellClick,
  showShips,
  allowClicks,
}: GameBoardProps) {
  return (
    <div className='inline-block'>
      {grid.map((row, rowIndex) => (
        <div className='flex' key={rowIndex}>
          {row.map((cell, colIndex) => {
            let cellStyle = "w-8 h-8 ";
            if (cell.isHit && allowClicks) {
              cellStyle += cell.isShip ? "bg-green-500" : "bg-red-500";
            } else if (showShips && cell.isShip) {
              cellStyle += "bg-gray-500";
            } else {
              cellStyle += "bg-blue-500";
            }

            // Apply border styles
            cellStyle += " border-gray-200 border-b border-r ";
            if (rowIndex === 0) cellStyle += " border-t ";
            if (colIndex === 0) cellStyle += " border-l ";

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={cellStyle}
                onClick={() => allowClicks && onCellClick(rowIndex, colIndex)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
