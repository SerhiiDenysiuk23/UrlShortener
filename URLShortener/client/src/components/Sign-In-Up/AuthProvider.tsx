import {AuthorizationUser, AuthUserResponse} from "../../types/Auth";
import React, {FC, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {User} from "../../types/User";
import {useAppDispatch, useAppSelector} from "../../hooks/useAppDispatch";
import {accessTokenKey, getCookie, refreshTokenKey} from "../../api/cookies";
import {authLoginAction, authLogoutAction, authorizeUser} from "../../store/Auth/Auth.slice";
import {parseJwt} from "../../services/parserJWT";

const defaultSignIn = (credentials: AuthorizationUser, callback: any) => {
}
const defaultSignOut = (callback: any) => {
}

export interface AuthStateType {
    user: User | null
    isUserAuthenticated: boolean
    accessToken?: string | null
    refreshToken?: string | null
}

export interface AuthProviderStateType {
    state?: AuthStateType,
    signIn: (credentials: AuthorizationUser, callback: any) => any,
    signOut: (callback: any) => any
}

const initialAuthState: AuthStateType = {
    user: null,
    isUserAuthenticated: false,
    accessToken: undefined,
    refreshToken: undefined
}

const initialAuthContextState: AuthProviderStateType = {
    state: undefined,
    signIn: defaultSignIn,
    signOut: defaultSignOut
}

export const authContext = React.createContext(initialAuthContextState);

export const AuthProvider: FC<{ children: React.ReactNode }> = ({children}) => {

    const [state, setState] = useState(initialAuthState)
    const authUser = useAppSelector(state => state.auth.user)
    const location = useLocation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const accessToken = getCookie(accessTokenKey)
    const refreshToken = getCookie(refreshTokenKey)

    useEffect(() => {

        if (accessToken) {
            setState({...state, accessToken: accessToken, refreshToken: refreshToken})
        }

        if (authUser) {
            setState({...state, user: authUser, isUserAuthenticated: true})
            if (location.pathname === '/login' || location.pathname === '/signUp')
                navigate('/', {replace: true})
        }

        if (refreshToken) {
            if (!authUser) {
                dispatch(authorizeUser(parseJwt<AuthUserResponse>(refreshToken).UserId))
            }
        } else {
            dispatch(authLogoutAction(getCookie(refreshTokenKey) ? parseJwt<AuthUserResponse>(getCookie(refreshTokenKey)).UserId : ""))
        }

    }, [authUser, accessToken, refreshToken])

    // console.log(state.userList)

    const signIn = (credentials: AuthorizationUser, callback: any) => {
        dispatch(authLoginAction(credentials))
        callback()
    }

    const signOut = (callback: any) => {
        console.log("logout")
        dispatch(authLogoutAction(state.user!.id))
        callback()
    }

    const auth = {state, signIn, signOut}

    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )
}
