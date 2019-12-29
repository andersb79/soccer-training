import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import VideoIcon from "@material-ui/icons/VideoCall";
import MenuIcon from "@material-ui/icons/Menu";
import VisibilitySensor from "react-visibility-sensor";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FilterListIcon from "@material-ui/icons/FilterList";
import VideoControl from "./VideoControl";
import Chip from "@material-ui/core/Chip";
import { observer } from "mobx-react-lite";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import StarIcon from "@material-ui/icons/Star";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import HelpIcon from "@material-ui/icons/Help";

import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";

import CardMedia from "@material-ui/core/CardMedia";
import CatergoryCards from "./CatergoryCards";
import CategoryCard from "./CategoryCard";

const ITEM_HEIGHT = 48;
const useStyles = makeStyles(theme => ({
  card: {
    //maxWidth: 345,
    margin: "20px"
  },
  media: {
    height: 210,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    // backgroundColor: red[500]
  }
}));

function Categories({ store }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(true);

  useEffect(() => {
    setTimeout(() => {
      store.levels
        .filter(x => x.isVisible)
        .map(level => {
          onChange(level, true);
        });
    }, 1);
  });

  function onChange(level, isVisible) {
    level.setVisibility(isVisible);
    const videoElm = document.getElementById(level.id);
    if (videoElm) {
      if (isVisible) {
        videoElm.play();
      } else {
        videoElm.pause();
      }
    } else {
      console.log("not found");
    }
  }

  return !store.selectedAttribute ? (
    <CatergoryCards store={store} />
  ) : (
    <CategoryCard store={store} />
  );
}

export default observer(Categories);
