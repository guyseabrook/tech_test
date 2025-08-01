import React, { useState } from "react";
import { XorO } from "./types";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";

export const Main = () => {
  const [activePlayer, setActivePlayer] = useState<XorO>("X"); // Starting with player "X"
  const [board, setBoard] = useState<(XorO | undefined)[][]>([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ]);

  const onSelectSquare = ({ rowIndex, colIndex }) => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row, rIdx) =>
        row.map((cell, cIdx) =>
          rIdx === rowIndex && cIdx === colIndex ? activePlayer : cell,
        ),
      );
      return newBoard;
    });

    setActivePlayer((prev) => (prev === "X" ? "O" : "X"));
  };

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
        <GameBoard board={board} onSelectSquare={onSelectSquare} />
      </div>
    </>
  );
};
