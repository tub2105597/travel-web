import { query } from "express";
import { postService, userService, imageService, destinationService } from "../services";

let getPostsForHome = async (req, res) => {
    let data = await postService.getPostsByOrder('createdAt', 'DESC', 10);
    return res.status(200).json({ data });
}

let getNewPostByUser = async (req, res) => {
    let userid = req.query.userid;
    let data = {};
    if (userid) {
        data = await postService.getPostsByUserID(userid, 'createdAt', 'DESC', null);
        return res.status(200).json({ data });
    } else {
        data = await postService.getPostsByUserID(null, 'createdAt', 'DESC', null);
    }
    return res.status(200).json({ data });
}

let createPost = async (req, res) => {
    try {
        console.log(req.body.data);
        let data = {};
        let images = req.body.data.images;
        data.post = await postService.createPost(null, req.body.data.content, req.body.data.destid, req.body.data.userid, req.body.data.rate);
        data.images = [];
        if (images && Array.isArray(images) && images.length > 0) {
            data.images = await Promise.all(images.map(async (image, index) => {
                let savedImage = {
                    link: image,
                    destid: req.body.data.destid,
                    postid: data.post.id
                }
                let createdImage = await imageService.createImage(savedImage);
                return createdImage; // Đẩy hình ảnh đã tạo vào mảng
            }));
        }
        return res.status(200).json({ data });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

let editPost = async (req, res) => {
    try {
        let data = {};
        let images = req.body.data.images;

        data.post = await postService.editPost(req.params.id, req.body.data.content, req.body.data.rate, req.body.data.destid);

        data.images = [];
        console.log(images);
        if (images.length > 0) {
            data.images = await Promise.all(images.map(async (image, index) => {
                let createdImage = await imageService.createImage(image, req.body.data.destid, req.params.id);
                return createdImage;
            }));
        }

        return res.status(200).json({ data });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: e.message });
    }
}

let deletePost = async (req, res) => {
    try {
        let data = await postService.deletePost(req.params.id);
        return res.status(200).json({ data });
    } catch (e) {
        console.log(e);
    }
}

const getPostsByFilter = async (req, res) => {
    try {
        let data = await postService.getPostsByFilter(req.query);
        return res.status(200).json({ data });
    } catch (e) {
        console.log(e);
    }
}

const getAllPosts = async (req, res) => {
    try {
        let data = await postService.getAllPosts();
        return res.status(200).json({ data });
    } catch (e) {
        console.log(e);
    }
}

export default {
    getPostsForHome,
    getNewPostByUser,
    createPost,
    editPost,
    deletePost,
    getPostsByFilter,
    getAllPosts
}