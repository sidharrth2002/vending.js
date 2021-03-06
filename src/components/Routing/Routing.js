import React, { useEffect } from 'react';
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
        <div>
            <img src={{}}
        </div>
    );
};

Routing.propTypes = {
    
};

export default Routing;