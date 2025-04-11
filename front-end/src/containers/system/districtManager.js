import React, { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { connect } from "react-redux";
import './userManager.scss';
import { toast } from 'react-toastify';
import { SystemSideBar } from '../../components';
import { Dropdown, Modal, Table } from "react-bootstrap";
import { distAPI } from "../../services";

const FavouriteManagement = () => {
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
        distAPI.getDistrictsByFilter(queryFilter).then((res) => { setData(res.data) }).catch((e) => { console.log(e) });
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
        distAPI.getDistrictsByFilter(queryFilter).then((res) => { setData(res.data) }).catch((e) => { console.log(e) });
    };

    const handleChangeEdit = (e) => {
        setEdit({ ...edit, [e.target.name]: e.target.value });
    }

    const handleCreate = () => {
        console.log(edit);
        distAPI.createDistrict(edit)
            .then((res) => {
                toast.success('Thêm huyện thành công');
                handleClickReset();
            })
            .catch((e) => {
                toast.error('Thêm huyện thất bại');
            });
    }

    const handleDelete = () => {
        distAPI.deleteDistrict(deleteItem.id)
            .then((res) => {
                setData(data.filter(item => item.id !== deleteItem.id));
                toast.success('Xoá huyện thành công');
                setShowDeleteModal(false);
                setData(data.filter(item => item.id !== deleteItem.id));
                setDeleteItem({});
            })
            .catch((e) => {
                toast.error('Xoá huyện thất bại');
            });
    }

    const handleEdit = () => {
        distAPI.editDistrict(edit)
            .then((res) => {
                toast.success('Sửa huyện thành công');
                handleClickReset();
            })
            .catch((e) => {
                toast.error('Sửa huyện thất bại');
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
                    <h1 style={{ marginTop: 20, marginLeft: 20 }}>QUẢN LÝ HUYỆN</h1>
                    <div className="main-action">
                        <div className="edit-user" style={{ width: '50%' }}>
                            <div className="edit-item">
                                <div className="edit-item-label">Tên huyện</div>
                                <input type="text" name="name" value={edit.name ? edit.name : ''} onChange={handleChangeEdit} />
                            </div>
                        </div>
                    </div>
                    <div className="action-button">
                        {!isEdit ?
                            <button className="btn btn-primary" onClick={handleCreate}>THÊM MỚI</button>
                            : <button className="btn btn-primary" onClick={handleEdit}>LƯU</button>}
                        <button className="btn btn-success" onClick={handleClickReset}>LÀM MỚI</button>
                    </div>
                    <div className="main-content">
                        <div className="action-wrapper">
                            <div className="filter-option">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm tên huyện"
                                    value={queryFilter.search}
                                    onChange={(e) => setQueryFilter({ ...queryFilter, search: e.target.value })}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            distAPI.getDistrictsByFilter(queryFilter)
                                                .then((res) => {
                                                    setData(res.data);
                                                })
                                                .catch((e) => {
                                                    console.log('API Error:', e); // Debugging line
                                                });
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <Table bordered hover>
                            <thead>
                                <tr style={{ textAlign: 'center' }}>
                                    <th>STT</th>
                                    <th>ID</th>
                                    <th>TÊN HUYỆN</th>
                                    <th>HÀNH ĐỘNG</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.length > 0 && paginatedData.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td style={{ textAlign: 'center', gap: '5px' }}>
                                            <button className="btn btn-warning" onClick={() => { setEdit(item); setIsEdit(true) }} data-tooltip-id="editTooltip">
                                                <i className="fa-solid fa-pen-to-square" />
                                            </button>
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
                    <p>Bạn có chắc chắn muốn xoá huyện này?</p>
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
