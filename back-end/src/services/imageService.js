import db from '../models/index';

let createImage = async (data) => {
    try {
        let { link, destid, postid } = data;
        let image = await db.Images.create({
            link: link,
            destid: destid,
            postid: postid
        });
        return image || {};
    } catch (e) {
        console.log(e);
    }
};

let getAllImages = async () => {
    try {
        let images = await db.Images.findAll({
            include: [
                {
                    model: db.Destinations,
                    as: 'destination',
                },
                {
                    model: db.Posts,
                    as: 'post',
                }
            ]
        });
        return images;
    } catch (e) {
        console.log(e);
    }
}

let editImage = async (data) => {
    try {
        let { id, link, destid, postid } = data;
        let image = await db.Images.update({
            link: link,
            destid: destid,
            postid: postid
        }, {
            where: {
                id: id
            }
        });
        return image;
    } catch (e) {
        console.log(e);
    }
}

let deleteImage = async (id) => {
    try {
        let image = await db.Images.destroy({
            where: {
                id: id
            }
        });
        return image;
    } catch (e) {
        console.log(e);
    }
}

let getImagesByFilter = async (query) => {
    try {
        let { search, destid, postid, order, type, limit } = query;
        let images = await db.Images.findAll({
            where: {
                ...destid && { destid: destid },
                ...postid && { postid: postid },
            },
            include: [
                {
                    model: db.Destinations,
                    as: 'destination',
                },
                {
                    model: db.Posts,
                    as: 'post',
                }
            ],
            order: [
                [order || 'createdAt', type || 'DESC']
            ],
            limit: limit || 10
        });
        return images;
    } catch (e) {
        console.log(e);
    }
}

export default {
    createImage,
    getAllImages,
    editImage,
    deleteImage,
    getImagesByFilter
}