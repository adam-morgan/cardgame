import type { UserInfo } from '../auth/types.js';
import { getGameState } from '../db/game.js';
import { getUsersByUsername } from '../db/auth.js';

export const loadGameState = async (gameId: string, userInfo: UserInfo) => {
    const gameState = await getGameState(gameId);

    if (gameState == null) {
        return null;
    }

    if (!gameState.players?.some((player) => {
        if (player.type === 'pending') {
            return true;
        }

        if (userInfo.isAuthenticated) {
            return player.type === 'authenticated' && player.username === userInfo.user?.username;
        }

        return player.type === 'guest' && player.guestId === userInfo.guestId;
    })) {
        return null;
    }

    const usernames = gameState.players?.reduce((acc: any, p) => {
        if (p.type === 'authenticated') {
            acc.push(p.username);
        }

        return acc;
    }, []);

    if (usernames.length) {
        const users = (await getUsersByUsername(usernames))?.reduce((acc: any, u) => {
            acc[u.username] = u;
            return acc;
        }, {});

        gameState.players.forEach((p) => {
            if (p.type === 'authenticated') {
                p.email = users[p.username];
            }
        })
    }

    return gameState;
};
