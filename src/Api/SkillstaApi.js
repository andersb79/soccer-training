import Airtable from "airtable";

const base = new Airtable({ apiKey: "keyHQ5GM7ktar7YtG" }).base(
  "appC7N77wl4iVEXGD"
);

const config = {
  base: "appC7N77wl4iVEXGD",
  table: "Levels",
  view: "Grid%20view",
  apiKey: "keyHQ5GM7ktar7YtG",
  maxRecords: 1000,
  url: "https://api.airtable.com/v0/appC7N77wl4iVEXGD",
};

export default {
  generalRequest({ maxRecords, table, view, filterByFromula, fields }) {
    const conf = Object.assign({}, config);
    if (maxRecords) {
      conf.maxRecords = maxRecords;
    }
    if (view) {
      conf.view = view;
    }
    if (table) {
      conf.table = table;
    }

    let includeFields = "";
    if (fields) {
      includeFields = `${fields}&`;
    }

    if (!filterByFromula) {
      filterByFromula = "";
    }

    const url = `${config.url}/${conf.table}?${includeFields}maxRecords=${conf.maxRecords}&view=${conf.view}${filterByFromula}`;

    return new Request(url, {
      method: "get",
      headers: new Headers({
        Authorization: `Bearer ${conf.apiKey}`,
      }),
    });
  },
  async response(conf) {
    var resp = await fetch(this.generalRequest(conf)).catch((err) => {
      console.log(err);
    });
    if (resp.status >= 200 && resp.status < 300) {
      var json = await resp.json();
      return json.records;
    }
  },
  updatePlayer(player) {
    const u = {
      id: player.id,
      fields: {
        idNumber: player.idNumber,
        name: player.name,
        image: player.pasimagesword,
        active: player.active,
        rating: player.rating,
      },
    };

    this.update("AmericanoPlayers", u);
  },
  async getUsers() {
    return this.response({ table: "Users" });
  },
  updateUser(user) {
    console.log(user.JSON);
    const u = {
      id: user.id,
      fields: {
        name: user.name,
        userName: user.userName,
        password: user.password,
        profileImage: user.profileImage,
        favoriteTeam: user.favoriteTeam,
        playerTeam: user.playerTeam,
        position: user.position,
        shirtNumber: user.shirtNumber,
        lastFetch: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      },
    };

    this.update("Users", u);
  },
  async fetchSeasons() {
    const data = await base("Seasons").select({ view: "Grid view" }).all();

    return data;
  },
  async fetchLevels(season = 0) {
    return this.response({
      table: "Levels",
      filterByFromula: `&filterByFormula=season%3D${season}`,
    });
  },
  async fetchItems(season = 0) {
    return this.response({
      table: "Items",
      filterByFromula: `&filterByFormula=season%3D${season}`,
    });
  },
  async fetchLikes() {
    const data = await base("Likes").select({ view: "Grid view" }).all();

    return data;
  },
  async fetchPlayers() {
    const data = await base("AmericanoPlayers")
      .select({ view: "Grid view" })
      .all();

    return data;
  },
  async fetchSessions() {
    const data = await base("Sessions").select({ view: "Grid view" }).all();

    return data;
  },
  async fetchSessionItems() {
    const data = await base("SessionItems").select({ view: "Grid view" }).all();

    return data;
  },
  insertItem(item) {
    fetch(
      new Request(`${config.url}/Items`, {
        method: "post",
        body: JSON.stringify({
          fields: item,
        }),
        headers: new Headers({
          Authorization: `Bearer ${config.apiKey}`,
          "Content-Type": "application/json",
        }),
      })
    ).catch((err) => {
      console.log(err);
    });
  },
  updateItem(item) {
    const url = `${config.url}/Items/${item.id}`;

    fetch(
      new Request(url, {
        method: "put",
        body: JSON.stringify({
          fields: {
            userName: item.userName,
            publicId: item.publicId,
            level: item.level,
            status: item.status,
            sharedPath: item.sharedPath,
            comment: item.comment,
            season: item.season,
            fileType: item.fileType,
            posterPath: item.posterPath,
          },
        }),
        headers: new Headers({
          Authorization: `Bearer ${config.apiKey}`,
          "Content-Type": "application/json",
        }),
      })
    ).catch((err) => {
      alert(err);
    });
  },
  async fetchUsers() {
    const data = await base("Users").select({ view: "Grid view" }).all();

    return data;
  },
  like(itemId, userName) {
    const u = {
      fields: {
        userName,
        itemId,
      },
    };

    this.create("Likes", u);
  },
  unLike(id) {
    this.delete("Likes", id);
  },
  delete(table, id) {
    base(table).destroy([id], function (err, deletedRecords) {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Deleted", deletedRecords.length, "records");
    });
  },
  create(table, item) {
    base(table).create([item], function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        console.log(record.getId());
      });
    });
  },
  update(table, item) {
    base(table).update([item], function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        console.log(record.get("name"));
      });
    });
  },
};
