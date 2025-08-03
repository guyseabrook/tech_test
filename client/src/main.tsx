import React, { useCallback, useEffect, useState } from "react";
import { LeaderboardEntryProps, PlayerProps, XorO } from "./types";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import GameOver from "./components/GameOver";
import GreenButton from "./components/GreenButton";
import Header from "./components/Header";
import { checkWinner, createEmptyBoard } from "./helpers";
import Leaderboard from "./components/Leaderboard";

export const Main = () => {
  const [activePlayer, setActivePlayer] = useState<XorO>("X");
  const [winnerSymbol, setWinnerSymbol] = useState<XorO | undefined>(undefined);
  const [isDraw, setIsDraw] = useState(false);
  const [boardSize, setBoardSize] = useState(3);
  const [board, setBoard] = useState(() => createEmptyBoard(boardSize));
  const [players, setPlayers] = useState<PlayerProps[]>([
    { name: "Player 1", symbol: "X" },
    { name: "Player 2", symbol: "O" },
  ]);
  const [winnerGoesFirst, setWinnerStaysOn] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntryProps[]>([]);

  function updatePlayerName(symbol: XorO, newName: string) {
    setPlayers((prev) =>
      prev.map((p) => (p.symbol === symbol ? { ...p, name: newName } : p)),
    );
  }

  function recordWin(winnerName: string) {
    setLeaderboard((prev) => {
      const updated = [...prev];
      const existing = updated.find((entry) => entry.name === winnerName);

      if (existing) {
        existing.wins += 1;
      } else {
        updated.push({ name: winnerName, wins: 1, losses: 0 });
      }

      updated.sort((a, b) => b.wins - a.wins);

      localStorage.setItem("leaderboard", JSON.stringify(updated));
      return updated;
    });
  }

  function recordLoss(loserName: string) {
    setLeaderboard((prev) => {
      const updated = [...prev];
      const existing = updated.find((entry) => entry.name === loserName);

      if (existing) {
        existing.losses += 1;
      } else {
        updated.push({ name: loserName, wins: 0, losses: 1 });
      }

      updated.sort((a, b) => b.wins - a.wins);

      localStorage.setItem("leaderboard", JSON.stringify(updated));
      return updated;
    });
  }

  useEffect(() => {
    const storedLeaderboard = localStorage.getItem("leaderboard");
    if (storedLeaderboard) {
      setLeaderboard(JSON.parse(storedLeaderboard));
    }
  }, []);

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
        setWinnerSymbol(foundWinner);
      } else if (isFull) {
        setIsDraw(true);
      } else {
        setActivePlayer((prev) => (prev === "X" ? "O" : "X"));
      }

      return newBoard;
    });
  };

  function handleResetGame() {
    if (winnerSymbol) {
      recordWin(players.find((p) => p.symbol === winnerSymbol)?.name!);
      recordLoss(players.find((p) => p.symbol != winnerSymbol)?.name!);
    }
    setBoard(createEmptyBoard(boardSize));
    setWinnerSymbol(undefined);
    setIsDraw(false);
    if (!winnerGoesFirst) {
      setActivePlayer("X");
    }
  }

  useEffect(() => {
    setBoard(createEmptyBoard(boardSize));
    setWinnerSymbol(undefined);
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
          <Player
            name={players[0].name}
            symbol={players[0].symbol}
            isActive={activePlayer === players[0].symbol}
            setPlayerName={(newName) =>
              updatePlayerName(players[0].symbol, newName)
            }
          />
          <Player
            name={players[1].name}
            symbol={players[1].symbol}
            isActive={activePlayer === players[1].symbol}
            setPlayerName={(newName) =>
              updatePlayerName(players[1].symbol, newName)
            }
          />
        </div>
        {(winnerSymbol || isDraw) && (
          <GameOver
            winner={players.find((p) => p.symbol === winnerSymbol)?.name}
            resetGame={handleResetGame}
          />
        )}
        <GameBoard
          boardSize={boardSize}
          board={board}
          onSelectSquare={onSelectSquare}
        />
      </section>
      <section
        id="options and leaderboard"
        className="bg-stone-100 pb-10 sm:px-20 md:px-40 lg:px-60 xl:px-80"
      >
        <section id="options-section" className="flex flex-col items-center">
          <h2 className="py-5 text-center text-xl font-bold text-spruceDarkGreen">
            Game Options
          </h2>
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
              <p className="flex items-center text-xl text-black">
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
          <div id="winnerGoesFirstToggle">
            <h2 className="mt-5 text-lg font-semibold">Winner Goes First</h2>
            <div className="mt-2 flex justify-center">
              <GreenButton
                onClick={() => {
                  setWinnerStaysOn((prev) => !prev);
                }}
              >
                {winnerGoesFirst ? "Disable" : "Enable"}
              </GreenButton>
            </div>
          </div>
        </section>
        <section
          id="leaderboard"
          className="mt-5 items-center justify-center border-t-2 pt-5"
        >
          <Leaderboard boardData={leaderboard} />
        </section>
      </section>
    </>
  );
};
