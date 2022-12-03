import {
    GameState, Player
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
            },
            {
                indexSpec: { 'gameState.joinCode': 1 }
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
        joinCode: res.joinCode,
        players: res.players
    };

    return gameState;
}

export const getControllingPlayer = async (gameId: string) => {
    const collection = await getMongoCollection(GAMES_COLLECTION);

    const cursor = await collection.aggregate([
        {
            $match: {
                gameId
            }
        },
        {
            $addFields: {
                player: { $arrayElemAt: ['$players', 0] }
            }
        },
        {
            $project: {
                player: 1
            }
        }
    ]);

    const res = await cursor.next();

    if (!res) {
        return null;
    }

    return res.player as Player;
};

export const updateGameState = async (gameId: string, gameState: GameState) => {
    const collection = await getMongoCollection(GAMES_COLLECTION);
    return collection.updateOne({ gameId }, { $set: { ...gameState }});
}

export const getGameIdWithJoinCode = async (joinCode: string) => {
    const collection = await getMongoCollection(GAMES_COLLECTION);
    const cursor = collection.find({ 'gameState.joinCode': joinCode });

    return cursor.next();
};
