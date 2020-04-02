import { types, getRoot } from "mobx-state-tree";

const Session = types
  .model("Session", {
    sessionId: types.number,
    description: types.maybeNull(types.string)
  })
  .views(self => ({
    get sessionItems() {
      const store = getRoot(self);

      const levelIds = store.sessionItems
        .filter(s => s.sessionId === self.sessionId)
        .map(l => l.level);

      return store.levels.filter(l => levelIds.includes(l.level));
    }
  }))
  .volatile(self => ({}))
  .actions(self => ({}));

export default Session;
