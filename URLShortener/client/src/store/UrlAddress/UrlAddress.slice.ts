import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UrlAddress, UrlCredentials} from "../../types/UrlAddress";

interface UrlAddressState{
    urlAddress: UrlAddress | null,
    urlAddressList: UrlAddress[]
}

const initialState: UrlAddressState = {
    urlAddress: null,
    urlAddressList: []
}
const urlAddressSlice = createSlice({
    name: "urlAddressSlice",
    initialState,
    reducers: {
        fetch_url_address:(state, action:PayloadAction<UrlAddress>) => {
            return {...state, urlAddress: action.payload}
        },
        create_url_address:(state, action:PayloadAction<UrlAddress>) => {
            return {...state, urlAddress: action.payload,  urlAddressList: [action.payload, ...state.urlAddressList]}
        },
        fetch_url_address_list: (state, action:PayloadAction<UrlAddress[]>) => {
            return {...state, urlAddressList: action.payload}
        },
        delete_url_address: (state, action:PayloadAction<UrlAddress>) => {
            return {...state, urlAddressList: state.urlAddressList.filter(item => item != action.payload)}
        },
    }
})


export const fetchUrlAddressAction = createAction<string>("fetchUrlAddress");
export const createUrlAddressAction = createAction<UrlCredentials>("createUrlAddress");
export const fetchUrlAddressListAction = createAction("fetchUrlAddressList");
export const deleteUrlAddressAction = createAction<UrlAddress>("deleteUrlAddress");
export default urlAddressSlice;
export const {create_url_address, delete_url_address, fetch_url_address, fetch_url_address_list} = urlAddressSlice.actions