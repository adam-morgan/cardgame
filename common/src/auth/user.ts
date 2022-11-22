export interface User {
    email: string
    username: string
}

export interface CheckSessionResponse {
    isAuthenticated: boolean,
    user?: User,
    guestId?: string
}

export interface LoginRequest {
    usernameOrEmail: string,
    password: string
}

export interface LoginResponse {
    isAuthenticated: boolean,
    user?: User
}

export interface CreateAccountRequest {
    email: string,
    username: string,
    password: string
}

export interface CreateAccountResponse {
    created: boolean,
    failureReason?: string
}
