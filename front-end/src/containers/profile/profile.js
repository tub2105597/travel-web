import React, { useState, useEffect } from "react";
import './profile.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { PostArticle, EditUser, AddPost, AddImageModal, DestinationArticle } from "../../components";
import { userAPI, postAPI, favouriteAPI } from '../../services';
import { convertDate } from "../../utils/time";
import * as userActions from "../../store/actions/userActions";

const Profile = ({ user, editUser, deleteUser }) => {
    const [posts, setPosts] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [activeTabs, setActiveTabs] = useState({
        favorite: '',
        post: '',
        edit: '',
        delete: ''
    });
    const [showDeleteModal, setShowDeleteModal] = useState(activeTabs.delete === 'active');
    const [showEditAvatar, setShowEditAvatar] = useState(false);
    const [isReload, setIsReload] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [profileUser, setProfileUser] = useState({});

    useEffect(() => {
        if (location.state && location.state.userid) {
            userAPI.getProfile(location.state.userid).then(res => { setProfileUser(res.data.user); }).catch(err => { console.log(err); });
            postAPI.getpostbyuser(location.state.userid).then(res => { setPosts(res.data.posts); }).catch(err => { console.log(err); });
            favouriteAPI.getFavouritesOfUser(location.state.userid).then(res => { setFavourites(res.data) }).catch(err => { console.log(err); });
        }
    }, []);

    useEffect(() => {
        if (isReload) {
            postAPI.getpostbyuser(user.id).then(res => { setPosts(res.data.posts); setIsReload(false); }).catch(err => { console.log(err); });
        }
    }, [isReload, user.id]);

    // Upload Avatar
    const handleUploadImage = (images) => {
        const formData = new FormData();
        Array.from(images).forEach((image) => {
            if (image instanceof File) {
                formData.append('images[]', image);
            }
        });

        userAPI.uploadImage(formData)
            .then((res) => {
                console.log('res', res.data);
                handleEditAvatar(user.username, res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    //Edit Avatar
    const handleEditAvatar = (username, link) => {
        console.log('Edit Avatar: ', username, link);
        userAPI.editAvatar(username, link)
            .then(res => {
                editUser(res.data);
                handleCloseModal();
                toast.success('Cập nhật ảnh đại diện thành công');
            })
            .catch(err => {
                console.log(err);
                toast.error('Cập nhật ảnh đại diện thất bại');
            });
    }

    //Edit User
    const handleEditUser = (user) => {
        userAPI.editUser(user)
            .then(res => {
                editUser(res.data);
                setProfileUser(res.data);
                resetActiveTabs();
                toast.success('Cập nhật thông tin thành công');
            })
            .catch(err => {
                console.log(err);
            });
    };

    //Delete User
    const handleDeleteUser = () => {
        userAPI.deleteUser(user.username)
            .then(res => {
                deleteUser();
                handleCloseModal();
                navigate('/');
            })
            .catch(err => {
                console.log(err);
            });
    };

    //Modal
    const handleshowEditAvatar = () => {
        setShowEditAvatar(!showEditAvatar);
    };

    const handleCloseEditAvatar = () => {
        setShowEditAvatar(false);
    };

    const handleCloseModal = () => {
        setShowDeleteModal(false);
        setShowEditAvatar(false);
    };

    //onClick
    const handleClick = (tab) => {
        setActiveTabs((prevTabs) => ({
            ...Object.keys(prevTabs).reduce((acc, key) => {
                acc[key] = '';
                return acc;
            }, {}),
            [tab]: 'active'
        }));
    };

    const handleReload = (reload) => {
        setIsReload(reload);
    };

    const resetActiveTabs = () => {
        setActiveTabs({
            favorite: '',
            post: '',
            edit: '',
            delete: ''
        });
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-user">
                    <div className="user-avatar">
                        <img src={profileUser.avatar} alt="avatar" onClick={resetActiveTabs} />
                        {user.id === profileUser.id && (
                            <div className="avatar-edit-icon" onClick={handleshowEditAvatar}>
                                <i className="fa-solid fa-camera" />
                            </div>
                        )}
                    </div>
                    <div className="user-fullname">
                        <h3 onClick={resetActiveTabs}>{profileUser.fullname}</h3>
                        <p onClick={resetActiveTabs}>@ {profileUser.username}</p>
                    </div>
                </div>
                <div className="signout-btn">
                    {/* Add sign out button here if needed */}
                </div>
            </div>
            <div className="profile-wrapper">
                <div className="profile-sidebar">
                    <div className={`sidebar-item ${activeTabs.post}`} onClick={() => handleClick('post')}>
                        <i className="fa-solid fa-users" />
                        Bài đăng gần đây
                    </div>
                    {user.id === profileUser.id && (
                        <>
                            <div className={`sidebar-item ${activeTabs.favorite}`} onClick={() => handleClick('favorite')}>
                                <i className="fa-solid fa-heart" />
                                Điểm đến yêu thích
                            </div>
                            <div className={`sidebar-item ${activeTabs.edit}`} onClick={() => handleClick('edit')}>
                                <i className="fa-solid fa-user-pen" />
                                Chỉnh sửa hồ sơ
                            </div>
                            <div className={`sidebar-item ${activeTabs.delete}`} onClick={() => { handleClick('delete'); setShowDeleteModal(true) }}>
                                <i className="fa-solid fa-circle-exclamation" />
                                Xóa tài khoản
                            </div>
                        </>
                    )}
                </div>
                <div className="profile-main">
                    {!activeTabs.delete && !activeTabs.edit && !activeTabs.post && !activeTabs.favorite && (
                        < div className="profile-info" >
                            <div className="info-item">
                                <span className="info-title">Email:</span>
                                {profileUser.email}
                            </div>
                            <div className="info-item">
                                <span className="info-title">Giới tính:</span>
                                {profileUser.gender === 'female' ? 'Nữ' : 'Nam'}
                            </div>
                            <div className="info-item">
                                <span className="info-title">Ngày sinh:</span>
                                {convertDate(profileUser.DoB)}
                            </div>
                            <div className="info-item">
                                <span className="info-title">Địa chỉ:</span>
                                {profileUser.address}
                            </div>
                        </div>
                    )}

                    {activeTabs.post === 'active' && user.id === profileUser.id && (<AddPost onReload={handleReload} />)}
                    {activeTabs.post === 'active' && posts.length > 0 && (
                        posts.map((item) => (
                            <PostArticle key={item.id} user={profileUser} post={item} onReload={handleReload} />
                        ))
                    )}
                    {activeTabs.favorite === 'active' &&
                        <div className="profile-favourite">
                            {favourites.length > 0 && (
                                favourites.map((item) => (
                                    <DestinationArticle key={item.id} destination={item.destinations} />
                                ))
                            )}
                        </div>
                    }
                    {activeTabs.edit === 'active' && <EditUser user={user} handleEditUser={handleEditUser} />}
                </div>
            </div>
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} className="userDelete-modal">
                <Modal.Header closeButton>
                    <Modal.Title>XÁC NHẬN XÓA TÀI KHOẢN</Modal.Title>
                </Modal.Header>
                <Modal.Body>Mọi dữ liệu trong tài của bạn sẽ biến mất nếu tài khoản này bị xóa. Bạn thực sự muốn xóa tài khoản này?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setShowDeleteModal(false); resetActiveTabs() }}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={handleDeleteUser}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
            {showEditAvatar && <AddImageModal showEdit={false} show={handleshowEditAvatar} hide={handleCloseEditAvatar} uploadImage={handleUploadImage} />}
        </div>
    );
};

const mapStateToProps = (state) => ({
    user: state.user.user
});

const mapDispatchToProps = (dispatch) => ({
    editUser: (user) => dispatch(userActions.userEditSuccess(user)),
    deleteUser: () => dispatch(userActions.userDeleteSuccess())
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
