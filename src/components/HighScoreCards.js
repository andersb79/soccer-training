import React from "react";
import { observer } from "mobx-react";
import { Image } from "cloudinary-react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Badges from "./Badges";
import Card from "./Card";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#f5f5f5"
  }
}));

function HighScoreCards({ store }) {
  const classes = useStyles();
  return (
    <>
      <div style={{ marginTop: "60px", textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          TOPPLISTA {store.viewSeasonObject.friendlyName}
        </Typography>

        <Typography variant="overline" style={{ color: "gray" }} gutterBottom>
          max 200 poäng
        </Typography>
      </div>

      {/* <Badges store={store} user={store.loggedIn} /> */}

      <div className="highscore">
        <List className={classes.root}>
          {store.highScoreList.map(user => (
            <Card key={user.id} user={user} />
          ))}
        </List>
      </div>
    </>
  );
}

export default observer(HighScoreCards);
