import db from '../models/index';
const { fn, col, literal, where, Op } = require('sequelize');

let getDestinationByID = async (id) => {
    try {
        let destination = await db.Destinations.findOne({
            where: { id: id },
            attributes: {
                include: [[fn('ROUND', fn('AVG', col('posts.rate')), 1), 'rate']]
            },
            include: [{
                model: db.Images,
                as: 'images'
            },
            {
                model: db.Districts,
                as: 'districts'
            },
            {
                model: db.Posts,
                as: 'posts',
                include: [{
                    model: db.Users,
                    as: 'user',
                },
                {
                    model: db.Images,
                    as: 'images',
                }]
            }],
            group: ['Destinations.id'],
        });
        return destination ? destination : {};
    } catch (e) {
        throw e;
    }
}

let getAllDestinations = async () => {
    try {
        let dests = await db.Destinations.findAll({
            attributes: {
                include: [[fn('ROUND', fn('AVG', col('posts.rate')), 1), 'rate']]
            },
            include: [{
                model: db.Images,
                as: 'images'
            },
            {
                model: db.Districts,
                as: 'districts'
            },
            {
                model: db.Posts,
                as: 'posts',
                include: [{
                    model: db.Users,
                    as: 'user',
                    attributes: ['id', 'fullname']
                },
                {
                    model: db.Images,
                    as: 'images',
                    attributes: ['link']
                }
                ],
            }],
            group: ['Destinations.id'], // Nhóm theo ID của Destinations
        });
        return dests ? dests : [];
    } catch (e) {
        throw e;
    }
};

let getDestsByOrder = async (order, type, limit) => {
    try {
        let dests = await db.Destinations.findAll({
            attributes: [
                'id',
                'name',
                [literal(`(SELECT AVG(posts.rate) FROM Posts WHERE Posts.destid = Destinations.id)`), 'destRate']
            ],
            include: [{
                model: db.Images,
                as: 'images',
                attributes: ['link']
            },
            {
                model: db.Districts,
                as: 'districts',
                attributes: ['name']
            }],
            order: [[literal('destRate'), type]],
            limit: limit
        });
        return dests ? dests : [];
    } catch (e) {
        throw e;
    }
};

let getDestByDistrict = async (distid, order, type, limit) => {
    try {
        let dests = await db.Destinations.findAll({
            where: { distid: distid },
            include: [{
                model: db.Images,
                as: 'images',
                attributes: ['link']
            },
            {
                model: db.Districts,
                as: 'districts',
                attributes: ['name']
            }]
        });
        return dests;
    } catch (e) {
        throw e;
    }
};


let getRatesByDestination = async (id) => {
    try {
        let rates = await db.Posts.findAll({
            where: { destid: id },
            attributes: ['rate']
        });
        return rates ? rates : [];
    } catch (e) {
        throw e;
    }
}

const getDestinationsByFilter = async (query) => {
    try {
        const { search, rate, distid, order, type, limit } = query;
        const searchAttributes = ['name', 'description', 'location', 'time', 'price', 'advantage', 'weakness'];
        let dests = await db.Destinations.findAll({
            attributes: [
                'id',
                'name',
                'description',
                'location',
                'time',
                'price',
                'advantage',
                'weakness',
                'createdAt',
                'updatedAt',
                [literal(`(SELECT AVG(posts.rate) FROM Posts WHERE Posts.destid = Destinations.id)`), 'destRate']
            ],
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } },
                    { description: { [Op.like]: `%${search}%` } },
                    { location: { [Op.like]: `%${search}%` } },
                    { time: { [Op.like]: `%${search}%` } },
                    { price: { [Op.like]: `%${search}%` } },
                    { advantage: { [Op.like]: `%${search}%` } },
                    { weakness: { [Op.like]: `%${search}%` } }
                ],
                [Op.and]: [
                    distid ? { distid: distid } : {}
                ]
            },
            having: rate ? { destRate: rate } : {},
            include: [{
                model: db.Images,
                as: 'images',
                attributes: ['link']
            },
            {
                model: db.Districts,
                as: 'districts',
                attributes: ['name'],
            }
            ],
            order: [[order || 'createdAt', type || 'DESC']],
            limit: parseInt(limit) || 10
        });
        return dests ? dests : [];
    } catch (e) {
        throw e;
    }
}

let editDestination = async (id, data) => {
    try {
        let destination = await db.Destinations.update(data, { where: { id: id } });
        return destination ? destination : {};
    } catch (e) {
        throw e;
    }
}

let createDestination = async (data) => {
    try {
        let destination = await db.Destinations.create(data);
        return destination ? destination : {};
    } catch (e) {
        throw e;
    }
}

let deleteDestination = async (id) => {
    try {
        let destination = await db.Destinations.destroy({ where: { id: id } });
        return destination ? destination : {};
    } catch (e) {
        throw e;
    }
}

let getLocation = async (id) => {
    try {
        // Tìm điểm đến theo id và lấy thuộc tính location
        let location = await db.Destinations.findOne({
            where: { id: id },
            attributes: ['location']
        });

        // Trả về giá trị location (nếu có), nếu không có thì trả về chuỗi rỗng
        return location ? location.get('location') : null;
    } catch (e) {
        throw e;
    }
};

let getName = async (id) => {
    try {
        // Tìm điểm đến theo id và lấy thuộc tính name
        let name = await db.Destinations.findOne({
            where: { id: id },
            attributes: ['name']
        });

        // Trả về giá trị name (nếu có), nếu không có thì trả về chuỗi rỗng
        return name ? name.get('name') : null;
    } catch (e) {
        throw e;
    }
};

let getTime = async (id) => {
    try {
        let time = await db.Destinations.findOne({
            where: { id: id },
            attributes: ['time']
        });

        return time ? time.get('time') : null;
    } catch (e) {
        throw e;
    }
}

let getPrice = async (id) => {
    try {
        let price = await db.Destinations.findOne({
            where: { id: id },
            attributes: ['price']
        });

        return price ? price.get('price') : null;
    } catch (e) {
        throw e;
    }
}

let getAdvantage = async (id) => {
    try {
        let advantage = await db.Destinations.findOne({
            where: { id: id },
            attributes: ['advantage']
        });

        return advantage ? advantage.get('advantage') : null;
    } catch (e) {
        throw e;
    }
}
let getWeakness = async (id) => {
    try {
        let weakness = await db.Destinations.findOne({
            where: { id: id },
            attributes: ['weakness']
        });

        return weakness ? weakness.get('weakness') : null;
    } catch (e) {
        throw e;
    }
}

let getDescription = async (id) => {
    try {
        let description = await db.Destinations.findOne({
            where: { id: id },
            attributes: ['description']
        });

        return description ? description.get('description') : null;
    } catch (e) {
        throw e;
    }
}

let getRate = async (id) => {
    try {
        // Tính toán trung bình của `rate` trong `Posts` bằng `destid` mà không cần liên kết với `Destinations`
        let rate = await db.Posts.findOne({
            attributes: [
                [literal(`(SELECT FORMAT(AVG(rate), 2) FROM Posts WHERE destid = ${id})`), 'averageRate']
            ]
        });

        return rate ? rate.get('averageRate') : null;
    } catch (e) {
        throw e;
    }
};

let getNumberPosts = async (id) => {
    try {
        let numberPosts = await db.Posts.count({
            where: { destid: id }
        });

        return numberPosts ? numberPosts : null;
    } catch (e) {
        throw e;
    }
}

let getImage = async (id) => {
    try {
        let images = await db.Images.findAll({
            where: { destid: id },
            attributes: ['link'],
        });

        return images.length > 0 ? images.map(img => img.link) : null;
    } catch (e) {
        throw e;
    }
}

let getDestIDByName = async (name) => {
    try {
        let dest = await db.Destinations.findOne({
            where: { name: name },
            attributes: ['id']
        });
        return dest ? dest.get('id') : null;
    } catch (e) {
        throw e;
    }
}

const getDestinationsByDistrict = async (distid) => {
    try {
        let destinations = await db.Destinations.findAll({
            where: { distid: distid },
            include: [{
                model: db.Images,
                as: 'images',
                attributes: ['link']
            }],
        });
        return destinations ? destinations : [];
    } catch (e) {
        throw e;
    }
}


export default {
    getAllDestinations,
    getDestsByOrder,
    getDestByDistrict,
    getDestinationByID,
    getRatesByDestination,
    getDestinationsByFilter,
    editDestination,
    createDestination,
    deleteDestination,
    getLocation,
    getName,
    getTime,
    getPrice,
    getAdvantage,
    getWeakness,
    getDescription,
    getRate,
    getNumberPosts,
    getImage,
    getDestIDByName,
    getDestinationsByDistrict
};
