import React, { useCallback, useEffect, useState } from "react";
import { XorO } from "./types";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import GameOver from "./components/GameOver";
import GreenButton from "./components/GreenButton";

const createEmptyBoard = (size: number): (XorO | undefined)[][] => {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => undefined),
  );
};

export const Main = () => {
  const [activePlayer, setActivePlayer] = useState<XorO>("X"); // Starting with player "X"
  const [winner, setWinner] = useState<XorO | undefined>(undefined);
  const [isDraw, setIsDraw] = useState(false);
  const [boardSize, setBoardSize] = useState(3); // Default board size 3x3
  const [board, setBoard] = useState(() => createEmptyBoard(boardSize));

  const checkWinner = (
    grid: (XorO | undefined)[][],
    winLength = 3,
  ): XorO | undefined => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    const directions = [
      [0, 1], // right →
      [1, 0], // down ↓
      [1, 1], // down-right ↘
      [1, -1], // down-left ↙
    ];

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const player = grid[row][col];
        if (!player) continue; // skip empty cells

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
            return player; // winner found
          }
        }
      }
    }

    return undefined; // no winner
  };

  const onSelectSquare = ({ rowIndex, colIndex }) => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row, rIdx) =>
        row.map((cell, cIdx) =>
          rIdx === rowIndex && cIdx === colIndex ? activePlayer : cell,
        ),
      );

      const foundWinner = checkWinner(newBoard);
      const isFull = newBoard.flat().every((cell) => cell !== undefined);

      if (foundWinner) {
        setWinner(foundWinner);
      } else if (isFull) {
        setIsDraw(true);
      } else {
        setActivePlayer((prev) => (prev === "X" ? "O" : "X"));
      }

      return newBoard;
    });
  };

  function handleResetGame() {
    setBoard(createEmptyBoard(boardSize));
    setWinner(undefined);
    setIsDraw(false);
  }

  useEffect(() => {
    setBoard(createEmptyBoard(boardSize));
    setWinner(undefined);
    setIsDraw(false);
    setActivePlayer("X");
  }, [boardSize]);

  return (
    <>
      <header
        id="title"
        className="w-screen border-b border-white/10 bg-spruceGreen pb-5 pl-16 pr-16 pt-5 text-center text-2xl font-bold text-white"
      >
        Tic Tac Toe
      </header>
      <section
        id="game-container"
        className="flex flex-col items-center gap-10 bg-spruceGreen p-10"
      >
        <div id="players" className="flex gap-10">
          <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} />
        </div>
        {(winner || isDraw) && (
          <GameOver winner={winner} resetGame={handleResetGame} />
        )}
        <GameBoard
          boardSize={boardSize}
          board={board}
          onSelectSquare={onSelectSquare}
        />
      </section>
      <section
        id="options-section"
        className="flex flex-col items-center justify-center bg-stone-100 p-10"
      >
        <h1 className="pb-5 text-center text-xl font-bold text-spruceDarkGreen">
          Game Options
        </h1>
        <GreenButton onClick={handleResetGame}>Reset Game</GreenButton>
        <div id="size-selector" className="mt-5 text-center">
          <h2 className="text-lg font-semibold">Board Size</h2>
          <div className="mt-2 flex justify-center gap-4">
            <GreenButton
              disabled={boardSize === 3}
              onClick={() => {
                setBoardSize((prev) => Math.max(3, prev - 1));
              }}
            >
              -
            </GreenButton>
            <p className="flex items-center text-2xl font-semibold text-spruceDarkGreen">
              {boardSize} x {boardSize}
            </p>
            <GreenButton
              disabled={boardSize === 15}
              onClick={() => {
                setBoardSize((prev) => Math.min(15, prev + 1));
              }}
            >
              +
            </GreenButton>
          </div>
        </div>
      </section>
    </>
  );
};
