function sortHydrantsId(listHydrants, setListHydrants, setSortType, sortType) {
  let conditionSort = "";
  if (sortType.id === "none" || sortType.id === "up") {
    const sortedListHydrants = listHydrants.sort(function (a, b) {
      if (a.id < b.id) {
        return 1;
      }
      if (a.id > b.id) {
        return -1;
      }
      return 0;
    });

    setListHydrants([...sortedListHydrants]);
    conditionSort = "down";
  } else {
    const sortedListHydrants = listHydrants.sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      return 0;
    });
    conditionSort = "up";
    setListHydrants([...sortedListHydrants]);
    setSortType({ ...sortType, id: "up" });
  }
  setSortType({
    id: conditionSort,
    type: "none",
    address: "none",
    belonging: "none",
    characteristics: "none",
  });
}

function sortHydrantsType(
  listHydrants,
  setListHydrants,
  setSortType,
  sortType
) {
  let conditionSort = "";
  if (sortType.type === "none" || sortType.type === "up") {
    const sortedListHydrants = listHydrants.sort(function (a, b) {
      if (a.id < b.id) {
        return 1;
      }
      if (a.id > b.id) {
        return -1;
      }
      return 0;
    });
    setListHydrants([...sortedListHydrants]);
    conditionSort = "down";
  } else {
    const sortedListHydrants = listHydrants.sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      return 0;
    });
    setListHydrants([...sortedListHydrants]);
    conditionSort = "up";
  }
  setSortType({
    type: conditionSort,
    id: "none",
    address: "none",
    belonging: "none",
    characteristics: "none",
  });
}

export { sortHydrantsId, sortHydrantsType };
