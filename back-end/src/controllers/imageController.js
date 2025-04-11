import e from 'express';
import upload from '../config/multerConfig';  // Import multerConfig
import { imageService } from '../services';

// Controller để xử lý việc upload ảnh
let handleUpload = async (req, res) => {
    try {
        upload.array('images[]', 10)(req, res, (err) => {  // Expect 'images[]' key from client
            if (err) {
                return res.status(500).json({ message: 'Error uploading files', error: err.message });
            }
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ message: 'Please upload at least one file!' });
            }
            // Generate link for each uploaded file
            let data = req.files.map(file => {
                return `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
            });
            // Gửi phản hồi sau khi xử lý xong
            return res.status(200).json({ data });
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'An error occurred', error: e.message });
    }
};

let createImage = async (req, res) => {
    try {
        console.log(req.body);
        let image = await imageService.createImage(req.body.data);
        return res.status(200).json({ image });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'An error occurred', error: e.message });
    }
}

let getAllImages = async (req, res) => {
    try {
        let data = await imageService.getAllImages();
        console.log(data);
        return res.status(200).json({ data });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'An error occurred', error: e.message });
    }
}

let editImage = async (req, res) => {
    try {
        let data = await imageService.editImage(req.body.data);
        return res.status(200).json({ data });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'An error occurred', error: e.message });
    }
}

let deleteImage = async (req, res) => {
    try {
        console.log(req);
        let data = await imageService.deleteImage(req.query.id);
        return res.status(200).json({ data });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'An error occurred', error: e.message });
    }
}

let getImagesByFilter = async (req, res) => {
    try {
        let data = await imageService.getImagesByFilter(req.query);
        return res.status(200).json({ data });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'An error occurred', error: e.message });
    }
}

export default {
    handleUpload,
    createImage,
    getAllImages,
    editImage,
    deleteImage,
    getImagesByFilter
};
