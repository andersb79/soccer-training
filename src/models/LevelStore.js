import { types, flow, applySnapshot } from "mobx-state-tree";
import Level from "./Level";
import Item from "./Item";
import User from "./User";
import Season from "./Season";

const levelFilters = [
  { id: 0, text: "Alla utmaningar" },
  { id: 1, text: "Ej klarade utmaningar" },
  { id: 2, text: "Klarade utmaningar" }
];

const appRunning = { MAIN: "MAIN", NUMBER: "NUMBER", COLOR: "COLOR" };

const LevelStore = types
  .model("LevelStore", {
    levels: types.array(Level),
    items: types.array(Item),
    users: types.array(User),
    seasons: types.array(Season)
  })
  .views(self => ({
    get viewSeasonObject() {
      return self.seasons.find(x => x.season === self.viewSeason);
    },
    get seasonsWithoutView() {
      return self.seasons.filter(x => x.season !== self.viewSeason);
    },
    get currentSeasonObject() {
      return self.seasons.find(x => x.season === self.currentSeason);
    },
    get filteredItems() {
      return self.items.filter(
        x => x.isDone || x.userName === self.loggedIn.userName
      );
    },
    get highScoreList() {
      //   return self.users.sort(x => x.highscore);
      var byHighscore = self.users.slice(0);
      byHighscore.sort((a, b) => {
        var x = a.highscore;
        var y = b.highscore;
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
    currentSeason: 1,
    viewSeason: 1
  }))
  .actions(self => ({
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
    async fetchAll() {
      var users = await self.api.getUsers();
      var seasons = await self.api.fetchSeasons();
      var levels = await self.api.fetchLevels(self.viewSeason);
      var items = await self.api.fetchItems(self.viewSeason);

      const data = {
        users: [],
        items: [],
        levels: [],
        seasons: []
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

      users.forEach(elm => {
        elm.fields.id = elm.id;
        data.users.push(elm.fields);
      });

      items.reverse();

      items.forEach(elm => {
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

      formdata.append("file", file);
      formdata.append("cloud_name", "deolievif");
      formdata.append("upload_preset", "kv0do7lj");
      formdata.append("resource_type", "raw");
      formdata.append("title", self.loggedIn.userName);
      //formdata.append("public_id", level.level);
      formdata.append("tags", self.loggedIn.userName);

      var xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "https://api.cloudinary.com/v1_1/deolievif/video/upload/",
        true
      );

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
          season: self.currentSeason
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
