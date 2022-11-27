import {
    CreateGameRequest,
    CreateGameResponse,
    GetGameStateResponse,
    UpdateGameStateRequest
} from "@cardgame/common"

import { get, post } from '../../server/fetch';
import { getSocket } from '../../server/sockets';

export const sendCreateGameRequest = (request: CreateGameRequest) => {
    return post<CreateGameRequest, CreateGameResponse>('/game', request);
};

export const getGameState = (gameId: string) => {
    return get<GetGameStateResponse>(`/game/${gameId}`);
};

export const updateGameState = async (request: UpdateGameStateRequest) => {
    const socket = await getSocket();
    socket.emit('updateGameState', request)
};
