import React, { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { connect } from "react-redux";
import './userManager.scss';
import { toast } from 'react-toastify';
import { SystemSideBar } from '../../components';
import { Dropdown, Modal, Table } from "react-bootstrap";
import { destAPI, postAPI, imageAPI } from "../../services";

const ImageManagement = () => {
    const [destinations, setDestinations] = useState([]);
    const [posts, setPosts] = useState([]);
    const [data, setData] = useState([]);
    const [edit, setEdit] = useState({
        link: '',
        destid: '',
        postid: ''
    });
    const [isEdit, setIsEdit] = useState(false);
    const [hideSidebar, setHideSidebar] = useState(false);
    const [queryFilter, setQueryFilter] = useState({
        search: '',
        destid: '',
        postid: '',
        order: 'createdAt',
        type: 'DESC',
        limit: null
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
    const [filterOption, setFilterOption] = useState('');
    const [showAddImageModal, setShowAddImageModal] = useState(false);
    const filesInputRef = React.createRef();

    useEffect(() => {
        destAPI.getAllDestinations().then((res) => { setDestinations(res.data); }).catch((e) => { console.log(e); });
        postAPI.getAllPosts().then((res) => { setPosts(res.data); }).catch((e) => { console.log(e); });
        imageAPI.getAllImages().then((res) => { setData(res.data); }).catch((e) => { console.log(e); });
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
            link: '',
            destid: '',
            postid: ''
        })
        setIsEdit(false);
        setQueryFilter({
            search: '',
            destid: '',
            postid: '',
            order: 'createdAt',
            type: 'DESC',
            limit: null
        });
        setCurrentPage(1);
        setFilterOption('');
        imageAPI.getAllImages().then((res) => { setData(res.data); }).catch((e) => { console.log(e); });
    };

    const handleChangeEdit = (e) => {
        const { name, value } = e.target;
        setEdit({
            ...edit,
            [name]: value
        });
    }

    const handleEdit = () => {
        imageAPI.editImage(edit).then((res) => {
            toast.success('Cập nhật ảnh thành công');
            handleClickReset();
        }).catch((e) => {
            console.log(e);
            toast.error('Cập nhật ảnh thất bại');
        });
    }

    const handleCreate = () => {
        if (!edit.link) {
            toast.error('Vui lòng chọn ảnh');
            return;
        }
        console.log(edit);
        imageAPI.createImage(edit).then((res) => {
            toast.success('Thêm ảnh mới thành công');
            handleClickReset();
        }).catch((e) => {
            console.log(e);
            toast.error('Thêm ảnh mới thất bại');
        });
    }

    const handleDelete = () => {
        imageAPI.deleteImage(deleteItem.id).then((res) => {
            toast.success('Xóa ảnh thành công');
            setShowDeleteModal(false);
            handleClickReset();
        }).catch((e) => {
            console.log(e);
            toast.error('Xóa ảnh thất bại');
        });
    }

    const handleFilter = () => {
        imageAPI.getImagesByFilter(queryFilter).then((res) => { setData(res.data); }).catch((e) => { console.log(e); });
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleUploadImage = () => {
        const files = filesInputRef.current?.files;
        const formData = new FormData();
        if (files && files.length > 0) {
            Array.from(files).forEach(file => {
                if (file instanceof File) {
                    formData.append('images[]', file);
                }
            });
        }
        imageAPI.uploadImage(formData).then((res) => {
            console.log(res.data[0]);
            setEdit({ ...edit, link: res.data[0] });
            setShowAddImageModal(false);
        }).catch((e) => {
            console.log(e);
        });
    }

    return (
        <>
            <div className="usermanagement-container">
                <SystemSideBar hideSideBar={handleHideSidebar} />
                <div className={`usermanagement-main ${hideSidebar ? 'full-width' : ''}`}>
                    <h1 style={{ marginTop: 20, marginLeft: 20 }}>QUẢN LÝ HÌNH ẢNH</h1>
                    <div className="main-action">
                        <div className="edit-user" >
                            <div className="edit-item" style={{ width: 400, padding: 0, border: '1px solid #ccc' }}>
                                {edit.link && <img src={edit.link} alt="edit" style={{ width: '100%' }} />}
                            </div>
                            <div className="edit-item-post-wrapper">
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
                                    <div className="edit-item-label">Post</div>
                                    <select name="postid" value={edit.postid} onChange={(e) => handleChangeEdit(e)} style={{ height: 'fit-content' }}>
                                        <option value="">Chọn post</option>
                                        {posts.map((item, index) => (
                                            <option key={index} value={item.id}>{item.id}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="edit-item" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
                                    {!isEdit && <button className="btn btn-primary" onClick={() => setShowAddImageModal(true)}>Thêm ảnh</button>}
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
                                {filterOption === 'postid' && <div className="filter-option">
                                    <select className="btn btn-success" name="postid" value={queryFilter.postid} onChange={(e) => setQueryFilter({ ...queryFilter, postid: e.target.value })}>
                                        <option value="">Chọn mã bài</option>
                                        {posts.map((item, index) => (
                                            <option key={index} value={item.id}>{item.id}</option>
                                        ))}
                                    </select>
                                </div>}
                                {filterOption === "destid" && <div className="filter-option">
                                    <select className="btn btn-success" name="destid" value={queryFilter.destid} onChange={(e) => setQueryFilter({ ...queryFilter, destid: e.target.value })}>
                                        <option value="">Chọn điểm đến</option>
                                        {destinations.map((item, index) => (
                                            <option key={index} value={item.id}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>}
                            </div>
                            <div className="filter-option">
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic2">
                                        Lọc theo
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => setFilterOption('postid')}>Mã bài đánh giá</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setFilterOption('destid')}>Điểm đến</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown>
                                    <Dropdown.Toggle variant="warning" id="dropdown-basic">
                                        Sắp xếp theo
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => setQueryFilter({ ...queryFilter, type: 'DESC' })}>Mới nhất</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setQueryFilter({ ...queryFilter, type: 'ASC' })}>Cũ nhất</Dropdown.Item>
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
                                    <th>Hình ảnh</th>
                                    <th>Điểm đến</th>
                                    <th>Bài đánh giá</th>
                                    <th>THAO TÁC</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.length > 0 && paginatedData.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                        <td>
                                            <img src={item.link} alt="destination" style={{ width: 300 }} />
                                        </td>
                                        <td>{item.destid}</td>
                                        <td>{item.postid}</td>
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
                    <p>Bạn có chắc chắn muốn xoá?</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-danger" onClick={handleDelete}>Xoá</button>
                    <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Huỷ</button>
                </Modal.Footer>
            </Modal>
            <Modal className="addImageModal" show={showAddImageModal} onHide={() => setShowAddImageModal(false)} style={{ padding: '5%' }}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm ảnh mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form method='post' encType="multipart/form-data">
                        <input type="file" accept="image/*" multiple ref={filesInputRef} />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={handleUploadImage}>Thêm</button>
                    <button className="btn btn-secondary" onClick={() => setShowAddImageModal(false)}>Huỷ</button>
                </Modal.Footer>
            </Modal >
        </>
    );
};

export default connect()(ImageManagement);
