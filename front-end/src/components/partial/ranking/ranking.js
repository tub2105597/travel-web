import React from "react";
import './ranking.scss';
import DefaultAvatar from '../../../assets/images/default-avt.jpg';

const Ranking = ({ users }) => {

    return (
        <div className="rank-container">
            <div className="rank-wrap">
                <div className="rank-title">BẢNG XẾP HẠNG</div>
                <hr />
                <div className="rank-list">
                    {users && Array.isArray(users) && users.map((user, index) => (
                        <div className="rank-item" key={index}>
                            <div className="rank-item__info">
                                <div className="rank-item__number">{index + 1}</div>
                                <div className="rank-item__avatar">
                                    <img src={user.avatar} alt="avatar" />
                                </div>
                                <div className="rank-item__name">{user.fullname}</div>
                            </div>
                            <div className="rank-item__points">
                                {user.postCount}&nbsp;
                                <i className="fa-solid fa-message" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
}

export default Ranking;