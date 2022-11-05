import {
    CreateIndexesOptions,
    IndexSpecification,
    MongoClient
} from 'mongodb';

import isEqual from 'lodash.isequal';

let connPromise: Promise<MongoClient> | null = null;

const MONGO_URL = process.env.MONGO_URL ?? 'mongodb://localhost:27017';
const DB_NAME = process.env.MONGO_DB_NAME ?? 'cardgame';

export interface MongoIndex {
    indexSpec: IndexSpecification,
    options?: CreateIndexesOptions
};

export const getMongoConnection = async () => {
    if (connPromise == null) {
        connPromise = new Promise(async (resolve, reject) => {
            try {
                const client = new MongoClient(MONGO_URL);
                await client.connect();

                resolve(client);
            } catch (e) {
                reject(e);
                connPromise = null;
            }
        });
    }

    return connPromise;
};

export const getMongoDb = async () => {
    const client = await getMongoConnection();
    return client.db(DB_NAME);
};

export const getMongoCollection = async (collectionName: string, createIfNotExists: boolean = false) => {
    const db = await getMongoDb();

    if (createIfNotExists) {
        const collections = await db.collections();
        if (!collections.some((c) => c.collectionName === collectionName)) {
            await db.createCollection(collectionName);
        }
    }

    return db.collection(collectionName);
};

export const initializeMongoIndexes = async (collectionName: string, indexes: MongoIndex[]) => {
    const collection = await getMongoCollection(collectionName, true);
    const existingIndexes = await collection.indexes();

    const drop = existingIndexes.map((e) => e.name).filter((i) => i !== '_id_');
    const create = [];

    for (const index of indexes) {
        const existingIndex = existingIndexes.find((e) => isEqual(e.key, index.indexSpec));

        if (!existingIndex || !_indexOptionsEqual(existingIndex.options, index.options)) {
            create.push(index);
        } else {
            drop.splice(drop.indexOf(existingIndex.name), 1);
        }
    }

    if (drop.length) {
        await Promise.all(drop.map((i) => collection.dropIndex(i)));
    }

    if (create.length) {
        await Promise.all(create.map((i) => collection.createIndex(i.indexSpec, i.options ?? {})));
    }
};

const _indexOptionsEqual = (opts1?: CreateIndexesOptions, opts2?: CreateIndexesOptions) => {
    return false;
};
