import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { connect } from "react-redux";
import './userManager.scss';
import { toast } from 'react-toastify';
import { SystemSideBar } from '../../components';
import { Dropdown, Modal, Table } from "react-bootstrap";
import { userAPI } from "../../services";
import { type } from "@testing-library/user-event/dist/type";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState({
        id: '',
        username: '',
        fullname: '',
        email: '',
        gender: '',
        DoB: '',
        address: '',
        avatar: '',
        password: '',
        role: 'user'
    });
    const [isEditUser, setIsEditUser] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [hideSidebar, setHideSidebar] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [filterOption, setFilterOption] = useState({
        address: false,
        gender: false
    });

    const [queryFilter, setQueryFilter] = useState({
        search: '',
        address: '',
        gender: '',
        order: 'createdAt',
        type: 'DESC',
        limit: null
    });
    const [sortFields, setSortFields] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items per page
    const totalPages = Math.ceil(users.length / itemsPerPage);
    const paginatedUsers = users.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        userAPI.getAllUsers()
            .then((res) => {
                setUsers(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    const handleHideSidebar = () => {
        setHideSidebar(!hideSidebar);
    };

    const handleClickEditUser = (user) => {
        setEditUser(user);
        setIsEditUser(true);
    };

    const handleClickReset = () => {
        setEditUser({
            username: '',
            fullname: '',
            email: '',
            gender: '',
            DoB: '',
            address: '',
            avatar: '',
            password: '',
            role: 'user'
        });
        setIsEditUser(false);
        setFilterOption({
            address: false,
            gender: false
        });
        setQueryFilter({
            search: '',
            address: '',
            gender: '',
            order: 'createdAt',
            type: 'DESC',
            limit: null
        });
        setSortFields([]);
        userAPI.getAllUsers()
            .then((res) => {
                setUsers(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };


    const handleChangeEditUser = (e) => {
        const { name, value } = e.target;
        setEditUser({
            ...editUser,
            [name]: value
        });
    }

    const handleEditUser = () => {
        if (!editUser.password || !confirmPassword) {
            if (editUser.password && !confirmPassword) {
                toast.error('Vui lòng xác nhận mật khẩu');
                return;
            } else if (!editUser.password && confirmPassword) {
                toast.error('Vui lòng nhập mật khẩu');
                return;
            }
        } else if (editUser.password !== confirmPassword) {
            toast.error('Mật khẩu xác nhận không khớp');
            return;
        }
        userAPI.editUser(editUser)
            .then((res) => {
                setUsers(users.map(user => user.id === res.data.id ? res.data : user));
                handleClickReset();
                setConfirmPassword('');
                setIsShowPassword(false);
                toast.success('Cập nhật thông tin người dùng thành công');
            })
            .catch((e) => {
                console.log(e);
                toast.error('Cập nhật thông tin người dùng thất bại');
            });
    }

    const handleCreateUser = () => {
        userAPI.createUser(editUser)
            .then((res) => {
                console.log(res.data);
                setUsers([...users, res.data]);
                handleClickReset();
                toast.success('Thêm mới người dùng thành công');
            })
            .catch((e) => {
                console.log(e);
                toast.error('Thêm mới người dùng thất bại');
            });
    }

    const handleDeleteUser = (username) => {
        userAPI.deleteUser(username)
        toast.success('Xóa người dùng thành công');
        setUsers(users.filter(user => user.username !== username));
    }

    const handleClickAddressFilter = () => {
        setFilterOption({
            ...filterOption,
            address: true
        });
    }

    const handleClickGenderFilter = () => {
        setFilterOption({
            ...filterOption,
            gender: true
        });
    }

    const handleFilter = (e) => {
        setQueryFilter({
            ...queryFilter,
            gender: e.target.value
        });
        console.log(queryFilter);
        userAPI.getUsersByFilter(queryFilter)
            .then((res) => {
                console.log(res.data);
                setUsers(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    const getSortIcon = (property) => {
        const field = sortFields.find(field => field.property === property);
        if (!field) return null;
        return field.order === 'asc' ? <i className="fa-solid fa-arrow-up" /> : <i className="fa-solid fa-arrow-down" />;
    };

    const handleMultiSort = (property) => {
        const existingField = sortFields.find(field => field.property === property);
        let updatedFields;

        if (existingField) {
            // Toggle order if field is already in sortFields
            updatedFields = sortFields.map(field =>
                field.property === property ? { ...field, order: field.order === 'asc' ? 'desc' : 'asc' } : field
            );
        } else {
            // Add new field with default 'asc' order if not present
            updatedFields = [...sortFields, { property, order: 'asc' }];
        }

        setSortFields(updatedFields);

        // Sort users based on updated sortFields
        const sortedUsers = [...users].sort((a, b) => {
            for (const field of updatedFields) {
                if (a[field.property] < b[field.property]) return field.order === 'asc' ? -1 : 1;
                if (a[field.property] > b[field.property]) return field.order === 'asc' ? 1 : -1;
            }
            return 0; // If all fields are equal
        });

        setUsers(sortedUsers);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className="usermanagement-container">
                <SystemSideBar hideSideBar={handleHideSidebar} />
                <div className={`usermanagement-main ${hideSidebar ? 'full-width' : ''}`}>
                    <h1 style={{ marginTop: 20, marginLeft: 20 }}>QUẢN LÝ NGƯỜI DÙNG</h1>
                    <div className="main-action">
                        <div className="edit-user-aside">
                            <div className="edit-user_avt">
                                {editUser.avatar ? <img src={editUser ? editUser.avatar : ''} alt="avatar" /> : ''}
                            </div>
                            <div className="edit-user_password">
                                <button className="btn btn-success" onClick={() => setIsShowPassword(true)}>ĐỔI MẬT KHẨU</button>
                            </div>
                        </div>
                        <div className="edit-user">
                            <div className="edit-item">
                                <div className="edit-item-label">Username</div>
                                <input type="text" name="username" value={editUser.username} onChange={(e) => handleChangeEditUser(e)} />
                            </div>
                            <div className="edit-item">
                                <div className="edit-item-label">Tên người dùng</div>
                                <input type="text" name="fullname" value={editUser.fullname} onChange={(e) => handleChangeEditUser(e)} />
                            </div>
                            <div className="edit-item">
                                <div className="edit-item-label">Email</div>
                                <input type="text" name="email" value={editUser.email} onChange={(e) => handleChangeEditUser(e)} />
                            </div>
                            <div className="edit-item">
                                <div className="edit-item-label">Giới tính</div>
                                <select
                                    className=""
                                    name="gender"
                                    value={editUser.gender}
                                    onChange={(e) => handleChangeEditUser(e)}
                                >
                                    <option value=''></option>
                                    <option value='female'>Nữ</option>
                                    <option value='male'>Nam</option>
                                </select>
                            </div>
                            <div className="edit-item">
                                <div className="edit-item-label">Ngày sinh</div>
                                <input type="date" name="DoB" value={editUser.DoB} onChange={(e) => handleChangeEditUser(e)} />
                            </div>
                            <div className="edit-item">
                                <div className="edit-item-label">Địa chỉ</div>
                                <input type="text" name="address" value={editUser.address} onChange={(e) => handleChangeEditUser(e)} />
                            </div>
                        </div>
                    </div>
                    <div className="action-button">
                        {isEditUser ? <button className="btn btn-primary" onClick={handleEditUser}>LƯU</button> :
                            <button className="btn btn-primary" onClick={handleCreateUser}>THÊM MỚI</button>}
                        <button className="btn btn-success" onClick={handleClickReset}>LÀM MỚI</button>
                    </div>
                    <div className="main-content">
                        <div className="action-wrapper">
                            <div className="filter-option">
                                <input type="text" placeholder="Tìm kiếm người dùng"
                                    value={queryFilter.search}
                                    onChange={(e) => setQueryFilter({ ...queryFilter, search: e.target.value })}
                                    onKeyDown={(e) => e.key === 'Enter' ? handleFilter(e) : null}
                                />
                                {filterOption.address &&
                                    <input type="text" placeholder="Nhập địa chỉ"
                                        value={queryFilter.address}
                                        onChange={(e) => setQueryFilter({ ...queryFilter, address: e.target.value })}
                                        onKeyDown={(e) => e.key === 'Enter' ? handleFilter(e) : null}
                                    />
                                }
                                {filterOption.gender &&
                                    <select className="filter-select btn btn-success"
                                        value={queryFilter.gender}
                                        onChange={(e) => handleFilter(e)}
                                        onClick={(e) => handleFilter(e)}
                                    >
                                        <option value=''>Chọn giới tính</option>
                                        <option value='female'>Nữ</option>
                                        <option value='male'>Nam</option>
                                    </select>
                                }
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        BỘ LỌC
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={handleClickAddressFilter}>ĐỊA CHỈ</Dropdown.Item>
                                        <Dropdown.Item onClick={handleClickGenderFilter}>GIỚI TÍNH</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                        <Table bordered hover>
                            <thead>
                                <tr style={{ textAlign: 'center' }}>
                                    <th>STT</th>
                                    <th>AVATAR</th>
                                    <th onClick={() => handleMultiSort('username')}>USERNAME &nbsp;{getSortIcon('username')}</th>
                                    <th onClick={() => handleMultiSort('fullname')}>TÊN NGƯỜI DÙNG &nbsp;{getSortIcon('fullname')}</th>
                                    <th onClick={() => handleMultiSort('email')}>EMAIL &nbsp;{getSortIcon('email')}</th>
                                    <th onClick={() => handleMultiSort('gender')}>GIỚI TÍNH &nbsp;{getSortIcon('gender')}</th>
                                    <th onClick={() => handleMultiSort('DoB')}>NGÀY SINH &nbsp;{getSortIcon('DoB')}</th>
                                    <th onClick={() => handleMultiSort('address')}>ĐỊA CHỈ &nbsp;{getSortIcon('address')}</th>
                                    <th>THAO TÁC</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.length > 0 && paginatedUsers.map((user, index) => (
                                    <tr key={user.id}>
                                        <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                        <td style={{ display: 'flex', justifyContent: 'center', padding: 0, width: '100%', height: '100%' }}>
                                            <img src={user.avatar} alt="avatar" style={{ width: 35, height: 35, borderRadius: '50%' }} />
                                        </td>
                                        <td>{user.username}</td>
                                        <td>{user.fullname}</td>
                                        <td>{user.email}</td>
                                        <td>{user.gender}</td>
                                        <td>{user.DoB}</td>
                                        <td>{user.address}</td>
                                        <td className="user-btn">
                                            <button className="btn btn-primary" onClick={() => handleClickEditUser(user)} data-tooltip-id="editTooltip">
                                                <i className="fa-solid fa-user-edit" />
                                            </button>
                                            <button className="btn btn-danger" onClick={() => handleDeleteUser(user.username)} data-tooltip-id="deleteTooltip">
                                                <i className="fa-solid fa-user-minus" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className="pagination-controls">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                <i className="fa-solid fa-arrow-left" />
                            </button>
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    className={currentPage === index + 1 ? 'active' : ''}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                <i className="fa-solid fa-arrow-right" />
                            </button>
                        </div>
                        <Tooltip id="editTooltip" place="bottom" content="Chỉnh sửa" />
                        <Tooltip id="deleteTooltip" place="bottom" content="Xoá người dùng" />
                    </div>
                </div>
            </div>
            <Modal show={isShowPassword} onHide={() => setIsShowPassword(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Đổi mật khẩu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="edit-item">
                        <div className="edit-item-label">Mật khẩu mới</div>
                        <div className="edit-item-input">
                            <input type={showPassword ? 'text' : "password"} name="password" value={editUser.password} onChange={(e) => handleChangeEditUser(e)} />
                            <i className="fa-solid fa-eye" onClick={() => setShowPassword(!showPassword)} />
                        </div>
                    </div>
                    <div className="edit-item">
                        <div className="edit-item-label">Xác nhận mật khẩu</div>
                        <div className="edit-item-input">
                            <input type={showConfirmPassword ? "text" : "password"} name="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            <i className="fa-solid fa-eye" onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={handleEditUser}>LƯU</button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default connect()(UserManagement);
