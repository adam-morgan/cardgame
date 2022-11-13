import { CreateGameRequest, CreateGameResponse } from "@cardgame/common"

import { post } from '../../server/fetch';

export const sendCreateGameRequest = (request: CreateGameRequest) => {
    return post<CreateGameRequest, CreateGameResponse>('/game/create', request);
};
