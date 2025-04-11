import React, { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { connect } from "react-redux";
import './userManager.scss';
import { toast } from 'react-toastify';
import { SystemSideBar } from '../../components';
import { Dropdown, Modal, Table } from "react-bootstrap";
import { destAPI, distAPI } from "../../services";

const UserManagement = () => {
    const [districts, setDistricts] = useState([]);
    const [data, setData] = useState([]);
    const [edit, setEdit] = useState({
        id: '',
        name: '',
        content: '',
        distid: '',
        dist: '',
        location: '',
        time: '',
        price: '',
        advantage: '',
        weakness: '',
        description: '',
    });
    const [isEdit, setIsEdit] = useState(false);
    const [hideSidebar, setHideSidebar] = useState(false);
    const [queryFilter, setQueryFilter] = useState({
        search: '',
        distid: '',
        order: 'createdAt',
        type: 'DESC',
        limit: null
    });
    const [sortFields, setSortFields] = useState([
    ]);
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
        distAPI.getAllDistricts()
            .then((res) => {
                setDistricts(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
        destAPI.getAllDestinations()
            .then((res) => {
                setData(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    const handleHideSidebar = () => {
        setHideSidebar(!hideSidebar);
    };

    const handleClickEdit = (data) => {
        setEdit(data);
        setIsEdit(true);
    };

    const handleClickReset = () => {
        setEdit({
            id: '',
            name: '',
            content: '',
            distid: '',
            location: '',
            time: '',
            price: '',
            advantage: '',
            weakness: '',
            description: '',
        })
        setIsEdit(false);
        setQueryFilter({
            search: '',
            distid: '',
            order: 'createdAt',
            type: 'DESC',
            limit: null
        });
        setSortFields([]);
        setCurrentPage(1);
        destAPI.getAllDestinations()
            .then((res) => {
                setData(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const handleChangeEdit = (e) => {
        const { name, value } = e.target;
        setEdit({
            ...edit,
            [name]: value
        });
    }

    const handleEdit = () => {
        destAPI.editDestination(edit)
            .then((res) => {
                setData(data.map(item => item.id === edit.id ? edit : item));
                toast.success('Chỉnh sửa điểm đến thành công');
                handleClickReset();
            })
            .catch((e) => {
                toast.error('Chỉnh sửa điểm đến thất bại');
            });
    }

    const handleCreate = () => {
        destAPI.createDestination(edit)
            .then((res) => {
                setData([...data, res.data]);
                toast.success('Thêm mới điểm đến thành công');
                handleClickReset();
            })
            .catch((e) => {
                toast.error('Thêm mới điểm đến thất bại');
            });
    }

    const handleDelete = () => {
        destAPI.deleteDestination(deleteItem.id)
            .then((res) => {
                setData(data.filter(item => item.id !== deleteItem.id));
                toast.success('Xoá điểm đến thành công');
                setShowDeleteModal(false);
                setData(data.filter(item => item.id !== deleteItem.id));
                setDeleteItem({});
            })
            .catch((e) => {
                toast.error('Xoá điểm đến thất bại');
            });
    }

    const handleFilter = () => {
        destAPI.getDestinationsByFilter(queryFilter)
            .then((res) => {
                setData(res.data);
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
        // const existingField = sortFields.find(field => field.property === property);
        // let updatedFields;

        // if (existingField) {
        //     // Toggle order if field is already in sortFields
        //     updatedFields = sortFields.map(field =>
        //         field.property === property ? { ...field, order: field.order === 'asc' ? 'desc' : 'asc' } : field
        //     );
        // } else {
        //     // Add new field with default 'asc' order if not present
        //     updatedFields = [...sortFields, { property, order: 'asc' }];
        // }

        // setSortFields(updatedFields);

        // // Sort users based on updated sortFields
        // const sortedUsers = [...users].sort((a, b) => {
        //     for (const field of updatedFields) {
        //         if (a[field.property] < b[field.property]) return field.order === 'asc' ? -1 : 1;
        //         if (a[field.property] > b[field.property]) return field.order === 'asc' ? 1 : -1;
        //     }
        //     return 0; // If all fields are equal
        // });

        // setUsers(sortedUsers);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className="usermanagement-container">
                <SystemSideBar hideSideBar={handleHideSidebar} />
                <div className={`usermanagement-main ${hideSidebar ? 'full-width' : ''}`}>
                    <h1 style={{ marginTop: 20, marginLeft: 20 }}>QUẢN LÝ ĐIỂM ĐẾN</h1>
                    <div className="main-action">
                        <div className="edit-user" style={{ width: '50%' }}>
                            <div className="edit-item">
                                <div className="edit-item-label">Tên</div>
                                <input type="text" name="name" value={edit.name} onChange={(e) => handleChangeEdit(e)} />
                            </div>
                            <div className="edit-item">
                                <div className="edit-item-label">Huyện</div>
                                <select name="distid" value={edit.distid} onChange={(e) => handleChangeEdit(e)}>
                                    <option value=''>Chọn huyện</option>
                                    {districts && districts.length > 0 && districts.map((item, index) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="edit-item">
                                <div className="edit-item-label">Địa chỉ</div>
                                <input type="text" name="location" value={edit.location} onChange={(e) => handleChangeEdit(e)} />
                            </div>
                            <div className="edit-item">
                                <div className="edit-item-label">Thời gian mở cửa</div>
                                <input type="text" name="time" value={edit.time} onChange={(e) => handleChangeEdit(e)} />
                            </div>
                            <div className="edit-item">
                                <div className="edit-item-label">Giá vé</div>
                                <input type="text" name="price" value={edit.price} onChange={(e) => handleChangeEdit(e)} />
                            </div>
                        </div>
                        <div className="edit-item-wrapper">
                            <div className="edit-item">
                                <div className="edit-item-label">Ưu điểm</div>
                                <textarea name="advantage" value={edit.advantage} onChange={(e) => handleChangeEdit(e)} />
                            </div>
                            <div className="edit-item">
                                <div className="edit-item-label">Nhược điểm</div>
                                <textarea type="text" name="weakness" value={edit.weakness} onChange={(e) => handleChangeEdit(e)} />
                            </div>
                        </div>
                    </div>
                    <div className="action-button">
                        {isEdit ? <button className="btn btn-primary" onClick={handleEdit}>LƯU</button> :
                            <button className="btn btn-primary" onClick={handleCreate}>THÊM MỚI</button>}
                        <button className="btn btn-success" onClick={handleClickReset}>LÀM MỚI</button>
                    </div>
                    <div className="main-content">
                        <div className="action-wrapper">
                            <div className="filter-option">
                                <input type="text" placeholder="Tìm kiếm"
                                    value={queryFilter.search}
                                    onChange={(e) => setQueryFilter({ ...queryFilter, search: e.target.value })}
                                    onKeyDown={(e) => e.key === 'Enter' ? handleFilter : null}
                                />

                                <select className="filter-select btn btn-success"
                                    onChange={(e) => setQueryFilter({ ...queryFilter, distid: e.target.value })}
                                    onClick={handleFilter}
                                >
                                    <option value=''>Chọn huyện</option>
                                    {districts && districts.length > 0 && districts.map((item, index) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <Table bordered hover>
                            <thead>
                                <tr style={{ textAlign: 'center' }}>
                                    <th>STT</th>
                                    <th onClick={() => handleMultiSort('name')}>TÊN &nbsp;{getSortIcon('name')}</th>
                                    <th onClick={() => handleMultiSort('distid')}>HUYỆN &nbsp;{getSortIcon('distid')}</th>
                                    <th>ĐỊA CHỈ</th>
                                    <th>THỜI GIAN</th>
                                    <th>GIÁ VÉ</th>
                                    <th>ƯU ĐIỂM</th>
                                    <th>NHƯỢC ĐIỂM</th>
                                    <th>THAO TÁC</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.length > 0 && paginatedData.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                        <td>{item.name}</td>
                                        <td>{item.districts.name}</td>
                                        <td>{item.location}</td>
                                        <td>{item.time}</td>
                                        <td>{item.price}</td>
                                        <td>{item.advantage}</td>
                                        <td>{item.weakness}</td>
                                        <td className="user-btn">
                                            <button className="btn btn-warning" onClick={() => handleClickEdit(item)} data-tooltip-id="editTooltip">
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
                    <p>Bạn có chắc chắn muốn xoá điểm đến <span style={{ fontWeight: 500 }}>{deleteItem.name}</span> này?</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-danger" onClick={() => handleDelete()}>Xoá</button>
                    <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Huỷ</button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default connect()(UserManagement);
