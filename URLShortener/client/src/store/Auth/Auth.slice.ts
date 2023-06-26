import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthorizationUser, AuthRefreshInputType, AuthUserResponse} from "../../types/Auth";
import {User} from "../../types/User";

interface AuthState {
    authUser: AuthUserResponse | null,
    user: User | null,
    accessToken: string | null
    error?: string | null
}

const initialState: AuthState = {
    authUser: null,
    user: null,
    accessToken: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state: AuthState, action: PayloadAction<User>) => {
            return {...state, user: action.payload}
        },
        logout: (state: AuthState) => {
            return {...state, user: null}
        },
        setLoadingState:  (state, action: PayloadAction<boolean>) => {
            return{...state, isLoading: action.payload}
        },
        setError: (state: AuthState, action: PayloadAction<string>) => {
            return {...state, error: action.payload}
        },
    }
});

export const authorizeUser = createAction<string>("AuthorizeUser")
export const authLoginAction = createAction<AuthorizationUser>("AuthLogin");
export const authRefreshAction = createAction<AuthRefreshInputType>("AuthRefresh");
export const authLogoutAction = createAction<number>("AuthLogout");

export const {setUser, logout, setError, setLoadingState } = authSlice.actions;
