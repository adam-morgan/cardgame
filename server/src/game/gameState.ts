import { GameState } from '@cardgame/common';
import { UserInfo } from '../auth/types.js';
import {
    getControllingPlayer,
    getGameState as dbGetGameState,
    updateGameState as dbUpdateGameState
} from '../db/game.js';

import { dealCards, getShuffledDeck } from './util.js';

export const updateGameSetup = async (gameId: string, gameState: GameState, userInfo: UserInfo) => {
    if (await isControllingPlayer(gameId, userInfo)) {
        const state = await dbGetGameState(gameId);

        if (state?.started) {
            throw new Error('Cannot update game setup, game has been started.');
        }

        await dbUpdateGameState(gameId, gameState);
    }
};

export const startGame = async (gameId: string, userInfo: UserInfo) => {
    if (await isControllingPlayer(gameId, userInfo)) {
        const state = await dbGetGameState(gameId);

        if (state && !state.players?.some((p) => p.type === 'pending')) {
            startNewHand(state);
            await dbUpdateGameState(gameId, { ...state, started: true } as GameState)
        }
    }
};

const startNewHand = (gameState: GameState) => {
    gameState.deck = getShuffledDeck();
    gameState.stage = 'BID';

    dealCards(gameState);
};

const isControllingPlayer = async (gameId: string, userInfo: UserInfo) => {
    const player = await getControllingPlayer(gameId);

    if (player?.guestId === userInfo.guestId ||
        (player?.type === 'authenticated' && player.username === userInfo.user?.username)
    ) {
        return true;
    }

    return false;
}

export const getSanitizedGameState = (gameState: GameState, userInfo: UserInfo) => {
    gameState = { ...gameState };
    delete gameState.deck;
    return gameState;
};
