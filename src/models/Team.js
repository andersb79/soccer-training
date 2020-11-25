import { types, getRoot } from "mobx-state-tree";
import Player from "./Player";

const Team = types
  .model("Team", {
    players: types.array(Player),
    shirtColor: types.maybeNull(types.string),
  })
  .volatile((self) => ({
    goals: 0,
  }))
  .views((self) => ({
    get two() {
      const store = getRoot(self);
      const a = store.generateTeams(2, false, self.players);

      return a[0];
    },
    get three() {
      const store = getRoot(self);
      const a = store.generateTeams(3, false, self.players);

      return a[0];
    },
    get totalRating() {
      return self.players
        .map((x) => x.rating)
        .reduce((prev, next) => prev + next);
    },
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
