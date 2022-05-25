import React from 'react';

const MySelect = ({selectPagination, setSelectPagination, setPaginationPage, options, defaultValue}) => {
    function changePaginationAmount(value) {
        setSelectPagination(+value)
        setPaginationPage(0)
    }

    return (
        <select defaultValue="" onChange={event => changePaginationAmount(event.target.value)} className="form-select"
                aria-label="Default select example">
            <option disabled value="">Кол-во записей</option>
            {options.map(option =>
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>)}
        </select>
    );
};

export default MySelect;