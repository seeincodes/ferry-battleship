// MainGameScreen.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MainGameScreen from "./MainGameScreen";

describe("MainGameScreen Component", () => {
  it("starts the game when Play button is clicked", () => {
    render(<MainGameScreen />);
    const playButton = screen.getByRole("button", { name: /play/i });
    userEvent.click(playButton);
    expect(screen.queryByText(/play/i)).not.toBeInTheDocument();
  });
});
