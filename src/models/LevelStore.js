import { types, flow, applySnapshot } from "mobx-state-tree";
import Level from "./Level";
import Item from "./Item";
import Likes from "./Likes";
import User from "./User";
import Season from "./Season";
import Game from "./Game";
import Session from "./Session";
import SessionItem from "./SessionItem";

const americanoPlayerList = [
  // { id: 4, name: "Alfred", image: "aslag.png" },
  { id: 1, name: "Gustav", image: "gk.png" },
  { id: 2, name: "Love", image: "lo.png" },
  { id: 3, name: "Oskar", image: "os.png" },
  { id: 4, name: "ChalrieM", image: "cm.png" },
  { id: 5, name: "Arvid", image: "al.png" },
  { id: 6, name: "Douglas", image: "db.png" },
  { id: 7, name: "Alexander", image: "an.png" },
  { id: 8, name: "Ove", image: "owe.png" },
  { id: 9, name: "Agust", image: "at.png" },
  { id: 10, name: "Alwin", image: "aw.png" },
  { id: 11, name: "ChalrieL", image: "cl.png" },
  { id: 12, name: "Robin", image: "rs.png" },
  { id: 13, name: "Enzo", image: "eh.png" },
  { id: 14, name: "Erfan", image: "eha.png" },
  { id: 15, name: "Hannes", image: "hn.png" },
  { id: 16, name: "Vidar", image: "va.png" },
];

const levelFilters = [
  { id: 0, text: "Alla utmaningar" },
  { id: 1, text: "Ej klarade utmaningar" },
  { id: 2, text: "Klarade utmaningar" },
];

const Attributes = [
  { id: "BAL", short: "KON", text: "KONTROLL", image: "BAL.jpg" },
  { id: "THE", short: "TEK", text: "TEKNIK", image: "THE.jpg" },
  { id: "DRI", short: "DRI", text: "DRIBBLING", image: "DRI.jpg" },
  { id: "PHY", short: "FYS", text: "FYSIK", image: "PHY.jpg" },
  { id: "OWN", short: "OWN", text: "EGNA SKILLS", image: "OWN.jpg" },
];

const appRunning = { MAIN: "MAIN", NUMBER: "NUMBER", COLOR: "COLOR" };

const LevelStore = types
  .model("LevelStore", {
    levels: types.array(Level),
    items: types.array(Item),
    users: types.array(User),
    seasons: types.array(Season),
    badges: types.array(Item),
    likes: types.array(Likes),
    americano: types.maybeNull(types.array(Game)),
    sessions: types.maybeNull(types.array(Session)),
    sessionItems: types.maybeNull(types.array(SessionItem)),
  })
  .views((self) => ({
    get sessionsByAttribute() {
      const newArray = self.sessions.reduce(
        (accumulator, item, index, array) => {
          let head = accumulator.find((x) => x.attribute.id === item.attribute);
          if (!head) {
            head = {
              attribute: self.attributes.find((x) => x.id === item.attribute),
              sessions: [],
            };
            accumulator.push(head);
          }
          head.sessions.push(item);
          return accumulator;
        },
        []
      );
      console.log(newArray);
      return newArray;
    },
    get americanoPlayers() {
      return americanoPlayerList;
    },
    get americanoStat() {
      const stat = [];
      self.americanoPlayers.forEach((p) => {
        const item = { player: p };

        item.goals = 0;

        self.americano.forEach((g) => {
          if (g.team1.players.find((pp) => pp.id === p.id)) {
            item.goals += g.team1.goals;
          } else {
            item.goals += g.team2.goals;
          }
        });

        stat.push(item);
      });

      return stat
        .sort((a, b) => {
          var x = a.goals;
          var y = b.goals;
          return x < y ? -1 : x > y ? 1 : 0;
        })
        .reverse();
    },
    get americanoReverse() {
      return self.americano.reverse();
    },
    get filterLevelsForSession() {
      const filteredLevels = self.levels.filter(
        (x) => x.attribute === self.attributes[0].id
      );

      return filteredLevels;
    },
    get filterLevelsByAttribute() {
      const filteredLevels = self.levels.filter(
        (x) => x.attribute === self.selectedAttribute.id
      );

      return filteredLevels.reverse();
    },
    get viewSeasonObject() {
      return self.seasons.find((x) => x.season === self.viewSeason);
    },
    get seasonsWithoutView() {
      return self.seasons.filter((x) => x.season !== self.viewSeason);
    },
    get currentSeasonObject() {
      return self.seasons.find((x) => x.season === self.currentSeason);
    },
    get itemsFromCurrentAndOldSeason() {
      return self.badges.filter((x) => x.season <= self.currentSeason);
    },
    get filteredItems() {
      if (self.loggedIn.userName === "admin") {
        return self.items;
      }

      return self.items.filter(
        (x) => x.isDone || x.userName === self.loggedIn.userName
      );
    },
    get highScoreList() {
      var byHighscore = self.users
        .filter((x) => x.userName !== "admin")
        .slice(0);
      byHighscore.sort((a, b) => {
        var x = a.totalRating;
        var y = b.totalRating;
        return x < y ? -1 : x > y ? 1 : 0;
      });
      return byHighscore.reverse();
    },
    get filteredLevels() {
      if (self.levelFilter.id === 0) {
        return self.levels.filter((x) => x.season === self.viewSeason);
      }

      if (self.levelFilter.id === 1) {
        return self.levels.filter(
          (x) => !x.isDone && x.season === self.viewSeason
        );
      }

      if (self.levelFilter.id === 2) {
        return self.levels.filter(
          (x) => x.isDone && x.season === self.viewSeason
        );
      }

      return [];
    },
    get levelFilters() {
      return levelFilters;
    },
    get attributes() {
      return Attributes;
    },
    get americanoGameCount() {
      return self.americanoGames.length;
    },
  }))
  .volatile((self) => ({
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
    selectedAttribute: null,
    selectedSession: null,
  }))
  .actions((self) => ({
    removeUser() {
      self.users.remove(self.users[0]);
    },
    getGame(numberOfPlayers, shuffled) {
      if (!shuffled || shuffled.length < 4) {
        debugger;
      }

      let players1 = shuffled.slice(0, numberOfPlayers);
      players1 = players1.sort(function (a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
      let players2 = shuffled.slice(numberOfPlayers, numberOfPlayers * 2);
      players2 = players2.sort(function (a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });

      let game = {
        gameName: `Match ${self.americano.length + 1}`,
        team1: { players: players1 },
        team2: { players: players2 },
      };

      //kolla om det redan finns
      //hämta då ny
      // const uniqueId = players1.reduce((a, b) => a + (b["id"] || ""), "");
      // console.log(uniqueId);

      const uniqueId1 = players1.reduce((a, b) => a + (b["name"] || ""), "");
      const uniqueId2 = players2.reduce((a, b) => a + (b["name"] || ""), "");

      if (uniqueId1.indexOf("Gustav") !== -1) {
      }

      if (uniqueId2.indexOf("Gustav") !== -1) {
      }

      self.americano.forEach((g) => {
        if (
          g.team1.uniqueId === uniqueId1 ||
          g.team2.uniqueId === uniqueId1 ||
          g.team1.uniqueId === uniqueId2 ||
          g.team2.uniqueId === uniqueId2
        ) {
          console.log("dublett", uniqueId1, uniqueId2);
          game = self.getGame(
            numberOfPlayers,
            shuffled.sort(function () {
              return 0.5 - Math.random();
            })
          );
        }
      });

      return game;
    },
    getAllG() {
      var array = [];
      self.americano.forEach((g) => {
        if (g.team1.players[0].id === 1 || g.team1.players[1].id === 1) {
          array.push(g.team1);
        } else if (g.team2.players[0].id === 1 || g.team2.players[1].id === 1) {
          array.push(g.team2);
        }
      });

      return array;
    },
    getNewGame(shuffled) {
      let game = self.getGame(2, shuffled);

      return game;
    },
    getActivePlayers(shuffled, game) {
      var players = shuffled;
      players = players.filter((x) => x.id !== game.team1.players[0].id);
      players = players.filter((x) => x.id !== game.team1.players[1].id);
      players = players.filter((x) => x.id !== game.team2.players[0].id);
      players = players.filter((x) => x.id !== game.team2.players[1].id);

      return players.sort(function () {
        return 0.5 - Math.random();
      });
    },
    americanoRandom() {
      var a = self.createGames(self.americanoPlayers);
      console.log(a);

      var gameAddedToRound = 0;

      var shuffled = self.americanoPlayers.sort(function () {
        return 0.5 - Math.random();
      });

      console.log(shuffled);

      console.log(shuffled.slice(0, 4));
      console.log(shuffled.slice(4, 8));
      console.log(shuffled.slice(8, 12));
      console.log(shuffled.slice(12, 16));

      try {
        const game = self.getNewGame(shuffled);
        const mobxGame = Game.create(game);
        self.americano.push(mobxGame);
        gameAddedToRound = 1;

        shuffled = self.getActivePlayers(shuffled, game).sort(function () {
          return 0.5 - Math.random();
        });

        const game2 = self.getNewGame(shuffled);
        const mobxGame2 = Game.create(game2);
        self.americano.push(mobxGame2);
        gameAddedToRound = 2;

        shuffled = self.getActivePlayers(shuffled, game2).sort(function () {
          return 0.5 - Math.random();
        });

        const game3 = self.getNewGame(shuffled);
        const mobxGame3 = Game.create(game3);
        self.americano.push(mobxGame3);
        gameAddedToRound = 3;

        shuffled = self.getActivePlayers(shuffled, game3).sort(function () {
          return 0.5 - Math.random();
        });

        const game4 = self.getNewGame(shuffled);
        const mobxGame4 = Game.create(game4);
        self.americano.push(mobxGame4);
        gameAddedToRound = 4;
      } catch {
        console.log("game added to round" + gameAddedToRound);

        if (gameAddedToRound > 0) {
          self.americano.remove(self.americano[self.americano.length - 1]);
        }
        if (gameAddedToRound > 1) {
          self.americano.remove(self.americano[self.americano.length - 1]);
        }
        if (gameAddedToRound > 2) {
          self.americano.remove(self.americano[self.americano.length - 1]);
        }

        self.americanoRandom();
      }
      //applySnapshot(self.americano, game);
    },
    shuffleArray(array) {
      let shuffledArray = [...array];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [
          shuffledArray[j],
          shuffledArray[i],
        ];
      }
      return shuffledArray;
    },
    createGames(playerArr) {
      let players = self.shuffleArray(playerArr);

      const rounds = 8,
        gamesPerRound = 4,
        teamSize = 2,
        numOfTeamsPerRound = players.length / teamSize;

      var teams = Array(rounds)
        .fill()
        .map((x, i) => []);

      for (let round = 0; round < rounds; round++) {
        let stepSize = Math.pow(2, round);
        let playerIndex = 0;
        for (let i = 0; i < numOfTeamsPerRound; i++) {
          teams[round].push([
            { ...players[playerIndex] },
            { ...players[playerIndex + stepSize] },
          ]);
          playerIndex += 1 + ((i + 1) % stepSize ? 0 : stepSize);
        }
      }

      // Now that we have teams, we can create the games. Let's shuffle the teams per round before to ensure it's more random.
      const games = teams.map((teamsPerRound) =>
        self.shuffleArray(teamsPerRound).reduce(
          (acc, team, index) => {
            acc[Math.floor(index / teamSize)][
              `team${(index % teamSize) + 1}`
            ] = team;
            return acc;
          },
          Array(gamesPerRound)
            .fill()
            .map((x) => ({}))
        )
      );

      return games;
    },
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
    selectSession(session) {
      console.log(session);
      self.selectedSession = session;
    },
    async fetchAll() {
      var users = await self.api.getUsers();
      var seasons = await self.api.fetchSeasons();

      if (self.currentSeason === null) {
        seasons.forEach((s) => {
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
      var sessions = await self.api.fetchSessions();
      var sessionItems = await self.api.fetchSessionItems();

      const data = {
        users: [],
        items: [],
        levels: [],
        seasons: [],
        badges: [],
        likes: [],
        sessions: [],
        sessionItems: [],
      };

      seasons.forEach((elm) => {
        elm.fields.id = elm.id;
        elm.fields.startDate = new Date(elm.fields.startDate);
        elm.fields.endDate = new Date(elm.fields.endDate);
        data.seasons.push(elm.fields);
      });

      levels.forEach((elm) => {
        elm.fields.id = elm.id;
        data.levels.push(elm.fields);
      });

      likes.forEach((elm) => {
        elm.fields.id = elm.id;
        data.likes.push(elm.fields);
      });

      users.forEach((elm) => {
        elm.fields.id = elm.id;
        data.users.push(elm.fields);
      });

      items.forEach((elm) => {
        elm.fields.id = elm.id;
        elm.fields.createdTime = new Date(elm.createdTime);
        data.badges.push(elm.fields);
      });

      sessions.forEach((elm) => {
        elm.fields.id = elm.id;
        elm.fields.createdTime = new Date(elm.createdTime);
        data.sessions.push(elm.fields);
      });

      sessionItems.forEach((elm) => {
        elm.fields.id = elm.id;
        elm.fields.createdTime = new Date(elm.createdTime);
        data.sessionItems.push(elm.fields);
      });

      items.reverse();

      items
        .filter((x) => x.fields.season === self.viewSeason)
        .forEach((elm) => {
          elm.fields.id = elm.id;
          elm.fields.createdTime = new Date(elm.createdTime);
          data.items.push(elm.fields);
        });

      data.americano = [];

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
        (x) => x.userName === userName && x.password === password
      );

      if (self.loggedIn) {
        return true;
      }

      return false;
    },
    login2(id) {
      self.loggedIn = self.users.find((x) => x.id === JSON.parse(id));

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

      //      self.selectSession(self.sessions[2]);

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

      xhr.onload = function () {
        // do something to response

        var myObj = JSON.parse(this.responseText);
        self.loggedIn.setProfileImage(myObj.public_id);
        self.updateUser(self.loggedIn);

        onProcessed(myObj.public_id);
      };
      xhr.send(formdata);
    },
    async finishedSession(images) {
      // images = [
      //   {
      //     src:
      //       "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4RD+RXhpZgAATU0AKgAAAAgABAE7AAIAAAARAAAISodpAAQAAAABAAAIXJydAAEAAAAiAAAQ1OocAAcAAAgMAAAAPgAAAAAc6gAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEFuZGVycyBCZW5ndHNzb24AAAAFkAMAAgAAABQAABCqkAQAAgAAABQAABC+kpEAAgAAAAM4MwAAkpIAAgAAAAM4MwAA6hwABwAACAwAAAieAAAAABzqAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAyMDowNDowNiAwOToyMDozNQAyMDIwOjA0OjA2IDA5OjIwOjM1AAAAQQBuAGQAZQByAHMAIABCAGUAbgBnAHQAcwBzAG8AbgAAAP/hCyNodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0n77u/JyBpZD0nVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkJz8+DQo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIj48cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPjxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSJ1dWlkOmZhZjViZGQ1LWJhM2QtMTFkYS1hZDMxLWQzM2Q3NTE4MmYxYiIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIi8+PHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9InV1aWQ6ZmFmNWJkZDUtYmEzZC0xMWRhLWFkMzEtZDMzZDc1MTgyZjFiIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPjx4bXA6Q3JlYXRlRGF0ZT4yMDIwLTA0LTA2VDA5OjIwOjM1LjgzMTwveG1wOkNyZWF0ZURhdGU+PC9yZGY6RGVzY3JpcHRpb24+PHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9InV1aWQ6ZmFmNWJkZDUtYmEzZC0xMWRhLWFkMzEtZDMzZDc1MTgyZjFiIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iPjxkYzpjcmVhdG9yPjxyZGY6U2VxIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+PHJkZjpsaT5BbmRlcnMgQmVuZ3Rzc29uPC9yZGY6bGk+PC9yZGY6U2VxPg0KCQkJPC9kYzpjcmVhdG9yPjwvcmRmOkRlc2NyaXB0aW9uPjwvcmRmOlJERj48L3g6eG1wbWV0YT4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgPD94cGFja2V0IGVuZD0ndyc/Pv/bAEMABwUFBgUEBwYFBggHBwgKEQsKCQkKFQ8QDBEYFRoZGBUYFxseJyEbHSUdFxgiLiIlKCkrLCsaIC8zLyoyJyorKv/bAEMBBwgICgkKFAsLFCocGBwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKv/AABEIACcAPAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APFKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//9k=",
      //   },
      //   {
      //     src:
      //       "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4RD+RXhpZgAATU0AKgAAAAgABAE7AAIAAAARAAAISodpAAQAAAABAAAIXJydAAEAAAAiAAAQ1OocAAcAAAgMAAAAPgAAAAAc6gAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEFuZGVycyBCZW5ndHNzb24AAAAFkAMAAgAAABQAABCqkAQAAgAAABQAABC+kpEAAgAAAAM4MwAAkpIAAgAAAAM4MwAA6hwABwAACAwAAAieAAAAABzqAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAyMDowNDowNiAwOToyMDozNQAyMDIwOjA0OjA2IDA5OjIwOjM1AAAAQQBuAGQAZQByAHMAIABCAGUAbgBnAHQAcwBzAG8AbgAAAP/hCyNodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0n77u/JyBpZD0nVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkJz8+DQo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIj48cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPjxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSJ1dWlkOmZhZjViZGQ1LWJhM2QtMTFkYS1hZDMxLWQzM2Q3NTE4MmYxYiIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIi8+PHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9InV1aWQ6ZmFmNWJkZDUtYmEzZC0xMWRhLWFkMzEtZDMzZDc1MTgyZjFiIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPjx4bXA6Q3JlYXRlRGF0ZT4yMDIwLTA0LTA2VDA5OjIwOjM1LjgzMTwveG1wOkNyZWF0ZURhdGU+PC9yZGY6RGVzY3JpcHRpb24+PHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9InV1aWQ6ZmFmNWJkZDUtYmEzZC0xMWRhLWFkMzEtZDMzZDc1MTgyZjFiIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iPjxkYzpjcmVhdG9yPjxyZGY6U2VxIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+PHJkZjpsaT5BbmRlcnMgQmVuZ3Rzc29uPC9yZGY6bGk+PC9yZGY6U2VxPg0KCQkJPC9kYzpjcmVhdG9yPjwvcmRmOkRlc2NyaXB0aW9uPjwvcmRmOlJERj48L3g6eG1wbWV0YT4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgPD94cGFja2V0IGVuZD0ndyc/Pv/bAEMABwUFBgUEBwYFBggHBwgKEQsKCQkKFQ8QDBEYFRoZGBUYFxseJyEbHSUdFxgiLiIlKCkrLCsaIC8zLyoyJyorKv/bAEMBBwgICgkKFAsLFCocGBwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKv/AABEIACcAPAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APFKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//9k=",
      //   },
      // ];

      const item = {
        userName: self.loggedIn.userName,
        level: 1,
        status: "DONE",
        season: self.currentSeason,
        fileType: "image",
        sessionId: self.selectedSession.sessionId,
      };

      if (images.length === 0) {
        item.images = self.loggedIn.profileImage;
        self.api.insertItem(item);
        self.selectSession();
        self.refresh();
        return;
      }

      const publicIdArray = [];

      await self.uploadWithImage(images, (publicId) => {
        publicIdArray.push(publicId);
      });

      var refreshIntervalId = setInterval(() => {
        if (publicIdArray.length === images.length) {
          item.images = publicIdArray.join(";");
          self.api.insertItem(item);
          self.selectSession();
          self.refresh();
          clearInterval(refreshIntervalId);
        }
      }, 3000);
    },
    async uploadWithImage(images, onProcessed) {
      images.forEach((image, index) => {
        var formdata = new FormData();
        const file = image.src;
        formdata.append("file", file);
        formdata.append("cloud_name", "deolievif");
        formdata.append("upload_preset", "kv0do7lj");

        formdata.append("title", self.loggedIn.userName);
        formdata.append("tags", self.loggedIn.userName);

        const uploadUrl =
          "https://api.cloudinary.com/v1_1/deolievif/image/upload";

        var xhr = new XMLHttpRequest();
        xhr.open("POST", uploadUrl, true);

        xhr.onload = function () {
          // do something to response
          var myObj = JSON.parse(this.responseText);
          console.log(myObj);
          //level.setPublicId(myObj.public_id);
          console.log(this.responseText);
          console.log(self.items);

          onProcessed(myObj.public_id);
        };
        xhr.send(formdata);
      });
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

      xhr.onload = function () {
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
          fileType: isImage ? "image" : "video",
        };

        self.api.insertItem(item);

        self.refresh();
        //self.addItem(item);

        console.log(self.items);

        onProcessed(this.responseText);
      };
      xhr.send(formdata);
    },
  }));
export default LevelStore;
