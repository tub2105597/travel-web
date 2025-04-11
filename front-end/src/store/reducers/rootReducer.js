import { combineReducers } from 'redux';

import userReducer from "./userReducers";

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['isLoggedIn', 'user']
};

const rootReducer = combineReducers({
    user: persistReducer(userPersistConfig, userReducer),
});

export default rootReducer;