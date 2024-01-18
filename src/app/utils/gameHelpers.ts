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
  // console.log(
  //   "Final Grid: \n",
  //   grid
  //     .map((row) => row.map((cell) => (cell.isShip ? "S" : ".")).join(""))
  //     .join("\n")
  // );

  return grid;
};

// Check if a ship can be placed at the specified position
const canPlaceShip = (
  grid: Cell[][],
  startRow: number,
  startCol: number,
  length: number,
  isHorizontal: boolean,
  gridSize: number
): boolean => {
  for (let i = 0; i < length; i++) {
    const row = startRow + (isHorizontal ? 0 : i);
    const col = startCol + (isHorizontal ? i : 0);

    // Check if the ship goes out of bounds
    if (row >= gridSize || col >= gridSize) return false;

    // Check if the current cell and surrounding cells are free
    const rowStart = Math.max(row - 1, 0);
    const rowEnd = Math.min(row + 1, gridSize - 1);
    const colStart = Math.max(col - 1, 0);
    const colEnd = Math.min(col + 1, gridSize - 1);

    for (let r = rowStart; r <= rowEnd; r++) {
      for (let c = colStart; c <= colEnd; c++) {
        if (grid[r][c].isShip) return false;
      }
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
