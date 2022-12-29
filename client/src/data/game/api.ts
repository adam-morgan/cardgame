import {
    CreateGameRequest,
    CreateGameResponse,
    GameState,
    GetGameStateResponse,
    JoinGameRequest,
    JoinGameResponse,
    UpdateGameSetupRequest
} from "@cardgame/common"

import { get, post } from '../../server/fetch';
import { getSocket } from '../../server/sockets';

export const sendCreateGameRequest = (request: CreateGameRequest) => {
    return post<CreateGameRequest, CreateGameResponse>('/game', request);
};

export const sendJoinGameRequest = (request: JoinGameRequest) => {
    return post<JoinGameRequest, JoinGameResponse>('/game/join', request);
};

export const getGameState = (gameId: string) => {
    return get<GetGameStateResponse>(`/game/${gameId}`);
};

export const registerGameStateListener = async (gameId: string, callback: (gameState: GameState) => void) => {
    const socket = await getSocket();

    socket.emit('registerGameStateListener', gameId);
    socket.on('gameStateUpdated', (gameState: GameState) => {
        callback(gameState);
    });
};

export const updateGameSetup = async (request: UpdateGameSetupRequest) => {
    const socket = await getSocket();
    socket.emit('updateGameSetup', request);
};

export const startGame = async (gameId: string) => {
    const socket = await getSocket();
    socket.emit('startGame', gameId);
};
