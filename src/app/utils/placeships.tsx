export interface Cell {
  isShip: boolean;
  isHit: boolean;
}

export const canPlaceShip = (
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

export const placeShip = (
  grid: Cell[][],
  row: number,
  col: number,
  length: number,
  isHorizontal: boolean
): Cell[][] => {
  const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));

  for (let i = 0; i < length; i++) {
    const r = row + (isHorizontal ? 0 : i);
    const c = col + (isHorizontal ? i : 0);

    newGrid[r][c].isShip = true;
  }

  return newGrid;
};
