import type { GameState } from './gameState.js';

export interface CreateGameRequest {
    numPlayers: number
    playerName?: string
}

export interface CreateGameResponse {
    created: boolean
    gameId?: string
    gameState?: GameState
    failureReason?: string
}
