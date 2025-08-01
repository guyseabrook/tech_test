import React from "react";

export default function Leaderboard() {
  return (
    <div className="m-auto w-full max-w-md justify-center p-4">
      <h2 className="text-center text-2xl font-bold text-spruceDarkGreen">
        Leaderboard
      </h2>
      <ul className="mt-4 space-y-2">
        {/* Placeholder for leaderboard items */}
        <li className="flex justify-between">
          <span>Janet</span>
          <span>10 Wins</span>
        </li>
        <li className="flex justify-between">
          <span>Jim</span>
          <span>8 Wins</span>
        </li>
        <li className="flex justify-between">
          <span>Jason</span>
          <span>5 Wins</span>
        </li>
      </ul>
    </div>
  );
}
