export interface AuthUserResponse {
    UserId: string,
    UserEmail: string,
    UserIsAdmin: boolean,
    exp: number,
    iss: string,
    aud: string
}

export interface AuthorizationUser {
    email: string,
    password: string
}

export interface AuthRefreshInputType {
    userId: string,
    accessToken: string,
    refreshToken: string
}

export interface AuthLoginInputType {
    email: string,
    password: string
}

export interface AuthLogoutInputType {
    userId: string
}