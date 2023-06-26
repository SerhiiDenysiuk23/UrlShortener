import {combineEpics, ofType} from "redux-observable";
import {catchError, from, map, mergeMap, of} from "rxjs";
import {deleteQuery, getItemQuery, getListQuery, postQuery} from "../../api/core";
import {RegFails, User} from "../../types/User";
import {
    create_user,
    createUserAction,
    delete_user,
    deleteUserAction,
    fetch_user, fetch_userList,
    fetchUserAction,
    fetchUserListAction,
    set_fails_user
} from "./User.slice";


const BaseController = "Users"

const fetchUser = (action$: any) => {
    return action$.pipe(
        ofType(fetchUserAction.type),
        mergeMap((action: any) => from(getItemQuery(BaseController, action.payload)).pipe(
            map(response => {
                return fetch_user(response.data.userQuery.user_get);
            })
        )));
}

const createUser = (action$: any) => {
    return action$.pipe(
        ofType(createUserAction.type),
        mergeMap((action: any) => from(postQuery(BaseController, action.payload)).pipe(
            map(response => {
                console.log(response)
                // if (response.errors?.length > 0) {
                //     const fails: RegFails = response.errors.reduce((acc: RegFails, {message}: { message: string }) => {
                //         const check = message.toLowerCase();
                //         const field = check.includes("email")
                //                 ? "email"
                //                 : check.includes("password")
                //                     ? "password"
                //                     : ""
                //         return {...acc, [field]: message}
                //     });
                //     if (!!fails[""]) {
                //         console.error(fails[""])
                //         delete fails[""]
                //     }
                //     return set_fails_user(fails)
                // }

                return create_user(response);
            })
        )));
}

const deleteUser = (action$: any) => {
    return action$.pipe(
        ofType(deleteUserAction.type),
        mergeMap((action: any) => from(deleteQuery(BaseController, action.payload.id)).pipe(
            map(response => {
                return delete_user(action.payload);
            })
        )));
}

const fetchUserList = (action$: any) => {
    return action$.pipe(
        ofType(fetchUserListAction.type),
        mergeMap((action: any) => from(getListQuery(BaseController)).pipe(
            map(response => {
                return fetch_userList(response.data.userQuery.user_getList);
            })
        )));
}

export const userListEpics = combineEpics(fetchUser, fetchUserList, deleteUser, createUser);
