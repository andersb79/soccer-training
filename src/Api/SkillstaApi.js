const config = {
  base: "appC7N77wl4iVEXGD",
  table: "Levels",
  view: "Grid%20view",
  apiKey: "keyHQ5GM7ktar7YtG",
  maxRecords: 1000,
  url: "https://api.airtable.com/v0/appC7N77wl4iVEXGD"
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

    const url = `${config.url}/${conf.table}?${includeFields}maxRecords=${
      conf.maxRecords
    }&view=${conf.view}${filterByFromula}`;

    return new Request(url, {
      method: "get",
      headers: new Headers({
        Authorization: `Bearer ${conf.apiKey}`
      })
    });
  },
  async response(conf) {
    var resp = await fetch(this.generalRequest(conf)).catch(err => {
      console.log(err);
    });
    if (resp.status >= 200 && resp.status < 300) {
      var json = await resp.json();
      return json.records;
    }
  },
  async getUsers() {
    return this.response({ table: "Users" });
  },
  updateUser(user) {
    const url = `${config.url}/Users/${user.id}`;

    fetch(
      new Request(url, {
        method: "put",
        body: JSON.stringify({
          fields: {
            name: user.name,
            userName: user.userName,
            password: user.password,
            profileImage: user.profileImage,
            favoriteTeam: user.favoriteTeam,
            playerTeam: user.playerTeam,
            position: user.position,
            shirtNumber: user.shirtNumber
          }
        }),
        headers: new Headers({
          Authorization: `Bearer ${config.apiKey}`,
          "Content-Type": "application/json"
        })
      })
    ).catch(err => {
      alert(err);
    });
  },
  async fetchSeasons() {
    return this.response({
      table: "Seasons"
    });
  },
  async fetchLevels(season = 0) {
    return this.response({
      table: "Levels",
      filterByFromula: `&filterByFormula=season%3D${season}`
    });
  },
  async fetchItems(season = 0) {
    return this.response({
      table: "Items",
      filterByFromula: `&filterByFormula=season%3D${season}`
    });
  },
  insertItem(item) {
    fetch(
      new Request(`${config.url}/Items`, {
        method: "post",
        body: JSON.stringify({
          fields: item
        }),
        headers: new Headers({
          Authorization: `Bearer ${config.apiKey}`,
          "Content-Type": "application/json"
        })
      })
    ).catch(err => {
      console.log(err);
    });
  }
};
