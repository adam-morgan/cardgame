import { FastifyInstance } from 'fastify';
import { v4 as uuid } from 'uuid';

import type { CreateAccountRequest, LoginRequest, User } from '@cardgame/common';

import { doLogin } from '../auth/login.js';
import type { UserInfo } from '../auth/types.js';
import { createAccount } from '../auth/createAccount.js';

declare module "fastify" {
    interface Session extends UserInfo {}
}

const initializeRoutes = (server: FastifyInstance) => {
    server.get('/auth', async (request, reply) => {
        if (request.session.isAuthenticated) {
            reply.send({
                isAuthenticated: true,
                user: request.session.user
            });
        } else {
            if (!request.session.guestId) {
                // request.session.guestId = uuid();
                request.session.guestId = 'static_guest_id';
            }

            reply.send({
                isAuthenticated: false,
                guestId: request.session.guestId
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
