import axios from "../axios";

const postAPI = {};

let getPostsForHome = () => {
    return axios.get("/api/post/home");
}

let getpostbyuser = (userid) => {
    return axios.get("api/post/user", { params: { userid: userid } });
}

let createpost = (data) => {
    return axios.post("/api/post/create", { data: data });
}

let editPost = (id, data) => {
    console.log(data);
    return axios.put(`/api/post/edit/${id}`, { data: data });
}

let deletePost = (id) => {
    return axios.delete(`/api/post/delete/${id}`);
}

const getPostsByFilter = (filter) => {
    return axios.get("/api/post/filter", { params: filter });
}

let getAllPosts = () => {
    return axios.get("/api/post/all");
}

postAPI.getPostsForHome = getPostsForHome;
postAPI.getpostbyuser = getpostbyuser;
postAPI.createpost = createpost;
postAPI.editPost = editPost;
postAPI.deletePost = deletePost;
postAPI.getPostsByFilter = getPostsByFilter;
postAPI.getAllPosts = getAllPosts;

export default postAPI;