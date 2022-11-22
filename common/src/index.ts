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
import { GameState, GetGameStateResponse } from './game/gameState.js';
import { Player } from './game/player.js';

export type {
    CheckSessionResponse,
    CreateAccountRequest,
    CreateAccountResponse,
    CreateGameRequest,
    CreateGameResponse,
    GetGameStateResponse,
    GameState,
    LoginRequest,
    LoginResponse,
    Player,
    Suit,
    User
};

export {
    validation,
    PlayingCard
};
