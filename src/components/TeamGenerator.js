import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { observer } from "mobx-react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Card from "./Card";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// import Rating from "@material-ui/lab/Rating";

import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Checkbox from "@material-ui/core/Checkbox";
var Carousel = require("react-responsive-carousel").Carousel;

function TabContainer(props) {
  return (
    <Typography component="div" style={{ marginTop: "100px" }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

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
  const [tabIndex, setTabIndex] = useState(0);

  function handleChange(event, newValue) {
    setTabIndex(newValue);
  }

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
      <AppBar position="absolute" style={{ top: "48px" }}>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="off"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Närvaro" />
          <Tab label="Generera lag" />
          <Tab label="Resultat" />
        </Tabs>
      </AppBar>

      {tabIndex === 0 && (
        <TabContainer>
          <Chip label={store.americanoPlayers.length} color="primary" />
          <List dense>
            {store.allPlayers.map((x) => (
              <ListItem button onClick={() => store.toggleActive(x)}>
                <ListItemAvatar>
                  <Avatar src={x.image} />
                </ListItemAvatar>
                <ListItemText
                  id={x.id}
                  primary={x.name}
                  secondary={
                    // <Rating name="read-only" value={x.rating} readOnly />
                    x.rating
                  }
                />
                <ListItemSecondaryAction>
                  <Checkbox
                    onChange={() => store.toggleActive(x)}
                    edge="end"
                    checked={x.active}
                    inputProps={{ "aria-labelledby": x.id }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Button variant="outlined" onClick={logout}>
            Logga ut
          </Button>
        </TabContainer>
      )}
      {tabIndex === 1 && (
        <TabContainer>
          <div style={{ textAlign: "center", marginTop: "100px" }}>
            Mixade lag
            <Button
              onClick={() => store.teamGenerator(2, false)}
              variant="contained"
              color="primary"
            >
              2
            </Button>
            <Button
              onClick={() => store.teamGenerator(3, false)}
              variant="contained"
              color="primary"
            >
              3
            </Button>
            Nivåanpassade lag
            <Button
              onClick={() => store.teamGenerator(2, true)}
              variant="contained"
              color="primary"
            >
              2
            </Button>
            <Button
              onClick={() => store.teamGenerator(3, true)}
              variant="contained"
              color="primary"
            >
              3
            </Button>
          </div>
        </TabContainer>
      )}
      {tabIndex === 2 && (
        <TabContainer>
          {store.generatedTeams &&
            store.generatedTeams.map((x) => (
              <>
                {/* <Chip label={x.name} /> */}

                <div>
                  {x.teams.map((team, index) => (
                    <Carousel
                      showThumbs={false}
                      showArrows={true}
                      showIndicators={true}
                      showStatus={false}
                    >
                      <Paper
                        className="americanoGame"
                        style={{ height: "100%" }}
                      >
                        <div>
                          <Chip
                            style={{
                              backgroundColor: team.shirtColor,
                              color: "white",
                            }}
                            label={`Lag ${index + 1}`}
                          />
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
                      <Paper
                        className="americanoGame"
                        style={{ height: "100%" }}
                      >
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
                      <Paper
                        className="americanoGame"
                        style={{ height: "100%" }}
                      >
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
        </TabContainer>
      )}
    </>
  );
}

export default observer(TeamGenerator);
