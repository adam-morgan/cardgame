import {
    CreateGameRequest,
    CreateGameResponse,
    GameState,
    GetGameStateResponse,
    JoinGameRequest,
    JoinGameResponse,
    Player
} from "@cardgame/common"

import { AppDispatch, RootState } from '../../app/store';
import { showMasker } from '../../containers/masker/maskerSlice';
import { showAlert } from '../../containers/alert/alertSlice';

import { getUser, getGuestId } from '../user/userSlice';

import {
    getGameState,
    registerGameStateListener,
    sendCreateGameRequest,
    sendJoinGameRequest,
    startGame as apiStartGame,
    updateGameSetup
} from './api';

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

        _initGame(response.gameId as string, response, dispatch, getState());

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

export const joinGame = (req: JoinGameRequest) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const masker = dispatch(showMasker());

    try {
        const response = await sendJoinGameRequest(req);

        if (!response.joined) {
            dispatch(showAlert({
                type: 'error',
                title: 'Joining Game Failed',
                text: response.failureReason ?? 'Join game request failed for an unknown reason.'
            }));

            return null;
        }

        _initGame(response.gameId as string, response, dispatch, getState());

        return response.gameId;
    } catch (e) {
        console.error(e);

        dispatch(showAlert({
            type: 'error',
            title: 'Joining Game Failed',
            text: 'Join game request failed for an unknown reason.'
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
        const gameStateResponse = await getGameState(gameId);

        _initGame(gameId, gameStateResponse, dispatch, getState());
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

const _initGame = (
    gameId: string,
    response: CreateGameResponse | JoinGameResponse | GetGameStateResponse,
    dispatch: AppDispatch,
    state: RootState
) => {
    const user = getUser(state);
    const guestId = getGuestId(state);

    const playerId = response.gameState?.players.find((p) => {
        if (p.guestId === guestId || p.username === user?.username) {
            return true;
        }

        return false;
    })?.id;

    dispatch({
        type: 'game/initializeGame',
        payload: {
            gameId,
            gameState: response.gameState,
            playerId
        }
    });

    registerGameStateListener(gameId, (gameState: GameState) => {
        dispatch({
            type: 'game/updateGameState',
            payload: {
                gameId,
                gameState
            }
        });
    });
};

export const switchPlayers = (gameId: string, id1: string, id2: string) =>
    async (dispatch: AppDispatch, getState: () => RootState) =>
{
    const gameState = {
        ...getState().game.entities[gameId].gameState
    };

    let players = [...gameState.players];

    const idx1 = players.findIndex((p) => p.id === id1);
    const idx2 = players.findIndex((p) => p.id === id2);

    const tmp = players[idx1];
    players[idx1] = players[idx2];
    players[idx2] = tmp;

    gameState.players = players;

    dispatch({
        type: 'game/updateGameState',
        payload: {
            gameId,
            gameState
        }
    });

    updateGameSetup({ gameId, gameState });
};

export const updatePlayer = (gameId: string, player: Player) =>
    async (dispatch: AppDispatch, getState: () => RootState) =>
{
    const gameState = {
        ...getState().game.entities[gameId].gameState
    };

    gameState.players = [...gameState.players];

    const idx = gameState.players.findIndex((p) => p.id === player.id);
    gameState.players[idx] = player;

    dispatch({
        type: 'game/updateGameState',
        payload: {
            gameId,
            gameState
        }
    });

    updateGameSetup({ gameId, gameState });
}

export const startGame = (gameId: string) =>
    async (dispatch: AppDispatch, getState: () => RootState) =>
{
    dispatch({
        type: 'game/setGameStarting',
        payload: { gameId }
    });

    await apiStartGame(gameId);
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
    },
    updateGameState: (state: GameSliceState, { payload }: any) => {
        state.entities[payload.gameId] = {
            ...(state.entities[payload.gameId] ?? {}),
            gameState: payload.gameState
        };

        if (payload.gameState.started) {
            state.entities[payload.gameId].starting = false;
        }
    },
    setGameStarting: (state: GameSliceState, { payload }: any) => {
        state.entities[payload.gameId].starting = true;
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

export const isGameStarting = (gameId: string) => (state: RootState) => {
    return state.game.entities[gameId]?.starting === true;
}
