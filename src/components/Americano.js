import React from "react";
import { observer } from "mobx-react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

function Americano({ store }) {
  return (
    <>
      {/* <Paper className="help">
        {store.americano.map(g => (
          <>
            <span>{g.gameName}</span>
            <div>
              {g.team1.goals}-{g.team2.goals}
            </div>
          </>
        ))}
      </Paper> */}
      <div className="help">Antal matcher {store.americano.length}</div>
      <Paper className="americanoGame">
        {store.americanoStat.map(p => (
          <>
            <div>
              {p.player.name} - {p.goals}
            </div>
          </>
        ))}
      </Paper>

      {store.americano.length < 10 && (
        <div style={{ textAlign: "center" }}>
          <Button
            onClick={store.americanoRandom}
            variant="contained"
            color="primary"
          >
            Ny match
          </Button>
        </div>
      )}
      {store.americanoReverse.map(g => (
        <Paper key={g.gameName} className="americanoGame">
          <div>{g.gameName}</div>
          <div>
            Resultat:
            <TextField
              type="number"
              style={{ width: "50px" }}
              defaultValue={g.team1.goals}
              onChange={e => g.team1.setGoals(e.target.value)}
            />
            -
            <TextField
              type="number"
              style={{ width: "50px" }}
              defaultValue={g.team2.goals}
              onChange={e => g.team2.setGoals(e.target.value)}
            />
          </div>
          <div style={{ backgroundColor: "", padding: "10px" }}>
            <div>
              {g.team1.players.map(x => (
                <img src={x.image} style={{ width: "100px" }} />
              ))}
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            VS
            <img src="vsloggo2.png" style={{ width: "100px" }} />
          </div>
          <div style={{ backgroundColor: "", padding: "10px" }}>
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
