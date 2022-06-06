import React from 'react';
import {useLocation} from "react-router-dom";
import {MapContainer, TileLayer, Marker} from 'react-leaflet'

const HydrantsOnTheMap = () => {
    const location = useLocation();
    const {from} = location.state;
    const position = [from.width, from.height];
    return (
        <MapContainer center={[from.width, from.height]} zoom={16} scrollWheelZoom={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
            </Marker>
        </MapContainer>
    );
};

export default HydrantsOnTheMap;