import { types, getRoot } from "mobx-state-tree";

const Session = types
  .model("Session", {
    sessionId: types.number,
    description: types.maybeNull(types.string),
    attribute: types.maybeNull(types.string)
  })
  .views(self => ({
    get sessionItems() {
      const store = getRoot(self);

      const array = [];
      store.sessionItems
        .filter(s => s.sessionId === self.sessionId)
        .forEach(s => {
          array.push(store.levels.find(x => x.level === s.level));
        });

      return array;
    }
  }))
  .volatile(self => ({}))
  .actions(self => ({}));

export default Session;
