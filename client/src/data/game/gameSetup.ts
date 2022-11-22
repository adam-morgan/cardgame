import { CreateGameRequest } from "@cardgame/common"

import { AppDispatch, RootState } from '../../app/store';
import { showMasker } from '../../containers/masker/maskerSlice';
import { showAlert } from '../../containers/alert/alertSlice';

import { getUser, getGuestId } from '../user/userSlice';

import { getGameState, sendCreateGameRequest } from './api';

import type { GameSliceState } from './types';

export const createGame = (req: CreateGameRequest) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const masker = dispatch(showMasker());

    try {
        const response = await sendCreateGameRequest(req);

        if (!response.created) {
            dispatch(showAlert({
                type: 'error',
                title: 'Creating Game Failed',
                text: response.failureReason ?? 'Create game request failed for an unknown reason.'
            }));

            return null;
        }

        const user = getUser(getState());
        const guestId = getGuestId(getState());

        const playerId = response.gameState?.players.find((p) => {
            if (p.guestId === guestId || p.username === user?.username) {
                return true;
            }

            return false;
        })?.id;

        dispatch({
            type: 'game/initializeGame',
            payload: {
                gameId: response.gameId,
                gameState: response.gameState,
                playerId
            }
        });

        return response.gameId;
    } catch (e) {
        console.error(e);

        dispatch(showAlert({
            type: 'error',
            title: 'Creating Game Failed',
            text: 'Create game request failed for an unknown reason.'
        }));

        return null;
    } finally {
        masker.close();
    }
};

export const initializeGame = (gameId: string) =>
    async (dispatch: AppDispatch, getState: () => RootState) =>
{
    const isInitializing = isGameInitializing(gameId)(getState());
    const initFailed = gameInitializationFailed(gameId)(getState());

    if (isInitializing || initFailed) {
        return;
    }

    dispatch({
        type: 'game/setInitializing',
        payload: {
            gameId,
            initializing: true
        }
    });

    try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const gameStateResponse = await getGameState(gameId);

        const user = getUser(getState());
        const guestId = getGuestId(getState());

        const playerId = gameStateResponse.gameState?.players.find((p) => {
            if (p.guestId === guestId || p.username === user?.username) {
                return true;
            }

            return false;
        })?.id;

        dispatch({
            type: 'game/initializeGame',
            payload: {
                gameId,
                gameState: gameStateResponse.gameState,
                playerId
            }
        });
    } catch (e) {
        console.error(e);

        dispatch({
            type: 'game/gameInitializationFailed',
            payload: {
                gameId
            }
        });
    }
};

export const _gameSetupReducers = ({
    initializeGame: (state: GameSliceState, { payload }: any) => {
        state.entities[payload.gameId] = {
            ...payload,
            initialized: true,
            initializing: false
        };
    },
    setInitializing: (state: GameSliceState, { payload }: any) => {
        state.entities[payload.gameId] = {
            ...(state.entities[payload.gameId] ?? {}),
            initializing: payload.initializing
        };
    },
    gameInitializationFailed: (state: GameSliceState, { payload }: any) => {
        state.entities[payload.gameId] = {
            ...(state.entities[payload.gameId] ?? {}),
            initializing: false,
            initialized: true,
            initializationFailed: true
        };
    }
});

export const isGameInitialized = (gameId: string) => (state: RootState) => {
    return state.game.entities[gameId]?.initialized === true;
};

export const isGameInitializing = (gameId: string) => (state: RootState) => {
    return state.game.entities[gameId]?.initializing === true;
};

export const gameInitializationFailed = (gameId: string) => (state: RootState) => {
    return state.game.entities[gameId]?.initializationFailed === true;
};