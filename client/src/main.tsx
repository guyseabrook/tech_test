import React, { useCallback, useEffect, useState } from "react";
import { XorO } from "./types";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import GameOver from "./components/GameOver";
import GreenButton from "./components/GreenButton";
import Header from "./components/Header";
import { checkWinner, createEmptyBoard } from "./helpers";
import Leaderboard from "./components/Leaderboard";

export const Main = () => {
  const [activePlayer, setActivePlayer] = useState<XorO>("X");
  const [winner, setWinner] = useState<XorO | undefined>(undefined);
  const [isDraw, setIsDraw] = useState(false);
  const [boardSize, setBoardSize] = useState(3);
  const [board, setBoard] = useState(() => createEmptyBoard(boardSize));

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
      <Header />
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
        id="options and leaderboard"
        className="flex justify-center gap-10 bg-stone-100 p-10"
      >
        <section id="leaderboard" className="w-1/2">
          <Leaderboard />
        </section>
        <section
          id="options-section"
          className="flex w-1/2 flex-col items-center justify-center p-10"
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
      </section>
    </>
  );
};
