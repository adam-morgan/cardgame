import shortUuid from 'short-uuid';
import { v4 as uuid } from 'uuid';

import {
    CreateGameRequest,
    CreateGameResponse,
    GameState,
    Player,
    User
} from "@cardgame/common"

import { createGame as dbCreateGame } from '../db/game.js';
import type { UserInfo } from '../auth/types.js';

export const createGame = async (
    req: CreateGameRequest,
    userInfo: UserInfo
): Promise<CreateGameResponse> => {
    const players: Player[] = [];

    if (userInfo.user) {
        players.push({
            id: uuid(),
            type: 'authenticated',
            username: userInfo.user.username
        });
    } else if (req.playerName?.trim()) {
        players.push({
            id: uuid(),
            type: 'guest',
            username: req.playerName,
            guestId: userInfo.guestId
        });
    } else {
        return {
            created: false,
            failureReason: 'No username specified.'
        };
    }

    if (req.numPlayers == null || req.numPlayers < 2 || req.numPlayers > 6) {
        return {
            created: false,
            failureReason: 'Invalid number of players.'
        };
    }

    for (let i = 1; i < req.numPlayers; i++) {
        players.push({ id: uuid(), type: 'pending', username: '' });
    }

    const gameId = shortUuid.generate();

    const gameState: GameState = {
        players,
        started: false
    };

    await dbCreateGame(gameId, gameState);

    return {
        created: true,
        gameId,
        gameState
    }
};
