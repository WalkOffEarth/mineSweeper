import React, { useEffect, useRef, useState, useCallback } from "react";
import "./mineSweeper.css";

const MineSweeper = () => {
  const width = 10,
    noOfBomb = 30;
  const structure = useRef(
    Array(width * width)
      .fill(0, 0, noOfBomb)
      .fill(1, noOfBomb)
      .sort(() => Math.random() - 0.5)
  );
  const map = useRef({});
  const [boxes, setBoxes] = useState([]);
  const revealAll = () => {
    for (let i = 0; i < structure.current.length; i++) {
      if (!structure.current[i]) {
        document.getElementById(i).innerText = "Bomb";
      } else {
        document.getElementById(i).innerText = map.current[i];
      }
    }
  };

  const boxClick = useCallback((e) => {
    if (e.currentTarget.className === "bomb") {
      alert("Game Over");
      revealAll();
    } else {
      console.log(map.current[e.currentTarget.id]);
      if (map.current[e.currentTarget.id])
        e.currentTarget.innerText = map.current[e.currentTarget.id];

      e.currentTarget.classList.add("checked");
    }
  }, []);

  useEffect(() => {
    const createBoard = () => {
      const square = [];
      for (let i = 0; i < width * width; i++) {
        square.push(
          <div
            key={i}
            id={i}
            className={structure.current[i] ? "valid" : "bomb"}
            onClick={boxClick}
          ></div>
        );
      }
      for (let i = 0; i < structure.current.length; i++) {
        const isLeftEdge = i % width === 0;
        const isRightEdge = i % width === width - 1;
        let total = 0;
        map.current[i] = 0;
        if (structure.current[i]) {
          if (i > 0 && !isLeftEdge && !structure.current[i - 1]) total++;
          if (i > 9 && !isRightEdge && !structure.current[i + 1 - width])
            total++;
          if (i > 9 && !structure.current[i - width]) total++;
          if (i > 11 && !isLeftEdge && !structure.current[i - 1 - width])
            total++;
          if (i < 98 && !isRightEdge && !structure.current[i + 1]) total++;
          if (i < 90 && !isLeftEdge && !structure.current[i - 1 + width])
            total++;
          if (i < 88 && !isRightEdge && !structure.current[i + 1 + width])
            total++;
          if (i < 89 && !structure.current[i + width]) total++;
          map.current[i] = total;
        }
      }
      setBoxes([...square]);
    };
    createBoard();
  }, [boxClick]);

  return (
    <div>
      <div className={"container"}>{boxes}</div>
    </div>
  );
};

export default MineSweeper;
