import type { GameState } from '@cardgame/common';

export interface GameEntity {
    gameId: string,
    gameState: GameState,
    playerId: string,
    starting?: boolean,
    initialized: boolean,
    initializing: boolean,
    initializationFailed?: boolean
}

export interface GameSliceState {
    entities: { [key: string]: GameEntity }
}
