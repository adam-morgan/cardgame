import { GameState, UpdateGameSetupRequest } from '@cardgame/common';
import { Session } from 'fastify';
import { Socket } from 'socket.io';

import { startGame, updateGameSetup } from '../game/gameState.js';
import { registerGameStateListener, unregisterGameStateListener } from '../game/stateListener.js';

interface Listener {
    gameId: string,
    listenerId: string
}

export const onSocketConnection = (socket: Socket, getSession: () => Promise<Session>) => {
    const gameStateListeners: Listener[] = [];

    socket.on('updateGameSetup', async (request: UpdateGameSetupRequest) => {
        const session = await getSession();

        try {
            await updateGameSetup(request.gameId, request.gameState, session);
        } catch (e) {
            console.error(e);
        }
    });

    socket.on('startGame', async (gameId: string) => {
        const session = await getSession();

        try {
            await startGame(gameId, session);
        } catch (e) {
            console.error(e);
        }
    });

    socket.on('registerGameStateListener', async (gameId: string) => {
        const session = await getSession();
        const listenerId = await registerGameStateListener(gameId, session, (gameState: GameState) => {
            socket.emit('gameStateUpdated', gameState);
        });

        gameStateListeners.push({ gameId, listenerId });
    });

    socket.on('disconnect', () => {
        if (gameStateListeners.length) {
            for (const listener of gameStateListeners) {
                unregisterGameStateListener(listener.gameId, listener.listenerId);
            }
        }
    });
};
