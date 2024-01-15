"use client";
import { useState } from "react";
import MainGameScreen from "./game";
import ShipPlacementScreen from "./placement";

export default function Home() {
  const [isGameStarted, setIsGameStarted] = useState(false);

  const startGame = () => {
    setIsGameStarted(true);
  };

  return (
    <div>
      {!isGameStarted ? (
        <ShipPlacementScreen onPlay={startGame} />
      ) : (
        <MainGameScreen />
      )}
    </div>
  );
}
