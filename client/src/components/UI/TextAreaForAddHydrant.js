import React from 'react';

const TextAreaForAddHydrant = ({handler, field, value, title, style, required}) => {
    return (
       <div className="inputFilter" style={style}>
            <p className="titleInputFilter">{title}:</p>
            <textarea required={required ?? false} className="form-control" value={value ?? ""}
                   onChange={event => handler(field, event.target.value)}/>
        </div>
    );
};

export default TextAreaForAddHydrant;
