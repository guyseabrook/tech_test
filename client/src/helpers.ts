import { XorO } from "./types";

export const createEmptyBoard = (size: number): (XorO | undefined)[][] => {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => undefined),
  );
};

export const checkWinner = (
    grid: (XorO | undefined)[][],
    winLength = 3,
  ): XorO | undefined => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1],
    ];

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const player = grid[row][col];
        if (!player) continue;

        for (const [dRow, dCol] of directions) {
          let count = 1;

          for (let step = 1; step < winLength; step++) {
            const newRow = row + dRow * step;
            const newCol = col + dCol * step;

            if (
              newRow < 0 ||
              newRow >= numRows ||
              newCol < 0 ||
              newCol >= numCols ||
              grid[newRow][newCol] !== player
            ) {
              break;
            }

            count++;
          }

          if (count === winLength) {
            return player;
          }
        }
      }
    }

    return undefined;
  };