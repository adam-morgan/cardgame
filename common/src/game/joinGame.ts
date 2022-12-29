import type { GameState } from './gameState.js';

export interface JoinGameRequest {
    joinCode: string
    playerName?: string
}

export interface JoinGameResponse {
    joined: boolean
    gameId?: string
    gameState?: GameState
    failureReason?: string
}
