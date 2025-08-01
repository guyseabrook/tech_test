import React, { useCallback, useState } from "react";
import { XorO } from "./types";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import GameOver from "./components/GameOver";

export const Main = () => {
  const [activePlayer, setActivePlayer] = useState<XorO>("X"); // Starting with player "X"
  const [winner, setWinner] = useState<XorO | undefined>(undefined);
  const [isDraw, setIsDraw] = useState(false);
  const [board, setBoard] = useState<(XorO | undefined)[][]>([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ]);

  const checkWinner = (board: (XorO | undefined)[][]): XorO | undefined => {
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] &&
        board[i][0] === board[i][1] &&
        board[i][0] === board[i][2]
      ) {
        return board[i][0];
      }
      if (
        board[0][i] &&
        board[0][i] === board[1][i] &&
        board[0][i] === board[2][i]
      ) {
        return board[0][i];
      }
    }
    if (
      board[0][0] &&
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2]
    ) {
      return board[0][0];
    }
    if (
      board[0][2] &&
      board[0][2] === board[1][1] &&
      board[0][2] === board[2][0]
    ) {
      return board[0][2];
    }
    return undefined;
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
    setBoard([
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
    ]);
    setWinner(undefined);
    setIsDraw(false);
  }

  return (
    <>
      <header
        id="title"
        className="bg-spruceGreen w-screen border-b border-white/10 pb-5 pl-16 pr-16 pt-5 text-center text-2xl font-bold text-white"
      >
        Tic Tac Toe
      </header>
      <div
        id="game-container"
        className="bg-spruceGreen flex flex-col items-center gap-10 p-10"
      >
        <div id="players" className="flex gap-10">
          <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} />
        </div>
        {(winner || isDraw) && (
          <GameOver winner={winner} resetGame={handleResetGame} />
        )}
        <GameBoard board={board} onSelectSquare={onSelectSquare} />
      </div>
    </>
  );
};
