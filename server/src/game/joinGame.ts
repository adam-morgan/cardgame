import { GameState, JoinGameRequest, JoinGameResponse } from '@cardgame/common';

import { UserInfo } from '../auth/types.js';
import { getGameIdWithJoinCode, getGameState, updateGameState } from '../db/game.js';

import { acquireGameStateLock } from '../lock/index.js';

export const joinGame = async (
    req: JoinGameRequest,
    userInfo: UserInfo
): Promise<JoinGameResponse> => {
    const gameId = await getGameIdWithJoinCode(req.joinCode);

    if (!gameId) {
        return {
            joined: false,
            failureReason: 'Invalid join code specified.'
        };
    }

    let lock;

    try {
        lock = await acquireGameStateLock(gameId);
        const gameState = await getGameState(gameId);

        if (!gameState) {
            return {
                joined: false,
                failureReason: 'Error loading game state.'
            };
        }

        if (gameState.players.some((p) => {
            if (userInfo.isAuthenticated) {
                return p.type === 'authenticated' && p.username === userInfo.user.username;
            }

            return p.type === 'guest' && p.guestId === userInfo.guestId;
        })) {
            return {
                joined: true,
                gameId,
                gameState: gameState as GameState
            };
        }

        const pendingIdx = gameState.players.findIndex((p) => p.type === 'pending');

        if (pendingIdx == null || pendingIdx < 0) {
            return {
                joined: false,
                failureReason: 'Game already has enough players.'
            };
        }

        if (userInfo.isAuthenticated) {
            gameState.players[pendingIdx].type = 'authenticated';
            gameState.players[pendingIdx].username = userInfo.user.username;
        } else {
            gameState.players[pendingIdx].type = 'guest';
            gameState.players[pendingIdx].guestId = userInfo.guestId;
            gameState.players[pendingIdx].username = req.playerName as string;
        }

        await updateGameState(gameId, gameState);

        return {
            joined: true,
            gameId,
            gameState: gameState as GameState
        };
    } finally {
        lock?.release();
    }
};
