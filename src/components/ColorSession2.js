import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";

function ColorSession2({ level, active, uniqueId }) {
  const [colorInterval, setColorInterval] = useState();
  const cones = level.attribute.replace("COLORS-", "").split("-")[0];
  const colors = level.attribute.replace("COLORS-", "").split("-")[1];

  console.log(cones, colors);

  useEffect(() => {
    if (colorInterval || !active) {
      return;
    }
    const intervalId = setInterval(() => {
      const number = getRandomInt(2);
      const square = document.getElementById("color-1");
      if (!square) {
        clearInterval(intervalId);
        return;
      }
      square.classList.remove(`color-1`);
      square.classList.remove(`color-2`);

      square.classList.add(`color-${number}`);
    }, 2000);
    setColorInterval(intervalId);
    //clear interval on re-render to avoid memory leaks
    return () => clearInterval(colorInterval);
  }, [colorInterval, active, uniqueId, colors, cones]);

  return <div id="color-1" className="colors"></div>;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default observer(ColorSession2);
