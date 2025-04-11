import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./systemSideBar.scss";

const SystemSideBar = ({ hideSideBar }) => {
    const [showSidebar, setShowSidebar] = useState(true);
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        path ? navigate(`/system/${path}`) : navigate('/system');
    };

    const handleHideSideBar = () => {
        setShowSidebar(!showSidebar);
        hideSideBar();  // Trigger parent to adjust layout width
    };

    return (
        <div className={`sidebar ${showSidebar ? '' : 'hidden'}`}>
            <div className="system-sidebar-container">
                <div className="system-sidebar">
                    <div className="system-sidebar-item" onClick={() => handleNavigate()}>
                        <i className="fa-solid fa-home" />
                        <span>Hệ thống</span>
                    </div>
                    <div className="system-sidebar-item" onClick={() => handleNavigate('users')}>
                        <i className="fa-solid fa-users-gear" />
                        <span>Quản lý người dùng</span>
                    </div>
                    <div className="system-sidebar-item" onClick={() => handleNavigate('destinations')}>
                        <i className="fa-solid fa-location-dot" />
                        <span>Quản lý điểm đến</span>
                    </div>
                    <div className="system-sidebar-item" onClick={() => handleNavigate('posts')}>
                        <i className="fa-solid fa-comments" />
                        <span>Quản lý bài đánh giá</span>
                    </div>
                    <div className="system-sidebar-item" onClick={() => handleNavigate('images')}>
                        <i className="fa-solid fa-image" />
                        <span>Quản lý hình ảnh</span>
                    </div>
                    <div className="system-sidebar-item" onClick={() => handleNavigate('favourites')}>
                        <i className="fa-solid fa-heart" />
                        <span>Quản lý điểm đến yêu thích</span>
                    </div>
                    <div className="system-sidebar-item" onClick={() => handleNavigate('districts')}>
                        <i className="fa-solid fa-map-marker" />
                        <span>Quản lý điểm huyện</span>
                    </div>
                </div>
            </div>
            <button className="system-sidebar-btn" onClick={handleHideSideBar}>
                <div className="system-sidebar-hide-btn-icon">
                    <i className={`fa-solid ${showSidebar ? 'fa-chevron-left' : 'fa-chevron-right'}`} />
                </div>
            </button>
        </div>
    );
};

export default SystemSideBar;
