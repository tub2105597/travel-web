import React, { useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './destarticle.scss';
import Carousel from 'react-bootstrap/Carousel';
import { StarRating } from '../index';

const DestinationArticle = ({ destination }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const preLocation = useRef(location.pathname);
    useEffect(() => {
        preLocation.current = location.pathname;
    }, [location.pathname]);

    const handleClick = () => {
        let id = destination.id;
        navigate(`/destination/${id}`, { state: { preLocation: preLocation.current } });
    };
    return (
        <div className="destination-article-container">
            <div className="destination-article-info">
                <div className="destination-article-carousel">
                    <Carousel>
                        {destination.images && Array.isArray(destination.images) && destination.images.length > 0 && destination.images.map((item, index) => (
                            <Carousel.Item key={index}>
                                <div className="destination-article-image">
                                    <img src={item.link} alt="Destination" />
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
                <div className="destination-article-details">
                    <div className="destination-article-detail__item__title" onClick={handleClick}>{destination.name}</div>
                    <div className="destination-article-detail__item">
                        <span>Đánh giá:&nbsp;</span>
                        <StarRating rating={destination.destRate} colorChecked={'orange'} />
                    </div>
                    <div className="destination-article-detail__item">
                        <span>Địa chỉ:</span> {destination.location}
                    </div>
                    <div className="destination-article-detail__item">
                        <span>Giá vé:</span> {destination.price}
                    </div>
                    <div className="destination-article-detail__item">
                        <span>Ưu điểm: </span> {destination.advantage}
                    </div>
                    <div className="destination-article-detail__item">
                        <span>Khuyết điểm: </span> {destination.weakness}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default DestinationArticle;