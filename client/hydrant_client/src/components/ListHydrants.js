import React from "react";
import Pagination from "./UI/Pagination";
import MySelect from "./UI/MySelect";
import {sortHydrants} from "../utils/sortHydrants";
import SortButton from "./UI/SortButton";
import MyInput from "./UI/MyInput";
import Loader from "./UI/Loader/Loader";
import DoubleButton from "./UI/DoubleButton";

const ListHydrants = ({
                          listHydrants,
                          setListHydrants,
                          loading,
                          setLoading,
                          loadingAfterFilter,
                          setLoadingAfterFilter,
                          filterHydrants,
                          searchQuery,
                          setSearchQuery,
                          paginationPage,
                          setPaginationPage,
                          selectPagination,
                          setSelectPagination,
                          sortType,
                          setSortType,
                      }) => {

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

    return (
        <div className="mainBlockListHydrants">
            {loading ? (
                <Loader/>
            ) : (<>
                    <MyInput loadingAfterFilter={loadingAfterFilter}
                             setLoadingAfterFilter={setLoadingAfterFilter}
                             setListHydrants={setListHydrants}
                             setLoading={setLoading}/>
                    {listHydrants.length > 0 ? (<>
                        <div className="tableParams">
                            <input
                                placeholder="Поиск..."
                                className="form-control search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <div style={!filterHydrants.length > 0 ? {display: "none"} : {}}>
                                <MySelect
                                    setSelectPagination={setSelectPagination}
                                    setPaginationPage={setPaginationPage}
                                    options={[
                                        {value: 10, name: "10"},
                                        {value: 25, name: "25"},
                                        {value: 2, name: "2"},
                                    ]}
                                /></div>
                        </div>
                        <table className="table table-striped table-bordered"
                               style={!filterHydrants.length > 0 ? {display: "none"} : {}}>
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
                                            'number_in_map'
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
                                            Ширина {hydrant.coordinate_width} Долгота {hydrant.coordinate_height}
                                        </p>
                                        <p>
                                            {hydrant.address_region} {hydrant.address_district}{" "}
                                            {hydrant.address_village_council} {hydrant.address_town}{" "}
                                            {hydrant.address_detail}
                                        </p>
                                    </td>
                                    <td>{hydrant.belonging}</td>
                                    <td>
                                        <p>{hydrant.serviceable ? (<span className="serviceable">Исправен</span>) : (
                                            <span className="noServiceable">Неисправен</span>)}</p>
                                        <p>Номер: {hydrant.number_in_map}</p>
                                        <p>Тип сети: {hydrant.type_of_water_supply}</p>
                                        <p>Диаметр: {hydrant.diameter_drain}</p>
                                        {hydrant.description && (<p>Описание: {hydrant.description}</p>)}
                                    </td>
                                    <td>
                                        <DoubleButton path1={`/hydrants_on_the_map/${hydrant.number_in_map}`}
                                                      path2={`/add_hydrant/${hydrant.id}`}
                                                      state1={{
                                                          from: {
                                                              width: hydrant.coordinate_width,
                                                              height: hydrant.coordinate_height
                                                          },
                                                      }}
                                                      state2={{
                                                          id: hydrant.id
                                                      }}
                                                      titleLink1={"Показать на крте"}
                                                      titleLink2={"Редактировать"}
                                        />
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div style={!filterHydrants.length > 0 ? {display: "none"} : {}}>
                            <Pagination
                                paginationPage={paginationPage}
                                pages={Math.ceil(filterHydrants.length / selectPagination)}
                                changePage={setPaginationPage}
                            />
                        </div>
                        <h3 className="notFound" style={!filterHydrants.length <= 0 ? {display: "none"} : {
                            clear: "both",
                            marginTop: "100px"
                        }}>Ничего не найдено.</h3>
                    </>) : <h3 className="notFound">Ничего не найдено.</h3>}
                </>
            )}
        </div>
    );
};

export default ListHydrants;
