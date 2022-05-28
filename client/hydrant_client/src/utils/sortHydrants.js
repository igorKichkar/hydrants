function sortHydrants(listHydrants, setListHydrants, setSortType, sortType, fieldSort, fieldKey) {
    let conditionSort = "";
    if (sortType[fieldSort] === "none" || sortType[fieldSort] === "up") {
        const sortedListHydrants = listHydrants.sort(function (a, b) {
            let [value_1, value_2] = [a[fieldKey], b[fieldKey]]
            if (!(isNaN(value_1) && isNaN(value_2))) {
                [value_1, value_2] = [Number(value_1), Number(value_2)]
            }
            if (value_1 < value_2) {
                return 1;
            }
            if (value_1 > value_2) {
                return -1;
            }
            return 0;
        });
        setListHydrants([...sortedListHydrants]);
        conditionSort = "down";
    } else {
        const sortedListHydrants = listHydrants.sort(function (a, b) {
            let [value_1, value_2] = [a[fieldKey], b[fieldKey]]
            if (!(isNaN(value_1) && isNaN(value_2))) {
                [value_1, value_2] = [Number(value_1), Number(value_2)]
            }
            if (value_1 > value_2) {
                return 1;
            }
            if (value_1 < value_2) {
                return -1;
            }
            return 0;
        });
        conditionSort = "up";
        setListHydrants([...sortedListHydrants]);
    }
    if (fieldKey === 'id') {
        setSortType({
            id: conditionSort,
            type: "none",
            address: "none",
            belonging: "none",
            characteristics: "none",
        });
    } else if (fieldKey === 'type') {
        setSortType({
            type: conditionSort,
            id: "none",
            address: "none",
            belonging: "none",
            characteristics: "none",
        });
    } else if (fieldKey === 'address_detail') {
        setSortType({
            address: conditionSort,
            type: "none",
            id: "none",
            belonging: "none",
            characteristics: "none",
        });
    } else if (fieldKey === 'belonging') {
        setSortType({
            belonging: conditionSort,
            address: "none",
            type: "none",
            id: "none",
            characteristics: "none",
        });
    } else if (fieldKey === 'serial_number') {
        setSortType({
            belonging: "none",
            address: "none",
            type: "none",
            id: "none",
            characteristics: conditionSort,
        });
    }
}

export {sortHydrants};
