import React, {useState, useEffect, Fragment} from 'react';
import {Link} from 'react-router-dom';

const Navbar = (props) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-end">
            <ul className="navbar-nav">
                    <Fragment>
                        <li className="nav-item active">
                            <Link className="nav-link" to='/list_hydrants'>Список гидрантов</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to='/add_hydrant'>Добавить гидрант</Link>
                        </li>
                    </Fragment>
            </ul>
        </nav>
    );
};

export default Navbar;