import React from "react";
import { observer } from "mobx-react";
import Paper from "@material-ui/core/Paper";
import Session from "./Session";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";

function Sessions({ store }) {
  if (store.selectedSession) {
    return <Session store={store} session={store.selectedSession} />;
  }

  return (
    <div className="game">
      {store.sessionsByAttribute.map((s) => (
        <>
          <div style={{ margin: "10px" }}>{s.attribute.text}</div>
          <Paper>
            <List dense={true}>
              {s.sessions.map((session) => (
                <ListItem onClick={() => store.selectSession(session)}>
                  <ListItemAvatar>
                    <Avatar>
                      <img src={s.attribute.image} width="50px" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={session.description}
                    secondary={`Level ${session.grade}`}
                  />
                  <ListItemSecondaryAction>
                    <Badge badgeContent={session.userCount} color="error">
                      <DirectionsRunIcon />
                    </Badge>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </>
      ))}
    </div>
  );
}

export default observer(Sessions);
