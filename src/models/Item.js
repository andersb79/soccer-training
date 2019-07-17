import { types, getRoot } from "mobx-state-tree";

function appendLeadingZeroes(n) {
  if (n <= 9) {
    return "0" + n;
  }
  return n;
}

const Item = types
  .model("Item", {
    id: types.string,
    createdTime: types.Date,
    userName: types.string,
    publicId: types.string,
    level: types.integer,
    isDone: types.maybeNull(types.boolean)
  })
  .volatile(self => ({
    isVisible: false
  }))
  .actions(self => ({
    setVisibility(isVisible) {
      self.isVisible = isVisible;
    }
  }))
  .views(self => ({
    get date() {
      return (
        self.createdTime.getFullYear() +
        "-" +
        appendLeadingZeroes(self.createdTime.getMonth() + 1) +
        "-" +
        appendLeadingZeroes(self.createdTime.getDate())
      );
    },
    get user() {
      const levelStore = getRoot(self);
      return levelStore.users.find(x => x.userName === self.userName);
    },
    get game() {
      const levelStore = getRoot(self);
      return levelStore.levels.find(x => x.level === self.level);
    },
    get poster() {
      return { publicId: self.publicId + ".jpg", resourceType: "video" };
    }
  }));
export default Item;