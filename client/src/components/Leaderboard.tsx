import React from "react";
import { LeaderboardEntryProps } from "../types";

function LeaderboardEntry({ name, wins, losses }: LeaderboardEntryProps) {
  return (
    <div className="grid w-full grid-cols-3 border-b border-gray-200 p-2">
      <span className="text-left text-gray-700">{name}</span>
      <span className="text-center text-gray-700">{wins}</span>
      <span className="text-right text-gray-700">{losses}</span>
    </div>
  );
}

export default function Leaderboard({
  boardData,
}: {
  boardData: LeaderboardEntryProps[];
}) {
  return (
    <div className="m-auto w-full max-w-md justify-center">
      <h2 className="text-center text-xl font-bold text-spruceDarkGreen">
        Leaderboard
      </h2>
      <div className="mt-4 grid grid-cols-3 gap-4 text-sm font-semibold text-spruceDarkGreen">
        <span className="px-2 text-left">Player</span>
        <span className="text-center">Wins</span>
        <span className="px-2 text-right">Losses</span>
      </div>
      <div className="mt-4">
        {boardData.length > 0 ? (
          boardData.map((entry, index) => (
            <LeaderboardEntry
              key={index}
              name={entry.name}
              wins={entry.wins}
              losses={entry.losses}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No entries yet</p>
        )}
      </div>
    </div>
  );
}
