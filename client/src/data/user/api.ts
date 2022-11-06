import type {
    CheckSessionResponse,
    CreateAccountRequest,
    CreateAccountResponse,
    LoginRequest,
    LoginResponse
} from "@cardgame/common"

import { get, post } from '../../server/fetch';

export const checkSession = async () => {
    return get<CheckSessionResponse>('/auth');
};

export const doLogin = async (request: LoginRequest) => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return post<LoginRequest, LoginResponse>('/auth/login', request);
};

export const sendSignupRequest = async (request: CreateAccountRequest) => {
    return post<CreateAccountRequest, CreateAccountResponse>('/auth/createAccount', request);
};
