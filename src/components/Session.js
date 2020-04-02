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

var Carousel = require("react-responsive-carousel").Carousel;

function Session({ store }) {
  const drillCount = store.selectedSession.sessionItems.length;

  const restTime = 15;
  const workTime = 15;

  const [selectedItem, setSelectedItem] = useState(0);
  const [paused, setPaused] = React.useState(true);
  const [timeLeft, setTimeLeft] = useState(workTime);
  const [rest, setRest] = useState(true);
  const [finished, setFinished] = React.useState(false);

  useEffect(() => {
    //onChange(0);

    setTimeout(() => {
      var media = store.selectedSession.sessionItems[0];

      const videoElm = document.getElementById(media.id);

      console.log("play");
      videoElm.play();
    }, 1000);
  });

  useEffect(() => {
    // exit early when we reach 0
    if (timeLeft === -1) {
      setRest(!rest);

      if (!rest) {
        setTimeLeft(restTime);
        const newSelectedItem = selectedItem + 1;

        if (newSelectedItem === drillCount) {
          setPaused(true);
          setFinished(true);
          //store.finishedSession();
        } else {
          setSelectedItem(newSelectedItem);
        }
      } else {
        setTimeLeft(workTime);
      }
    }

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      if (!paused) {
        // if (rest && timeLeft === workTime - 2) {
        //   var audio = new Audio("notify.wav");
        //   audio.play();
        // }
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft, selectedItem, paused, rest, finished, drillCount, store]);

  function start() {
    setPaused(!paused);
  }

  function restart() {
    setPaused(true);
    setRest(true);
    setTimeLeft(workTime);
    setSelectedItem(0);
    setFinished(false);
  }

  function onChange(index) {
    if (index < 0) {
      return;
    }

    var media = store.selectedSession.sessionItems[index];

    const videoElm = document.getElementById(media.id);

    // const placeHolder = document.getElementById("legend");
    // console.log(media.details);
    // placeHolder.innerHTML = media.details;

    if (videoElm) {
      console.log("play");
      videoElm.play();
    }
  }

  return (
    <div className="profile">
      {/* <div onClick={() => store.selectSession()}>
        <ArrowLeftIcon />
        Tillbaka
      </div> */}
      <Carousel
        selectedItem={selectedItem}
        onChange={onChange}
        showThumbs={false}
        showArrows={false}
        showIndicators={false}
        showStatus={false}
      >
        {store.selectedSession.sessionItems.map(level => (
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
        <Paper className="sessionOverview">
          <Box textAlign="center" id="legend">
            {store.selectedSession.sessionItems[selectedItem].details}
          </Box>

          <Box textAlign="center" fontWeight="fontWeightBold">
            Övning {selectedItem + 1} av{" "}
            {store.selectedSession.sessionItems.length}
          </Box>

          <Box
            style={{
              fontSize: "74px",
              textAlign: "center",
              color: rest ? "orange" : "blue"
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
          {!rest && (
            <div style={{ textAlign: "center" }}>
              <Chip size="small" label="Kör" color="primary" />
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
            onClick={() => store.selectSession()}
          >
            Avsluta
          </Button>
        </div>
        <Paper className="sessionOverview">
          {store.selectedSession.sessionItems.map((level, index) => (
            <div style={{ color: index === selectedItem ? "blue" : "black" }}>
              {index + 1}. {level.details}
            </div>
          ))}
        </Paper>
      </Box>
    </div>
  );
}

export default observer(Session);
