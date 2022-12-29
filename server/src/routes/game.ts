import { FastifyInstance } from 'fastify';

import { CreateGameRequest, JoinGameRequest } from '@cardgame/common';

import { createGame } from '../game/createGame.js';
import { joinGame } from '../game/joinGame.js';
import { loadGameState } from '../game/loadGame.js';
import { getSanitizedGameState } from '../game/gameState.js';

interface GetGameStateParams {
    gameId: string
}

const initializeRoutes = (server: FastifyInstance) => {
    server.get<{Params: GetGameStateParams}>('/game/:gameId', async (request, reply) => {
        const { gameId } = request.params;
        const gameState = await loadGameState(gameId, request.session);

        if (gameState == null) {
            reply.code(404);
        } else {
            reply.send({ gameState: getSanitizedGameState(gameState, request.session) });
        }
    });

    server.post<{Body: CreateGameRequest}>('/game', async (request, reply) => {
        return createGame(request.body, request.session);
    });

    server.post<{Body: JoinGameRequest}>('/game/join', async (request, reply) => {
        return joinGame(request.body, request.session);
    });
};

export default initializeRoutes
