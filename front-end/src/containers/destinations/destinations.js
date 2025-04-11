import React, { useState, useEffect } from 'react';
import './destination.scss';
import { useLocation } from 'react-router-dom';
import { DistrictNavBar, DistrictCard, DestinationArticle } from '../../components';
import { destAPI, distAPI } from '../../services';

const Destinations = (props) => {
    const [destinations, setDestinations] = useState([]);
    const location = useLocation();
    const selectedDistrict = location.search.split('=')[1];

    useEffect(() => {
        try {
            destAPI.getAllDestinations()
                .then((res) => {
                    setDestinations(res.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        } catch (e) {
            console.log(e);
        }
    }, []);

    useEffect(() => {
        if (selectedDistrict) {
            destAPI.getDestinationsByDistrict(selectedDistrict)
                .then((res) => {
                    setDestinations(res.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }, [selectedDistrict]);

    return (
        <div className="destination-container">
            <DistrictNavBar />
            <div className="destination-main">
                {Array.isArray(destinations) && destinations.length > 0 && (
                    destinations.map((dest) => (
                        <DestinationArticle key={dest.id} destination={dest} />
                    ))
                )}
            </div>
        </div>
    );
}

export default Destinations;