import { v4 as uuid } from 'uuid';

import { GameState } from '@cardgame/common';

import { UserInfo } from '../auth/types.js';
import { getGameState } from '../db/game.js';
import { getSanitizedGameState } from './gameState.js';

interface Listener {
    listenerId: string
    userInfo: UserInfo
    callback: (gameState: GameState) => void
}

const listeners: { [key: string]: Listener[] } = {};

export const registerGameStateListener = async (
    gameId: string,
    userInfo: UserInfo,
    callback: (gameState: GameState) => void
): Promise<string> => {
    const listenerId = uuid();

    if (!listeners[gameId]) {
        listeners[gameId] = [];
    }

    listeners[gameId].push({ listenerId, userInfo, callback });

    return listenerId;
};

export const unregisterGameStateListener = (gameId: string, listenerId: string) => {
    if (listeners[gameId]) {
        listeners[gameId] = listeners[gameId].filter((l) => l.listenerId !== listenerId);
    }
};

export const gameStateUpdated = async (gameId: string) => {
    if (!listeners[gameId]?.length) {
        return;
    }

    const gameState = await getGameState(gameId);

    if (gameState != null) {
        for (const listener of listeners[gameId]) {
            const _gameState = getSanitizedGameState(gameState, listener.userInfo);
            listener.callback(_gameState);
        }
    }
};
