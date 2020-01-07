import { types, flow, applySnapshot } from "mobx-state-tree";
import Level from "./Level";
import Item from "./Item";
import Likes from "./Likes";
import User from "./User";
import Season from "./Season";

const levelFilters = [
  { id: 0, text: "Alla utmaningar" },
  { id: 1, text: "Ej klarade utmaningar" },
  { id: 2, text: "Klarade utmaningar" }
];

const Attributes = [
  { id: "BAL", short: "KON", text: "KONTROLL", image: "BAL.jpg" },
  { id: "THE", short: "TEK", text: "TEKNIK", image: "THE.jpg" },
  { id: "DRI", short: "DRI", text: "DRIBBLING", image: "DRI.jpg" },
  { id: "PHY", short: "FYS", text: "FYSIK", image: "PHY.jpg" },
  { id: "OWN", short: "OWN", text: "EGENA SKILLS", image: "OWN.jpg" }
];

const appRunning = { MAIN: "MAIN", NUMBER: "NUMBER", COLOR: "COLOR" };

const LevelStore = types
  .model("LevelStore", {
    levels: types.array(Level),
    items: types.array(Item),
    users: types.array(User),
    seasons: types.array(Season),
    badges: types.array(Item),
    likes: types.array(Likes)
  })
  .views(self => ({
    get filterLevelsByAttribute() {
      const filteredLevels = self.levels.filter(
        x => x.attribute == self.selectedAttribute.id
      );

      return filteredLevels;
    },
    get viewSeasonObject() {
      return self.seasons.find(x => x.season === self.viewSeason);
    },
    get seasonsWithoutView() {
      return self.seasons.filter(x => x.season !== self.viewSeason);
    },
    get currentSeasonObject() {
      return self.seasons.find(x => x.season === self.currentSeason);
    },
    get itemsFromCurrentAndOldSeason() {
      return self.badges.filter(x => x.season <= self.currentSeason);
    },
    get filteredItems() {
      if (self.loggedIn.userName === "admin") {
        return self.items;
      }

      return self.items.filter(
        x => x.isDone || x.userName === self.loggedIn.userName
      );
    },
    get highScoreList() {
      var byHighscore = self.users.filter(x => x.userName !== "admin").slice(0);
      byHighscore.sort((a, b) => {
        var x = a.totalRating;
        var y = b.totalRating;
        return x < y ? -1 : x > y ? 1 : 0;
      });
      return byHighscore.reverse();
    },
    get filteredLevels() {
      if (self.levelFilter.id === 0) {
        return self.levels.filter(x => x.season === self.viewSeason);
      }

      if (self.levelFilter.id === 1) {
        return self.levels.filter(
          x => !x.isDone && x.season === self.viewSeason
        );
      }

      if (self.levelFilter.id === 2) {
        return self.levels.filter(
          x => x.isDone && x.season === self.viewSeason
        );
      }

      return [];
    },
    get levelFilters() {
      return levelFilters;
    },
    get attributes() {
      return Attributes;
    }
  }))
  .volatile(self => ({
    loggedIn: null,
    initzialize: false,
    height: null,
    selectedProfile: null,
    levelFilter: self.levelFilters[0],
    api: null,
    appRunning: appRunning.MAIN,
    colorCount: 2,
    currentSeason: null,
    viewSeason: null,
    hasAnimatedCards: false,
    selectedAttribute: null
  }))
  .actions(self => ({
    setHasAnimatedCards(value) {
      self.hasAnimatedCards = value;
    },
    setStartSeason(season) {
      self.viewSeason = season;
      self.currentSeason = season;
    },
    async switchSeason(season) {
      self.viewSeason = season.season;
      await self.refresh();
    },
    setColorCount(count) {
      self.colorCount = count;
    },
    setRunningApp(app) {
      self.appRunning = app;
    },
    selectProfile(profile) {
      self.selectedProfile = profile;
    },
    setLevelFilter(filter) {
      self.levelFilter = filter;
    },
    selectAttribute(attribute) {
      console.log(attribute);
      self.selectedAttribute = attribute;
    },
    async fetchAll() {
      var users = await self.api.getUsers();
      var seasons = await self.api.fetchSeasons();

      if (self.currentSeason === null) {
        seasons.forEach(s => {
          var startDate = new Date(s.fields.startDate);
          var endDate = new Date(s.fields.endDate);
          var check = new Date();

          if (check > startDate && check < endDate) {
            self.setStartSeason(s.fields.season);
          }
        });
      }

      var levels = await self.api.fetchLevels(self.viewSeason);
      var items = await self.api.fetchItems(self.viewSeason);
      var likes = await self.api.fetchLikes();

      const data = {
        users: [],
        items: [],
        levels: [],
        seasons: [],
        badges: [],
        likes: []
      };

      seasons.forEach(elm => {
        elm.fields.id = elm.id;
        elm.fields.startDate = new Date(elm.fields.startDate);
        elm.fields.endDate = new Date(elm.fields.endDate);
        data.seasons.push(elm.fields);
      });

      levels.forEach(elm => {
        elm.fields.id = elm.id;
        data.levels.push(elm.fields);
      });

      likes.forEach(elm => {
        elm.fields.id = elm.id;
        data.likes.push(elm.fields);
      });

      users.forEach(elm => {
        elm.fields.id = elm.id;
        data.users.push(elm.fields);
      });

      items.forEach(elm => {
        elm.fields.id = elm.id;
        elm.fields.createdTime = new Date(elm.createdTime);
        data.badges.push(elm.fields);
      });

      items.reverse();

      items
        .filter(x => x.fields.season === self.viewSeason)
        .forEach(elm => {
          elm.fields.id = elm.id;
          elm.fields.createdTime = new Date(elm.createdTime);
          data.items.push(elm.fields);
        });

      return data;
    },
    async refresh() {
      const data = await self.fetchAll();

      applySnapshot(self, data);

      return true;
    },
    setHeight(height) {
      self.height = height;
    },
    logout() {
      self.loggedIn = null;
    },
    login(userName, password) {
      self.loggedIn = self.users.find(
        x => x.userName === userName && x.password === password
      );

      if (self.loggedIn) {
        return true;
      }

      return false;
    },
    login2(id) {
      self.loggedIn = self.users.find(x => x.id === JSON.parse(id));

      if (self.loggedIn) {
        return true;
      }

      return false;
    },
    add(level) {
      self.levels.push(level);
    },
    addItem(item) {
      self.items.push(item);
    },
    updateUser(user) {
      self.api.updateUser(user);
    },
    init: flow(function* init(api, id) {
      self.api = api;
      const data = yield self.fetchAll();

      applySnapshot(self, data);

      if (id) {
        self.login2(id);
      }

      if (self.loggedIn) {
        self.updateUser(self.loggedIn);
      }

      self.initzialize = true;
    }),
    uploadImage(file, onProcessed) {
      var formdata = new FormData();

      formdata.append("file", file);
      formdata.append("cloud_name", "deolievif");
      formdata.append("upload_preset", "kv0do7lj");
      formdata.append("title", self.loggedIn.userName);
      formdata.append("tags", self.loggedIn.userName);

      var xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "https://api.cloudinary.com/v1_1/deolievif/image/upload",
        true
      );

      xhr.onload = function() {
        // do something to response

        var myObj = JSON.parse(this.responseText);
        self.loggedIn.setProfileImage(myObj.public_id);
        self.updateUser(self.loggedIn);

        onProcessed(this.responseText);
      };
      xhr.send(formdata);
    },
    processFile(file, level, onProcessed) {
      var formdata = new FormData();

      const isImage =
        file.type === "image/jpeg" || file.type === "image/png" ? true : false;

      formdata.append("file", file);
      formdata.append("cloud_name", "deolievif");
      formdata.append("upload_preset", "kv0do7lj");

      if (!isImage) {
        formdata.append("resource_type", "video");
      }

      formdata.append("title", self.loggedIn.userName);
      //formdata.append("public_id", level.level);
      formdata.append("tags", self.loggedIn.userName);

      const uploadUrl = isImage
        ? "https://api.cloudinary.com/v1_1/deolievif/image/upload"
        : "https://api.cloudinary.com/v1_1/deolievif/video/upload/";

      var xhr = new XMLHttpRequest();
      xhr.open("POST", uploadUrl, true);

      xhr.onload = function() {
        // do something to response
        var myObj = JSON.parse(this.responseText);
        console.log(myObj);
        //level.setPublicId(myObj.public_id);
        console.log(this.responseText);

        const item = {
          userName: self.loggedIn.userName,
          publicId: myObj.public_id,
          level: level.level,
          status: "WAITINGFORAPPROVAL",
          season: self.currentSeason,
          fileType: isImage ? "image" : "video"
        };

        self.api.insertItem(item);

        self.refresh();
        //self.addItem(item);

        console.log(self.items);

        onProcessed(this.responseText);
      };
      xhr.send(formdata);
    }
  }));
export default LevelStore;
