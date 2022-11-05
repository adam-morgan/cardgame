export interface User {
    email: string
    username: string
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
