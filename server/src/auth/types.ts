import type { User } from '@cardgame/common';

export interface UserInfo {
    isAuthenticated: boolean,
    user: User,
    guestId?: string
}
