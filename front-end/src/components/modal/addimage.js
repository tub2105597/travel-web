import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import './addimage.scss';

const AddImageModal = ({ show, hide, uploadImage }) => {
    const [selectedAvatar, setSelectedAvatar] = useState({});
    //onChange
    const handleChangeAvatar = (event) => {
        if (event.target.files) {
            setSelectedAvatar(event.target.files);
        }
    };

    const handleUploadImage = () => {
        uploadImage(selectedAvatar);
        hide();
    }



    return (
        <Modal show={show} onHide={hide} className="add-image-modal">
            <Modal.Header closeButton>
                <Modal.Title>CHỌN ẢNH</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <form method='post' encType="multipart/form-data">
                    <input type="file" accept="image/*" multiple onChange={handleChangeAvatar} />
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleUploadImage}>
                    Xác nhận
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddImageModal;