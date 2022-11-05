import { FastifyInstance } from 'fastify';

import type { User } from '@cardgame/common';

import { doLogin } from '../auth/login.js';
import { createAccount } from '../auth/createAccount.js';

declare module "fastify" {
    interface Session {
        isAuthenticated: boolean,
        user: User
    }
}

interface LoginRequest {
    email: string,
    password: string
}

interface CreateAccountRequest {
    user: User,
    password: string
}

const initializeRoutes = (server: FastifyInstance) => {
    server.get('/auth', async (request, reply) => {
        if (request.session.isAuthenticated) {
            reply.send({
                isAuthenticated: true,
                user: request.session.user
            });
        }

        reply.send({
            isAuthenticated: false
        });
    });

    server.post<{Body: LoginRequest}>('/auth/login', async (request, reply) => {
        const user = await doLogin(request.body.email, request.body.password);

        if (user != null) {
            request.session.isAuthenticated = true;
            request.session.user = user;

            reply.send({
                isAuthenticated: true,
                user
            });
        } else {
            reply.send({
                isAuthenticated: false
            });
        }
    });

    server.post<{Body: CreateAccountRequest}>('/auth/createAccount', async (request, reply) => {
        const response = await createAccount(request.body.user, request.body.password);

        reply.send(response);
    });
};

export default initializeRoutes;
