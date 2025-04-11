import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import './addpost.scss';
import { Modal } from "react-bootstrap";
import { AddImageModal, StarRating } from "../index";
import { userAPI, destAPI, postAPI } from "../../services";
import { toast } from "react-toastify";

const AddPost = ({ user, onReload, showEdit, post, onHide }) => {
    const [showAddPostModal, setShowAddPostModal] = useState(false);
    const [showAddImageModal, setShowAddImageModal] = useState(false);
    const [showDestinationModal, setShowDestinationModal] = useState(false);
    const [showImage, setShowImage] = useState(true);

    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState({});
    const [rate, setRate] = useState(0);
    const [links, setLinks] = useState([]);

    useEffect(() => {
        destAPI.getAllDestinations()
            .then((res) => {
                setDestinations(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        if (showEdit) {
            setShowAddPostModal(true);
            setContent(post.content || '');
            setImages(post.images || []);
            setSelectedDestination(post.destination || {});
            setRate(post.rate || 0);
        }
    }, [showEdit]);

    const handleClickAddPost = () => {
        setShowAddPostModal(true);
    }

    const handleShowImageModal = () => {
        setShowAddImageModal(!showAddImageModal);
    }

    const handleShowDestinationModal = () => {
        setShowDestinationModal(!showDestinationModal);
    }

    const handleRate = (newRate) => {
        setRate(newRate);
    }

    const handleCloseImageModal = () => {
        setShowAddImageModal(false);
    }

    const handleCloseDestinationModal = () => {
        setShowDestinationModal(false);
    }

    const handleInsertImage = (files) => {
        Array.from(files).slice(0).forEach((file) => {
            setImages((prevImages) => [...prevImages, file]);
        });
        handleCloseImageModal();
    }

    const handleUploadImage = () => {
        const formData = new FormData();
        let hasFile = false;

        images.forEach((image) => {
            if (image instanceof File) {
                formData.append('images[]', image);
                hasFile = true;
            }
        });

        if (hasFile) {
            userAPI.uploadImage(formData)
                .then((res) => {
                    handlePost(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            handlePost([]);
        }
    };


    const handleChangePostContent = (e) => {
        setContent(e.target.value);
    }

    const handleChangeDestionation = (destination) => {
        setSelectedDestination(destination);
        handleCloseDestinationModal();
    }

    const handlePost = async (images) => {
        let data = {
            content: content,
            rate: rate,
            destid: selectedDestination.id,
            images: images,
            userid: user.id
        }

        if (!post) {
            console.log('create post', data);
            postAPI.createpost(data)
                .then((res) => {
                    onReload(true);
                    toast.success('Đăng bài viết thành công');
                })
                .catch((err) => {
                    toast.error('Đăng bài viết thất bại');
                });
        } else {
            console.log('edit post', data);
            postAPI.editPost(post.id, data)
                .then((res) => {
                    onReload(true);
                    toast.success('Chỉnh sửa bài viết thành công');
                })
                .catch((err) => {
                    console.log(err);
                    toast.error('Chỉnh sửa bài viết thất bại');
                });
        }
        setContent('');
        setImages([]);
        setSelectedDestination({});
        setShowAddPostModal(false);
        onReload();
    }


    return (
        <>
            <div className="add-post-container">
                {!showEdit && (
                    <div className="add-post-wrapper">
                        <div className="add-post-user">
                            <div className="user-avt">
                                <img src={user.avatar} alt="avatar" className="userAvatar" style={{ width: 50, height: 50 }} />
                            </div>
                        </div>
                        <div className="add-post-button" onClick={handleClickAddPost}>
                            Bạn đã trải nghiệm gì?
                        </div>
                    </div>
                )}
            </div>
            {showAddImageModal && <AddImageModal show={handleShowImageModal} hide={handleCloseImageModal} uploadImage={handleInsertImage} />}
            <Modal
                className="add-post-modal"
                show={showAddPostModal}
                onHide={() => setShowAddPostModal(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Tạo bài viết
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="add-post-modal">
                        <div className="add-post-user">
                            <div className="user-avt">
                                <img src={user.avatar} alt="avatar" className="userAvatar" />
                            </div>
                            <div className="user-info">
                                <p className="fullname">{showEdit && post ? post.user.fullname : user.fullname}</p>
                                <span>
                                    &nbsp;tại&nbsp;
                                    <span className="destination">{selectedDestination.name}</span>
                                </span>
                            </div>
                        </div>
                        <div className="add-post-content">
                            <div className="add-post-rate">
                                <StarRating rating={showEdit ? rate : 0} colorChecked={'orange'} isEdit={true} handleRate={handleRate} />
                            </div>
                            <textarea
                                placeholder="Bạn đang nghĩ gì?"
                                value={content}
                                onChange={(e) => handleChangePostContent(e)}
                            />
                            {showImage && images.length > 0 && (
                                <div className="add-post-image">
                                    {images && images.map((image, index) => (
                                        <div key={index} className={`image-item`} style={{ width: `${(100 / (images.length)) - 2}%` }}>
                                            <img src={image instanceof File ? URL.createObjectURL(image) : image.link} key={index} alt='destination' />
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="add-post-footer">
                                <div className="add-post-action">
                                    <div className="add-post-action-title">Thêm vào bài viết của bạn</div>
                                    <div className="add-post-action-icon">
                                        <i className="fa-solid fa-image" onClick={handleShowImageModal} />
                                        <i className="fa-solid fa-location-dot" onClick={handleShowDestinationModal} />
                                    </div>
                                </div>
                                <div className={`add-post-button ${content && images ? 'submit' : ''}`} onClick={handleUploadImage}>
                                    Đăng
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal show={showDestinationModal} onHide={handleCloseDestinationModal} className="district-list-modal">
                <Modal.Header closeButton>
                    <Modal.Title>CHỌN ĐỊA ĐIỂM</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="district-list">
                        {destinations && destinations.map((destination, index) => (
                            <div className="district-item" key={index} onClick={() => handleChangeDestionation(destination)}>
                                {destination.name}
                            </div>
                        ))}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

const mapStateToProps = state => ({
    user: state.user.user
})

export default connect(mapStateToProps)(AddPost);
