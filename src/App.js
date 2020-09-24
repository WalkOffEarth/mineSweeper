import React from "react";
import "./App.css";
import MineSweeper from "./mineSweeper/MineSweeper";

function App() {
  return (
    <div className="app">
      <h1>Mine Sweeper</h1>
      <MineSweeper></MineSweeper>
    </div>
  );
}

export default App;
