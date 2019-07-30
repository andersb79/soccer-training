import React, { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react";
import "../card.css";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function Card({ store, user }) {
  const [isActive, setIsActive] = useState(store && store.hasAnimatedCards);
  const [showBack, setShowBack] = useState(false);
  const isActiveClass = !showBack ? "active" : "active2";
  const isActiveClassBack = showBack ? "active" : "";

  const classes = `${isActiveClass}`;
  const classesBack = `${isActiveClassBack}`;
  const imageStyle = {
    backgroundImage: `url(${user.cardImage})`
  };

  useInterval(() => {
    // Your custom logic here
    setIsActive(true);
    store.setHasAnimatedCards(true);
  }, 10);

  function onCardClick() {
    setShowBack(!showBack);
  }

  return (
    <div className="cardWrapper">
      <div id="card" onClick={onCardClick} className={classes}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 267.3 427.3">
          <clipPath id="svgPath">
            <path
              fill="#000"
              d="M265.3 53.9a33.3 33.3 0 0 1-17.8-5.5 32 32 0 0 1-13.7-22.9c-.2-1.1-.4-2.3-.4-3.4 0-1.3-1-1.5-1.8-1.9a163 163 0 0 0-31-11.6A257.3 257.3 0 0 0 133.7 0a254.9 254.9 0 0 0-67.1 8.7 170 170 0 0 0-31 11.6c-.8.4-1.8.6-1.8 1.9 0 1.1-.2 2.3-.4 3.4a32.4 32.4 0 0 1-13.7 22.9A33.8 33.8 0 0 1 2 53.9c-1.5.1-2.1.4-2 2v293.9c0 3.3 0 6.6.4 9.9a22 22 0 0 0 7.9 14.4c3.8 3.2 8.3 5.3 13 6.8 12.4 3.9 24.8 7.5 37.2 11.5a388.7 388.7 0 0 1 50 19.4 88.7 88.7 0 0 1 25 15.5v.1-.1c7.2-7 16.1-11.3 25-15.5a427 427 0 0 1 50-19.4l37.2-11.5c4.7-1.5 9.1-3.5 13-6.8 4.5-3.8 7.2-8.5 7.9-14.4.4-3.3.4-6.6.4-9.9V231.6 60.5v-4.6c.4-1.6-.3-1.9-1.7-2z"
            />
          </clipPath>
        </svg>
        <div id="card-inner">
          <div id="card-top">
            <div className="info">
              <div className="value">{user.totalRating}</div>
              <div className="position">{user.position}</div>
              <div className="country">
                <div />
              </div>
              <div className="club">
                <div />
              </div>
            </div>

            <div className="image" style={imageStyle} />
            <div className="backfont">SKILLSTA</div>
            {showBack && (
              <div className="price">
                <Typography paragraph>Utmärkelser</Typography>
                {/* <Typography paragraph>Vinnare av</Typography>
                <Chip label="Säsong 1" style={{ margin: "5px" }} />
                <Chip label="Säsong 2" style={{ margin: "5px" }} />
                <Chip label="Säsong 3" style={{ margin: "5px" }} />
                <Chip label="Säsong 4" style={{ margin: "5px" }} /> */}
              </div>
            )}
          </div>
          <div id="card-bottom">
            <div className="name">{user.firstName}</div>
            <div className="stats">
              <div>
                <ul>
                  <li>
                    <span>{user.THERating}</span>
                    <span>TEK</span>
                  </li>
                  <li>
                    <span>{user.DRIRating}</span>
                    <span>DRI</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul>
                  <li>
                    <span>{user.BALRating}</span>
                    <span>KON</span>
                  </li>
                  <li>
                    <span>{user.PHYRating}</span>
                    <span>FYS</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(Card);
