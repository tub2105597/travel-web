import typeActions from "./typeActions"

export const userSignInSuccess = (userData) => ({
    type: typeActions.USER_SIGNIN_SUCCESS,
    user: userData
})

export const userSignUpSuccess = (userData) => ({
    type: typeActions.USER_SIGNUP_SUCCESS,
    user: userData
})

export const userSignOutSuccess = () => ({
    type: typeActions.USER_SIGNOUT_SUCCESS,
    user: {
        isLoggedIn: false,
        isSignedUp: false,
        user: {}
    }
})

export const userEditSuccess = (userData) => ({
    type: typeActions.USER_EDIT_SUCCESS,
    user: userData
})

export const userDeleteSuccess = () => ({
    type: typeActions.USER_DELETE_SUCCESS,
    user: {
        isLoggedIn: false,
        user: {}
    }
})