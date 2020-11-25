import { types } from "mobx-state-tree";
import Team from "./Team";

const TeamContainer = types
  .model("TeamContainer", {
    name: types.string,
    teams: types.maybeNull(types.array(Team)),
  })
  .volatile((self) => ({}))
  .actions((self) => ({}));

export default TeamContainer;
