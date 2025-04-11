'use client';

import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import './detailDestination.scss';
import { Carousel } from 'react-bootstrap';
import { AddPost, PostArticle, StarRating, RateChart } from '../../components';
import { destAPI, favouriteAPI } from "../../services";

const DetailDestination = (props) => {
    const [destination, setDestination] = useState({});
    const [posts, setPosts] = useState([]);
    const [rates, setRates] = useState([]);
    const [showSide, setShowSide] = useState(true);
    const navigate = useNavigate();
    const destID = useParams();
    const [isActive, setIsActive] = useState({
        overview: true,
        post: false,
        description: false
    });
    const [isReload, setIsReload] = useState(false);
    const location = useLocation();
    const [favourited, setFavourited] = useState();

    useEffect(() => {
        try {
            destAPI.getDestinationById(destID.id)
                .then((res) => {
                    setDestination(res.data.destination);
                    setPosts(res.data.posts);
                })
                .catch((e) => {
                    console.log(e);
                });

            destAPI.getRatesByDestination(destID.id)
                .then((res) => {
                    setRates(res.data);
                })
                .catch((e) => {
                    console.log(e);
                });
            favouriteAPI.getFavourites(props.user.id, destID.id)
                .then((res) => {
                    setFavourited(res.data && Object.keys(res.data).length > 0);

                })
                .catch((e) => {
                    console.log(e);
                });
        } catch (e) {
            console.log(e);
        }
    }, [destID.id]);

    useEffect(() => {
        favouriteAPI.getFavourites(props.user.id, destID.id)
            .then((res) => {
                setFavourited(res.data && Object.keys(res.data).length > 0);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [props.user.id, destID.id, favourited]);

    const handleActive = (type) => {
        setIsActive({
            overview: type === 'overview',
            post: type === 'post',
            description: type === 'description'
        });
    }

    const handleBack = () => {
        if (location.state && location.state.preLocation) {
            navigate(location.state.preLocation);
        }
    }

    const handleFavorite = () => {
        setFavourited(!favourited);

        if (!favourited) {
            favouriteAPI.createFavourite(props.user.id, destID.id)
                .then((res) => {
                    setFavourited(res.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        } else {
            favouriteAPI.deleteFavourite(props.user.id, destID.id)
                .then((res) => {
                    setFavourited(res.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }

    const handleReload = (reload) => {
        setIsReload(reload);
    };

    return (
        <div className="detail-destination-container">
            <div className={`destination-sidebar ${showSide ? '' : 'hidden'}`}>
                <div className={`side-main`}>
                    <div className="side-carousel">
                        <div className="destination-sidebar_navigator">
                            <button className="destination-sidebar_navigator-btn btn" onClick={handleBack}>
                                <i className="fa-solid fa-chevron-left" />
                            </button>
                        </div>
                        <div className="destination-sidebar-favourite">
                            <button className={`btn btn-favourite ${favourited ? 'active' : ''}`} onClick={handleFavorite}>
                                <i className="fas fa-heart" />
                            </button>
                        </div>
                        <Carousel>
                            {destination.images && Array.isArray(destination.images) && destination.images.length > 0 && destination.images.map((image, index) => (
                                <Carousel.Item key={index}>
                                    <img
                                        className="d-block w-100"
                                        src={image.link}
                                        alt={`Slide ${index}`}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                    <div className="side-info">
                        <div className="side-title">
                            {destination.name}
                        </div>
                        <div className="side-rating">
                            <span className="rating-number">{destination.rate} &nbsp;</span>
                            <StarRating rating={destination.rate} />
                        </div>
                    </div>
                    <div className="side-action">
                        <div className={`action-item action-overview ${isActive.overview ? 'action-item-active' : ''}`} onClick={() => handleActive('overview')}>
                            Tổng quan
                        </div>
                        <div className={`action-item action-post ${isActive.post ? 'action-item-active' : ''}`} onClick={() => handleActive('post')}>
                            Bài đánh giá
                        </div>
                        <div className={`action-item action-description ${isActive.description ? 'action-item-active' : ''}`} onClick={() => handleActive('description')}>
                            Giới thiệu
                        </div>
                    </div>
                    <div className="side-content">
                        {isActive.overview && (
                            <div className="content-overview">
                                {favourited && (
                                    <div className="content-item overview-favourite">
                                        <div className="overview-icon">
                                            <i className="fas fa-heart" />
                                        </div>
                                        <div className="favourite-content">
                                            Đã lưu vào danh sách điểm đến yêu thích
                                        </div>
                                    </div>
                                )}
                                <div className="content-item overview-location">
                                    <div className="overview-icon">
                                        <i className="fas fa-map-marker-alt" />
                                    </div>
                                    <div className="location-content">
                                        {destination.location}
                                    </div>
                                </div>
                                <div className="content-item overview-time">
                                    <div className="overview-icon">
                                        <i className="fas fa-clock" />
                                    </div>
                                    <div className="time-content">
                                        {destination.time}
                                    </div>
                                </div>
                                <div className=" content-item overview-price">
                                    <div className="overview-icon">
                                        <i className="fas fa-dollar-sign" />
                                    </div>
                                    <div className="price-content">
                                        {destination.price}
                                    </div>
                                </div>
                                <div className="content-item overview-advantage">
                                    <div className="overview-icon">
                                        <i className="fa-regular fa-thumbs-up" />
                                    </div>
                                    <div className="advantage-content">
                                        {destination.advantage}
                                    </div>
                                </div>
                                <div className="content-item overview-weakness">
                                    <div className="overview-icon">
                                        <i className="fa-regular fa-thumbs-down" />
                                    </div>
                                    <div className="weakness-content">
                                        {destination.weakness}
                                    </div>
                                </div>
                            </div>
                        )}
                        {isActive.post && (
                            <>
                                {props.user && props.user.role === 'user' && <AddPost onReload={handleReload} />}
                                <div className="rate-overview">
                                    <RateChart rates={rates} />
                                    <div className="rate-number">
                                        <div style={{ fontSize: '45px', fontWeight: 600 }}> {destination.rate}</div>
                                        <div style={{ fontSize: '15px', opacity: 0.8 }}> {rates.length} đánh giá</div>
                                    </div>
                                </div>
                                <div className="content-post">
                                    {posts && Array.isArray(posts) && posts.length > 0 && posts.map((post, index) => (
                                        <PostArticle post={post} key={index} user={post.user} />
                                    ))}
                                </div>
                            </>
                        )}
                        {isActive.description && (
                            <div className="content-description">
                                {destination.description}
                            </div>
                        )}
                    </div>
                </div>
                <div className={`side-hide`}>
                    <div className="hide-button" onClick={() => setShowSide(!showSide)}>
                        {showSide ? <i className="fas fa-chevron-left" /> : <i className="fas fa-chevron-right" />}
                    </div>
                </div>
            </div>
            <div className="destination-map">
                <div dangerouslySetInnerHTML={{ __html: destination.iframecode }} />
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user
    };
}

export default connect(mapStateToProps)(DetailDestination);