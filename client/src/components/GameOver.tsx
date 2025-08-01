import React from "react";

export default function GameOver({ winner, resetGame }) {
  return (
    <div
      id="game-over"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <h2>{winner ? `${winner} wins!` : "Draw"}</h2>
      <p>
        <button onClick={resetGame}>Play Again</button>
      </p>
    </div>
  );
}
