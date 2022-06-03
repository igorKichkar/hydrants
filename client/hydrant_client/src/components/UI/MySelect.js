import React from 'react';

const MySelect = ({setSelectPagination, setPaginationPage, options}) => {
    function changePaginationAmount(value) {
        setSelectPagination(+value)
        setPaginationPage(0)
    }

    return (
        <select className="form-control selectAmountPages" defaultValue="" onChange={event => changePaginationAmount(event.target.value)}
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