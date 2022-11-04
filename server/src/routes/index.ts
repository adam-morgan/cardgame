import { FastifyInstance } from 'fastify';

import initializeAuthRoutes from './auth.js';

export const initializeRoutes = (server: FastifyInstance) => {
    initializeAuthRoutes(server);

    server.get('/ping', async (request, reply) => {
        return 'pong'
    });
};
