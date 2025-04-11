import axios from '../axios';

const userAPI = {}

const signin = (username, password) => {
    return axios.post('api/signin', { username, password });
}

const signup = (username, password, email, fullname) => {
    return axios.post('api/signup', { username, password, email, fullname });
}

const getProfile = (userid) => {
    return axios.get(`api/profile`, { params: { userid: userid } });
}

const editUser = (user) => {
    return axios.post('api/user/edit', { user: user });
}

const deleteUser = (username) => {
    return axios.delete(`api/user/delete`, { data: { username } });
}

const uploadImage = (formData) => {
    for (let [key, value] of formData.entries()) {
        console.log(key, value instanceof File ? value.name : value);
    }
    return axios.post('api/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

const editAvatar = (username, link) => {
    return axios.post('api/user/editavatar', { username: username, link: link });
}

const getUsersRanking = () => {
    return axios.get('api/user/rank');
}

const getUsersByFilter = (query) => {
    return axios.get('api/user/filter', { params: query });
}

const getAllUsers = () => {
    return axios.get('api/user/all');
}

const createUser = (user) => {
    return axios.post('api/user/create', { user: user });
}

const loginGoogle = (credentialResponse) => {
    return axios.post('api/user/google-login', { credentialResponse });
}

const sendEmail = (username) => {
    return axios.post('api/user/email', { username });
}

const verifyEmail = (username, otp) => {
    return axios.post('api/user/verify', { username, otp });
}

const changePassword = (username, password) => {
    return axios.post('api/user/password', { username, password })
}

userAPI.signin = signin;
userAPI.signup = signup;
userAPI.getProfile = getProfile;
userAPI.editUser = editUser;
userAPI.deleteUser = deleteUser;
userAPI.uploadImage = uploadImage;
userAPI.editAvatar = editAvatar;
userAPI.getUsersRanking = getUsersRanking;
userAPI.getUsersByFilter = getUsersByFilter;
userAPI.getAllUsers = getAllUsers;
userAPI.createUser = createUser;
userAPI.loginGoogle = loginGoogle;
userAPI.sendEmail = sendEmail;
userAPI.verifyEmail = verifyEmail;
userAPI.changePassword = changePassword;

export default userAPI;