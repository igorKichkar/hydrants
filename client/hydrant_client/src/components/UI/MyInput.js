import React from 'react';
import {useEffect} from "react";
import axios from "axios";

const MyInput = ({loadingAfterFilter, setLoadingAfterFilter, listHydrants, setListHydrants, setLoading}) => {

    function selectRegion(value) {
        setLoadingAfterFilter({...loadingAfterFilter, region: value})
    }

    function updateHydrants() {
        setLoading(true);
        (async () => {
            const response = await axios.get("hydrants/", { params: { answer: 102 } });
            if (response.status === 200) {
                setListHydrants(response.data);
            }
            setLoading(false);
        })();
    }


    function selectArea() {
        const Gomelskaja = [
            'Лоевский',
            'Речицкий',
            'Кормянский',
            'Наровлянский',
            'Гомельский',
            'Брагинский'
        ]
        if (loadingAfterFilter.region === 'Гомельская') {
            return Gomelskaja
        }
        return []
    }

    return (
        <div>


                <label htmlFor="region">Область:</label>
                <input list="regions" id="region" onChange={e => selectRegion(e.target.value)}/>
                <datalist id="regions">
                    <option>Брестская</option>
                    <option>Витебская</option>
                    <option>Гомельская</option>
                    <option>Гродненская</option>
                    <option>Могилевскя</option>
                    <option>Минская</option>
                </datalist>

                <label htmlFor="area">Район:</label>
                <input list="areas" id="area" disabled={!loadingAfterFilter.region}/>
                <datalist id="areas">
                    {selectArea().map((item, index) =>
                        <option key={index}>{item}</option>
                    )}
                </datalist>

                <label htmlFor="locality">Населенный пункт:</label>
                <input id="locality"/>

                <label htmlFor="street">Улица:</label>
                <input id="street"/>

                <button onClick={()=> {updateHydrants()}}>Фильтровать</button>

        </div>
    );
};

export default MyInput;
