import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import * as userActions from "../../store/actions/userActions";
import './header.scss';
import logo from '../../assets/images/logo.png';
import { CustomButton, UserButton, Navigator, SearchBar } from "../../components";
import { toast } from 'react-toastify';

const Header = ({ isLoggedIn, user, userSignOutSuccess }) => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        userSignOutSuccess();
        toast.success('Sign out successfully!');
        navigate('/signin');
    };

    const handleViewProfile = () => {
        let username = user.username;
        navigate(`/${username}`, { state: { userid: user.id } });
    };

    return (
        <div className="header">
            <Link to='/' className="brand">
                <img src={logo} className="brand-logo" alt='logo' />
            </Link>
            {user && user.role === 'admin' ? <div className="system-name"> HỆ THỐNG QUẢN LÝ Website du lịch </div> :
                <>
                    <Navigator />
                    <SearchBar />
                </>
            }
            <div className="signin-box">
                {isLoggedIn ? (
                    <UserButton signOut={handleSignOut} viewProfile={handleViewProfile} user={user} />
                ) : (
                    <CustomButton destination={'/signin'} content={'Đăng nhập'} />
                )}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.user.isLoggedIn,
    user: state.user.user
});

const mapDispatchToProps = (dispatch) => ({
    userSignOutSuccess: () => dispatch(userActions.userSignOutSuccess())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
