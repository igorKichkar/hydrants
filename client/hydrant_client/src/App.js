import './App.css';
import {useEffect, useState, useMemo} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import axios from "axios";
import Navbar from "./components/layout/Navbar";
import ListHydrants from "./components/ListHydrants";
import UpdateHydrant from "./components/UpdateHydrant";
import AddHydrant from "./components/AddHydrant";
import HydrantsOnTheMap from "./components/HydrantsOnTheMap";

function App() {
    const [loadingAfterFilter, setLoadingAfterFilter] = useState({
        area: "",
        locality: "",
        street: "",
        belonging: "",
        serviceable: ""
    });
    const [loading, setLoading] = useState(true);
    const [listHydrants, setListHydrants] = useState([]);
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

    function loadHydrants() {
        (async () => {
            const config = {
                params: {
                    area: loadingAfterFilter.area,
                    locality: loadingAfterFilter.locality,
                    street: loadingAfterFilter.street,
                    belonging: loadingAfterFilter.belonging,
                    serviceable: loadingAfterFilter.serviceable,
                }
            }
            const response = await axios.get("hydrants/", config);
            if (response.status === 200) {
                setListHydrants(response.data);
            }
            setLoading(false);
        })();
    }

    useEffect(loadHydrants, []);

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
                hydrant.number_in_map;
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

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path='/list_hydrants' element={<ListHydrants
                        listHydrants={listHydrants}
                        setListHydrants={setListHydrants}
                        loading={loading}
                        setLoading={setLoading}
                        loadingAfterFilter={loadingAfterFilter}
                        setLoadingAfterFilter={setLoadingAfterFilter}
                        filterHydrants={filterHydrants}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        paginationPage={paginationPage}
                        setPaginationPage={setPaginationPage}
                        selectPagination={selectPagination}
                        setSelectPagination={setSelectPagination}
                        sortType={sortType}
                        setSortType={setSortType}

                    />}/>
                    <Route path='/update_hydrant/:type'
                           element={<UpdateHydrant loading={loading} setLoading={setLoading}
                                                   loadHydrants={loadHydrants}/>}/>
                    <Route path='/hydrants_on_the_map/:type' element={<HydrantsOnTheMap/>}/>
                    <Route path='/add_hydrant' element={<AddHydrant loading={loading} setLoading={setLoading}
                                                                    loadHydrants={loadHydrants}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
