import { types, getRoot } from "mobx-state-tree";

const Player = types
  .model("Player", {
    id: types.string,
    idNumber: types.number,
    name: types.string,
    image: types.maybeNull(types.string),
    active: types.maybeNull(types.boolean),
    rating: types.number,
  })
  .actions((self) => ({
    updateRating(rating) {
      const store = getRoot(self);
      store.updateRating(self, rating);
    },
  }));

export default Player;
