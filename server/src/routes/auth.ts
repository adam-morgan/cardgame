import { FastifyInstance } from 'fastify';

import type { CreateAccountRequest, LoginRequest, User } from '@cardgame/common';

import { doLogin } from '../auth/login.js';
import { createAccount } from '../auth/createAccount.js';

declare module "fastify" {
    interface Session {
        isAuthenticated: boolean,
        user: User
    }
}

const initializeRoutes = (server: FastifyInstance) => {
    server.get('/auth', async (request, reply) => {
        if (request.session.isAuthenticated) {
            reply.send({
                isAuthenticated: true,
                user: request.session.user
            });
        } else {
            reply.send({
                isAuthenticated: false
            });
        }
    });

    server.post<{Body: LoginRequest}>('/auth/login', async (request, reply) => {
        const user = await doLogin(request.body.usernameOrEmail, request.body.password);

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

    server.get('/auth/logout', (request, reply) => {
        request.session?.destroy();
        reply.redirect('/');
    });

    server.post<{Body: CreateAccountRequest}>('/auth/createAccount', async (request, reply) => {
        const response = await createAccount({
            username: request.body.username,
            email: request.body.email
        }, request.body.password);

        reply.send(response);
    });
};

export default initializeRoutes;
