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
    status: types.string,
    sharedPath: types.maybeNull(types.string),
    comment: types.maybeNull(types.string),
    season: types.integer,
    fileType: types.maybeNull(types.string),
    posterPath: types.maybeNull(types.string)
  })
  .volatile(self => ({
    isVisible: false
  }))
  .actions(self => ({
    setVisibility(isVisible) {
      self.isVisible = isVisible;
    },
    setStatus(newStatus, comment) {
      self.status = newStatus;
      self.comment = comment;
      const levelStore = getRoot(self);
      levelStore.api.updateItem(self);
    }
  }))
  .views(self => ({
    get hasComment() {
      return self.comment ? true : false;
    },
    get hasSharedPath() {
      return self.sharedPath ? true : false;
    },
    get dropboxLink() {
      return `https://www.dropbox.com/s/${self.sharedPath}/${
        self.publicId
      }.mov?raw=1`;
    },
    get dropboxPoster() {
      return `https://www.dropbox.com/s/${
        self.posterPath
      }/ConeDrill1.jpg?raw=1`;
    },
    get isDone() {
      return self.status === "DONE";
    },
    get isRejected() {
      return self.status === "REJECTED";
    },
    get isWaitingForApproval() {
      return self.status === "WAITINGFORAPPROVAL";
    },
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
    get points() {
      if (!self.isDone) {
        return 0;
      }

      if (self.game.category === "EASY") {
        return 5;
      }

      if (self.game.category === "MEDIUM") {
        return 10;
      }

      if (self.game.category === "HARD") {
        return 20;
      }

      return 0;
    },
    get displayText() {
      if (self.isDone) {
        return `${self.date} - ${self.game.categoryName}`;
      }

      return `${self.date}`;
    },
    get poster() {
      return { publicId: self.publicId + ".jpg", resourceType: "video" };
    }
  }));
export default Item;
