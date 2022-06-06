import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
import InputForAddHydrant from "./UI/InputForAddHydrant";


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
        })();
    }, []);
    console.log(hydrant);
    return (
        <div>
            <form>
                <div className="inputFilter">
                    <p className="titleInputFilter">Тип:</p>
                    <select className="form-control" defaultValue="hydrant" name="select"
                            onChange={event => console.log(event.target.value)}>
                        <option value="hydrant">Пожарный гидрант</option>
                    </select>
                </div>
                <InputForAddHydrant value={'v1'} title={'Номер'}/>
                <div className="inputFilter">
                    <p className="titleInputFilter">Район:</p>
                    <select className="form-control" defaultValue="hydrant" name="select"
                            onChange={event => console.log(event.target.value)}>
                        <option value="hydrant">Гомельский</option>
                    </select>
                </div>
                <InputForAddHydrant value={'v1'} title={'Сельский совет'}/>
                <InputForAddHydrant value={'v1'} title={'Населенный пункт'}/>
                <InputForAddHydrant value={'v1'} title={'Подробный адрес, принадлежность к подразделению'}/>
                <InputForAddHydrant value={'v1'} title={'Принадлежность'}/>
                <div className="inputFilter">
                    <p className="titleInputFilter">Исправность:</p>
                    <select className="form-control" defaultValue="true" name="select"
                            onChange={event => console.log(event.target.value)}>
                        <option value="true">Исправен</option>
                        <option value="false">Неисправен</option>
                    </select>
                </div>
                <InputForAddHydrant value={'v1'} title={'Описание неисправности'}/>
                <InputForAddHydrant value={'v1'} title={'Координаты ширина'}/>
                <InputForAddHydrant value={'v1'} title={'Координаты долгота'}/>
                <InputForAddHydrant value={'v1'} title={'Дата последней проверки'}/>
                <InputForAddHydrant value={'v1'} title={'Тип водоснабжения'}/>
                <InputForAddHydrant value={'v1'} title={'Диаметр трубопровода'}/>
                <InputForAddHydrant value={'v1'} title={'Расположение таблички'}/>
                <InputForAddHydrant value={'v1'} title={'Расстояние от таблички прямо'}/>
                <InputForAddHydrant value={'v1'} title={'Расстояние от таблички вправо'}/>
                <InputForAddHydrant value={'v1'} title={'Расстояние от таблички влево'}/>
                <InputForAddHydrant value={'v1'} title={'Примечание'}/>


                <div className="btn-group filterBtn" role="group" aria-label="Button group with nested dropdown">
                    <div className="btn-group" role="group">
                        <button id="btnGroupDrop1" type="button" className="btn btn-primary dropdown-toggle"
                                data-bs-toggle="dropdown" aria-expanded="false">
                            Фильтровать
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                            <li className="dropdown-item filterBtnItem">
                                Получить excel отчет
                            </li>
                            <li><input className="dropdown-item filterBtnItem" type="submit"
                                       value="Загрузить на страницу"/></li>
                        </ul>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddHydrant;