import { types, getRoot } from "mobx-state-tree";

const SessionItem = types
  .model("SessionItem", {
    sessionId: types.number,
    level: types.number,
  })
  .views((self) => ({}))
  .volatile((self) => ({}))
  .actions((self) => ({}));

export default SessionItem;
