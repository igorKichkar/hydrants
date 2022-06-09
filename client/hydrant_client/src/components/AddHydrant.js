import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
import InputForAddHydrant from "./UI/InputForAddHydrant";
import TextAreaForAddHydrant from "./UI/TextAreaForAddHydrant";


const AddHydrant = () => {
    const location = useLocation();
    const {id} = location.state;
    const [hydrant, setHydrant] = useState({});
    useEffect(() => {
        (async () => {
            const response = await axios.get(`hydrants/${id}/`);
            if (response.status === 200) {
                setHydrant(response.data);
            }
            // setLoading(false);
        })()
    }, []);
    console.log(hydrant);

    function changeValue(field, value) {
        setHydrant({...hydrant, [field]: value});
    }

    return (
        <div>
            <form>
                <div className="inputFilter" style={{width: '20%'}}>
                    <p className="titleInputFilter">Тип:</p>
                    <select className="form-control" defaultValue="hydrant" name="select"
                            onChange={event => console.log(event.target.value)}>
                        <option value="Пожарный гидрант">Пожарный гидрант</option>
                    </select>
                </div>
                <InputForAddHydrant field={'number_in_map'} handler={changeValue} value={hydrant.number_in_map}
                                    title={'Номер'} style={{width: '20%'}}/>
                <div className="inputFilter" style={{clear: 'both', width: '20%'}}>
                    <p className="titleInputFilter">Район:</p>
                    <select className="form-control" defaultValue="hydrant" name="select"
                            onChange={event => console.log(event.target.value)}>
                        <option value="hydrant">Гомельский</option>
                    </select>
                </div>
                <InputForAddHydrant value={'v1'} title={'Сельский совет'} type={'text'} style={{width: '20%'}}/>
                <InputForAddHydrant value={'v1'} title={'Населенный пункт'} style={{width: '20%'}}/>
                <TextAreaForAddHydrant value={'v1'} title={'Подробный адрес, принадлежность к подразделению'}
                                       style={{width: '35%'}}/>
                <InputForAddHydrant value={'v1'} title={'Принадлежность'} style={{width: '20%'}}/>
                <div className="inputFilter" style={{width: '20%'}}>
                    <p className="titleInputFilter">Исправность:</p>
                    <select className="form-control" defaultValue="true" name="select"
                            onChange={event => changeValue('serviceable' ,event.target.value)}>
                        <option value="true">Исправен</option>
                        <option value="false">Неисправен</option>
                    </select>
                </div>
                <TextAreaForAddHydrant value={'v1'} title={'Описание неисправности'} style={{width: '20%'}}/>
                <InputForAddHydrant value={'v1'} title={'Координаты ширина'} style={{clear: 'both', width: '20%'}}/>
                <InputForAddHydrant value={'v1'} title={'Координаты долгота'} style={{width: '20%'}}/>
                <InputForAddHydrant value={'v1'} title={'Дата последней проверки'} style={{width: '20%'}}/>
                <InputForAddHydrant value={'v1'} title={'Тип водоснабжения'} style={{clear: 'both', width: '20%'}}/>
                <InputForAddHydrant value={'v1'} title={'Диаметр трубопровода'} style={{width: '20%'}}/>
                <InputForAddHydrant value={'v1'} title={'Расположение таблички'} style={{clear: 'both', width: '20%'}}/>
                <InputForAddHydrant value={'v1'} title={'Расстояние от таблички прямо'} style={{width: '20%'}}/>
                <InputForAddHydrant value={'v1'} title={'Расстояние от таблички вправо'} style={{width: '20%'}}/>
                <InputForAddHydrant value={'v1'} title={'Расстояние от таблички влево'} style={{width: '20%'}}/>
                <TextAreaForAddHydrant value={'v1'} title={'Примечание'} style={{width: '41%'}}/>


                <div className="inputFilter" style={{clear: 'both'}}>
                    <input className="dropdown-item filterBtnItem" type="submit"
                           value="Сохранить"/>
                </div>
            </form>
        </div>
    );
};

export default AddHydrant;