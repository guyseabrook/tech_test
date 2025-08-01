import React from "react";

export default function GameOver({ winner, resetGame }) {
  return (
    <div
      id="game-over-backdrop"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="rounded-lg bg-white p-5 text-center">
        <h1 className="py-5 text-xl">{winner ? `${winner} wins!` : "Draw"}</h1>
        <p>
          <button
            className="rounded-md bg-spruceDarkGreen px-4 py-2 text-xl text-white transition-colors duration-100 hover:bg-spruceGreen"
            onClick={resetGame}
          >
            Play Again
          </button>
        </p>
      </div>
    </div>
  );
}
