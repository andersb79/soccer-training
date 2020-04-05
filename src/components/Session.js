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
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import ArrowLeftIcon from "@material-ui/icons/ChevronLeft";
import Typography from "@material-ui/core/Typography";
import ColorSession from "./ColorSession";
import ColorSession2 from "./ColorSession2";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

var Carousel = require("react-responsive-carousel").Carousel;

function Session({ store }) {
  const drillCount = store.selectedSession.sessionItems.length;

  const workTime = store.selectedSession.sessionItems[0].workTime;

  const [selectedItem, setSelectedItem] = useState(0);
  const [paused, setPaused] = React.useState(true);
  const [timeLeft, setTimeLeft] = useState(workTime);
  const [rest, setRest] = useState(false);
  const [finished, setFinished] = React.useState(false);
  const [cleanUpColor, setCleanUpColor] = React.useState(false);
  const [colorInterval, setColorInterval] = React.useState();
  const [soundEffect, setSoundEffect] = React.useState(new Audio());
  const [images, setImages] = React.useState([]);

  useEffect(() => {
    setTimeout(() => {
      if (!store.selectedSession) {
        return;
      }
      var media = store.selectedSession.sessionItems[0];

      if (media.attribute.startsWith("COLORS") && media.fileType === null) {
        return;
      }
      const videoElm = document.getElementById(media.id);
      if (videoElm) {
        console.log("play");
        videoElm.play();
      }
    }, 1000);
  });

  function playFinished() {
    console.log("play sound");
    soundEffect.src = "finishDrill.wav";
    soundEffect.play();
  }

  function playStart(timeLeft) {
    console.log("play sound");
    soundEffect.src = "start.wav";
    soundEffect.play();
  }

  useEffect(() => {
    // exit early when we reach 0

    if (timeLeft === 5) {
      const photoGrabber = document.getElementById("outer-circle");
      photoGrabber.click();
    }

    if (timeLeft === 0) {
      setRest(!rest);

      if (!rest) {
        playFinished();

        const newSelectedItem = selectedItem + 1;
        const level = store.selectedSession.sessionItems[newSelectedItem];
        if (level) {
          setTimeLeft(level.restTime);
        }

        if (newSelectedItem === drillCount) {
          setPaused(true);
          setFinished(true);
          alert("snyggt jobbat");
          setColorInterval(null);
          store.finishedSession();
        } else {
          setSelectedItem(newSelectedItem);
        }
      } else {
        setTimeLeft(store.selectedSession.sessionItems[selectedItem].workTime);
      }
    }

    if (rest && (timeLeft === 3 || timeLeft === 2 || timeLeft === 1)) {
      playStart(timeLeft);
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
  }, [timeLeft, selectedItem, paused, rest, finished, drillCount, store]);

  function start() {
    playStart(1);
    setTimeout(() => {
      playFinished();
    }, 1000);

    setTimeout(() => {
      setPaused(!paused);
    }, 3000);
  }

  function restart() {
    setPaused(true);
    setRest(false);
    setTimeLeft(workTime);
    setSelectedItem(0);
    setFinished(false);
  }

  function onChange(index) {
    if (index < 0) {
      return;
    }

    setSelectedItem(index);

    var media = store.selectedSession.sessionItems[index];

    const videoElm = document.getElementById(media.id);

    if (videoElm) {
      console.log("play");
      videoElm.play();
    }
  }

  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    // var image = document.getElementById("image");
    // image.src = dataUri;

    setImages([
      ...images,
      {
        id: images.length,
        src: dataUri,
      },
    ]);
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
        {store.selectedSession.sessionItems.map((level, index) => (
          <div>
            {level.fileType === "mp4" && (
              <VideoControl store={store} settings={level} />
            )}
            {level.attribute === "COLORS-4" && (
              <ColorSession
                key={`${level.id}${index}`}
                level={level}
                active={index === selectedItem}
                uniqueId={index}
                cleanUp={cleanUpColor}
              />
            )}

            {level.attribute === "COLORS-1" && index === selectedItem && (
              <ColorSession2
                key={`${level.id}${index}`}
                level={level}
                active={index === selectedItem}
                uniqueId={index}
              />
            )}
          </div>
        ))}
      </Carousel>
      <div style={{ display: "none" }}>
        <Camera
          onTakePhoto={(dataUri) => {
            handleTakePhoto(dataUri);
          }}
        />
      </div>

      {images.map((item) => (
        <li key={item.id}>
          <img id="image" src={item.src} />
        </li>
      ))}

      <Box padding={2}>
        <Paper className="sessionOverview">
          <Box textAlign="center" id="legend">
            {store.selectedSession.sessionItems[selectedItem].name}
          </Box>

          <Box textAlign="center" fontWeight="fontWeightBold">
            Övning {selectedItem + 1} av{" "}
            {store.selectedSession.sessionItems.length}
          </Box>

          <Box
            style={{
              fontSize: "74px",
              textAlign: "center",
              color: rest ? "orange" : "blue",
            }}
            fontWeight="fontWeightBold"
          >
            {timeLeft}
          </Box>

          {finished && <Box textAlign="center">KLART</Box>}

          {rest && (
            <div style={{ textAlign: "center" }}>
              <Chip size="small" label="Förbered dig" />
            </div>
          )}
          <Typography
            paragraph
            style={{ margin: "5px", color: "gray", fontStyle: "italic" }}
          >
            {store.selectedSession.sessionItems[selectedItem].details}
          </Typography>

          {!rest && !paused && (
            <div style={{ textAlign: "center" }}>
              <Chip size="small" label="Kör" color="primary" />
            </div>
          )}
          {!rest && paused && (
            <div style={{ textAlign: "center" }}>
              <Chip size="small" label="Paus" />
            </div>
          )}
        </Paper>
        <div style={{ textAlign: "center" }}>
          <Button variant="contained" color="primary" onClick={start}>
            {paused ? "Starta" : "Pausa"}
          </Button>
          <Button
            style={{ marginLeft: "15px" }}
            variant="contained"
            color="secondary"
            onClick={restart}
          >
            Börja om
          </Button>
          <Button
            style={{ marginLeft: "15px" }}
            variant="contained"
            onClick={() => {
              clearInterval(colorInterval);
              store.selectSession();
            }}
          >
            Avsluta
          </Button>
        </div>
        <Paper className="sessionOverview">
          {store.selectedSession.sessionItems.map((level, index) => (
            <div
              onClick={() => setSelectedItem(index)}
              style={{ color: index === selectedItem ? "blue" : "black" }}
            >
              {index + 1}. {level.name}
            </div>
          ))}
        </Paper>
      </Box>
    </div>
  );
}

export default observer(Session);
