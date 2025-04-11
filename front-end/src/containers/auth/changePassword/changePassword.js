import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { userAPI } from '../../../services';
import './changePassword.scss';


const ChangePassword = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [getEmail, setGetEmail] = useState(false);
    const [verify, setVerify] = useState(false);
    const [verifyCode, setVerifyCode] = useState('');
    const [isChangePass, setIsChangePass] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(true);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(true);

    const handleBack = () => {
        return () => {
            navigate('/signin');
        }
    }

    const handleGetEmail = () => {
        if (!username) {
            toast.error('Vui lòng nhập tên đăng nhập');
            return;
        }
        setGetEmail(true);
    }

    const handleEmail = () => {
        userAPI.sendEmail(username)
            .then(res => {
                setGetEmail(false);
                setVerify(true);
                toast.success('Gửi email thành công. Vui lòng kiểm tra email của bạn');
            })
            .catch(err => {
                toast.error(err);
            })
    }

    const handleVerify = () => {
        userAPI.verifyEmail(username, verifyCode)
            .then(res => {
                if (res.data) {
                    toast.success('Xác thực thành công');
                    setIsChangePass(true);
                } else {
                    toast.error('Mã xác thực không chính xác');
                }
            })
            .catch(err => {
                toast.error(err);
            })
    }

    const handleChangePassword = () => {
        if (!password || !confirmPassword || password !== confirmPassword) {
            toast.error('Đổi mật khẩu thất bại. Hãy thử lại');
            setPassword('');
            setConfirmPassword('');
            return;
        }
        userAPI.changePassword(username, password)
            .then(res => {
                navigate('/signin', {
                    state: {
                        username: username,
                        password: password,
                        isSignedUp: true
                    }
                })
            })
            .catch(err => {
                console.error(err);
                toast.error('Lỗi hệ thống. Vui lòng kết nối lại');
            });
    }

    return (
        <div className="reset-pass-container">
            <div className="reset-pass-main">
                <div className='reset-pass-header'>
                    <div className='header-back-btn' onClick={handleBack()}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </div>
                    <div className='header-title'>
                        Đặt lại mật khẩu
                    </div>
                    {!isChangePass && <div className='header-description'>
                        Điền vào tên đăng nhập để xác thực tài khoản
                    </div>}
                </div>
                <div className='reset-pass-form'>
                    {!isChangePass ?
                        <>
                            {!getEmail && !verify &&
                                <div className='reset-pass-form-input'>
                                    <input
                                        type='text'
                                        value={username}
                                        placeholder='Tên đăng nhập'
                                        onChange={(e) => setUsername(e.target.value)}
                                        onKeyDown={(e) => { (e.key === 'Enter') && handleGetEmail() }}
                                    />
                                </div>
                            }
                            {getEmail &&
                                <div className='get-email-container'>
                                    <div className='get-email-btn' onClick={handleEmail}>
                                        <i className="fa-solid fa-envelope"></i>
                                        <span>Nhận email đặt lại mật khẩu</span>
                                    </div>
                                    <div className='get-email-return' onClick={() => setGetEmail(false)}>
                                        <i className="fa-solid fa-arrow-left"></i>
                                        &nbsp;Quay lại
                                    </div>
                                </div>
                            }
                            {!getEmail && verify &&
                                <div className='reset-pass-form-input'>
                                    <input
                                        type='text'
                                        value={verifyCode}
                                        placeholder='Nhập mã xác thực tại đây'
                                        onChange={(e) => setVerifyCode(e.target.value)}
                                        onKeyDown={(e) => { (e.key === 'Enter') && handleVerify() }}
                                    />
                                </div>
                            }
                        </>
                        :
                        <div className='change-pass-form'>
                            <div className='change-pass-form-input'>
                                <input
                                    type={isShowPassword ? 'password' : 'text'}
                                    value={password}
                                    placeholder='Mật khẩu mới'
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span onClick={() => setIsShowPassword(!isShowPassword)}>
                                    <i className={`fa-solid fa-eye${isShowPassword ? '' : '-slash'}`}></i>
                                </span>
                            </div>
                            <div className='change-pass-form-input'>
                                <input
                                    type={isShowConfirmPassword ? 'password' : 'text'}
                                    value={confirmPassword}
                                    placeholder='Nhập lại mật khẩu'
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <span onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}>
                                    <i className={`fa-solid fa-eye${isShowConfirmPassword ? '' : '-slash'}`}></i>
                                </span>
                            </div>
                            <div className='change-pass-form-btn' onClick={handleChangePassword}>
                                Xác nhận
                            </div>
                        </div>}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    role: state.user.user.role,
});

export default connect(mapStateToProps)(ChangePassword);

