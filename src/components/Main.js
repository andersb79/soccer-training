import React, { useState } from "react";
import Game from "./Game";
import ItemList from "./ItemList";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import StarIcon from "@material-ui/icons/Star";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import HelpIcon from "@material-ui/icons/Help";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { observer } from "mobx-react-lite";
import Profile from "./Profile";
import HighScore from "./HighScore";
import Help from "./Help";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#f5f5f5"
  }
}));

function Main({ store, onLogout }) {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = React.useState(0);

  function handleChange(event, newValue) {
    setTabIndex(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="default">
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="off"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab icon={<HomeIcon />} />
          <Tab icon={<StarIcon />} />
          <Tab icon={<FormatListNumberedIcon />} />
          <Tab icon={<PersonIcon />} />
          <Tab icon={<HelpIcon />} />
        </Tabs>
      </AppBar>
      {tabIndex === 0 && (
        <TabContainer>
          <ItemList store={store} />
        </TabContainer>
      )}
      {tabIndex === 1 && (
        <TabContainer>
          <Game store={store} />
        </TabContainer>
      )}
      {tabIndex === 2 && (
        <TabContainer>
          <HighScore store={store} />
        </TabContainer>
      )}
      {tabIndex === 3 && (
        <TabContainer>
          <Profile store={store} onLogout={onLogout} />
        </TabContainer>
      )}
      {tabIndex === 4 && (
        <TabContainer>
          <Help store={store} />
        </TabContainer>
      )}
    </div>
  );
}

export default observer(Main);
