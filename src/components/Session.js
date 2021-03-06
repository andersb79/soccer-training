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
import { Container } from "@material-ui/core";
import ImageCarousel from "./ImageCarousel";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

var Carousel = require("react-responsive-carousel").Carousel;

function Session({ store }) {
  const size = useWindowSize();
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
  const [canUseCamera, setCanUseCamera] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      const circles = document.getElementById("container-circles");

      if (circles) {
        circles.classList.add("hide-circle");
      }

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

  function useWindowSize() {
    const isClient = typeof window === "object";

    function getSize() {
      return {
        width: isClient ? window.innerWidth : undefined,
        height: isClient ? window.innerHeight : undefined,
      };
    }

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
      if (!isClient) {
        return false;
      }

      function handleResize() {
        setWindowSize(getSize());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return windowSize;
  }

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

    if (!rest && timeLeft === 7 && canUseCamera) {
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
          //alert("snyggt jobbat");
          setColorInterval(null);
          //store.finishedSession();
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

  function publish() {
    setColorInterval(null);
    setLoading(true);
    store.finishedSession(images);
  }

  function cancelPublish() {
    clearInterval(colorInterval);
    store.selectSession();
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

  if (finished) {
    return (
      <div className="profile">
        <div style={{ textAlign: "center", color: "black" }}>
          Din övning är avslutad
        </div>
        <ImageCarousel images={images} />
        {!loading && (
          <>
            <Button
              style={{ marginLeft: "15px" }}
              variant="contained"
              onClick={publish}
              color="primary"
            >
              Publicera
            </Button>
            <Button
              style={{ marginLeft: "15px" }}
              variant="contained"
              onClick={cancelPublish}
              color="secondary"
            >
              Avbryt
            </Button>
          </>
        )}

        {loading && <CircularProgress />}
      </div>
    );
  }

  function renderCarousel() {
    return (
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
    );
  }

  function renderTablet() {
    return (
      <Box padding={2}>
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <Box
              style={{
                fontSize: "47px",
                color: rest ? "orange" : "blue",
              }}
              fontWeight="fontWeightBold"
            >
              {timeLeft}
            </Box>

            <Typography
              paragraph
              style={{ margin: "5px", color: "gray", fontStyle: "italic" }}
            >
              {store.selectedSession.sessionItems[selectedItem].details}
            </Typography>

            <div style={{ textAlign: "center" }}>
              {finished && <Box textAlign="center">KLART</Box>}
              {rest && <Chip size="small" label="Förbered dig" />}
              {!rest && !paused && (
                <Chip size="small" label="Kör" color="primary" />
              )}
              {!rest && paused && <Chip size="small" label="Paus" />}
            </div>
          </Grid>

          <Grid item xs={8}>
            <Paper
              className="sessionOverview"
              style={{
                flexWrap: "wrap",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              {store.selectedSession.sessionItems.map((level, index) => (
                <div
                  onClick={() => setSelectedItem(index)}
                  style={{
                    color: index === selectedItem ? "blue" : "black",
                  }}
                >
                  {index + 1}. {level.name}
                </div>
              ))}
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <div>
              <Button
                style={{ width: "120px" }}
                variant="contained"
                color="primary"
                onClick={start}
              >
                {paused ? "Starta" : "Pausa"}
              </Button>
            </div>
            <div>
              <Button
                style={{ width: "120px" }}
                variant="contained"
                color="secondary"
                onClick={restart}
              >
                Börja om
              </Button>
            </div>
            <div>
              <Button
                style={{ width: "120px" }}
                variant="contained"
                onClick={() => {
                  clearInterval(colorInterval);
                  store.selectSession();
                }}
              >
                Avsluta
              </Button>
            </div>
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <div className="profile">
      <div style={{ width: "0px", height: "0px" }}>
        {canUseCamera && (
          <Camera
            onCameraError={() => {
              setCanUseCamera(false);
            }}
            isImageMirror={false}
            onTakePhoto={(dataUri) => {
              handleTakePhoto(dataUri);
            }}
          />
        )}
      </div>

      {renderCarousel()}

      {size.width > 1000 && renderTablet()}
      {size.width < 1000 && (
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
      )}
    </div>
  );
}

export default observer(Session);
