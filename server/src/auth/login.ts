import type { User } from '@cardgame/common';

import { getUserByUsername, getUserByEmail, getPasswordForUser } from '../db/auth.js';
import { verifyPassword } from './password.js';

export const doLogin = async (usernameOrEmail: string, password: string): Promise<User | null> => {
    let user = await getUserByEmail(usernameOrEmail);
    if (user == null) {
        user = await getUserByUsername(usernameOrEmail);
    }

    if (user == null) {
        return null;
    }

    const passwordHash = await getPasswordForUser(user.username);
    const passwordValid = passwordHash != null && await verifyPassword(password, passwordHash);

    if (!passwordValid) {
        return null;
    }

    return user;
};
