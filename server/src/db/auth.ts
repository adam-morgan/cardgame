import type { User } from '@cardgame/common';

import {
    initializeMongoIndexes,
    getMongoCollection
} from './mongo.js';

const USER_COLLECTION = 'users';

export const initUsersDb = async () => {
    await initializeMongoIndexes(
        USER_COLLECTION,
        [
            {
                indexSpec: { email: 1 },
                options: { unique: true }
            },
            {
                indexSpec: { username: 1 },
                options: { unique: true }
            }
        ]
    )
};

export const doesUsernameExist = async (username: string) => {
    const collection = await getMongoCollection(USER_COLLECTION);
    const cursor = await collection.find({ username });
    return cursor.hasNext();
};

export const doesEmailExist = async (email: string) => {
    const collection = await getMongoCollection(USER_COLLECTION);
    const cursor = await collection.find({ email });
    return cursor.hasNext();
};

export const createUser = async (user: User, password: string) => {
    const collection = await getMongoCollection(USER_COLLECTION);

    return collection.insertOne({
        username: user.username,
        email: user.email,
        password
    });
};

export const getUserByUsername = async (username: string): Promise<User | null> => {
    const collection = await getMongoCollection(USER_COLLECTION);
    const cursor = await collection.find({ username });
    const res = await cursor.next();

    if (res == null) {
        return null;
    }

    return {
        username: res.username,
        email: res.email
    }
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
    const collection = await getMongoCollection(USER_COLLECTION);
    const cursor = await collection.find({ email });
    const res = await cursor.next();

    if (res == null) {
        return null;
    }

    return {
        username: res.username,
        email: res.email
    }
};

export const getPasswordForUser = async (username: string): Promise<string | null> => {
    const collection = await getMongoCollection(USER_COLLECTION);
    let cursor = await collection.find({ username });
    cursor = await cursor.project({ password: 1});
    const res = await cursor.next();

    if (res == null) {
        return null;
    }

    return res.password
}
