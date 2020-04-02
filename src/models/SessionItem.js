import { types } from "mobx-state-tree";

const SessionItem = types
  .model("SessionItem", {
    sessionId: types.number,
    level: types.number
  })
  .volatile(self => ({}))
  .actions(self => ({}));

export default SessionItem;
