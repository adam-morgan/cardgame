import { PlayingCard } from '../cards/playingCard.js';
import type { Player } from './player.js';

export interface GameState {
    players: Player[],
    joinCode: string,
    started: boolean,
    deck?: PlayingCard[],
    kitty?: PlayingCard[],
    stage?: 'BID' | 'CHOOSE' | 'PLAY'
}

export interface GetGameStateResponse {
    gameState: GameState
}

export interface UpdateGameSetupRequest {
    gameId: string,
    gameState: GameState
}
