import { types } from "mobx-state-tree";
import Player from "./Player";

const Team = types
  .model("Team", {
    players: types.array(Player)
  })
  .volatile(self => ({
    goals: 0
  }))
  .views(self => ({
    get uniqueId() {
      return self.players.reduce((a, b) => a + (b["id"] || ""), "");
    }
  }))
  .actions(self => ({
    setGoals(goal) {
      if (!isNaN(goal)) {
        self.goals = parseInt(goal, 10);
      } else {
        self.goals = 0;
      }
    }
  }));

export default Team;
