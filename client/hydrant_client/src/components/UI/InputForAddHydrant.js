import React from 'react';

const InputForAddHydrant = ({handler, value, title}) => {
    return (
        <div className="inputFilter">
            <p className="titleInputFilter">{title}:</p>
            <input className="form-control" value={value}
                   onChange={event => console.log(event.target.value)}/>
        </div>
    );
};

export default InputForAddHydrant;