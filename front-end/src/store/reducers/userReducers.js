import typeActions from '../actions/typeActions';

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
    user: {}
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case typeActions.USER_SIGNIN_SUCCESS:
            localStorage.setItem('isLoggedIn', 'true');
            return {
                ...state,
                isLoggedIn: true,
                user: action.user
            }
        case typeActions.USER_SIGNUP_SUCCESS:
            return {
                ...state,
                isSignedUp: true,
                user: action.user
            }
        case typeActions.USER_SIGNOUT_SUCCESS:
            localStorage.removeItem('isLoggedIn');
            return {
                ...state,
                isLoggedIn: false,
                isSignedUp: false,
                user: {}
            }
        case typeActions.USER_EDIT_SUCCESS:
            return {
                ...state,
                user: action.user
            }
        case typeActions.USER_DELETE_SUCCESS:
            localStorage.removeItem('isLoggedIn');
            return {
                ...state,
                isLoggedIn: false,
                user: {}
            }
        default:
            return state;
    }
}

export default userReducer;