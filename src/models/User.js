import { types, getRoot } from "mobx-state-tree";

const getCountByAttribute = (attribute, store, user) => {
  const seasonCount = store.seasons.filter(x => x.season <= store.currentSeason)
    .length;
  const thes = store.itemsFromCurrentAndOldSeason.filter(
    x =>
      x.game.attribute === attribute && x.isDone && x.userName === user.userName
  );
  const easy = thes.filter(x => x.game.category === "EASY");
  const medium = thes.filter(x => x.game.category === "MEDIUM");
  const hard = thes.filter(x => x.game.category === "HARD");

  let count = 50;

  if (easy.length) {
    count = count + easy.length * 10;
  }

  if (medium.length) {
    count = count + medium.length * 10;
  }

  if (hard.length) {
    count = count + hard.length * 10;
  }

  if (!count) {
    debugger;
  }

  return Math.round(count / seasonCount);
};

const User = types
  .model("User", {
    id: types.string,
    userName: types.string,
    name: types.string,
    password: types.string,
    profileImage: types.string,
    favoriteTeam: types.optional(types.string, ""),
    playerTeam: types.optional(types.string, ""),
    position: types.optional(types.string, ""),
    shirtNumber: types.optional(types.string, "")
  })
  .views(self => ({
    get cardImage() {
      if (self.userName === "gk" || self.userName === "os") {
        return `./${self.userName}.png`;
      }
      return "https://i.stack.imgur.com/k2fOF.png";
    },
    get firstName() {
      return self.name.split(" ")[0];
    },
    get totalRating() {
      return Math.round(
        (self.THERating + self.DRIRating + self.PHYRating + self.BALRating) / 4
      );
    },
    get THERating() {
      return getCountByAttribute("THE", self.levelStore, self);
    },
    get DRIRating() {
      return getCountByAttribute("DRI", self.levelStore, self);
    },
    get PHYRating() {
      return getCountByAttribute("PHY", self.levelStore, self);
    },
    get BALRating() {
      return getCountByAttribute("BAL", self.levelStore, self);
    },
    get levelStore() {
      const levelStore = getRoot(self);
      return levelStore;
    },
    get items() {
      return self.levelStore.items.filter(x => x.userName === self.userName);
    },
    get badgeData() {
      return self.levelStore.badges.filter(x => x.userName === self.userName);
    },
    get videoList() {
      const userItems = self.items.filter(
        x => x.isDone && x.userName === self.userName
      );
      return userItems.map(x => ({
        id: x.id,
        img: `http://res.cloudinary.com/deolievif/video/upload/${
          x.publicId
        }.jpg`,
        title: x.name,
        challange: x.game.name
      }));
    },
    // get highscore() {
    //   if (self.items.length === 0) {
    //     return 0;
    //   }

    //   const easy =
    //     self.items.filter(x => x.isDone && x.game.category === "EASY").length *
    //     5;
    //   const medium =
    //     self.items.filter(x => x.isDone && x.game.category === "MEDIUM")
    //       .length * 10;
    //   const hard =
    //     self.items.filter(x => x.isDone && x.game.category === "HARD").length *
    //     20;

    //   return easy + medium + hard;
    // },
    get nextChallange() {
      return self.levelStore.levels[self.items.length];
    }
  }))
  .actions(self => ({
    setProfileImage(newPublicId) {
      self.profileImage = newPublicId;
    },
    updateUser({
      name,
      password,
      profileImage,
      favoriteTeam,
      playerTeam,
      position,
      shirtNumber
    }) {
      self.name = name;
      self.password = password;
      self.profileImage = profileImage;
      self.favoriteTeam = favoriteTeam;
      self.playerTeam = playerTeam;
      self.position = position;
      self.shirtNumber = shirtNumber;
    }
  }));
export default User;
