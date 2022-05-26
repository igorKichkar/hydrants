import React from "react";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import sleep from "../utils/sleep";
import Pagination from "./UI/Pagination";
import MySelect from "./UI/MySelect";
import { sortHydrantsId, sortHydrantsType } from "../utils/sortHydrants";

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
            selectPagination={selectPagination}
            setSelectPagination={setSelectPagination}
            setPaginationPage={setPaginationPage}
            options={[
              { value: 10, name: "10" },
              { value: 25, name: "25" },
              { value: 2, name: "2" },
            ]}
            value={selectPagination}
          />
          <table className="table table-striped">
            <thead>
              <tr>
                <th
                  onClick={() => {
                    sortHydrantsId(
                      listHydrants,
                      setListHydrants,
                      setSortType,
                      sortType
                    );
                  }}
                  scope="col"
                  className="sortCursor"
                >
                  <div className="sort">
                    ID
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-sort-up"
                      viewBox="0 0 16 16"
                    >
                      {sortType.id === "none" ? (
                        <path d="M6 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                      ) : sortType.id === "down" ? (
                        <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
                      ) : (
                        <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
                      )}
                    </svg>
                  </div>
                </th>
                <th
                  onClick={() => {
                    sortHydrantsType(
                      listHydrants,
                      setListHydrants,
                      setSortType,
                      sortType
                    );
                  }}
                  scope="col"
                  className="sortCursor"
                >
                  <div className="sort">
                    Название
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-sort-up"
                      viewBox="0 0 16 16"
                    >
                      {sortType.type === "none" ? (
                        <path d="M6 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                      ) : sortType.type === "down" ? (
                        <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
                      ) : (
                        <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
                      )}
                    </svg>
                  </div>
                </th>
                <th
                  onClick={() => {
                    sortHydrantsId(
                      listHydrants,
                      setListHydrants,
                      setSortType,
                      sortType
                    );
                  }}
                  scope="col"
                  className="sortCursor"
                >
                  <div className="sort">
                    Адресс
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-sort-up"
                      viewBox="0 0 16 16"
                    >
                      {sortType.address === "none" ? (
                        <path d="M6 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                      ) : sortType.address === "down" ? (
                        <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
                      ) : (
                        <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
                      )}
                    </svg>
                  </div>
                </th>
                <th
                  onClick={() => {
                    sortHydrantsId(
                      listHydrants,
                      setListHydrants,
                      setSortType,
                      sortType
                    );
                  }}
                  scope="col"
                  className="sortCursor"
                >
                  <div className="sort">
                    Принадлежность
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-sort-up"
                      viewBox="0 0 16 16"
                    >
                      {sortType.belonging === "none" ? (
                        <path d="M6 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                      ) : sortType.belonging === "down" ? (
                        <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
                      ) : (
                        <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
                      )}
                    </svg>
                  </div>
                </th>
                <th
                  onClick={() => {
                    sortHydrantsId(
                      listHydrants,
                      setListHydrants,
                      setSortType,
                      sortType
                    );
                  }}
                  scope="col"
                  className="sortCursor"
                >
                  <div className="sort">
                    Характеристики
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-sort-up"
                      viewBox="0 0 16 16"
                    >
                      {sortType.characteristics === "none" ? (
                        <path d="M6 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                      ) : sortType.characteristics === "down" ? (
                        <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
                      ) : (
                        <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
                      )}
                    </svg>
                  </div>
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
