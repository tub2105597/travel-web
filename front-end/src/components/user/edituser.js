import React, { useState } from "react";
import './edituser.scss';

const EditUser = ({ user, handleEditUser }) => {
    const [userData, setUserData] = useState({
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        gender: user.gender ? user.gender : 'male',
        DoB: user.DoB,
        address: user.address,
    });

    const handleChange = (field) => (event) => {
        setUserData({ ...userData, [field]: event.target.value });
    };

    const clickEditUser = () => {
        handleEditUser(userData);
    };

    return (
        <div className="edituser-container">
            <form className="edituser-form" method="post">
                <div className="form-group">
                    <p>Họ và tên:</p>
                    <input
                        type="text"
                        className="form-control"
                        value={userData.fullname}
                        onChange={handleChange('fullname')}
                    />
                </div>
                <div className="form-group">
                    <p>Email:</p>
                    <input
                        type="email"
                        className="form-control"
                        value={userData.email}
                        onChange={handleChange('email')}
                    />
                </div>
                <div className="form-group">
                    <p>Giới tính:</p>
                    <select
                        className="form-control"
                        value={userData.gender}
                        onChange={handleChange('gender')}
                    >
                        <option value='female'>Nữ</option>
                        <option value='male'>Nam</option>
                    </select>
                </div>
                <div className="form-group">
                    <p>Ngày sinh:</p>
                    <input
                        type="date"
                        className="form-control"
                        value={userData.DoB}
                        onChange={handleChange('DoB')}
                    />
                </div>
                <div className="form-group">
                    <p>Địa chỉ:</p>
                    <input
                        type="text"
                        className="form-control"
                        value={userData.address}
                        onChange={handleChange('address')}
                    />
                </div>
                <div className="form-group">
                </div>
                <div className="button-wrapper">
                    <div className="edit-btn" onClick={clickEditUser}>
                        <button type="button" className="btn edit-btn">Cập nhật</button>
                    </div>
                </div>

            </form >

        </div >
    );
};

export default EditUser;
