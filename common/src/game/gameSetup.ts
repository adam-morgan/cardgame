export interface GameSetup {
    numPlayers?: number
}

export interface CreateGameRequest {
    gameSetup: GameSetup
}

export interface CreateGameResponse {
    created: boolean,
    gameId?: string,
    failureReason?: string
}
