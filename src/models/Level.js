import { types, getRoot } from "mobx-state-tree";

const Categories = {
  EASY: "Grunder",
  MEDIUM: "Medium",
  HARD: "Svår"
};

const Attribute = {
  BAL: "KON",
  THE: "TEK",
  DRI: "DRI",
  PHY: "FYS"
};

const Level = types
  .model("Level", {
    id: types.string,
    level: types.integer,
    details: types.string,
    name: types.string,
    category: types.string,
    publicId: types.string,
    season: types.integer,
    sharedPath: types.maybeNull(types.string),
    fileType: types.maybeNull(types.string),
    posterPath: types.maybeNull(types.string),
    attribute: types.maybeNull(types.string)
  })
  .volatile(self => ({
    isVisible: false
  }))
  .actions(self => ({
    setPublicId(newPublicId) {
      self.publicId = newPublicId;
    },
    setName(newName) {
      self.name = newName;
    },
    setVisibility(isVisible) {
      self.isVisible = isVisible;
    }
  }))
  .views(self => ({
    get attributeText() {
      return Attribute[self.attribute];
    },
    get hasSharedPath() {
      return self.sharedPath ? true : false;
    },
    get dropboxLink() {
      return `https://www.dropbox.com/s/${self.sharedPath}/${self.publicId}.${
        self.fileType
      }?raw=1`;
    },
    get dropboxPoster() {
      return `https://www.dropbox.com/s/${
        self.posterPath
      }/ConeDrill1.jpg?raw=1`;
    },
    get categoryName() {
      return Categories[self.category];
    },
    get isActiveSeason() {
      const levelStore = getRoot(self);
      return levelStore.currentSeason === self.season;
    },
    get isDone() {
      const levelStore = getRoot(self);
      return levelStore.items.some(
        x =>
          x.user.id === levelStore.loggedIn.id &&
          x.isDone &&
          x.level === self.level
      );
    },

    get displayText() {
      return `${self.categoryName}`;
    },
    get poster() {
      return { publicId: self.publicId + ".jpg", resourceType: "video" };
    }
  }));
export default Level;
