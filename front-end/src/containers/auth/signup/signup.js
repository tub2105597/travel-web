import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import './signup.scss';
import { toast } from 'react-toastify';
import { userAPI } from "../../../services/index";
import * as userActions from "../../../store/actions/userActions";
import * as MainUtils from '../../../utils/main';
const SignUp = (props) => {
    const [state, setState] = useState({
        fullname: '',
        email: '',
        username: '',
        password: '',
        isShowPassword: true,
        confirmPassword: '',
        isShowConfirmPassword: true,
        agree: false,
        errCode: '',
        errMessage: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (props.isSignedUp) {
            navigate('/signin', {
                state: {
                    username: state.username,
                    password: state.password,
                    isSignedUp: props.isSignedUp
                }
            });
        }
    }, [props.isSignedUp, navigate, state.username, state.password]);

    const handleChange = (field) => (event) => {
        setState({ ...state, [field]: event.target.value });
    };

    const handleSignUp = () => {
        if (!state.fullname || !state.email || !state.username || !state.password || !state.confirmPassword || !state.agree) {
            setState((prev) => ({
                ...prev,
                errCode: 'ERR_F1',
                errMessage: 'Vui lòng nhập đầy đủ thông tin',
            }));
            toast.error('Vui lòng nhập đầy đủ thông tin');
            return;
        } else if (state.password !== state.confirmPassword) {
            setState((prev) => ({
                ...prev,
                errCode: 'ERR_F2',
                errMessage: 'Mật khẩu không khớp',
                confirmPassword: '',
                agree: false
            }));
            toast.error('Mật khẩu không khớp');
            return;
        }

        // kiểm tra các trường username, email có hợp lệ không bằng các hàm trong MainUtils
        if (!MainUtils.isUsername(state.username)) {
            setState((prev) => ({
                ...prev,
                errCode: 'ERR_F3',
                errMessage: 'Username không hợp lệ',
                username: '',
                password: '',
                confirmPassword: '',
                agree: false
            }));
            toast.error('Username không hợp lệ');
            return;
        } else if (!MainUtils.isEmail(state.email)) {
            setState((prev) => ({
                ...prev,
                errCode: 'ERR_F4',
                errMessage: 'Email không hợp lệ',
                email: '',
                password: '',
                confirmPassword: '',
                agree: false
            }));
            toast.error('Email không hợp lệ');
            return;
        }

        setState((prev) => ({
            ...prev,
            errCode: '',
            errMessage: ''
        }));

        userAPI.signup(state.username, state.password, state.email, state.fullname)
            .then(res => {
                if (res.data.errCode) {
                    console.error(res.data);
                    setState((prev) => ({
                        ...prev,
                        errCode: res.data.errCode,
                        errMessage: res.data.message,
                        fullname: '',
                        email: '',
                        username: '',
                        password: '',
                        confirmPassword: '',
                        isShowPassword: false,
                        isShowConfirmPassword: false,
                        agree: false,
                    }));
                    toast.error(res.data.message);
                    return;
                }
                let userData = {
                    isSignedUp: true,
                    user: res.data.user
                }
                props.userSignUpSuccess(userData);
                toast.success('Đăng ký thành công');
            })
            .catch(err => {
                console.error(err);
                setState((prev) => ({
                    ...prev,
                    errCode: 'ERR_F0',
                    errMessage: 'Lỗi hệ thống. Vui lòng kết nối lại'
                }));
                toast.error('Lỗi hệ thống. Vui lòng kết nối lại');
            });
    }

    return (
        <div className="signup">
            <div className="signup-container">
                <form className="signup-form" method="post">
                    <span className="signup-form-title">Đăng ký</span>
                    <span className="signup-form-subtitle">Tạo tài khoản mới tại đây</span>
                    <div className={`wrap-input ${state.errCode ? 'input-error' : ''}`}>
                        <input type="text" name="fullname" placeholder="Họ và tên"
                            className="input input-fullname"
                            value={state.fullname}
                            onChange={handleChange('fullname')}
                        />
                    </div>
                    <div className={`wrap-input ${state.errCode ? 'input-error' : ''}`}>
                        <input type="text" name="email" placeholder="Email"
                            className="input input-email"
                            value={state.email}
                            onChange={handleChange('email')}
                        />
                    </div>
                    <div className={`wrap-input ${state.errCode ? 'input-error' : ''}`}>
                        <input type="text" name="username" placeholder="Tên đăng nhập"
                            className="input input-username"
                            value={state.username}
                            onChange={handleChange('username')}
                        />
                    </div>
                    <div className={`wrap-input ${state.errCode ? 'input-error' : ''}`}>
                        <input className="input" name="password" placeholder="Mật khẩu"
                            type={state.isShowPassword ? 'password' : 'text'}
                            value={state.password}
                            onChange={handleChange('password')}
                        />
                        <span onClick={() => setState((prev) => ({ ...prev, isShowPassword: !prev.isShowPassword }))}>
                            {state.isShowPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                        </span>
                    </div>
                    <div className={`wrap-input ${state.errCode ? 'input-error' : ''}`}>
                        <input className="input" name="confirm-password" placeholder="Nhập lại mật khẩu"
                            type={state.isShowConfirmPassword ? 'password' : 'text'}
                            value={state.confirmPassword}
                            onChange={handleChange('confirmPassword')}
                        />
                        <span onClick={() => setState((prev) => ({ ...prev, isShowConfirmPassword: !prev.isShowConfirmPassword }))}>
                            {state.isShowConfirmPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                        </span>
                    </div>
                    <div className="agree-wrap wrap-input" style={{ backgroundColor: 'inherit' }}>
                        <input type="checkbox" name='agree' id="agree"
                            checked={state.agree}
                            onChange={() => setState((prev) => ({ ...prev, agree: !prev.agree }))}
                        />
                        <label htmlFor="agree" style={{ fontSize: 13.3 }}>Đồng ý với&nbsp;<Link to='#'>Điều khoản và chính sách </Link></label>
                    </div>
                    <div className="container-signup-form-btn">
                        <button className="signup-form-btn custom-btn" type="button" onClick={handleSignUp}>ĐĂNG KÝ</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isSignedUp: state.user.isSignedUp,
});

const mapDispatchToProps = (dispatch) => ({
    userSignUpSuccess: (userData) => dispatch(userActions.userSignUpSuccess(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);