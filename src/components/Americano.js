import React from "react";
import { observer } from "mobx-react";
import Paper from "@material-ui/core/Paper";

function Americano({ store }) {
  return (
    <>
      <Paper className="help">
        {store.americanoPlayers.map(x => (
          <div>{x.name}</div>
        ))}
      </Paper>

      <button onClick={store.americanoRandom}>Blanda</button>
      <span>{store.americano.length}</span>
      {store.americano.map(g => (
        <Paper className="help">
          <span>{g.gameName}</span>
          <div style={{ backgroundColor: "red" }}>
            Team 1 - {g.team1.uniqueId}
            {g.team1.players.map(x => (
              <div>{x.name}</div>
            ))}
          </div>
          <div style={{ backgroundColor: "blue" }}>
            Team 2 - {g.team2.uniqueId}
            {g.team2.players.map(x => (
              <div>
                {x.name} - {x.id}
              </div>
            ))}
          </div>
        </Paper>
      ))}
    </>
  );
}

export default observer(Americano);
