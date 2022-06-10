import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
import InputForAddHydrant from "./UI/InputForAddHydrant";
import TextAreaForAddHydrant from "./UI/TextAreaForAddHydrant";
import Loader from "./UI/Loader/Loader";

const UpdateHydrant = ({loading, setLoading, loadHydrants}) => {
    const location = useLocation();
    const {id} = location.state;
    const [hydrant, setHydrant] = useState({});

    function loadHydrant() {
        (async () => {
            setLoading(true);
            const response = await axios.get(`hydrants/${id}/`);
            if (response.status === 200) {
                setHydrant(response.data);
            }
            setLoading(false);
        })()
    }

    useEffect(loadHydrant, []);

    function changeValue(field, value) {
        setHydrant({...hydrant, [field]: value});
    }

    function updateHydrant() {
        setLoading(true);
        (async () => {
            const params = {
                address_detail: hydrant.address_detail,
                address_district: hydrant.address_district,
                address_region: hydrant.address_region,
                address_town: hydrant.address_town,
                address_village_council: hydrant.address_village_council,
                author: 1,
                belonging: hydrant.belonging,
                coordinate_height: hydrant.coordinate_height,
                coordinate_width: hydrant.coordinate_width,
                date_last_check: hydrant.date_last_check,
                date_update: hydrant.date_update,
                description: hydrant.description,
                diameter_drain: hydrant.diameter_drain,
                distance_front: hydrant.distance_front,
                distance_left: hydrant.distance_left,
                distance_right: hydrant.distance_right,
                fault_type: hydrant.fault_type,
                note: hydrant.note,
                number_in_map: hydrant.number_in_map,
                place_plate: hydrant.place_plate,
                serviceable: hydrant.serviceable,
                type: hydrant.type,
                type_of_water_supply: hydrant.type_of_water_supply,
                serial_number: hydrant.serial_number
            }
            const response = await axios.put(`hydrants/${id}/`, params);
            if (response.status === 200) {
                loadHydrant();
                loadHydrants();
            }
            setLoading(false);
        })();
    }

    function onSubmit(e) {
        e.preventDefault();
        updateHydrant();
    }
console.log(hydrant.serviceable)
    return (
        <div>
            {loading ?
                <Loader/>
                : (
                    <form onSubmit={onSubmit}>
                        <div className="inputFilter" style={{width: '20%'}}>
                            <p className="titleInputFilter">Тип:</p>
                            <select className="form-control" defaultValue="hydrant" name="select"
                                    onChange={event => changeValue("type", event.target.value)}>
                                <option value="Пожарный гидрант">Пожарный гидрант</option>
                            </select>
                        </div>
                        <InputForAddHydrant field={'number_in_map'} handler={changeValue} value={hydrant.number_in_map}
                                            title={'Номер'} style={{width: '20%'}}/>
                        <div className="inputFilter" style={{clear: 'both', width: '20%'}}>
                            <p className="titleInputFilter">Район:</p>
                            <select className="form-control" defaultValue="hydrant" name="select"
                                    onChange={event => changeValue("address_region", event.target.value)}>
                                <option value="Гомельский">Гомельский</option>
                            </select>
                        </div>
                        <InputForAddHydrant field={'address_village_council'} handler={changeValue}
                                            value={hydrant.address_village_council}
                                            title={'Сельский совет'} style={{width: '20%'}}/>
                        <InputForAddHydrant field={'address_town'}
                                            handler={changeValue}
                                            value={hydrant.address_town}
                                            title={'Населенный пункт'} style={{width: '20%'}}/>
                        <TextAreaForAddHydrant field={'address_detail'} handler={changeValue}
                                               value={hydrant.address_detail}
                                               title={'Подробный адрес, принадлежность к подразделению'}
                                               style={{width: '35%'}}/>
                        <InputForAddHydrant field={'belonging'} handler={changeValue} value={hydrant.belonging}
                                            title={'Принадлежность'} style={{width: '20%'}}/>
                        <div className="inputFilter" style={{width: '20%'}}>
                            <p className="titleInputFilter">Исправность:</p>
                            <select className="form-control" defaultValue={hydrant.serviceable ? "true" : "false"}
                                    name="select"
                                    onChange={event => changeValue('serviceable', event.target.value==="true")}>
                                <option value="true">Исправен</option>
                                <option value="false">Неисправен</option>
                            </select>
                        </div>
                        <TextAreaForAddHydrant field={'fault_type'} handler={changeValue} value={hydrant.fault_type}
                                               title={'Описание неисправности'} style={{width: '20%'}}/>
                        <InputForAddHydrant field={'coordinate_width'} handler={changeValue}
                                            value={hydrant.coordinate_width}
                                            title={'Координаты ширина'} style={{clear: 'both', width: '20%'}}/>
                        <InputForAddHydrant field={'coordinate_height'} handler={changeValue}
                                            value={hydrant.coordinate_height}
                                            title={'Координаты долгота'} style={{width: '20%'}}/>
                        <InputForAddHydrant field={'date_last_check'} handler={changeValue}
                                            value={hydrant.date_last_check}
                                            title={'Дата последней проверки'} style={{width: '20%'}}/>
                        <InputForAddHydrant field={'type_of_water_supply'} handler={changeValue}
                                            value={hydrant.type_of_water_supply} title={'Тип водоснабжения'}
                                            style={{clear: 'both', width: '20%'}}/>
                        <InputForAddHydrant field={'diameter_drain'} handler={changeValue}
                                            value={hydrant.diameter_drain}
                                            title={'Диаметр трубопровода'} style={{width: '20%'}}/>
                        <InputForAddHydrant field={'place_plate'} handler={changeValue} value={hydrant.place_plate}
                                            title={'Расположение таблички'} style={{clear: 'both', width: '20%'}}/>
                        <InputForAddHydrant field={'distance_front'} handler={changeValue}
                                            value={hydrant.distance_front}
                                            title={'Расстояние от таблички прямо'} style={{width: '20%'}}/>
                        <InputForAddHydrant field={'distance_right'} handler={changeValue}
                                            value={hydrant.distance_right}
                                            title={'Расстояние от таблички вправо'} style={{width: '20%'}}/>
                        <InputForAddHydrant field={'distance_left'} handler={changeValue} value={hydrant.distance_left}
                                            title={'Расстояние от таблички влево'} style={{width: '20%'}}/>
                        <TextAreaForAddHydrant field={'note'} handler={changeValue} value={hydrant.note}
                                               title={'Примечание'}
                                               style={{width: '41%'}}/>

                        <div className="inputFilter" style={{clear: 'both'}}>
                            <input className="btn btn-primary" style={{marginTop: "10px"}} type="submit"
                                   value="Сохранить"/>
                        </div>
                    </form>)}
        </div>
    );
};

export default UpdateHydrant;