import {combineEpics, Epic, ofType} from "redux-observable";
import {from, map, mergeMap, Observable} from "rxjs";
import {deleteQuery, getItemQuery, getListQuery, postQuery} from "../../api/core";
import {
    create_url_address, createUrlAddressAction, delete_url_address, deleteUrlAddressAction,
    fetch_url_address,
    fetch_url_address_list, fetchUrlAddressAction,
    fetchUrlAddressListAction
} from "./UrlAddress.slice";

const BaseController = "UrlAdresses"

const createUrlEpic: Epic = (action$: Observable<ReturnType<typeof createUrlAddressAction>>): any => {
    return action$.pipe(
        ofType(createUrlAddressAction.type),
        mergeMap(action => from(postQuery(BaseController, action.payload)).pipe(
            map(response => {
                console.warn('+')
                return create_url_address(response)
            })
        ))
    )
}


const fetchUrlListEpic: Epic = (action$: Observable<ReturnType<typeof fetchUrlAddressListAction>>): any => {
    return action$.pipe(
        ofType(fetchUrlAddressListAction.type),
        mergeMap(() => from(getListQuery(BaseController)).pipe(
            map(response => {
                return fetch_url_address_list(response)
            }),
        ))
    )
}

const fetchUrlEpic: Epic = (action$: Observable<ReturnType<typeof fetchUrlAddressAction>>): any => {
    return action$.pipe(
        ofType(fetchUrlAddressAction.type),
        mergeMap((action) => from(getItemQuery(BaseController, action.payload)).pipe(
            map(response => {
                return fetch_url_address(response)
            }),
        ))
    )
}

const deleteUrlEpic: Epic = (action$: Observable<ReturnType<typeof deleteUrlAddressAction>>): any => {
    return action$.pipe(
        ofType(deleteUrlAddressAction.type),
        mergeMap((action) => from(deleteQuery(BaseController, action.payload.id)).pipe(
            map(response => {
                return delete_url_address(action.payload)
            }),
        ))
    )
}

export const urlEpics = combineEpics(createUrlEpic, fetchUrlListEpic, fetchUrlEpic, deleteUrlEpic);