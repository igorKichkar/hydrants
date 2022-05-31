import axios from "axios";

const gomelskaya = [
    {title: "Брагинский", value: "Braginskij"},
    {title: "Буда - Кошелёвский", value: "Buda_Koshelyovskij"},
    {title: "Ветковский", value: "Vetkovskij"},
    {title: "Гомель", value: "Gomel"},
    {title: "Гомельский", value: "Gomelskij"},
    {title: "Добрушский", value: "Dobrushskij"},
    {title: "Ельский", value: "Elskij"},
    {title: "Житковичский", value: "Zhitkovichskij"},
    {title: "Жлобинский", value: "Zhlobinskij"},
    {title: "Калинковичский", value: "Kalinkovichskij"},
    {title: "Лельчицкий", value: "Lelchickij"},
    {title: "Лоевский", value: "Loevskij"},
    {title: "Мозырский", value: "Mozyrskij"},
    {title: "Наровлянский", value: "Narovlyanskij"},
    {title: "Октябрьский", value: "Oktyabrskij"},
    {title: "Петриковский", value: "Petrikovskij"},
    {title: "Речицкий", value: "Rechickij"},
    {title: "Рогачёвский", value: "Rogachyovskij"},
    {title: "Светлогорский", value: "Svetlogorskij"},
    {title: "Хойникский", value: "Hojnikskij"},
    {title: "Чечерский", value: "CHecherskij"},
]

const MyInput = ({loadingAfterFilter, setLoadingAfterFilter, listHydrants, setListHydrants, setLoading}) => {
    function onSubmit(e) {
        e.preventDefault();
        updateHydrants();
    }

    function updateHydrants() {
        setLoading(true);
        (async () => {
            const response = await axios.get("hydrants/", {params: {answer: 102}});
            if (response.status === 200) {
                setListHydrants(response.data);
            }
            setLoading(false);
        })();
    }

    function selectRegion(value) {
        setLoadingAfterFilter({...loadingAfterFilter, region: value})
    }


    return (
        // <div>
        //     <label htmlFor="region">Область:</label>
        //     <input list="regions" id="region" onChange={e => selectRegion(e.target.value)}/>
        //     <datalist id="regions">
        //         <option>Брестская</option>
        //         <option>Витебская</option>
        //         <option>Гомельская</option>
        //         <option>Гродненская</option>
        //         <option>Могилевскя</option>
        //         <option>Минская</option>
        //     </datalist>
        //
        //     <label htmlFor="area">Район:</label>
        //     <input list="areas" id="area" disabled={!loadingAfterFilter.region}/>
        //     <datalist id="areas">
        //         {selectArea().map((item, index) =>
        //             <option key={index}>{item}</option>
        //         )}
        //     </datalist>
        //
        //     <label htmlFor="locality">Населенный пункт:</label>
        //     <input id="locality"/>
        //
        //     <label htmlFor="street">Улица:</label>
        //     <input id="street"/>
        //
        //     <button onClick={() => {
        //         updateHydrants()
        //     }}>Фильтровать
        //     </button>
        //
        // </div>
        <div>
            <form onSubmit={onSubmit}>
                <div className="inputFilter">
                    <p>Район</p>
                    <select defaultValue="" name="select">
                        <option value=""></option>
                        {gomelskaya.map((area) =>
                            <option key={area.value} value={area.value}>{area.title}</option>
                        )}
                    </select>
                </div>
                <div className="inputFilter">
                    <p>Населенный пункт</p>
                    <input/>
                </div>
                <div className="inputFilter">
                    <p>Улица</p>
                    <input/>
                </div>
                <div className="inputFilter">
                    <p>Принадлежность</p>
                    <input/>
                </div>
                <div className="inputFilter">
                    <p>Исправность</p>
                    <select defaultValue="all" name="select">
                        <option value="all">Все</option>
                        <option value="serviceable">Исправные</option>
                        <option value="faulty">Неисправные</option>
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
