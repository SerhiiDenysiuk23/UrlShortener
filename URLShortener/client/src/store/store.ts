import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {combineEpics, createEpicMiddleware} from "redux-observable";
import userListSlice from "./User/User.slice";
import {authSlice} from "./Auth/Auth.slice";
import {userListEpics} from "./User/User.epic";
import {authEpics} from "./Auth/Auth.epic";
import urlAddressSlice from "./UrlAddress/UrlAddress.slice";

const epicMiddleware = createEpicMiddleware()

const rootEpic = combineEpics(
    authEpics,
    userListEpics
)

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    user: userListSlice.reducer,
    urlAddress: urlAddressSlice.reducer
})

export const store = configureStore({
    reducer: rootReducer
    ,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(epicMiddleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
epicMiddleware.run(rootEpic)