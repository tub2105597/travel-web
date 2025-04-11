import { where } from 'sequelize';
import db from '../models/index';

const { Op } = require("sequelize");

const getFavourite = async (userid, destid) => {
    try {
        let favourite = await db.Favourites.findOne({
            where: {
                userid: userid,
                destid: destid
            }
        });
        return favourite ? favourite : {};
    } catch (error) {
        console.log(error);
        return null;
    }
}

const createFavourite = async (userid, destid) => {
    try {
        const existedFavourite = await db.Favourites.findOne({
            where: {
                userid: userid,
                destid: destid
            },
            raw: false
        });
        if (existedFavourite) {
            existedFavourite.destroy();
        }
        const favourite = await db.Favourites.create({
            userid: userid,
            destid: destid
        });
        return favourite;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const deleteFavourite = async (userid, destid) => {
    try {
        const favourite = await db.Favourites.findOne({
            where: {
                userid: userid,
                destid: destid
            }
        });
        if (favourite) {
            favourite.destroy();
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const getFavouritesOfUser = async (userid) => {
    try {
        const favourites = await db.Favourites.findAll({
            where: {
                userid: userid
            },
            include: [
                {
                    model: db.Destinations,
                    as: 'destinations',
                    include: [
                        {
                            model: db.Images,
                            as: 'images'
                        }
                    ]
                }
            ],
        });
        return favourites;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getAllFavourites = async (data) => {
    try {
        let { search, order, type } = data;
        const favourites = await db.Favourites.findAll({
            include: [
                {
                    model: db.Destinations,
                    as: 'destinations',
                },
                {
                    model: db.Users,
                    as: 'users'
                }
            ],
            where: {
                [Op.or]: [
                    { destid: { [Op.like]: `%${search}%` } },
                    { userid: { [Op.like]: `%${search}%` } }
                ]
            },
            order: [
                [order, type]
            ]
        });
        return favourites || [];
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default {
    getFavourite,
    createFavourite,
    deleteFavourite,
    getFavouritesOfUser,
    getAllFavourites
}