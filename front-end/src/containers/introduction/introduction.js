import React from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from '../../assets/images/dongthap.jpg';
import './introduction.scss';
import { Button } from 'react-bootstrap';

const Introduction = () => {

    const handleClick = () => {
        navigate('/destination');
    }

    const navigate = useNavigate();
    return (
        <div className='intro'>
            <div className='row'>
                <div className='col right'>
                    <div className='content'>
                        <p className="subtitle">Khám phá hành trình của bạn</p>

                        <h2 className="title">Thủ phủ Sen Hồng - Đồng Tháp</h2>

                        <p className="text">
                            “Tháp 10 đẹp nhất bông sen, Việt Nam đẹp nhất có tên Bác Hồ” - Đồng Tháp thân thương luôn trìu mến những người con phương xa trở về
                        </p>

                        <div className="btn-group" onClick={handleClick}>
                            <button class="cssbuttons-io-button">
                                Khám phá
                                <div class="icon">
                                    <svg
                                        height="24"
                                        width="24"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                        <path
                                            d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                                            fill="currentColor"
                                        ></path>
                                    </svg>
                                </div>
                            </button>                        </div>
                    </div>
                </div>
                <div className='col left'>
                    <div className='banner'>
                        <img src={Banner} alt='Home Banner' className='banner-img' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Introduction;