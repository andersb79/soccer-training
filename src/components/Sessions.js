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
import Session from "./Session";
import InboxIcon from "@material-ui/icons/Inbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

function Sessions({ store }) {
  if (store.selectedSession) {
    return <Session store={store} session={store.selectedSession} />;
  }

  return (
    <div className="game">
      <Paper>
        <List component="nav" aria-label="main mailbox folders">
          {store.sessions.map(session => (
            <ListItem button onClick={() => store.selectSession(session)}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={session.description} />
            </ListItem>
          ))}
        </List>

        {store.selectedSession && (
          <Session store={store} session={store.selectedSession} />
        )}
      </Paper>
    </div>
  );
}

export default observer(Sessions);
