export default {
  async fetchUsers() {
    const data = await base("Users")
      .select({ view: "Grid view" })
      .all();

    return data;
  },
  async fetchLevels() {
    const data = await base("Levels")
      .select({ view: "Grid view" })
      .all();

    return data;
  },
  async fetchTrainings() {
    const data = await base("Trainings")
      .select({ view: "Grid view" })
      .all();

    return data;
  },
  async fetchStats() {
    const data = await base("Stat")
      .select({ view: "Grid view" })
      .all();

    return data;
  },
  async fetchPlayers() {
    const data = await base("Players")
      .select({ view: "Grid view" })
      .all();

    return data;
  },
  async fetchItems() {
    const data = await base("Items")
      .select({ view: "Grid view" })
      .all();

    return data;
  },
  insertLevel(level) {
    console.log("insert level");
    const u = {
      id: level.id,
      fields: level
    };
    this.create("Levels", u);
  },
  insertStat(stat) {
    console.log("insert stat");
    const u = {
      id: stat.id,
      fields: stat
    };

    this.create("Stat", u);
  },
  unLike(id) {
    this.delete(id);
  },
  delete(id) {
    base(table).destroy([id], function(err, deletedRecords) {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Deleted", deletedRecords.length, "records");
    });
  },

  create(table, item) {
    base(table).create([item], function(err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function(record) {
        console.log(record.getId());
      });
    });
  },
  updateStat(stat) {
    const url = `${config.url}/Stat/${stat.id}`;

    fetch(
      new Request(url, {
        method: "put",
        body: JSON.stringify({
          fields: {
            trainingId: stat.trainingId,
            player: stat.player,
            isTraining: stat.isTraining,
            level: stat.level
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
        shirtNumber: user.shirtNumber
      }
    };

    this.update("Users", u);
  },
  updatePlayer(player) {
    const u = {
      id: player.id,
      fields: {
        player: player.player,
        rating: player.rating
      }
    };
    this.update("Players", u);
  },
  update(table, item) {
    base(table).update([item], function(err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function(record) {
        console.log(record.get("name"));
      });
    });
  }
};
