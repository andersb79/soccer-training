import { types, getRoot } from "mobx-state-tree";

const getPointsByAttribute = (attribute, user) => {
  return getCountByAttribute(attribute, user) * 10;
};

const ratingbyAttribute = (attribute, user) => {
  const trainingPoints = user.levelStore.items.filter(
    (x) =>
      x.userName === user.userName &&
      x.sessionId !== null &&
      x.session.attribute === attribute
  );

  const skillsPoint = user.levelStore.items.filter(
    (x) =>
      x.userName === user.userName &&
      x.sessionId === null &&
      x.attribute === attribute
  );

  const training = trainingPoints.length * 5;
  const skillz = skillsPoint.length * 5;

  if (isNaN(training)) {
    debugger;
  }

  if (isNaN(skillz)) {
    debugger;
  }

  return trainingPoints.length * 5 + skillsPoint.length * 3;
};

const getCountByAttribute = (attribute, user) => {
  const store = user.levelStore;
  if (!user.levelStore) {
  }

  const thes = store.itemsFromCurrentAndOldSeason.filter(
    (x) =>
      x.game.attribute === attribute && x.isDone && x.userName === user.userName
  );

  return thes.length;
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
    shirtNumber: types.optional(types.string, ""),
    coachComment: types.optional(types.string, ""),
    rating: types.number,
  })
  .views((self) => ({
    get cardImage() {
      // if (
      //   self.userName === "gk" ||
      //   self.userName === "os" ||
      //   self.userName === "va" ||
      //   self.userName === "cl" ||
      //   self.userName === "rs" ||
      //   self.userName === "al"
      // ) {
      return `./${self.userName}.png`;
      // }
      // return "https://i.stack.imgur.com/k2fOF.png";
    },
    get firstName() {
      return self.name.split(" ")[0];
    },
    get totalRating() {
      return Math.round(
        (self.THERating + self.DRIRating + self.PHYRating + self.BALRating) / 4
      );
    },
    get levelStore() {
      const levelStore = getRoot(self);
      if (!levelStore.seasons) {
        debugger;
      }
      return levelStore;
    },
    // get THERating() {
    //   return getPointsByAttribute("THE", self);
    // },
    // get DRIRating() {
    //   return getPointsByAttribute("DRI", self);
    // },
    // get PHYRating() {
    //   return getPointsByAttribute("PHY", self);
    // },
    // get BALRating() {
    //   return getPointsByAttribute("BAL", self);
    // },
    get THERating() {
      return ratingbyAttribute("THE", self);
    },
    get DRIRating() {
      return ratingbyAttribute("DRI", self);
    },
    get PHYRating() {
      return ratingbyAttribute("PHY", self);
    },
    get BALRating() {
      return ratingbyAttribute("BAL", self);
    },
    get items() {
      return self.levelStore.items.filter((x) => x.userName === self.userName);
    },
    get badgeData() {
      return self.levelStore.badges.filter((x) => x.userName === self.userName);
    },
    get videoList() {
      const userItems = self.items.filter(
        (x) => x.isDone && x.userName === self.userName
      );
      return userItems.map((x) => ({
        id: x.id,
        img: `http://res.cloudinary.com/deolievif/video/upload/${x.publicId}.jpg`,
        title: x.name,
        challange: x.game.name,
      }));
    },
    get nextChallange() {
      return self.levelStore.levels[self.items.length];
    },
  }))
  .actions((self) => ({
    setProfileImage(newPublicId) {
      self.profileImage = newPublicId;
    },
    Count(attribute) {
      return getCountByAttribute(attribute.id, self);
    },
    updateUser({
      name,
      password,
      profileImage,
      favoriteTeam,
      playerTeam,
      position,
      shirtNumber,
    }) {
      self.name = name;
      self.password = password;
      self.profileImage = profileImage;
      self.favoriteTeam = favoriteTeam;
      self.playerTeam = playerTeam;
      self.position = position;
      self.shirtNumber = shirtNumber;
    },
  }));
export default User;
