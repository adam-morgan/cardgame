import shortUuid from 'short-uuid';
import { v4 as uuid } from 'uuid';

import {
    CreateGameRequest,
    CreateGameResponse,
    GameState,
    Player,
    User
} from "@cardgame/common"

import { createGame as dbCreateGame, getGameIdWithJoinCode } from '../db/game.js';
import type { UserInfo } from '../auth/types.js';

const colors = [
    '#A62A21',
    '#7e3794',
    '#0B51C1',
    '#3A6024',
    '#A81563',
    '#B3003C'
];

export const createGame = async (
    req: CreateGameRequest,
    userInfo: UserInfo
): Promise<CreateGameResponse> => {
    const players: Player[] = [];

    if (userInfo.user) {
        players.push({
            id: uuid(),
            type: 'authenticated',
            username: userInfo.user.username,
            color: colors[0]
        });
    } else if (req.playerName?.trim()) {
        players.push({
            id: uuid(),
            type: 'guest',
            username: req.playerName,
            guestId: userInfo.guestId,
            color: colors[0]
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
        players.push({ id: uuid(), type: 'pending', username: '', color: colors[i] });
    }

    const gameId = shortUuid.generate();
    const joinCode = await createJoinCode();

    const gameState: GameState = {
        players,
        joinCode,
        started: false
    };

    await dbCreateGame(gameId, gameState);

    return {
        created: true,
        gameId,
        gameState
    }
};

const createJoinCode = async () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let joinCode = [0, 0, 0, 0, 0, 0].map((i) => chars.at(Math.floor(Math.random() * chars.length))).join('');

    if (await getGameIdWithJoinCode(joinCode)) {
        joinCode = await createJoinCode();
    }

    return joinCode;
};
