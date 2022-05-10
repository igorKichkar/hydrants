import React from 'react';
import {useState, useEffect, useMemo} from "react";
import axios from "axios";
import sleep from "../utils/sleep";

const ListHydrants = () => {
    const [listHydrants, setListHydrants] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')

    const sortedHydrants = useMemo(() => {
        return listHydrants.filter(hydrant => {
            const fields = String(hydrant.number).toLowerCase() + ' ' + hydrant.address.toLowerCase()
            return fields
                .includes(searchQuery.toLowerCase())
        })
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
                        <th scope="col">Номер</th>
                        <th scope="col">Адресс</th>
                        <th scope="col">Тип водоснабжения</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedHydrants.map((hydrant) => <tr key={hydrant.id}>
                        <th>{hydrant.number}</th>
                        <td>{hydrant.address}</td>
                        <td>{hydrant.type_of_water_supply}</td>
                        <td>Редактировать</td>
                    </tr>)}
                    </tbody>
                </table>
            </>}

    </div>

};

export default ListHydrants;


// listHydrants.map((hydrant) => <tr key={hydrant.id}>
//                 <th>{hydrant.number}</th>
//                 <td>{hydrant.address}</td>
//                 <li>{hydrant.type_of_water_supply}</li>
//                 <li>{hydrant.serviceable}</li>
//                 <li>{hydrant.fault_type}</li>
//                 <li>{hydrant.coordinates_width}</li>
//                 <li>{hydrant.coordinates_height}</li>
//             </tr>)