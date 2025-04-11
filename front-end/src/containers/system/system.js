import React from "react";
import { useNavigate } from "react-router-dom";
import "./system.scss";
import { SystemSideBar } from "../../components"

const System = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        path ? navigate(`/system/${path}`) : navigate('/system');
    }

    const handleHideSidebar = () => {
    };

    return (
        <div className="system-container">
            <div className="system-aside">
                <SystemSideBar hideSideBar={handleHideSidebar} />
            </div>
            <div className="system-main">
                <div className="main-wrapper">
                    <div className="system-wrapper">
                        <div className="system-item" onClick={() => handleNavigate('users')}>
                            <div className="system-item system-icon">
                                <i className="fa-solid fa-users-gear" />
                            </div>
                            <div className="system-item system-function">
                                Quản lý người dùng
                            </div>
                        </div>
                        <div className="system-item" onClick={() => handleNavigate('détinations')}>
                            <div className="system-item system-icon">
                                <i className="fa-solid fa-location-dot" />
                            </div>
                            <div className="system-item system-function">
                                Quản lý điểm đến
                            </div>
                        </div>
                        <div className="system-item" onClick={() => handleNavigate('posts')}>
                            <div className="system-item system-icon">
                                <i className="fa-solid fa-comments" />
                            </div>
                            <div className="system-item system-function">
                                Quản lý bài đánh giá
                            </div>
                        </div>
                    </div>
                    <div className="system-wrapper">
                        <div className="system-item" onClick={() => handleNavigate('images')}>
                            <div className="system-item system-icon">
                                <i className="fa-solid fa-image" />
                            </div>
                            <div className="system-item system-function">
                                Quản lý hình ảnh
                            </div>
                        </div>
                        <div className="system-item" onClick={() => handleNavigate('favourites')}>
                            <div className="system-item system-icon">
                                <i className="fa-solid fa-heart" />
                            </div>
                            <div className="system-item system-function">
                                Quản lý điểm đến yêu thích
                            </div>
                        </div>
                        <div className="system-item" onClick={() => handleNavigate('districts')}>
                            <div className="system-item system-icon">
                                <i className="fa-solid fa-map-marker" />
                            </div>
                            <div className="system-item system-function">
                                Quản lý huyện
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default System;