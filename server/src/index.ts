import fastify from 'fastify';
import fastifySession from '@fastify/session';
import fastifyCookie from '@fastify/cookie';
import fastifyIO from 'fastify-socket.io';

import { initUsersDb } from './db/auth.js';
import { initGameDb } from './db/game.js';
import { initializeRoutes } from './routes/index.js';
import { onSocketConnection } from './sockets/index.js';

const PORT = parseInt(process.env.PORT ?? '3001', 10);

let logger;
if (process.env.NODE_ENV === 'production') {
    logger = true;
} else if (process.env.NODE_ENV === 'test') {
    logger = false;
} else {
    logger = {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            },
        }
    };
}

const server = fastify({ logger });

server.register(fastifyCookie);
server.register(fastifyIO);

server.register(fastifySession, {
    cookieName: 'sessionId',
    secret: 'hTetuu7FRqqrHvqyorz7T8xBk5sN2ULe',
    cookie: { secure: 'auto' }
});

initializeRoutes(server);

const init = async () => {
    console.log('Initializing users DB...');
    await initUsersDb();
    await initGameDb();
};

init().then(() => {
    server.ready().then(() => {
        server.io.on('connection', (socket) => {
            const sessionId = server.parseCookie(socket.handshake.headers.cookie as string).sessionId;

            onSocketConnection(socket, async () => {
                return new Promise((resolve) => {
                    const req = { raw: {}, headers: {} };
                    server.decryptSession(sessionId, req, () => {
                        resolve((req as any).session);
                    });
                });
            });
        });
    });

    server.listen({ port: PORT }, (err, address) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }

        console.log(`Server listening at ${address}`);
    });
});


