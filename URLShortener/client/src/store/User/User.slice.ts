import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RegFails, User} from "../../types/User";

const fails: RegFails = {
    email: "",
    password: "",
    passwordCheck: ""
}

interface UserState{
    user: User | null,
    userList: User[],
    fails: RegFails
}

const initialState: UserState = {
    user: null,
    userList: [],
    fails: fails
}
const userListSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        fetch_user:(state, action:PayloadAction<User>) => {
            return {...state, user: action.payload}
        },
        create_user:(state, action:PayloadAction<User>) => {
            return {...state, user: action.payload,  userList: [action.payload, ...state.userList]}
        },
        fetch_userList: (state, action:PayloadAction<User[]>) => {
            return {...state, userList: action.payload}
        },
        delete_user: (state, action:PayloadAction<User>) => {
            return {...state, userList: state.userList.filter(item => item != action.payload)}
        },
        set_fails_user: (state, action:PayloadAction<RegFails>) => {
            return {...state, fails: action.payload}
        }
    }
})


export const fetchUserAction = createAction<string>("fetchUser");
export const createUserAction = createAction<User>("createUser");
export const fetchUserListAction = createAction("fetchUserList");
export const deleteUserAction = createAction<User>("deleteUser");
export const setFailUserAction = createAction<RegFails>("setFailUser");
export default userListSlice;
export const {fetch_user, fetch_userList, delete_user, create_user, set_fails_user} = userListSlice.actions