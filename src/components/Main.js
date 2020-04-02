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
import Sessions from "./Sessions";
import HighScore from "./HighScore";
import HighScoreCards from "./HighScoreCards";
import Help from "./Help";
import Number from "./Number";
import Categories from "./Categories";
import Americano from "./Americano";

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
  const [tabIndex, setTabIndex] = useState(store.items.length === 0 ? 3 : 0);

  function handleChange(event, newValue) {
    setTabIndex(newValue);
  }

  if (store.appRunning === "NUMBER") {
    return <Number store={store} />;
  }

  if (store.appRunning === "COLOR") {
    return <Number store={store} colorCount={store.colorCount} />;
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
          {/* <Game store={store} /> */}
          <Categories store={store} />
        </TabContainer>
      )}
      {tabIndex === 2 && (
        <TabContainer>
          {/* <HighScore store={store} /> */}
          <HighScoreCards store={store} />
        </TabContainer>
      )}
      {tabIndex === 3 && (
        <TabContainer>
          <Sessions store={store} />
          {/* <Profile store={store} onLogout={onLogout} /> */}
        </TabContainer>
      )}
      {tabIndex === 4 && (
        <TabContainer>
          <Americano store={store} />
        </TabContainer>
      )}
    </div>
  );
}

export default observer(Main);
