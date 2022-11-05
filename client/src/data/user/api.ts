import type { CreateAccountRequest, CreateAccountResponse } from "@cardgame/common"

import { post } from '../../server/fetch';

export const sendSignupRequest = async (request: CreateAccountRequest) => {
    return post<CreateAccountRequest, CreateAccountResponse>('/auth/createAccount', request);
};
