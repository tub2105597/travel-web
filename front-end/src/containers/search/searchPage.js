import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import { StarRating, DestinationArticle, PostArticle } from '../../components';
import './searchPage.scss';
import { distAPI, postAPI, destAPI } from "../../services";
import { Dropdown } from "react-bootstrap";

const SearchPage = () => {
    const [districts, setDistricts] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [posts, setPosts] = useState([]);
    const [rateFilter, setRateFilter] = useState(0);
    const [districtFilter, setDistrictFilter] = useState(null);

    const [postPage, setPostPage] = useState(1);
    const [destPage, setDestPage] = useState(1);
    const location = useLocation();
    const navigate = useNavigate();

    // Get the search query and any existing filters from the URL
    const query = new URLSearchParams(location.search);
    const search = query.get('q');
    const currentRateFilter = query.get('rate');
    const currentDistrictFilter = query.get('distid');
    useEffect(() => {
        if (rateFilter !== currentRateFilter && rateFilter > 0) {
            const newQuery = new URLSearchParams(location.search);
            newQuery.set('rate', rateFilter);
            districtFilter && newQuery.set('distid', districtFilter);
            navigate(`${location.pathname}?${newQuery.toString()}`, { replace: true });
        }
    }, [rateFilter, districtFilter, navigate, location.pathname, currentRateFilter, currentDistrictFilter]);

    useEffect(() => {
        const filter = {
            search,
            rate: currentRateFilter ? currentRateFilter : null,
            distid: districtFilter ? districtFilter : null,
            order: 'createdAt',
            type: 'DESC',
            limit: 2 * postPage,
        };
        console.log('postFilter: ', filter);
        distAPI.getAllDistricts()
            .then(res => setDistricts(res.data))
            .catch(console.log);

        destAPI.getDestinationsByFilter(filter)
            .then(res => setDestinations(res.data))
            .catch(console.log);

        postAPI.getPostsByFilter(filter)
            .then(res => setPosts(res.data))
            .catch(console.log);

        console.log('posts: ', posts);
    }, [search, rateFilter, districtFilter, postPage, destPage]);



    const handleFilterByRate = (rate) => {
        setRateFilter(rate);
    }

    const handleFilterByDistrict = (distId) => () => {
        setDistrictFilter(distId);
    }



    return (
        <div className="search-container">
            <div className="search-title">
                <h1 style={{ fontWeight: 600 }}>Kết quả tìm kiếm: "{search}"</h1>
            </div>
            <div className="search-result-container">
                <div className="filter-container">
                    <div className="filter-main">
                        <div className="filter-option filter-rating">
                            <span className="filter-title">LỌC THEO ĐÁNH GIÁ</span>
                            <div className="filter-item rating-item">
                                <StarRating rating={rateFilter} colorChecked={'orange'} isEdit={true} handleRate={handleFilterByRate} />
                            </div>
                        </div>
                        <div className="filter-option filter-location">
                            <span className="filter-title">LỌC THEO VỊ TRÍ</span>
                            <div className="filter-item">
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ width: '100%' }}>
                                        Vị trí
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu style={{ width: '100%' }}>
                                        {districts.map((dist, index) => (
                                            <Dropdown.Item key={index} onClick={handleFilterByDistrict(dist.id)}>{dist.name}</Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                        <div className='filter-btn'>
                            <div className="reset-btn">Làm mới</div>
                        </div>
                    </div>
                </div>
                <div className="result-container">
                    <div className="result-main">
                        <div className="result-dest">
                            {destinations.length > 0 ?
                                <span className="result-title">ĐIỂM ĐẾN <i className="fas fa-chevron-right" /></span>
                                : <span className="result-title">KHÔNG CÓ ĐIỂM ĐẾN PHÙ HỢP</span>
                            }
                            {(destinations.map((dest, index) => (
                                <DestinationArticle key={index} destination={dest} />
                            )))}
                        </div>
                        <div className="result-post">
                            {posts && posts.length > 0 ?
                                <span className="result-title">BÀI ĐÁNH GIÁ <i className="fas fa-chevron-right" /></span>
                                : <span className="result-title">KHÔNG CÓ BÀI ĐÁNH GIÁ PHÙ HỢP</span>
                            }
                            {posts && posts.length > 0 && posts.map((post, index) => (
                                <PostArticle key={index} post={post} user={post.user} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SearchPage;