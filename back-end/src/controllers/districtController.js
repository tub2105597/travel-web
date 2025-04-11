import { districtService } from "../services";

let getAllDistricts = async (req, res) => {
    try {
        let data = await districtService.getAllDistricts();
        return res.status(200).json({ data });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const getDistrictsByFilter = async (req, res) => {
    try {
        console.log(req.query);
        let data = await districtService.getDistrictsByFilter(req.query);
        return res.status(200).json({ data });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const createDistrict = async (req, res) => {
    try {
        let data = await districtService.createDistrict(req.body.data);
        return res.status(200).json({ data });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const editDistrict = async (req, res) => {
    try {
        console.log(req.body);
        let data = await districtService.editDistrict(req.body.data);
        return res.status(200).json({ data });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteDistrict = async (req, res) => {
    try {
        let data = await districtService.deleteDistrict(req.query);
        return res.status(200).json({ data });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export default {
    getAllDistricts,
    getDistrictsByFilter,
    createDistrict,
    editDistrict,
    deleteDistrict
}