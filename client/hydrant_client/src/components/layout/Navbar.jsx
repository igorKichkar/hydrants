import React, {useState, useEffect, Fragment} from 'react';
import {Link} from 'react-router-dom';

const Navbar = (props) => {

    return (
        <nav className="navbar navbar-expand-lg justify-content-end" style={{backgroundColor: "#e3f2fd"}}>
            <ul className="navbar-nav">
                    <Fragment>
                        <li className="nav-item active">
                            <Link className="btn btn-outline-primary navBtn" to='/list_hydrants'>Список гидрантов</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="btn btn-outline-primary navBtn" to='/add_hydrant'>Добавить гидрант</Link>
                        </li>
                    </Fragment>
            </ul>
        </nav>
    );
};

export default Navbar;
// <nav className="navbar" style={{backgroundColor: "#e3f2fd"}}>