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
            let cellStyle = "w-8 h-8 border-gray-200 border-b border-r ";
            if (rowIndex === 0) cellStyle += " border-t ";
            if (colIndex === 0) cellStyle += " border-l ";

            if (cell.isHit) {
              cellStyle += cell.isShip ? "bg-green-500" : "bg-black-500"; // Green for hit ship, red for miss
            } else if (showShips && cell.isShip) {
              cellStyle += "bg-gray-500"; // Gray for unhit ship
            } else {
              cellStyle += "bg-blue-500"; // Blue for water
            }

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
