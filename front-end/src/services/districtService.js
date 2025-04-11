import axios from '../axios';

const distAPI = {};


const getAllDistricts = () => {
    return axios.get('api/district');
}

const getDistrictsByFilter = (queryFilter) => {
    return axios.get('api/district', { params: queryFilter });
}

const createDistrict = (data) => {
    return axios.post('api/district/create', { data });
}

const editDistrict = (data) => {
    return axios.put(`api/district/edit`, { data });
}

const deleteDistrict = (id) => {
    return axios.delete(`api/district/delete`, { params: { id: id } });
}

distAPI.getAllDistricts = getAllDistricts;
distAPI.getDistrictsByFilter = getDistrictsByFilter;
distAPI.createDistrict = createDistrict;
distAPI.editDistrict = editDistrict;
distAPI.deleteDistrict = deleteDistrict;

export default distAPI;