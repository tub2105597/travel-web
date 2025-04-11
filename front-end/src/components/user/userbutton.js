import React from "react";
import './userbutton.scss';
import { connect } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const UserButton = ({ user, signOut, viewProfile }) => {
    const handleSignOut = () => {
        signOut();
    }

    const handleViewProfile = () => {
        viewProfile();
    }

    return (
        <div className="user-button">
            <div className="user-button__avt">
                <img src={user.avatar} alt="User Avatar" />
            </div>
            <DropdownButton id="dropdown-basic-button" title={user.fullname}>
                {user.role === 'user' && <Dropdown.Item onClick={handleViewProfile}>Hồ sơ của tôi</Dropdown.Item>}
                <Dropdown.Item onClick={handleSignOut}>Đăng xuất</Dropdown.Item>
            </DropdownButton>
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.user.user,
});

export default connect(mapStateToProps)(UserButton);