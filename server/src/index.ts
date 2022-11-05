import fastify from 'fastify';
import fastifySession from '@fastify/session';
import fastifyCookie from '@fastify/cookie';

import { initUsersDb } from './db/auth.js';
import { initializeRoutes } from './routes/index.js';

const PORT = parseInt(process.env.PORT ?? '3001', 10);

const server = fastify();

server.register(fastifyCookie);

server.register(fastifySession, {
    cookieName: 'sessionId',
    secret: 'hTetuu7FRqqrHvqyorz7T8xBk5sN2ULe',
    cookie: { secure: 'auto' }
});

initializeRoutes(server);

const init = async () => {
    console.log('Initializing users DB...');
    await initUsersDb();
};

init().then(() => {
    server.listen({ port: PORT }, (err, address) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }

        console.log(`Server listening at ${address}`);
    });
});


