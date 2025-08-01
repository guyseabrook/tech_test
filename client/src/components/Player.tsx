import React from "react";
import { XorO } from "../types";

export default function Player({
  name,
  symbol,
  isActive,
}: {
  name: string;
  symbol: XorO;
  isActive: boolean;
}) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [playerName, setPlayerName] = React.useState(name);
  const [inputValue, setInputValue] = React.useState(name);

  function handleNameChange() {
    if (isEditing) {
      setPlayerName(inputValue);
    } else {
      setInputValue(playerName);
    }

    setIsEditing((editing) => !editing);
  }
  return (
    <div
      className={`flex items-center gap-3 ${isActive ? "text-spruceGreenFoam" : "text-white"}`}
    >
      <span className="text-2xl">{symbol}</span>
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleNameChange}
          className="inline-block w-20 border bg-transparent text-center text-white focus:outline-none"
        />
      ) : (
        <span
          onClick={handleNameChange}
          className="w-20 cursor-pointer text-center"
        >
          {playerName}
        </span>
      )}
    </div>
  );
}
