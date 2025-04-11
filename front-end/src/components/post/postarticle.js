import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import './postarticle.scss';
import { Dropdown, Modal } from "react-bootstrap";
import { CommentCard, AddPost, StarRating } from "../../components";
import { convertTime } from '../../utils/time.js';
import { postAPI } from '../../services';
import { toast } from "react-toastify";

const PostArticle = ({ userLogin, user, post, onReload }) => {
    const [likes, setLikes] = useState(0);
    const [showComment, setShowComment] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const navigate = useNavigate();

    const handleShowEdit = () => {
        setShowEdit(!showEdit);
    }

    const handleShowDelete = () => {
        setShowDelete(!showDelete);
    }

    const handleDelete = () => {
        postAPI.deletePost(post.id)
            .then(res => {
                console.log(res);
                toast.success('Xóa bài viết thành công');
            })
            .catch(err => {
                console.log(err);
                toast.error('Xóa bài viết thất bại');
            });
        setShowDelete(false);
        onReload();
    }

    const directToDetail = () => {
        navigate(`/destination/${post.destination.id}`);
    }

    const directToProfile = () => {
        navigate(`/${user.username}`, { state: { userid: user.id } });
    }

    return (
        <>
            <div className="post-article-container">
                <div className="post-article-main">
                    <div className="post-article-header">
                        <div className="post-article-header__user">
                            <img src={user.avatar} alt="post" onClick={directToProfile} />
                            <div className="post-article-header__header">
                                <div className="post-article-header__info">
                                    <h6 onClick={directToProfile}>{user.fullname}</h6>
                                    <p>{convertTime(post.createdAt)}</p>
                                </div>
                                {post.destination && <div className="post-article-header__location">
                                    tại
                                    <span onClick={directToDetail}>{post.destination.name}</span>
                                </div>
                                }
                            </div>
                        </div>
                        {userLogin.id === user.id && (
                            <div className="post-article-header__action" >
                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-basic">
                                        <i className="fa-solid fa-ellipsis" />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={handleShowEdit}>
                                            <i className="fa-solid fa-gear" />&nbsp; Chỉnh sửa bài viết
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={handleShowDelete}>
                                            <i className="fa-solid fa-trash" />&nbsp; Xóa bài viết
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        )}
                    </div>
                    <div className="post-article-content">
                        <div className="post-rate">
                            <StarRating rating={post.rate} colorChecked={'orange'} />
                        </div>
                        <p>{post.content}</p>
                    </div>
                    <div className="post-article-images">
                        {post && post.images.length > 0 && post.images.map((item, index) => (
                            <div className="post-article-images__item" key={index} style={{ width: `${(100 / post.images.length) - 2}%` }}>
                                <img src={item.link} alt="post" key={index} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {showEdit && (<AddPost showEdit={showEdit} onHide={() => setShowEdit(false)} post={post} onReload={onReload} />)}
            <Modal show={showDelete} onHide={() => setShowDelete(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa bài viết</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Bạn có chắc chắn muốn xóa bài viết này không?</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={() => setShowDelete(false)}>Hủy</button>
                    <button className="btn btn-danger" onClick={handleDelete}>Xóa</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        userLogin: state.user.user
    }
}
export default connect(mapStateToProps)(PostArticle);