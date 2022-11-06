import type { CreateAccountResponse, User } from '@cardgame/common';
import { validation } from '@cardgame/common';

import { doesUsernameExist, doesEmailExist, createUser } from '../db/auth.js';

import { hashPassword } from './password.js';

export const createAccount = async (user: User, password: string): Promise<CreateAccountResponse> => {
    let created = false;
    let failureReason;

    if (!validation.isUsernameValid(user.username)) {
        failureReason = 'Invalid username.';
    } else if (!validation.isEmailValid(user.email)) {
        failureReason = 'Invalid email.';
    } else if (!validation.isPasswordValid(password)) {
        failureReason = 'Invalid password.';
    } else if (await doesUsernameExist(user.username)) {
        failureReason = 'A user with that username already exists.';
    } else if (await doesEmailExist(user.email)) {
        failureReason = 'A user with that email address already exists.';
    } else {
        password = await hashPassword(password);
        await createUser(user, password);

        created = true;
    }

    return { created, failureReason };
};
