import React from "react";
import './destCard.scss';
import { StarRating } from '../index';
import { useNavigate } from "react-router-dom";

const DestinationCard = ({ image, rate, district, destination, destid }) => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/destination/${destid}`);
    }
    return (
        <div className="card-container"
            style={{ backgroundImage: `url(${image})` }}
            onClick={handleNavigate}
        >
            <span className="rate-box">
                <StarRating rating={rate} colorChecked={'white'} />
            </span>
            <div className="card-info">
                <div className="card-subtitle">{district}</div>
                <div className="card-title">{destination}</div>
            </div>
        </div>
    );
}

export default DestinationCard;