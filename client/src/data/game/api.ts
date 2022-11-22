import {
    CreateGameRequest,
    CreateGameResponse,
    GetGameStateResponse
} from "@cardgame/common"

import { get, post } from '../../server/fetch';

export const sendCreateGameRequest = (request: CreateGameRequest) => {
    return post<CreateGameRequest, CreateGameResponse>('/game', request);
};

export const getGameState = (gameId: string) => {
    return get<GetGameStateResponse>(`/game/${gameId}`);
};
