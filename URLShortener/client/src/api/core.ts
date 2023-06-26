import {UrlAddress} from "../types/UrlAddress";
import {User} from "../types/User";
import {AuthLogoutInputType, AuthorizationUser, AuthRefreshInputType} from "../types/Auth";
import {accessTokenKey, getCookie} from "./cookies";

const BaseUrl = 'https://localhost:7294'

export type Controller = "UrlAddress" | "Users" | "Auth"
type dataType = UrlAddress | User | AuthorizationUser | AuthRefreshInputType | AuthLogoutInputType
type Extension = "login" | "logout" | `refresh/${string}`

export const getListQuery = async (controller: Controller) => {
    try {
        const response = await fetch(`${BaseUrl}/api/${controller}`, {
            method: "GET"
        })
        return response.json()
    }
    catch (e){
        console.error(e)
    }
}
export const getItemQuery = async (controller: Controller, id: string) => {
    try {
        const response = await fetch(`${BaseUrl}/api/${controller}/${id}`, {
            method: "GET"
        })
        return response.json()
    }
    catch (e){
        console.error(e)
    }
}

const getAuthorizationHeader = (): string => {
    const accessToken = getCookie(accessTokenKey);
    return accessToken ? `Bearer ${accessToken}` : "";
}

export const postQueryExtended = async (controller: Controller, extension: Extension, data: dataType) => {
    try {
        console.warn(data)
        const response = await fetch(`${BaseUrl}/api/${controller}/${extension}`, {
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': getAuthorizationHeader()
            },
            body: JSON.stringify(data)
        })
        return response.json()
    }catch (e){
        console.error(e)
    }
}

export const postQuery = async (controller: Controller, data: dataType) => {
    try {
        console.warn(data)
        const response = await fetch(`${BaseUrl}/api/${controller}`, {
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': getAuthorizationHeader()
            },
            body: JSON.stringify(data)
        })
        return response.json()
    }catch (e){
        console.error(e)
    }
}

export const deleteQuery = async (controller: Controller, id: number) => {
    try {
        const response = await fetch(`${BaseUrl}/api/${controller}/${id}`, {
            method: "DELETE"
        })
        return response.ok
    }catch (e){
        console.error(e)
    }
}