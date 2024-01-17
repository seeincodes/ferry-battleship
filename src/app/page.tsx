"use client";
import { useState } from "react";
import MainGameScreen from "./game";
import ShipPlacementScreen from "./placement";

export default function Home() {
  return (
    <div>
      <MainGameScreen />
    </div>
  );
}
