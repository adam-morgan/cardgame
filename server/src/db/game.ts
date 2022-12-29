import {
    GameState, Player, PlayingCard
} from '@cardgame/common'

import { gameStateUpdated } from '../game/stateListener.js';

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
        ...serializeGameState(gameState)
    });
};

export const getGameState = async (gameId: string) => {
    const collection = await getMongoCollection(GAMES_COLLECTION);

    const cursor = await collection.find({ gameId });
    const res = await cursor.next();

    if (!res) {
        return null;
    }

    return deserializeGameState(res);
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
    await collection.updateOne({ gameId }, { $set: { ...serializeGameState(gameState) }});

    gameStateUpdated(gameId);
}

export const getGameIdWithJoinCode = async (joinCode: string) => {
    const collection = await getMongoCollection(GAMES_COLLECTION);
    const cursor = collection.find({ 'gameState.joinCode': joinCode }).project({ gameId: 1 });

    return (await cursor.next())?.gameId;
};

const serializeGameState = (gameState: GameState) => {
    let deck;
    if (gameState.deck != null) {
        deck = gameState.deck.map((c) => c.idx);
    }

    let kitty;
    if (gameState.kitty != null) {
        kitty = gameState.kitty.map((c) => c.idx);
    }

    let players;
    if (gameState.players != null) {
        players = gameState.players.map((p) => {
            let cards;
            if (p.cards) {
                cards = p.cards.map((c) => c.idx);
            }

            return { ...p, cards };
        });
    }

    return {
        ...gameState,
        players,
        deck,
        kitty
    };
};

const deserializeGameState = (document: any): GameState => {
    let deck;
    if (document.deck != null) {
        deck = document.deck.map((c: number) => new PlayingCard(c));
    }

    let kitty;
    if (document.kitty != null) {
        kitty = document.kitty.map((c: number) => new PlayingCard(c));
    }

    let players;
    if (document.players) {
        players = document.players.map((p: any) => {
            let cards;
            if (p.cards) {
                cards = p.cards.map((c: number) => new PlayingCard(c));
            }

            return { ...p, cards };
        });
    }

    return {
        started: document.started,
        joinCode: document.joinCode,
        players: players,
        stage: document.stage,
        deck,
        kitty
    }
};
