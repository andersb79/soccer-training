import { types } from "mobx-state-tree";

const Player = types
  .model("Player", {
    id: types.number,
    name: types.string,
    image: types.string
  })
  .actions(self => ({}));

export default Player;
