import axios from "axios";

const gomelskaya = [
    // {title: "Брагинский", value: "Braginskij"},
    // {title: "Буда - Кошелёвский", value: "Buda_Koshelyovskij"},
    // {title: "Ветковский", value: "Vetkovskij"},
    {title: "Гомельский", value: "Gomelskij"},
    // {title: "Добрушский", value: "Dobrushskij"},
    // {title: "Ельский", value: "Elskij"},
    // {title: "Житковичский", value: "Zhitkovichskij"},
    // {title: "Жлобинский", value: "Zhlobinskij"},
    // {title: "Калинковичский", value: "Kalinkovichskij"},
    // {title: "Лельчицкий", value: "Lelchickij"},
    // {title: "Лоевский", value: "Loevskij"},
    // {title: "Мозырский", value: "Mozyrskij"},
    // {title: "Наровлянский", value: "Narovlyanskij"},
    // {title: "Октябрьский", value: "Oktyabrskij"},
    // {title: "Петриковский", value: "Petrikovskij"},
    // {title: "Речицкий", value: "Rechickij"},
    // {title: "Рогачёвский", value: "Rogachyovskij"},
    // {title: "Светлогорский", value: "Svetlogorskij"},
    // {title: "Хойникский", value: "Hojnikskij"},
    // {title: "Чечерский", value: "CHecherskij"},
]

const MyInput = ({loadingAfterFilter, setLoadingAfterFilter, listHydrants, setListHydrants, setLoading}) => {
    function onSubmit(e) {
        e.preventDefault();
        updateHydrants();
    }

    function updateHydrants() {
        setLoading(true);
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

    function download_exel_report() {
        setLoading(true);
        axios({
            url: 'http://localhost:8000/api/download/',
            method: 'GET',
            params: {
                    area: loadingAfterFilter.area,
                    locality: loadingAfterFilter.locality,
                    street: loadingAfterFilter.street,
                    belonging: loadingAfterFilter.belonging,
                    serviceable: loadingAfterFilter.serviceable,
                },
            responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'report.xlsx'); //or any other extension
            document.body.appendChild(link);
            link.click();
            setLoading(false);
        });
    }

    function selectValueForFilter(value, field) {
        setLoadingAfterFilter({...loadingAfterFilter, [field]: value});
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="inputFilter">
                    <p className="titleInputFilter">Район:</p>
                    <select className="form-control" defaultValue={loadingAfterFilter.area} name="select"
                            onChange={event => selectValueForFilter(event.target.value, 'area')
                            }>
                        <option value="">Не выбран</option>
                        {gomelskaya.map((area) =>
                            <option key={area.value} value={area.title}>{area.title}</option>
                        )}
                    </select>
                </div>
                <div className="inputFilter">
                    <p className="titleInputFilter">Населенный пункт:</p>
                    <input className="form-control" value={loadingAfterFilter.locality}
                           onChange={event => selectValueForFilter(event.target.value, 'locality')}/>
                </div>
                <div className="inputFilter">
                    <p className="titleInputFilter">Улица:</p>
                    <input className="form-control" value={loadingAfterFilter.street}
                           onChange={event => selectValueForFilter(event.target.value, 'street')}/>
                </div>
                <div className="inputFilter">
                    <p className="titleInputFilter">Принадлежность:</p>
                    <input className="form-control" value={loadingAfterFilter.belonging}
                           onChange={event => selectValueForFilter(event.target.value, 'belonging')}/>
                </div>
                <div className="inputFilter">
                    <p className="titleInputFilter">Исправность:</p>
                    <select className="form-control" defaultValue={loadingAfterFilter.serviceable} name="select"
                            onChange={event => selectValueForFilter(event.target.value, 'serviceable')}>
                        <option value="">Все</option>
                        <option value="true">Исправные</option>
                        <option value="false">Неисправные</option>
                    </select>
                </div>


                <div className="btn-group filterBtn" role="group" aria-label="Button group with nested dropdown">
                    <div className="btn-group" role="group">
                        <button id="btnGroupDrop1" type="button" className="btn btn-primary dropdown-toggle"
                                data-bs-toggle="dropdown" aria-expanded="false">
                            Фильтровать
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                            <li className="dropdown-item filterBtnItem" onClick={()=>{download_exel_report()}}>Получит excel отчет</li>
                            <li><input className="dropdown-item filterBtnItem" type="submit" value="Загрузить на страницу"/></li>
                        </ul>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default MyInput;
