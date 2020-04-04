import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";

function ColorSession({ level, active, uniqueId, cleanUp }) {
  const [colorInterval, setColorInterval] = useState();

  useEffect(() => {
    return () => {
      console.log("cleanup", this);
      clearInterval(colorInterval);
    };
  }, [cleanUp, colorInterval]);

  useEffect(() => {
    if (colorInterval || !active) {
      return;
    }
    const intervalId = setInterval(() => {
      const number = getRandomInt(4);
      const square = document.getElementById(`n${uniqueId}-${number}`);
      if (!square) {
        return;
      }
      square.classList.add(`color-${number}`);
      setTimeout(() => {
        square.classList.remove(`color-${number}`);
      }, 2500);
    }, 4000);

    setColorInterval(intervalId);

    //clear interval on re-render to avoid memory leaks
  }, [active]);

  return (
    <div className="colors">
      <div className="child" id={`n${uniqueId}-0`}></div>
      <div className="child" id={`n${uniqueId}-1`}></div>
      <div className="child" id={`n${uniqueId}-2`}></div>
      <div className="child" id={`n${uniqueId}-3`}></div>
    </div>
  );
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default observer(ColorSession);
