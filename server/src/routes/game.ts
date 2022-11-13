import { FastifyInstance } from 'fastify';

import type { CreateGameRequest } from '@cardgame/common';

const initializeRoutes = (server: FastifyInstance) => {
    server.post<{Body: CreateGameRequest}>('/game/create', async (request, reply) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return {
            created: true,
            gameId: 'abc'
        };
    });
};

export default initializeRoutes
