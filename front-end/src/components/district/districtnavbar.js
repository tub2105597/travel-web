import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { distAPI } from '../../services';
import './districtnavbar.scss';

const DistrictNavBar = (props) => {
    const [districts, setDistricts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            distAPI.getAllDistricts()
                .then((res) => {
                    setDistricts(res.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
        catch (e) {
            console.log(e);
        }
    }, []);


    const handleDistrict = (distid) => {
        navigate(`/destination?distid=${distid}`);
    }

    return (
        <div className="district-container">
            <ul className="district-list">
                {Array.isArray(districts) && districts.length > 0 ? (
                    districts.map((item) => {
                        return (
                            <li key={item.value} // Sử dụng item.value làm key
                                className='district-list-item'
                                onClick={() => handleDistrict(item.id)}
                            >
                                {item.name}
                            </li>
                        );
                    })
                ) : (
                    <li>Không có huyện nào để hiển thị.</li>
                )}
            </ul>
        </div>
    );
}


export default DistrictNavBar;
