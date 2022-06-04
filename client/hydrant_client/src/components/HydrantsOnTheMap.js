import React from 'react';
import {useLocation} from "react-router-dom";
import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import {MapContainer, TileLayer, useMap, Marker, Popup} from 'react-leaflet'


const HydrantsOnTheMap = () => {
    const location = useLocation();
    const {from} = location.state;
    const navigate = useNavigate();
    const position = [ from.width, from.height]
    console.log(from);
    return (
        <MapContainer center={[from.width, from.height]} zoom={16} scrollWheelZoom={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br/> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default HydrantsOnTheMap;