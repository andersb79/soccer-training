import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";
import { Image } from "cloudinary-react";
import ImageIcon from "@material-ui/icons/Image";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import VideoControl from "./VideoControl";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";

var Carousel = require("react-responsive-carousel").Carousel;

function Sessions({ store }) {
  const level = store.filterLevelsByAttribute[0];

  const restTime = 5;
  const workTime = 3;

  const [selectedItem, setSelectedItem] = useState(0);
  const [paused, setPaused] = React.useState(true);
  const [timeLeft, setTimeLeft] = useState(workTime);
  const [rest, setRest] = useState(false);

  useEffect(() => {
    onChange(0);
  });

  useEffect(() => {
    // exit early when we reach 0
    if (timeLeft === -1) {
      setRest(!rest);

      if (!rest) {
        setTimeLeft(restTime);
        setSelectedItem(selectedItem + 1);
      } else {
        setTimeLeft(workTime);
      }
    }

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      if (!paused) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft, selectedItem, paused, rest]);

  function restart() {
    setPaused(true);
    setRest(false);
    setTimeLeft(workTime);
    setSelectedItem(0);
  }

  function onChange(index) {
    if (index < 0) {
      return;
    }

    var media = store.filterLevelsByAttribute[index];

    const videoElm = document.getElementById(media.id);

    const placeHolder = document.getElementById("legend");
    console.log(media.details);
    placeHolder.innerHTML = media.details;

    if (videoElm) {
      console.log("play");
      videoElm.play();
    }
  }

  return (
    <div className="profile">
      <Carousel
        selectedItem={selectedItem}
        onChange={onChange}
        showThumbs={false}
        showArrows={false}
        showIndicators={false}
        showStatus={false}
      >
        {store.filterLevelsByAttribute.map(level => (
          <div>
            {level.fileType === "mp4" && (
              <VideoControl store={store} settings={level} />
            )}
            {(level.fileType === "jpg" || level.fileType === "gif") && (
              <img style={{ width: "100%", height: "100%" }} src={level.src} />
            )}
          </div>
        ))}
      </Carousel>
      <Box padding={2}>
        <Box textAlign="center" id="legend">
          {level.details}
        </Box>

        {rest && (
          <Box textAlign="center" id="legend">
            VILA
          </Box>
        )}
        <Box fontWeight="fontWeightBold">
          Antal övningar {store.filterLevelsByAttribute.length + 1}
        </Box>
        <Box
          style={{ fontSize: "74px", textAlign: "center" }}
          fontWeight="fontWeightBold"
        >
          {timeLeft}
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setPaused(!paused)}
        >
          {paused ? "Starta" : "Pausa"}
        </Button>
        <Button variant="contained" color="primary" onClick={restart}>
          Börja om
        </Button>
      </Box>
    </div>
  );
}

export default observer(Sessions);
