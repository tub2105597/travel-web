import axios from '../axios';

const imageAPI = {
    createImage: (data) => {
        return axios.post('api/image/create', { data: data });
    },
    getAllImages: () => {
        return axios.get('api/image/all');
    },
    editImage: (data) => {
        return axios.put('api/image/edit', { data: data });
    },
    uploadImage: (formData) => {
        for (let [key, value] of formData.entries()) {
            console.log(key, value instanceof File ? value.name : value);
        }
        return axios.post('api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    },
    deleteImage: (id) => {
        return axios.delete('api/image/delete', { params: { id: id } });
    },
    getImagesByFilter: (filter) => {
        return axios.get('api/image/filter', { params: filter });
    },
};

export default imageAPI;
