import React from "react";
import {useState, useEffect, useMemo} from "react";
import axios from "axios";
import sleep from "../utils/sleep";
import Pagination from "./UI/Pagination";
import MySelect from "./UI/MySelect";
import {sortHydrants} from "../utils/sortHydrants";
import SortButton from "./UI/SortButton";

const ListHydrants = () => {
    const [listHydrants, setListHydrants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [paginationPage, setPaginationPage] = useState(0);
    const [selectPagination, setSelectPagination] = useState(10);
    const [sortType, setSortType] = useState({
        id: "none",
        type: "none",
        address: "none",
        belonging: "none",
        characteristics: "none",
    });

    const filterHydrants = useMemo(() => {
        const result = listHydrants.filter((hydrant) => {
            const all_field =
                String(hydrant.type) +
                hydrant.address_region +
                hydrant.address_district +
                hydrant.address_village_council +
                hydrant.address_town +
                hydrant.address_detail +
                hydrant.belonging +
                hydrant.serial_number;
            // если поисковой запрос не пустой, то запрос разбивается на массив отдельных слов
            // и производится поиск каждого стова отдельно во всех нужных полях,
            // поля объеденены в переменной all_field
            if (searchQuery) {
                const searchWords = searchQuery.split(" ");
                for (let i = 0; i < searchWords.length; i++) {
                    if (
                        searchWords[i] &&
                        !all_field.toLowerCase().includes(searchWords[i].toLowerCase())
                    ) {
                        return false;
                    }
                }
            }
            return true;
        });
        // при вводе в поле поиска сбрасывается пагинация на первую страницу
        setPaginationPage(0);
        return result;
    }, [listHydrants, searchQuery]);

    function pagination(page) {
        // данная функция отбирает порцию записей для конкретной страницы пагинации
        // page - страница на которой находится пользователь
        // selectPagination - колличество отбражаемых записей на странице
        let paginationList = [];
        if (page === 0) {
            for (
                let i = page;
                i < page + selectPagination && i < filterHydrants.length;
                i++
            ) {
                paginationList.push(filterHydrants[i]);
            }
        } else {
            for (
                let i = page * selectPagination;
                i < page * selectPagination + selectPagination &&
                i < filterHydrants.length;
                i++
            ) {
                paginationList.push(filterHydrants[i]);
            }

        }
        return paginationList;
    }

    useEffect(() => {
        (async () => {
            const response = await axios.get("hydrants/");
            if (response.status === 200) {
                setListHydrants(response.data);
            }
            //   sleep(1000);
            setLoading(false);
        })();
    }, []);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Pagination
                        paginationPage={paginationPage}
                        pages={Math.ceil(filterHydrants.length / selectPagination)}
                        changePage={setPaginationPage}
                    />
                    <MySelect
                        setSelectPagination={setSelectPagination}
                        setPaginationPage={setPaginationPage}
                        options={[
                            {value: 10, name: "10"},
                            {value: 25, name: "25"},
                            {value: 2, name: "2"},
                        ]}
                    />
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th
                                onClick={() => {
                                    sortHydrants(
                                        listHydrants,
                                        setListHydrants,
                                        setSortType,
                                        sortType,
                                        'id',
                                        'id'
                                    );
                                }}
                                scope="col"
                                className="sortCursor idField"
                            >
                                <SortButton sortType={sortType.id} field={'ID'}/>
                            </th>

                            <th
                                onClick={() => {
                                    sortHydrants(
                                        listHydrants,
                                        setListHydrants,
                                        setSortType,
                                        sortType,
                                        'type',
                                        'type'
                                    );
                                }}
                                scope="col"
                                className="sortCursor typeField"
                            >
                                <SortButton sortType={sortType.type} field={'Название'}/>
                            </th>

                            <th
                                onClick={() => {
                                    sortHydrants(
                                        listHydrants,
                                        setListHydrants,
                                        setSortType,
                                        sortType,
                                        'address',
                                        'address_detail'
                                    );
                                }}
                                scope="col"
                                className="sortCursor addressField"
                            >
                                <SortButton sortType={sortType.address} field={'Адресс'}/>
                            </th>

                            <th
                                onClick={() => {
                                    sortHydrants(
                                        listHydrants,
                                        setListHydrants,
                                        setSortType,
                                        sortType,
                                        'belonging',
                                        'belonging'
                                    );
                                }}
                                scope="col"
                                className="sortCursor belongingField"
                            >
                                <SortButton sortType={sortType.belonging} field={'Принадлежность'}/>
                            </th>
                            <th
                                onClick={() => {
                                    sortHydrants(
                                        listHydrants,
                                        setListHydrants,
                                        setSortType,
                                        sortType,
                                        'characteristics',
                                        'serial_number'
                                    );
                                }}
                                scope="col"
                                className="sortCursor characteristicsField"
                            >
                                <SortButton sortType={sortType.characteristics} field={'Характеристики'}/>
                            </th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {pagination(paginationPage).map((hydrant) => (
                            <tr key={hydrant.id}>
                                <th>{hydrant.id}</th>
                                <td>{hydrant.type}</td>
                                <td>
                                    <p>
                                        {hydrant.coordinate_width} {hydrant.coordinate_height}
                                    </p>
                                    <p>
                                        {hydrant.address_region} {hydrant.address_district}{" "}
                                        {hydrant.address_village_council} {hydrant.address_town}{" "}
                                        {hydrant.address_detail}
                                    </p>
                                </td>
                                <td>{hydrant.belonging}</td>
                                <td>
                                    <p>Испраность: {hydrant.serviceable ? "Да" : "Нет"}</p>
                                    <p>Номер: {hydrant.serial_number}</p>
                                    <p>Тип сети: {hydrant.type_of_water_supply}</p>
                                    <p>Диаметр: {hydrant.diameter_drain}</p>
                                    {hydrant.description && <p>Описание: {hydrant.note}</p>}
                                </td>
                                <td>Редактировать</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default ListHydrants;
