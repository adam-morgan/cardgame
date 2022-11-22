import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';

import { _gameSetupReducers } from './gameSetup';

import type { GameSliceState } from './types';

const initialState: GameSliceState = {
    entities: {}
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        ..._gameSetupReducers
    }
});

export const getGameState = (gameId: string) => (state: RootState) => {
    return state.game.entities[gameId]?.gameState;
};

export const getPlayerId = (gameId: string) => (state: RootState) => {
    return state.game.entities[gameId]?.playerId;
}

export * from './gameSetup';

export default gameSlice.reducer;
