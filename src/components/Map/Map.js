import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import axios from 'axios';


const Map = props => {
    const accessToken = useSelector(state => state.auth.token);
    const [technicians, setTechnicians] = useState([]);

    useEffect(async() => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/v1/users/technicians`, {
            headers: { 
                Authorization: `Bearer ${accessToken}` 
            }
        });
        let techniciansRaw = []
        if(response.status == 200) {
            techniciansRaw = response.data;
        }
        for(let technician of techniciansRaw) {
            const coords = await axios.get(`${process.env.REACT_APP_API_URL}/v1/coordinates`);
            technician.coordinates = {
                lat: coords.data[0],
                lng: coords.data[1]
            };
        }
        setTechnicians(techniciansRaw);
    }, [])

    const containerStyle = {
        width: '800px',
        height: '800px'
    };
      
    const center = {
        lat: 3.0738,
        lng: 101.5183
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <LoadScript googleMapsApiKey="AIzaSyBN5MoqYOqVjmxji7ZcV6aJhiTzcYfgpR0">
                <GoogleMap mapContainerStyle={containerStyle} 
                center={center} 
                zoom={10}>
                    {technicians.map(technician => {
                        return <Marker position={technician.coordinates} label={technician.name} />
                    })}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default Map;