import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.scss';
import Introductrion from '../introduction/introduction';
import { DestinationCard, CustomButton, Ranking, PostArticle } from '../../components/index';
import { destAPI, postAPI, userAPI } from '../../services';

const HomePage = () => {
    const [destinations, setDestinations] = useState([]);
    const [usersRank, setUsersRank] = useState([]);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        destAPI.getDestinationsForHome()
            .then(res => {
                setDestinations(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        postAPI.getPostsForHome()
            .then(res => {
                setPosts(res.data);
            })
            .catch(err => {
                console.log(err);
            });

        userAPI.getUsersRanking()
            .then(res => {
                setUsersRank(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);


    return (
        <div className='container'>
            <Introductrion />
            <div className='main'>
                <div className='popular-subtitle'>ĐIA ĐIỂM DU LỊCH</div>
                <div className='popular-title'>ĐIỂM ĐẾN NỔI BẬT TRONG TUẦN</div>
                <div className='popular-wrap'>
                    {destinations && Array.isArray(destinations) && destinations.map((destination, index) => {
                        return (
                            <DestinationCard key={index} image={destination.images[0].link} rate={destination.destRate} district={destination.districts.name} destination={destination.name} destid={destination.id} />
                        )
                    })}
                </div>
            </div>
            <div className='container'>
                <div className='posts-subtitle'>BÀI ĐÁNH GIÁ</div>
                <div className='posts-title'>ĐÁNH GIÁ MỚI NHẤT</div>
                <div className='posts-main'>
                    <div className='posts'>
                        {posts && Array.isArray(posts) && posts.map((post, index) => {
                            return (
                                <PostArticle key={index} post={post} user={post.user} />
                            )
                        })}
                    </div>
                    <div className='aside'>
                        <Ranking users={usersRank} />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default HomePage;