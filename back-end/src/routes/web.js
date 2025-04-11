import express from 'express';
import {
    userController, imageController, destinationController, postController, districtController, dialogflowController
    , favouriteController
} from '../controllers';


let router = express.Router();

let initWebRoutes = (app) => {
    //authetication
    router.post('/api/signin', userController.handleSignIn);
    router.post('/api/signup', userController.handleSignUp);
    router.post('/api/user/google-login', userController.handleGoogleLogin);
    router.post('/api/user/edit', userController.handleEditUser);
    router.delete('/api/user/delete', userController.handleDeleteUser);
    router.post('/api/user/editavatar', userController.handleEditAvatar);
    router.post('/api/user/create', userController.handleCreateUser);
    router.post('/api/user/password', userController.handleChangePassword);

    //user
    router.get('/api/user/filter', userController.getUsersByFilter);
    router.get('/api/user/rank', userController.getUsersRanking);
    router.get('/api/user/all', userController.getAllUsers);


    //image
    router.post('/api/upload', imageController.handleUpload);
    router.get('/api/image/all', imageController.getAllImages);
    router.post('/api/image/create', imageController.createImage);
    router.put('/api/image/edit', imageController.editImage);
    router.delete('/api/image/delete', imageController.deleteImage);
    router.get('/api/image/filter', imageController.getImagesByFilter);

    //destination
    router.get('/api/destination/district', destinationController.getDestinationsByDistrict);
    router.get('/api/destination/filter', destinationController.getDestinationsByFilter);
    router.get('/api/destination/home', destinationController.getDestinationsForHome);
    router.get('/api/destination/all', destinationController.getAllDestinations);
    router.get('/api/destination/:id', destinationController.getDestinationByID);
    router.get(`/api/destination/rate/:destId`, destinationController.getRatesByDestination);
    router.put('/api/destination/edit', destinationController.editDestination);
    router.post('/api/destination/create', destinationController.createDestination);
    router.delete('/api/destination/delete', destinationController.deleteDestination);

    //profile
    router.get('/api/profile', userController.getDataProfile);

    //post
    router.get('/api/post/filter', postController.getPostsByFilter);
    router.get('/api/post/home', postController.getPostsForHome);
    router.get('/api/post/user', postController.getNewPostByUser);
    router.post('/api/post/create', postController.createPost);
    router.put('/api/post/edit/:id', postController.editPost);
    router.delete('/api/post/delete/:id', postController.deletePost);
    router.get('/api/post/all', postController.getAllPosts);

    //district
    router.get('/api/district', districtController.getAllDistricts);
    router.get('/api/district/filter', districtController.getDistrictsByFilter);
    router.post('/api/district/create', districtController.createDistrict);
    router.put('/api/district/edit', districtController.editDistrict);
    router.delete('/api/district/delete', districtController.deleteDistrict);


    //dialogflow
    router.post('/api/dialogflow/webhook', dialogflowController.handledialogflowWebhook);
    router.post('/api/dialogflow/sendmessage', dialogflowController.dialogflowSender);

    //favourite
    router.get('/api/favourite', favouriteController.getFavourite);
    router.post('/api/favourite/create', favouriteController.createFavourite);
    router.delete('/api/favourite/delete', favouriteController.deleteFavourite);
    router.get('/api/favourite/user', favouriteController.getFavouritesOfUser);
    router.get('/api/favourite/all', favouriteController.getAllFavourites);

    //email
    router.post('/api/user/email', userController.handleEmail);
    router.post('/api/user/verify', userController.handleVerifyEmail);

    return app.use("/", router);
}

// module.exports = initWebRoutes;
export default initWebRoutes;