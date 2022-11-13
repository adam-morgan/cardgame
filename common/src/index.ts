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

import type { GameSetup } from './game/gameSetup.js';
import { CreateGameRequest, CreateGameResponse } from './game/gameSetup.js';

export type {
    CheckSessionResponse,
    CreateAccountRequest,
    CreateAccountResponse,
    CreateGameRequest,
    CreateGameResponse,
    GameSetup,
    LoginRequest,
    LoginResponse,
    Suit,
    User
};

export {
    validation,
    PlayingCard
};
