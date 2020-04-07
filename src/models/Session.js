import { types, getRoot } from "mobx-state-tree";

const Session = types
  .model("Session", {
    sessionId: types.number,
    description: types.maybeNull(types.string),
    attribute: types.maybeNull(types.string),
    grade: types.maybeNull(types.number),
  })
  .views((self) => ({
    get userCount() {
      const levelStore = getRoot(self);
      const a = levelStore.items.filter(
        (x) =>
          x.userName === levelStore.loggedIn.userName &&
          x.sessionId === self.sessionId
      );
      return a.length;
    },
    get sessionItems() {
      const store = getRoot(self);

      const array = [];
      store.sessionItems
        .filter((s) => s.sessionId === self.sessionId)
        .forEach((s) => {
          array.push(store.levels.find((x) => x.level === s.level));
        });

      return array;
    },
    get totalWorkTime() {
      let result = self.sessionItems.reduce(
        (sum, current) => sum + current.workTime + current.restTime,
        0
      );

      return Math.floor(result / 60);
    },
  }))
  .volatile((self) => ({}))
  .actions((self) => ({}));

export default Session;
