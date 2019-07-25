import { types, getRoot } from "mobx-state-tree";

function appendLeadingZeroes(n) {
  if (n <= 9) {
    return "0" + n;
  }
  return n;
}

const Season = types
  .model("Season", {
    id: types.string,
    season: types.integer,
    startDate: types.Date,
    endDate: types.Date,
    friendlyName: types.string
  })
  .views(self => ({
    get countDown() {
      const oneDay = 24 * 60 * 60 * 1000;
      return Math.round(
        Math.abs((new Date().getTime() - self.endDate.getTime()) / oneDay)
      );
    },
    get seasonInfoText() {
      if (self.isCurrentSeason) {
        return `${self.friendlyName} - ${self.countDown} dagar kvar`;
      }

      return `${self.friendlyName} - Ej aktiv`;
    },
    get isCurrentSeason() {
      const store = getRoot(self);
      return self.season === store.currentSeason;
    },
    get isViewedNow() {
      const store = getRoot(self);
      return self.season === store.viewSeason;
    },
    get startDateFriendly() {
      return (
        self.startDate.getFullYear() +
        "-" +
        appendLeadingZeroes(self.startDate.getMonth() + 1) +
        "-" +
        appendLeadingZeroes(self.startDate.getDate())
      );
    },
    get endDateFriendly() {
      return (
        self.endDate.getFullYear() +
        "-" +
        appendLeadingZeroes(self.endDate.getMonth() + 1) +
        "-" +
        appendLeadingZeroes(self.endDate.getDate())
      );
    }
  }));

export default Season;
