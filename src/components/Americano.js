import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { observer } from "mobx-react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  table: {}
});

function Americano({ store }) {
  const classes = useStyles();
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
      <div className="help">Antal matcher {store.americano.length} st</div>
      <Paper className="americanoGame">
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Spelare</TableCell>
              <TableCell align="right">Poäng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {store.americanoStat.map(p => (
              <TableRow key={p.player.id}>
                <TableCell component="th" scope="row">
                  {p.player.name}
                </TableCell>
                <TableCell align="right">{p.goals}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
          <div style={{ textAlign: "center", fontSize: "30px" }}>
            {g.gameName}
          </div>
          <div style={{ textAlign: "center" }}>
            <input
              min="1"
              max="5"
              type="number"
              style={{ width: "16px", fontSize: "20px" }}
              defaultValue={g.team1.goals}
              onChange={e => g.team1.setGoals(e.target.value)}
            />
            <span> - </span>
            <input
              min="1"
              max="5"
              type="number"
              style={{ width: "16px", fontSize: "20px" }}
              defaultValue={g.team2.goals}
              onChange={e => g.team2.setGoals(e.target.value)}
            />
          </div>
          <div style={{ backgroundColor: "", padding: "10px" }}>
            <div style={{ textAlign: "center" }}>
              {g.team1.players.map(x => (
                <img
                  className="playerCard"
                  src={x.image}
                  style={{ width: "90px" }}
                />
              ))}
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <img src="vsloggo2.png" style={{ width: "100px" }} />
          </div>
          <div style={{ backgroundColor: "", padding: "10px" }}>
            <div style={{ textAlign: "center" }}>
              {g.team2.players.map(x => (
                <img
                  className="playerCard"
                  src={x.image}
                  style={{ width: "90px" }}
                />
              ))}
            </div>
          </div>
        </Paper>
      ))}
    </>
  );
}

export default observer(Americano);
