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
