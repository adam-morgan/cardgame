import type { Player } from './player.js';

export interface GameState {
    players: Player[],
    joinCode: string,
    started: boolean
}

export interface GetGameStateResponse {
    gameState: GameState
}

export interface UpdateGameStateRequest {
    gameId: string,
    gameState: GameState
}
