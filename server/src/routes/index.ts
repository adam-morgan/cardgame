import { FastifyInstance } from 'fastify';

import initializeAuthRoutes from './auth.js';
import initializeGameRoutes from './game.js';

export const initializeRoutes = (server: FastifyInstance) => {
    initializeAuthRoutes(server);
    initializeGameRoutes(server);

    server.get('/ping', async (request, reply) => {
        return 'pong'
    });
};
