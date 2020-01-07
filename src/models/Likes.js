import { types, getRoot } from "mobx-state-tree";

const Likes = types
  .model("Likes", {
    id: types.string,
    itemId: types.string,
    userName: types.string
  })
  .actions(self => ({
    remove(like) {
      const levelStore = getRoot(self);
      levelStore.likes.remove(like);
    }
  }));
export default Likes;
