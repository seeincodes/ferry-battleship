import { Cell } from "./placeships";

// Initialize a grid of the given size
export const initializeGrid = (size: number): Cell[][] => {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, (): Cell => ({ isShip: false, isHit: false }))
  );
};

// Place ships randomly on the grid
export const placeShipsRandomly = (grid: Cell[][]): Cell[][] => {
  const shipLengths = [5, 4, 3, 3];
  const gridSize = grid.length;

  for (const length of shipLengths) {
    let placed = false;
    while (!placed) {
      const isHorizontal = Math.random() < 0.5;
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);

      if (canPlaceShip(grid, row, col, length, isHorizontal, gridSize)) {
        placeShip(grid, row, col, length, isHorizontal);
        placed = true;
      }
    }
  }

  return grid;
};

// Check if a ship can be placed at the specified position
const canPlaceShip = (
  grid: Cell[][],
  row: number,
  col: number,
  length: number,
  isHorizontal: boolean,
  gridSize: number
): boolean => {
  for (let i = 0; i < length; i++) {
    const r = row + (isHorizontal ? 0 : i);
    const c = col + (isHorizontal ? i : 0);

    if (r >= gridSize || c >= gridSize || grid[r][c].isShip) {
      return false;
    }
  }

  return true;
};

// Place a ship on the grid
const placeShip = (
  grid: Cell[][],
  row: number,
  col: number,
  length: number,
  isHorizontal: boolean
) => {
  for (let i = 0; i < length; i++) {
    const r = row + (isHorizontal ? 0 : i);
    const c = col + (isHorizontal ? i : 0);

    grid[r][c].isShip = true;
  }
};

// Check if all ships have been hit
export const checkWinCondition = (grid: Cell[][]): boolean => {
  return grid.every((row) => row.every((cell) => !cell.isShip || cell.isHit));
};
