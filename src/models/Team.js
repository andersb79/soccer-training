import { types } from "mobx-state-tree";
import Player from "./Player";

const Team = types
  .model("Team", {
    players: types.array(Player)
  })
  .views(self => ({
    get uniqueId() {
      return self.players.reduce((a, b) => a + (b["id"] || ""), "");
    }
  }))
  .actions(self => ({}));

export default Team;
