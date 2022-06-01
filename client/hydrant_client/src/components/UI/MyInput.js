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

    function selectArea(value) {
        setLoadingAfterFilter({...loadingAfterFilter, area: value});
    }

    function selectLocality(value) {
        setLoadingAfterFilter({...loadingAfterFilter, locality: value});
    }

    function selectStreet(value) {
        setLoadingAfterFilter({...loadingAfterFilter, street: value});
    }

    function selectBelonging(value) {
        setLoadingAfterFilter({...loadingAfterFilter, belonging: value});
    }

    function selectServiceable(value) {
        setLoadingAfterFilter({...loadingAfterFilter, serviceable: value});
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="inputFilter">
                    <p>Район</p>
                    <select defaultValue={loadingAfterFilter.area} name="select"
                            onChange={event => selectArea(event.target.value)
                            }>
                        <option value="">Не выбран</option>
                        {gomelskaya.map((area) =>
                            <option key={area.value} value={area.title}>{area.title}</option>
                        )}
                    </select>
                </div>
                <div className="inputFilter">
                    <p>Населенный пункт</p>
                    <input value={loadingAfterFilter.locality} onChange={event => selectLocality(event.target.value)}/>
                </div>
                <div className="inputFilter">
                    <p>Улица</p>
                    <input value={loadingAfterFilter.street} onChange={event => selectStreet(event.target.value)}/>
                </div>
                <div className="inputFilter">
                    <p>Принадлежность</p>
                    <input value={loadingAfterFilter.belonging}
                           onChange={event => selectBelonging(event.target.value)}/>
                </div>
                <div className="inputFilter">
                    <p>Исправность</p>
                    <select defaultValue={loadingAfterFilter.serviceable} name="select"
                            onChange={event => selectServiceable(event.target.value)}>
                        <option value="">Все</option>
                        <option value="true">Исправные</option>
                        <option value="false">Неисправные</option>
                    </select>
                </div>
                <br/>
                <br/>
                <input type="submit" value="Получит excel отчет"/>
                <input type="submit" value="Загрузить на страницу"/>
            </form>
        </div>
    );
};

export default MyInput;
