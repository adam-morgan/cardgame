import { FastifyInstance } from 'fastify';

import { CreateGameRequest } from '@cardgame/common';

import { createGame } from '../game/createGame.js';
import { loadGameState } from '../game/loadGame.js';

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
            reply.send({ gameState });
        }
    });

    server.post<{Body: CreateGameRequest}>('/game', async (request, reply) => {
        return createGame(request.body, request.session);
    });
};

export default initializeRoutes
