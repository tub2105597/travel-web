import e from "express";
import { favouriteService } from "../services";

const getFavourite = async (req, res) => {
    try {
        let { userid, destid } = req.query;
        let data = await favouriteService.getFavourite(userid, destid);
        return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json(error);
    }
}

const createFavourite = async (req, res) => {
    try {
        let { userid, destid } = req.body;
        let data = await favouriteService.createFavourite(userid, destid);
        return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json(error);
    }
}

const deleteFavourite = async (req, res) => {
    try {
        console.log(req.query);
        let { userid, destid } = req.query;
        let data = await favouriteService.deleteFavourite(userid, destid);
        return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getFavouritesOfUser = async (req, res) => {
    try {
        let { userid } = req.query;
        let data = await favouriteService.getFavouritesOfUser(userid);
        return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getAllFavourites = async (req, res) => {
    try {
        let data = await favouriteService.getAllFavourites(req.query);
        return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json(error);
    }
}

export default {
    getFavourite,
    createFavourite,
    deleteFavourite,
    getFavouritesOfUser,
    getAllFavourites
}