import React from "react";
import { observer } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
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
        <Typography variant="overline" style={{ color: "gray" }} gutterBottom />
      </div>
      <div className="highscore">
        <List className={classes.root}>
          {store.highScoreList.map(user => (
            <Card key={user.id} store={store} user={user} />
          ))}
        </List>
      </div>
    </>
  );
}

export default observer(HighScoreCards);
