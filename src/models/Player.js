import { types } from "mobx-state-tree";

const Player = types
  .model("Player", {
    id: types.string,
    idNumber: types.number,
    name: types.string,
    image: types.maybeNull(types.string),
    active: types.maybeNull(types.boolean),
    rating: types.number,
  })
  .actions((self) => ({}));

export default Player;
