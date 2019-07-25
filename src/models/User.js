import { types, getRoot } from "mobx-state-tree";

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
    get badges() {
      const badges = [];

      badges.push({
        title: "Säsongspriser",
        prices: [
          { id: 0, title: "Första pris", color: "red", count: 2 },
          { id: 1, title: "Klarat alla nivå Lätt", color: "green", count: 1 },
          { id: 2, title: "Klarat alla nivå Medel", color: "orange", count: 2 },
          { id: 3, title: "Klarat alla nivå Svår", color: "red", count: 2 }
        ]
      });

      badges.push({
        title: "Träningspriser",
        prices: [
          { id: 0, title: "Första pris säsong 1", color: "red" },
          { id: 1, title: "Klarat alla nivå Lätt", color: "green" },
          { id: 2, title: "Klarat alla nivå Medel", color: "orange" },
          { id: 3, title: "Klarat alla nivå Svår", color: "red" }
        ]
      });

      return badges;
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
    get highscore() {
      if (self.items.length === 0) {
        return 0;
      }

      const easy =
        self.items.filter(x => x.isDone && x.game.category === "EASY").length *
        5;
      const medium =
        self.items.filter(x => x.isDone && x.game.category === "MEDIUM")
          .length * 10;
      const hard =
        self.items.filter(x => x.isDone && x.game.category === "HARD").length *
        20;

      return easy + medium + hard;
    },
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
