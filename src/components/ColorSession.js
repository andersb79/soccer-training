import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";

function ColorSession({ level, active, index }) {
  const [colorInterval, setColorInterval] = useState();

  useEffect(() => {
    if (colorInterval || !active) {
      return;
    }
    const intervalId = setInterval(() => {
      const number = getRandomInt(4);
      const square = document.getElementById(`n${index}-${number}`);
      if (!square) {
        return;
      }
      square.classList.add(`color-${number}`);
      setTimeout(() => {
        square.classList.remove(`color-${number}`);
      }, 3000);
    }, 4500);
    setColorInterval(intervalId);
    //clear interval on re-render to avoid memory leaks
    return () => clearInterval(colorInterval);
  }, [colorInterval, active, index]);

  return (
    <div className="colors">
      <div className="child" id={`n${index}-0`}></div>
      <div className="child" id={`n${index}-1`}></div>
      <div className="child" id={`n${index}-2`}></div>
      <div className="child" id={`n${index}-3`}></div>
    </div>
  );
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default observer(ColorSession);
