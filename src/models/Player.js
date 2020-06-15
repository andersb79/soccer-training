import { types } from "mobx-state-tree";

const Player = types
  .model("Player", {
    id: types.string,
    idNumber: types.number,
    name: types.string,
    image: types.string,
    active: types.maybeNull(types.boolean),
  })
  .actions((self) => ({}));

export default Player;
