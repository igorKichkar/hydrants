import React from 'react';

const TextAreaForAddHydrant = ({handler, value, title, style}) => {
    return (
       <div className="inputFilter" style={style}>
            <p className="titleInputFilter">{title}:</p>
            <textarea className="form-control" value={value}
                   onChange={event => console.log(event.target.value)}/>
        </div>
    );
};

export default TextAreaForAddHydrant;
