import { destinationService, postService } from "../services";
import db from '../models';


let getAllDestinations = async (req, res) => {
    try {
        const data = await destinationService.getAllDestinations();
        return res.status(200).json({ data });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

let getDestinationByID = async (req, res) => {
    try {
        let destId = req.params.id;
        let data = {};
        data.destination = await destinationService.getDestinationByID(destId);
        data.posts = await postService.getPostsByDestination(destId, 'createdAt', 'DESC', null);
        return res.status(200).json({ data });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

let getRatesByDestination = async (req, res) => {
    try {
        let destId = req.params.destId;
        let data = await destinationService.getRatesByDestination(destId);
        return res.status(200).json({ data });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

let getDestinationsForHome = async (req, res) => {
    try {
        let data = await destinationService.getDestsByOrder('rate', 'DESC', 3);
        return res.status(200).json({ data });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

let getDestinationsByFilter = async (req, res) => {
    try {
        let data = await destinationService.getDestinationsByFilter(req.query);
        return res.status(200).json({ data });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

let createDestination = async (req, res) => {
    try {
        let data = await destinationService.createDestination(req.body.destination);
        return res.status(200).json({ data });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

let editDestination = async (req, res) => {
    try {
        let destId = req.body.destination.id;
        let data = await destinationService.editDestination(destId, req.body.destination);
        return res.status(200).json({ data });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

let deleteDestination = async (req, res) => {
    try {
        let destId = req.query.id;
        let data = await destinationService.deleteDestination(destId);
        return res.status(200).json({ data });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getDestinationsByDistrict = async (req, res) => {
    try {

        let data = await destinationService.getDestinationsByDistrict(req.query.distid);
        return res.status(200).json({ data });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default {
    getAllDestinations,
    getDestinationByID,
    getRatesByDestination,
    getDestinationsForHome,
    getDestinationsByFilter,
    editDestination,
    createDestination,
    deleteDestination,
    getDestinationsByDistrict
}