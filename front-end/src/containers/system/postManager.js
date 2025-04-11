import React, { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { connect } from "react-redux";
import './userManager.scss';
import { toast } from 'react-toastify';
import { SystemSideBar } from '../../components';
import { Dropdown, Modal, Tab, Table } from "react-bootstrap";
import { destAPI, postAPI, userAPI } from "../../services";

const PostManagement = () => {
    const [destinations, setDestinations] = useState([]);
    const [users, setUsers] = useState([]);
    const [data, setData] = useState([]);
    const [edit, setEdit] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [hideSidebar, setHideSidebar] = useState(false);
    const [queryFilter, setQueryFilter] = useState({
        search: '',
        userid: '',
        destid: '',
        rate: '',
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
    const [filterOption, setFilterOption] = useState('');

    useEffect(() => {
        userAPI.getAllUsers().then((res) => { setUsers(res.data); }).catch((e) => { console.log(e); });
        destAPI.getAllDestinations().then((res) => { setDestinations(res.data); }).catch((e) => { console.log(e); });
        postAPI.getAllPosts().then((res) => { setData(res.data); }).catch((e) => { console.log(e); });
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
            content: '',
            rate: '',
            userid: '',
            destid: '',
            user: {}
        })
        setIsEdit(false);
        setQueryFilter({
            search: '',
            userid: '',
            destid: '',
            rate: '',
            order: 'createdAt',
            type: 'DESC',
            limit: null
        });
        setCurrentPage(1);
        setFilterOption('');
        postAPI.getAllPosts()
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
        postAPI.createpost(edit)
            .then((res) => {
                setData([...data, res.data.post]);
                toast.success('Thêm mới bài đánh giá thành công');
                handleClickReset();
            })
            .catch((e) => {
                toast.error('Thêm mới bài đánh giá thất bại');
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
        postAPI.getPostsByFilter(queryFilter)
            .then((res) => {
                setData(res.data);
                setCurrentPage(1);
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


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleMultiSort = (property) => {
    };

    return (
        <>
            <div className="usermanagement-container">
                <SystemSideBar hideSideBar={handleHideSidebar} />
                <div className={`usermanagement-main ${hideSidebar ? 'full-width' : ''}`}>
                    <h1 style={{ marginTop: 20, marginLeft: 20 }}>QUẢN LÝ BÀI ĐÁNH GIÁ</h1>
                    <div className="main-action">
                        <div className="edit-user" >
                            <div className="edit-item">
                                <div className="edit-item-label">Nội dung</div>
                                <textarea name="content" value={edit.content}
                                    onChange={(e) => handleChangeEdit(e)}
                                />
                            </div>
                            <div className="edit-item-post-wrapper">
                                <div className="edit-item">
                                    <div className="edit-item-label">Rate</div>
                                    <input type="text" name="rate" value={edit.rate}
                                        onChange={(e) => handleChangeEdit(e)}
                                    />
                                </div>
                                <div className="edit-item">
                                    <div className="edit-item-label">Điểm đến</div>
                                    <select name="destid" value={edit.destid} onChange={(e) => handleChangeEdit(e)} style={{ height: 'fit-content' }}>
                                        <option value="">Chọn điểm đến</option>
                                        {destinations.map((item, index) => (
                                            <option key={index} value={item.id}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="edit-item">
                                    <div className="edit-item-label">Tác giả</div>
                                    <select name="userid" value={edit.userid} onChange={(e) => handleChangeEdit(e)} style={{ height: 'fit-content' }}>
                                        <option value="">Chọn tác giả</option>
                                        {users.map((item, index) => (
                                            <option key={index} value={item.id}>{item.username}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="action-button">
                        {isEdit ? <button className="btn btn-primary" onClick={handleEdit}>LƯU</button> :
                            <button className="btn btn-primary" onClick={handleCreate}>THÊM MỚI</button>}
                        <button className="btn btn-success" onClick={handleClickReset}>LÀM MỚI</button>
                    </div>
                    <div className="main-content">
                        <div className="action-wrapper" style={{ display: "flex", justifyContent: 'flex-end', alignItems: 'center' }}>
                            <div className="filter-btn btn btn-primary" style={{ height: 'fit-content' }} onClick={handleFilter}>Áp dụng</div>
                            <div className="filter-action">
                                {filterOption === 'user' && <div className="filter-option">
                                    <select className="btn btn-success" name="userid" value={queryFilter.userid} onChange={(e) => setQueryFilter({ ...queryFilter, userid: e.target.value })}>
                                        <option value="">Chọn tác giả</option>
                                        {users.map((item, index) => (
                                            <option key={index} value={item.id}>{item.username}</option>
                                        ))}
                                    </select>
                                </div>}
                                {filterOption === "destination" && <div className="filter-option">
                                    <select className="btn btn-success" name="destid" value={queryFilter.destid} onChange={(e) => setQueryFilter({ ...queryFilter, destid: e.target.value })}>
                                        <option value="">Chọn điểm đến</option>
                                        {destinations.map((item, index) => (
                                            <option key={index} value={item.id}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>}
                                {filterOption === 'rate' && <div className="filter-option">
                                    <select className="btn btn-success" name="order" value={queryFilter.rate} onChange={(e) => setQueryFilter({ ...queryFilter, rate: e.target.value })}>
                                        <option value="">Chọn đánh giá</option>
                                        {[1, 2, 3, 4, 5].map((item, index) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))}
                                    </select>
                                </div>}
                            </div>
                            <div className="filter-option">
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Sắp xếp theo
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => setQueryFilter({ ...queryFilter, type: 'DESC' })}>Mới nhất</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setQueryFilter({ ...queryFilter, type: 'ASC' })}>Cũ nhất</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic2">
                                        Lọc theo
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => setFilterOption('user')}>Tác giả</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setFilterOption('destination')}>Điểm đến</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setFilterOption('rate')}>Đánh giá</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <input type="text" placeholder="Tìm kiếm"
                                    value={queryFilter.search}
                                    onChange={(e) => setQueryFilter({ ...queryFilter, search: e.target.value })}
                                    onKeyDown={(e) => e.key === 'Enter' ? handleFilter : null}
                                />
                            </div>
                        </div>
                        <Table bordered hover>
                            <thead>
                                <tr style={{ textAlign: 'center' }}>
                                    <th>STT</th>
                                    <th>Nội dung</th>
                                    <th>Đánh giá</th>
                                    <th>Tác giả</th>
                                    <th>Điểm đến</th>
                                    <th>THAO TÁC</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.length > 0 && paginatedData.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                        <td>{item.content}</td>
                                        <td>{item.rate}</td>
                                        <td>{item.user?.username || 'N/A'}</td>
                                        <td>{item.destination?.name || 'N/A'}</td>
                                        <td className="user-btn">
                                            <button
                                                className="btn btn-warning"
                                                onClick={() => handleClickEdit(item)}
                                                data-tooltip-id="editTooltip"
                                            >
                                                <i className="fa-solid fa-pen-to-square" />
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => { setShowDeleteModal(true); setDeleteItem(item); }}
                                                data-tooltip-id="deleteTooltip"
                                            >
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

export default connect()(PostManagement);
