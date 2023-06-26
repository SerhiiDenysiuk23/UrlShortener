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