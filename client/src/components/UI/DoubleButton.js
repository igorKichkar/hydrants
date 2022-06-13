import React from 'react';
import {Link} from "react-router-dom";

const DoubleButton = ({path1, path2, state1, state2, titleLink1, titleLink2}) => {
    return (
        <div className="btn-group" role="group">
            <button id="btnGroupDrop1" type="button"
                    className="btn btn-primary dropdown-toggle"
                    data-bs-toggle="dropdown" aria-expanded="false">
            </button>
            <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                <li className="dropdown-item filterBtnItem">
                    <Link className="nav-link"
                          to={path1}
                          state={state1}>{titleLink1}</Link>
                </li>
                <li className="dropdown-item filterBtnItem">
                    <Link className="nav-link"
                          to={path2}
                          state={state2}>{titleLink2}</Link>
                </li>
            </ul>
        </div>
    );
};

export default DoubleButton;