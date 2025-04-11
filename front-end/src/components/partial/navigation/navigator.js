import React from 'react';
import { NavLink } from 'react-router-dom';

import './navigator.scss';

class Navigator extends React.Component {
    render() {
        return (
            <>
                <div className="NavBar">
                    <div className='navbar-item'>
                        <NavLink to='/home' className={({ isActive }) => (isActive ? 'active' : '')}>Trang chủ</NavLink>
                    </div>
                    < div className='navbar-item'>
                        <NavLink to='/destination' className={({ isActive }) => (isActive ? 'active' : '')}>Điểm đến</NavLink>
                    </div>
                </div>
            </>
        );
    }
}

export default Navigator;