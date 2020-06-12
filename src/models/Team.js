import { types } from "mobx-state-tree";
import Player from "./Player";

const Team = types
  .model("Team", {
    players: types.array(Player),
  })
  .volatile((self) => ({
    goals: 0,
  }))
  .views((self) => ({
    get uniqueId() {
      var items = self.players.slice().sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

      return items.reduce((a, b) => a + (b["name"] || ""), "");
    },
  }))
  .actions((self) => ({
    setGoals(goal) {
      if (!isNaN(goal)) {
        self.goals = parseInt(goal, 10);
      } else {
        self.goals = 0;
      }
    },
  }));

export default Team;
