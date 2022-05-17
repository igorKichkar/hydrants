import React from 'react';
import {useState, useEffect, useMemo} from "react";
import axios from "axios";
import sleep from "../utils/sleep";

const ListHydrants = () => {
    const [listHydrants, setListHydrants] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')

    const filterHydrants = useMemo(() => {
        // return listHydrants.filter(hydrant => {
        //     const fields = String(hydrant.serial_number).toLowerCase() + ' ' +
        //         hydrant.address_detail.toLowerCase() + ' '
        //
        //     return fields
        //         .includes(searchQuery.toLowerCase())
        //
        // })
        const result = listHydrants.filter(hydrant => {
            return String(hydrant.type).toLowerCase().includes(searchQuery.toLowerCase())

        })
        return result

    }, [listHydrants, searchQuery])

    useEffect(() => {
        (async () => {
            const response = await axios.get('hydrants/');
            if (response.status === 200) {
                setListHydrants(response.data);
            }
            sleep(1000)
            setLoading(false)
        })();
    }, []);

    return <div>
        {loading
            ? <p>Loading...</p>
            : <>
                <input
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Название</th>
                        <th scope="col">Адресс</th>
                        <th scope="col">Принадлежность</th>
                        <th scope="col">Характеристики</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {filterHydrants.map((hydrant) => <tr key={hydrant.id}>
                        <th>{hydrant.id}</th>
                        <td>{hydrant.type}</td>
                        <td>
                            <p>{hydrant.coordinate_width} {hydrant.coordinate_height}</p>
                            <p>
                                {hydrant.address_region}{' '}
                                {hydrant.address_district}{' '}
                                {hydrant.address_district}{' '}
                                {hydrant.address_village_council}{' '}
                                {hydrant.address_town}{' '}
                                {hydrant.address_detail}
                            </p>
                        </td>
                        <td>{hydrant.belonging}</td>
                        <td>
                            <p>Испраность: {hydrant.serviceable ? 'Да' : 'Нет'}</p>
                            <p>Номер: {hydrant.serial_number}</p>
                            <p>Тип сети: {hydrant.type_of_water_supply}</p>
                            <p>Диаметр: {hydrant.diameter_drain}</p>
                            {hydrant.description && <p>Описание: {hydrant.note}</p>}
                        </td>
                        <td>Редактировать</td>
                    </tr>)}
                    </tbody>
                </table>
            </>}

    </div>

};

export default ListHydrants;
