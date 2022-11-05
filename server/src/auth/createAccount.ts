import type { CreateAccountResponse, User } from '@cardgame/common';

export const createAccount = async (user: User, password: string): Promise<CreateAccountResponse> => {
    // TODO

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return {
        created: true
    };
};
