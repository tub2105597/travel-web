import axios from "../axios";

const favouriteAPI = {};

let getFavourites = (userid, destid) => {
    return axios.get("/api/favourite", { params: { userid: userid, destid: destid } });
}

let getAllFavourites = (data) => {
    return axios.get("/api/favourite/all", { params: data });
}

let createFavourite = (userid, destid) => {
    return axios.post("/api/favourite/create", { userid: userid, destid: destid });
}

let deleteFavourite = (userid, destid) => {
    return axios.delete("/api/favourite/delete", { params: { userid: userid, destid: destid } });
}

const getFavouritesOfUser = (userid) => {
    return axios.get("/api/favourite/user", { params: { userid: userid } });
}

favouriteAPI.getFavourites = getFavourites;
favouriteAPI.createFavourite = createFavourite;
favouriteAPI.deleteFavourite = deleteFavourite;
favouriteAPI.getFavouritesOfUser = getFavouritesOfUser;
favouriteAPI.getAllFavourites = getAllFavourites;

export default favouriteAPI;