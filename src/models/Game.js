import { types } from "mobx-state-tree";
import Team from "./Team";

const Game = types
  .model("Game", {
    gameName: types.string,
    team1: types.maybeNull(Team),
    team2: types.maybeNull(Team)
  })
  .volatile(self => ({}))
  .actions(self => ({}));

export default Game;
