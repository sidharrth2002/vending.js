import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Routing = props => {
    const user = useSelector(state => state.auth.user)
    const [imageURL, setURL] = useState('')

    useEffect(() => {
        console.log(user)
        axios.post(`${process.env.REACT_APP_API_URL}/v1/map/getroute/${user.id}`, {
            latitude: 2.9213,
            longitude: 101.6559
        })
        .then(response => {
            if(response.status == 200) {
                console.log(response.data);
                setURL(response.data);
            }
        })
    }, [])

    return (
        <div style={{textAlign: 'center'}}>
            <h1>Take this route if you want to be smart!</h1>
            <h3>Future versions will be interactive</h3>
            <img style={{maxWidth: '400px', textAlign: 'center'}} src={imageURL} /> 
        </div>
    );
};

Routing.propTypes = {
    
};

export default Routing;