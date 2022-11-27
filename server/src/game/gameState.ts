import { GameState } from '@cardgame/common';
import { UserInfo } from '../auth/types.js';
import { getControllingPlayer, updateGameState as dbUpdateGameState } from '../db/game.js';

export const updateGameState = async (gameId: string, gameState: GameState, userInfo: UserInfo) => {
    const player = await getControllingPlayer(gameId);

    if (player?.guestId === userInfo.guestId ||
        (player?.type === 'authenticated' && player.username === userInfo.user.username)
    ) {
        await dbUpdateGameState(gameId, gameState);
    }
}
