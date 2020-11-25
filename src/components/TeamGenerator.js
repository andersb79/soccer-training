import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { observer } from "mobx-react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Card from "./Card";
var Carousel = require("react-responsive-carousel").Carousel;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
}));

function TeamGenerator({ store, onLogout }) {
  const classes = useStyles();

  function logout() {
    window.localStorage.removeItem("loggedIn");
    onLogout();
  }

  if (store.loggedIn.userName !== "admin") {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        nothing here
        <Button variant="outlined" onClick={logout}>
          Logga ut
        </Button>
      </div>
    );
  }

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <Button
          onClick={() => store.teamGenerator(2, false)}
          variant="contained"
          color="primary"
        >
          2 blandade lag
        </Button>
        <Button
          onClick={() => store.teamGenerator(2, true)}
          variant="contained"
          color="primary"
        >
          2 nivåanpassade lag
        </Button>
        <Button
          onClick={() => store.teamGenerator(3, false)}
          variant="contained"
          color="primary"
        >
          3 blandade lag
        </Button>
        <Button
          onClick={() => store.teamGenerator(3, true)}
          variant="contained"
          color="primary"
        >
          3 nivåranpassade lag
        </Button>
      </div>

      {store.generatedTeams &&
        store.generatedTeams.map((x) => (
          <>
            {x.name}
            <div>
              {x.teams.map((team, index) => (
                <Carousel
                  showThumbs={false}
                  showArrows={true}
                  showIndicators={true}
                  showStatus={false}
                >
                  <Paper className="americanoGame">
                    <div>
                      Lag {index + 1}, {team.players.length} st -{" "}
                      {team.totalRating} - {team.two.length}
                    </div>

                    <div className="highscore">
                      <div className={classes.root}>
                        {team.players.map((player) => (
                          <div key={player.id}>
                            <img
                              className="playerCard"
                              src={player.image}
                              style={{ width: "90px", height: "90px" }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </Paper>
                  <Paper className="americanoGame">
                    <div className="highscore">
                      <div>
                        {team.two.teams.map((innerTeam, innerIndex) => (
                          <div
                            className={classes.root}
                            style={{
                              margin: "2px",
                              border: "3px solid",
                              borderColor: innerTeam.shirtColor,
                            }}
                          >
                            {innerTeam.players.map((p) => (
                              <div key={p.id}>
                                <img
                                  className="playerCard"
                                  src={p.image}
                                  style={{ width: "90px", height: "90px" }}
                                />
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </Paper>
                  <Paper className="americanoGame">
                    <div className="highscore">
                      <div>
                        {team.three.teams.map((innerTeam, innerIndex) => (
                          <div
                            className={classes.root}
                            style={{
                              margin: "2px",
                              border: "3px solid",
                              borderColor: innerTeam.shirtColor,
                            }}
                          >
                            {innerTeam.players.map((p) => (
                              <div key={p.id}>
                                <img
                                  className="playerCard"
                                  src={p.image}
                                  style={{ width: "90px", height: "90px" }}
                                />
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </Paper>
                </Carousel>
              ))}
            </div>
          </>
        ))}

      <div className="help">{store.americanoPlayers.length} spelare</div>

      <div className={classes.root}>
        {!store.americano.length &&
          store.americanoPlayers.map((x) => (
            <div onClick={() => store.toggleActive(x)}>
              <img
                className="playerCard"
                src={x.image}
                style={{ width: "90px" }}
              />
            </div>
          ))}
      </div>

      <div className={classes.root}>
        {!store.americano.length &&
          store.inactivePlayers.map((x) => (
            <div
              style={{ opacity: "0.5" }}
              onClick={() => store.toggleActive(x)}
            >
              <img
                className="playerCard"
                src={x.image}
                style={{ width: "90px" }}
              />
            </div>
          ))}
      </div>

      <Button variant="outlined" onClick={logout}>
        Logga ut
      </Button>
    </>
  );
}

export default observer(TeamGenerator);
