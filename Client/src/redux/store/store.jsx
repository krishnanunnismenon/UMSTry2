import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../slices/userSlice'
import adminReducer from '../slices/adminSlice'
import {persistStore,persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    user:userReducer,
    admin:adminReducer
})

const persistConfig = {
    key:"root",
    storage,
    whitelist:['user','admin']
}

const persistedReducer  = persistReducer(persistConfig,rootReducer);

const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false, // Disables serializable check to avoid issues with redux-persist
        }),
})

export const persistor = persistStore(store); 

export default store;