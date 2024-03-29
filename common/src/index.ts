import {
    User,
    CreateAccountRequest,
    CreateAccountResponse,
    CheckSessionResponse,
    LoginRequest,
    LoginResponse
} from './auth/user.js';

import * as validation from './validation/index.js';

import { PlayingCard } from './cards/playingCard.js';
import { Suit } from './cards/suit.js';

import { CreateGameRequest, CreateGameResponse } from './game/createGame.js';
import { JoinGameRequest, JoinGameResponse } from './game/joinGame.js';
import { GameState, GetGameStateResponse, UpdateGameSetupRequest } from './game/gameState.js';
import { Player } from './game/player.js';

export type {
    CheckSessionResponse,
    CreateAccountRequest,
    CreateAccountResponse,
    CreateGameRequest,
    CreateGameResponse,
    GetGameStateResponse,
    GameState,
    JoinGameRequest,
    JoinGameResponse,
    LoginRequest,
    LoginResponse,
    Player,
    Suit,
    UpdateGameSetupRequest,
    User
};

export {
    validation,
    PlayingCard
};
