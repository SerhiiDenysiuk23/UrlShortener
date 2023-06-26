import {combineEpics, Epic, ofType} from "redux-observable";
import {from, map, mergeMap, Observable} from "rxjs";
import {AuthLogoutInputType, AuthorizationUser, AuthUserResponse} from "../../types/Auth";
import {store} from "../store";
import {authLoginAction, authLogoutAction, authorizeUser, authRefreshAction, setError, setUser} from "./Auth.slice";
import {getItemQuery, postQueryExtended} from "../../api/core";
import {accessTokenKey, clearCookie, getCookie, refreshTokenKey, setCookie} from "../../api/cookies";
import {Action} from "@reduxjs/toolkit";
import {parseJwt} from "../../services/parserJWT";


const BaseController = "Auth"

const authLoginEpic: Epic = (action$: Observable<ReturnType<typeof authLoginAction>>): any => {
    return action$.pipe(
        ofType(authLoginAction.type),
        mergeMap(action => from(postQueryExtended(BaseController, "login" , {
            email: action.payload.email,
            password: action.payload.password
        } as AuthorizationUser)).pipe(
            map(response => {
                console.log(response)
                if (response
                    && response.accessToken
                    && response.refreshToken
                    && !response.errors
                ) {
                    setCookie({
                        key: refreshTokenKey,
                        value: response.refreshToken,
                        lifetime: 30 * 24 * 60 * 60
                    });
                    setCookie({
                        key: accessTokenKey,
                        value: response.accessToken,
                        lifetime: 2 * 60
                    });
                    const userId = parseJwt<AuthUserResponse>(getCookie(refreshTokenKey)).UserId;
                    store.dispatch(authorizeUser(userId))
                    return {payload: response, type: "AuthLoginSuccess"} as Action;
                } else if (response?.errors) {
                    store.dispatch(setError(response.errors[0].message));
                    return {payload: response, type: "AuthLoginError"} as Action
                }
                return {payload: response, type: "AuthLoginError"} as Action
            })
        ))
    )
}


const authLogoutEpic: Epic = (action$: Observable<ReturnType<typeof authLogoutAction>>): any => {
    return action$.pipe(
        ofType(authLogoutAction.type),
        mergeMap(action => from(postQueryExtended(BaseController, "logout", {
            userId: action.payload
        } as AuthLogoutInputType)).pipe(
            map(() => {
                clearCookie(refreshTokenKey)
                clearCookie(accessTokenKey)
                return {payload: "Success", type: "AuthLogoutSuccess"} as Action
            }),
        ))
    )
}

const authSetUserEpic: Epic = (action$: Observable<ReturnType<typeof authorizeUser>>): any => {
    return action$.pipe(
        ofType(authorizeUser.type),
        mergeMap(action => from(getItemQuery("Users", action.payload)).pipe(
            map(response => {
                if (response) {
                    store.dispatch(setUser(response))
                    return {payload: "Success", type: "AuthSetUserSuccess"} as Action
                }
                return {payload: "Error", type: "AuthSetUserError"} as Action
            })
        ))
    )
}

const authRefreshEpic: Epic = (action$: Observable<ReturnType<typeof authRefreshAction>>): any => {
    return action$.pipe(
        ofType(authRefreshAction.type),
        mergeMap(action => from(postQueryExtended(BaseController, `refresh/${action.payload.userId}`, action.payload)).pipe(
            map(response => {
                if (response?.data?.authMutation.authRefresh?.accessToken && response?.data?.authMutation.auth_refresh?.refreshToken) {
                    setCookie({key: refreshTokenKey, value: response.refreshToken, lifetime: 30 * 24 * 60 * 60})
                    setCookie({key: accessTokenKey, value: response.accessToken, lifetime: 2 * 60})
                    return authorizeUser(parseJwt<AuthUserResponse>(response.refreshToken).UserId)
                }
                return authLogoutAction(getCookie(refreshTokenKey) ? parseJwt<AuthUserResponse>(getCookie(refreshTokenKey)).UserId : "")
            })
        ))
    )
}

export const authEpics = combineEpics(
    authLogoutEpic,
    authRefreshEpic,
    authLoginEpic,
    authSetUserEpic
);