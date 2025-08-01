import React from "react";
import { XorO } from "../types";

export default function GameBoard({
  board,
  boardSize = 3,
  onSelectSquare,
}: {
  board: (XorO | undefined)[][];
  boardSize: number;
  onSelectSquare: ({
    rowIndex,
    colIndex,
  }: {
    rowIndex: number;
    colIndex: number;
  }) => void;
}) {
  return (
    <div
      className={"grid gap-2"}
      style={{
        gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${boardSize}, minmax(0, 1fr))`,
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <button
            key={`${rowIndex}-${colIndex}`}
            className="h-40 w-40 items-center justify-center rounded-md border border-gray-300 text-7xl text-white hover:border-gray-50"
            onClick={() => onSelectSquare({ rowIndex, colIndex })}
            disabled={!!cell}
          >
            {cell}
          </button>
        )),
      )}
    </div>
  );
}
