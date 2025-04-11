import { literal, col } from 'sequelize';
import db from '../models/index';

let getPostsByUserID = async (userid, order, type, limit) => {
    try {
        let res = {};
        let posts = await db.Posts.findAll({
            where: { userid: userid },
            order: [
                [order, type]
            ],
            limit: limit,
            include: [{
                model: db.Users,
                as: 'user',
                attributes: ['id', 'fullname', 'username', 'avatar']
            },
            {
                model: db.Images,
                as: 'images',
                attributes: ['link']
            },
            {
                model: db.Destinations,
                as: 'destination',
                attributes: ['id', 'name'],
                include: [{
                    model: db.Districts,
                    as: 'districts',
                    attributes: ['id', 'name']
                }]
            }
            ]
        });
        if (posts) {
            res.errCode = '';
            res.message = 'Get posts successfully';
            res.posts = posts;
        } else {
            res.errCode = '1';
            res.message = 'Cannot get posts';
            res.posts = [];
        }
        return res;
    } catch (e) {
        throw e;
    }
}

let getPostsByDestination = async (destid, order, type, limit) => {
    try {
        let posts = await db.Posts.findAll({
            where: { destid: destid },
            order: [
                [order, type]
            ],
            limit: limit,
            include: [{
                model: db.Users,
                as: 'user',
                attributes: ['id', 'fullname', 'username', 'avatar']
            },
            {
                model: db.Images,
                as: 'images',
                attributes: ['link']
            }
            ]
        });
        return posts ? posts : [];
    } catch (e) {
        throw e;
    }
}

let getPostsByOrder = async (order, type, limit) => {
    try {
        let posts = await db.Posts.findAll({
            order: [
                [order, type]
            ],
            limit: limit,
            include: [{
                model: db.Users,
                as: 'user'
            },
            {
                model: db.Images,
                as: 'images',
                attributes: ['link']
            }]
        });
        return posts;
    } catch (e) {
        throw e;
    }
};

let createPost = async (title, content, destid, userid, rate) => {
    try {
        console.log(title, content, destid, userid, rate);
        let post = await db.Posts.create({
            title: title,
            content: content,
            destid: destid,
            userid: userid,
            rate: rate
        });
        if (post) {
            return post;
        }
        return {};
    } catch (e) {
        console.log(e);
    }
};

let editPost = async (postid, content, rate, destid) => {
    try {
        let post = await db.Posts.update({
            content: content,
            destid: destid,
            rate: rate
        }, {
            where: {
                id: postid
            }
        });
        return post ? post : {};
    } catch (e) {
        console.log(e);
    }
};

let deletePost = async (postid) => {
    try {
        let post = await db.Posts.destroy({
            where: {
                id: postid
            }
        });
        if (post) {
            return {};
        }
        return postid;
    } catch (e) {
        console.log(e);
    }
}

const getPostsByFilter = async (query) => {
    try {
        const { search, userid, rate, distid, order, type, limit } = query;
        const data = await db.Posts.findAll({
            where: {
                ...(rate ? { rate } : {}),
                ...(userid ? { userid } : {}),
                content: { [db.Sequelize.Op.like]: `%${search}%` }
            },
            order: [[order || 'createdAt', type || 'DESC']],
            limit: parseInt(limit) || 10,
            include: [
                {
                    model: db.Users,
                    as: 'user',
                    attributes: { exclude: ['password'] }
                },
                {
                    model: db.Images,
                    as: 'images',
                    attributes: ['link']
                },
                {
                    model: db.Destinations,
                    as: 'destination',
                    attributes: ['name', 'distid'],
                    required: !!distid,  // 'required' set to true only if distid is provided
                    where: distid ? { distid } : undefined,
                    include: [
                        {
                            model: db.Districts,
                            as: 'districts',
                            attributes: ['name']
                        }
                    ]
                }
            ]
        });

        return data || [];
    } catch (error) {
        console.error('Error fetching posts by filter:', error);
    }
};

const getAllPosts = async () => {
    try {
        const data = await db.Posts.findAll({
            include: [
                {
                    model: db.Users,
                    as: 'user',
                    attributes: { exclude: ['password'] }
                },
                {
                    model: db.Images,
                    as: 'images',
                    attributes: ['link']
                },
                {
                    model: db.Destinations,
                    as: 'destination',
                    attributes: ['name'],
                    include: [
                        {
                            model: db.Districts,
                            as: 'districts',
                            attributes: ['name']
                        }
                    ]
                }
            ]
        });

        return data || [];
    } catch (error) {
        console.error('Error fetching all posts:', error);
    }
}


export default {
    getPostsByUserID,
    getPostsByDestination,
    getPostsByOrder,
    createPost,
    editPost,
    deletePost,
    getPostsByFilter,
    getAllPosts
};