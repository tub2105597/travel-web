import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router-dom";
import './signin.scss';
import { userAPI } from "../../../services/index";
import * as userActions from "../../../store/actions/userActions";
import Avatar from '../../../assets/images/signin-user-image.png';
import { toast } from "react-toastify";
import { GoogleLogin } from '@react-oauth/google';


const SignIn = ({ isLoggedIn, userSignInSuccess, userRole }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [errCode, setErrCode] = useState('');
    const [errMessage, setErrMessage] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setUsername(location.state.username);
            setPassword(location.state.password);
        }
    }, [location.state]);

    useEffect(() => {
        if (isLoggedIn && userRole === 'user') {
            navigate('/home', { state: { username } });
        } else if (isLoggedIn && userRole === 'admin') {
            navigate('/system');
        }
    }, [isLoggedIn, navigate, userRole, username]);

    const handleSignIn = () => {
        if (!username || !password) {
            setErrCode(!username ? 'ERR_F3' : 'ERR_F4');
            setErrMessage(!username ? 'User not found. Please try again' : 'Password is incorrect. Please try again');
            toast.error(errMessage);
            return;
        }

        // Reset error message
        setErrCode('');
        setErrMessage('');

        // Call API
        userAPI.signin(username, password)
            .then(res => {
                if (res.data.errCode) {
                    setUsername('');
                    setPassword('');
                    setErrCode(res.data.errCode);
                    setErrMessage(res.data.message);
                    toast.error(res.data.message);
                } else {
                    userSignInSuccess(res.data.user);
                    toast.success('Sign in successfully');
                }
            })
            .catch(err => {

                setErrCode('ERR_F0');
                setErrMessage('An error occurred. Please try again');
                toast.error(errMessage);
            });
    };

    const handleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };

    const handleLoginGoogle = (credentialResponse) => {
        userAPI.loginGoogle(credentialResponse)
            .then(res => {
                toast.success('Sign in successfully');
                console.log(res.data);
                userSignInSuccess(res.data);
            })
            .catch(err => {
                toast.error('An error occurred. Please try again');
            });
    }


    return (
        <div className="signin">
            <div className="signin-container">
                <form className="signin-form" method="post">
                    <span className="signin-form-title">ĐĂNG NHẬP</span>
                    <div className={`wrap-input ${errCode ? 'input-error' : ''}`}>
                        <input type="text" name="username" placeholder="Tên đăng nhập"
                            className="input input-username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            autoComplete="username"
                        />
                    </div>
                    <div className={`wrap-input ${errCode ? 'input-error' : ''}`}>
                        <input className="input" name="pass" placeholder="Mật khẩu"
                            type={isShowPassword ? 'password' : 'text'}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            autoComplete="current-password"
                        />
                        <span onClick={handleShowPassword}>
                            <i className={`fa-solid fa-eye${isShowPassword ? '' : '-slash'}`}></i>
                        </span>
                    </div>
                    <div className="container-signin-form-btn">
                        <button className="signin-form-btn" type="button" onClick={handleSignIn} disabled={isDisabled}>
                            {isDisabled && (<i className="fa-solid fa-circle-notch fa-spin" />)}
                            &nbsp;Đăng nhập
                        </button>
                    </div>
                    <div id='txt1'>
                        <span>Quên&nbsp;</span>
                        <Link to='/password' className="txt2">mật khẩu?</Link>
                    </div>
                </form>
                <div className="signin-right">
                    <div className='signin-image'>
                        <img src={Avatar} alt='Default Avatar' />
                    </div>
                    <div className="signin-google">
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                handleLoginGoogle(credentialResponse);
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    </div>
                    <div id='txt2'>
                        <Link to="/signup">Tạo tài khoản mới</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isLoggedIn: state.user.isLoggedIn,
    userRole: state.user.user.role
});

const mapDispatchToProps = (dispatch) => ({
    userSignInSuccess: (userData) => dispatch(userActions.userSignInSuccess(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
