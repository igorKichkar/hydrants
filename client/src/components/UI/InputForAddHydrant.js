import React from 'react';

const InputForAddHydrant = ({handler, field, value, title, style, required}) => {
    return (
        <div className="inputFilter" style={style}>
            <p className="titleInputFilter">{title}:</p>
            <input required={required ?? false} className="form-control" value={value ?? ""}
                    onChange={event => handler(field, event.target.value)}
            />
        </div>
    );
};

export default InputForAddHydrant;