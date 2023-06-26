export interface User {
    id: string,
    email: string,
    password?: string,
    isAdmin?: boolean
}

export interface RegFails {
    email: string,
    password: string,
    passwordCheck: string,
    [key: string]: string
}