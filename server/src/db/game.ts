import {
    GameState
} from "@cardgame/common"

import {
    initializeMongoIndexes,
    getMongoCollection
} from './mongo.js';

const GAMES_COLLECTION = 'games';

export const initGameDb = async () => {
    await initializeMongoIndexes(
        GAMES_COLLECTION,
        [
            {
                indexSpec: { gameId: 1 },
                options: { unique: true }
            }
        ]
    )
};

export const createGame = async (gameId: string, gameState: GameState) => {
    const collection = await getMongoCollection(GAMES_COLLECTION);

    return collection.insertOne({
        gameId,
        ...gameState
    });
};

export const getGameState = async (gameId: string) => {
    const collection = await getMongoCollection(GAMES_COLLECTION);

    const cursor = await collection.find({ gameId });
    const res = await cursor.next();

    if (!res) {
        return null;
    }

    const gameState: GameState = {
        started: res.started,
        players: res.players
    };

    return gameState;
}
