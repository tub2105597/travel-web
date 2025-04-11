import React, { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { connect } from "react-redux";
import './userManager.scss';
import { toast } from 'react-toastify';
import { SystemSideBar } from '../../components';
import { Dropdown, Modal, Table } from "react-bootstrap";
import { destAPI, favouriteAPI, userAPI } from "../../services";

const FavouriteManagement = () => {
    const [users, setUsers] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [data, setData] = useState([]);
    const [edit, setEdit] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [hideSidebar, setHideSidebar] = useState(false);
    const [queryFilter, setQueryFilter] = useState({
        search: '',
        order: 'createdAt',
        type: 'DESC',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginatedData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteItem, setDeleteItem] = useState({});

    useEffect(() => {
        favouriteAPI.getAllFavourites(queryFilter).then((res) => { setData(res.data) }).catch((e) => { console.log(e) });
        destAPI.getAllDestinations().then((res) => { setDestinations(res.data) }).catch((e) => { console.log(e) });
        userAPI.getAllUsers().then((res) => { setUsers(res.data) }).catch((e) => { console.log(e) });
    }, []);

    const handleHideSidebar = () => {
        setHideSidebar(!hideSidebar);
    };

    const handleClickReset = () => {
        setEdit({})
        setIsEdit(false);
        setQueryFilter({
            search: '',
            order: 'createdAt',
            type: 'DESC',
        });
        setCurrentPage(1);
        favouriteAPI.getAllFavourites(queryFilter).then((res) => { setData(res.data) }).catch((e) => { console.log(e) });
    };

    const handleChangeEdit = (e) => {
        setEdit({ ...edit, [e.target.name]: e.target.value });
    }

    const handleCreate = () => {
        console.log(edit);
        favouriteAPI.createFavourite(edit.userid, edit.destid)
            .then((res) => {
                toast.success('Thêm điểm đến yêu thích thành công');

                handleClickReset();
            })
            .catch((e) => {
                toast.error('Thêm điểm đến yêu thích thất bại');
            });
    }

    const handleDelete = () => {
        destAPI.deleteDestination(deleteItem.id)
            .then((res) => {
                setData(data.filter(item => item.id !== deleteItem.id));
                toast.success('Xoá điểm đến yêu thích thành công');
                setShowDeleteModal(false);
                setData(data.filter(item => item.id !== deleteItem.id));
                setDeleteItem({});
            })
            .catch((e) => {
                toast.error('Xoá điểm đến yêu thích thất bại');
            });
    }


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className="usermanagement-container">
                <SystemSideBar hideSideBar={handleHideSidebar} />
                <div className={`usermanagement-main ${hideSidebar ? 'full-width' : ''}`}>
                    <h1 style={{ marginTop: 20, marginLeft: 20 }}>QUẢN LÝ ĐIỂM ĐẾN YÊU THÍCH</h1>
                    <div className="main-action">
                        <div className="edit-user" style={{ width: '50%' }}>
                            <div className="edit-item">
                                <div className="edit-item-label">Tên điểm đến</div>
                                <select name="destid" value={edit.destid ? edit.destid : ''} onChange={(e) => handleChangeEdit(e)}>
                                    <option value=''>Chọn điểm đến</option>
                                    {destinations && destinations.length > 0 && destinations.map((item, index) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="edit-item">
                                <div className="edit-item-label">Người dùng</div>
                                <select name="userid" value={edit.userid ? edit.userid : ''} onChange={(e) => handleChangeEdit(e)}>
                                    <option value=''>Chọn người dùng</option>
                                    {users && users.length > 0 && users.map((item, index) => (
                                        <option key={index} value={item.id}>{item.username}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="action-button">
                        <button className="btn btn-primary" onClick={handleCreate}>THÊM MỚI</button>
                        <button className="btn btn-success" onClick={handleClickReset}>LÀM MỚI</button>
                    </div>
                    <div className="main-content">
                        <div className="action-wrapper">
                            <div className="filter-option">
                                <input type="text" placeholder="Tìm kiếm theo id"
                                    value={queryFilter.search}
                                    onChange={(e) => setQueryFilter({ ...queryFilter, search: e.target.value })}
                                    onKeyDown={(e) => e.key === 'Enter' ? favouriteAPI.getAllFavourites(queryFilter).then((res) => { setData(res.data) }).catch((e) => { console.log(e) }) : null}
                                />
                            </div>
                        </div>
                        <Table bordered hover>
                            <thead>
                                <tr style={{ textAlign: 'center' }}>
                                    <th>STT</th>
                                    <th>ID</th>
                                    <th>ĐIỂM ĐẾN</th>
                                    <th>UID</th>
                                    <th>NGƯỜI DÙNG</th>
                                    <th>HÀNH ĐỘNG</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.length > 0 && paginatedData.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.destid}</td>
                                        <td>{item.destinations.name}</td>
                                        <td>{item.userid}</td>
                                        <td>{item.users.username}</td>
                                        <td className="user-btn">
                                            <button className="btn btn-danger" onClick={() => { setShowDeleteModal(true); setDeleteItem(item) }} data-tooltip-id="deleteTooltip">
                                                <i className="fa-solid fa-square-minus" />
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
                        <Tooltip id="deleteTooltip" place="bottom" content="Xoá" />
                    </div>
                </div>
            </div>
            <Modal className="deleteModal" show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xoá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Bạn có chắc chắn muốn xoá điểm đến yêu thích này?</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-danger" onClick={() => handleDelete()}>Xoá</button>
                    <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Huỷ</button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default connect()(FavouriteManagement);
