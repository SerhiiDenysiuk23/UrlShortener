import {User} from "./User";

export interface UrlAddress {
    id: string,
    originalUrl: string,
    shortUrl: string,
    description: string,
    createdAt: string
    userCreatorId: string
    userCreator: User
}

export interface UrlCredentials{
    originalUrl: string
    userCreatorId: string
}