import db from '../models/index';

const { Op } = require("sequelize");

let getAllDistricts = async () => {
    try {
        let districts = await db.Districts.findAll();

        return districts ? districts : [];
    } catch (e) {
        throw e;
    }
};

let getDistrictsByFilter = async (query) => {
    try {
        const { search, order, type } = query;
        console.log(query);
        let districts = await db.Districts.findAll({
            where: {
                name: {
                    [Op.like]: `%${search}%`
                }
            },
            order: [
                [order, type]
            ]
        });

        return districts ? districts : [];
    } catch (e) {
        throw e;
    }
};

const createDistrict = async (data) => {
    try {
        let district = await db.Districts.create(data);

        return district ? district : {};
    } catch (e) {
        throw e;
    }
}

const editDistrict = async (data) => {
    try {
        let district = await db.Districts.findOne({
            where: {
                id: data.id
            }
        });
        district.name = data.name;
        district.save();

        return district ? district : {};
    } catch (e) {
        throw e;
    }
}

const deleteDistrict = async (data) => {
    try {
        let district = await db.Districts.findOne({
            where: {
                id: data.id
            }
        });
        district.destroy();

        return district ? district : {};
    } catch (e) {
        throw e;
    }
}


export default {
    getAllDistricts,
    getDistrictsByFilter,
    createDistrict,
    editDistrict,
    deleteDistrict
}