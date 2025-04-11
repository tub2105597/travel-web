import axios from '../axios';

const destAPI = {};

const getDestinationsForHome = () => {
    return axios.get('api/destination/home');
};

const getDestinationsByDistrict = (distid) => {
    return axios.get(`api/destination/district`, { params: { distid: distid } });
}

const getDestinationsByFilter = (filter) => {
    return axios.get('api/destination/filter', { params: filter });
}

const getAllDestinations = () => {
    return axios.get('api/destination/all');
}

const getDestinationById = (id) => {
    return axios.get(`api/destination/${id}`, { params: { id: id } });
}

let getRatesByDestination = (destId) => {
    return axios.get(`/api/destination/rate/${destId}`, { destId: destId });
}

const createDestination = (destination) => {
    return axios.post('api/destination/create', { destination: destination });
}

const editDestination = (destination) => {
    return axios.put(`api/destination/edit`, { destination: destination });
}

const deleteDestination = (id) => {
    return axios.delete(`api/destination/delete`, { params: { id: id } });
}

destAPI.getDestinationsByDistrict = getDestinationsByDistrict;
destAPI.getDestinationsByFilter = getDestinationsByFilter;
destAPI.getAllDestinations = getAllDestinations;
destAPI.getDestinationById = getDestinationById;
destAPI.getRatesByDestination = getRatesByDestination;
destAPI.getDestinationsForHome = getDestinationsForHome;
destAPI.editDestination = editDestination;
destAPI.createDestination = createDestination;
destAPI.deleteDestination = deleteDestination;


export default destAPI;