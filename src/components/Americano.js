import React from "react";
import { observer } from "mobx-react";
import Paper from "@material-ui/core/Paper";
import CardMedia from "@material-ui/core/CardMedia";

function Americano({ store }) {
  return (
    <>
      <Paper className="help">
        {store.americano.map(g => (
          <>
            <span>{g.gameName}</span>
            <div>
              {g.team1.goals}-{g.team2.goals}
            </div>
          </>
        ))}
      </Paper>

      <button style={{ marginTop: "100px" }} onClick={store.americanoRandom}>
        Ny match
      </button>
      <span>{store.americano.length}</span>
      {store.americano.map(g => (
        <Paper className="help">
          <span>{g.gameName}</span>
          <input
            style={{ width: "50px" }}
            defaultValue={g.team1.goals}
            onChange={e => g.team1.setGoals(e.target.value)}
          />{" "}
          -
          <input
            style={{ width: "50px" }}
            defaultValue={g.team2.goals}
            onChange={e => g.team2.setGoals(e.target.value)}
          />
          <div style={{ backgroundColor: "", padding: "10px" }}>
            Team 1
            <div>
              {g.team1.players.map(x => (
                <img src={x.image} style={{ width: "100px" }} />
              ))}
            </div>
          </div>
          <div style={{ backgroundColor: "", padding: "10px" }}>
            Team 2
            <div>
              {g.team2.players.map(x => (
                <img src={x.image} style={{ width: "100px" }} />
              ))}
            </div>
          </div>
        </Paper>
      ))}
    </>
  );
}

export default observer(Americano);
