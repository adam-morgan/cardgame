import { UpdateGameStateRequest } from "@cardgame/common";
import { Session } from "fastify";
import { Socket } from "socket.io";

import { updateGameState } from "../game/gameState.js";

export const onSocketConnection = (socket: Socket, getSession: () => Promise<Session>) => {
    socket.on('updateGameState', async (request: UpdateGameStateRequest) => {
        const session = await getSession();
        updateGameState(request.gameId, request.gameState, session);
    });
};
