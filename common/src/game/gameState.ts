import type { Player } from './player.js';

export interface GameState {
    players: Player[]
    started: boolean
}

export interface GetGameStateResponse {
    gameState: GameState
}
