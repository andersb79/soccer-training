import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { observer } from "mobx-react-lite";
import CatergoryCards from "./CatergoryCards";
import CategoryCard from "./CategoryCard";

const ITEM_HEIGHT = 48;
const useStyles = makeStyles(theme => ({
  card: {
    margin: "20px"
  },
  media: {
    height: 210,
    paddingTop: "56.25%"
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
