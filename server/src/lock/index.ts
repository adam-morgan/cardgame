export interface NamedLock {
    release: () => void
}

export const acquireLock = async (name: string): Promise<NamedLock> => {
    // TODO

    return {
        release: () => {}
    };
};

export const acquireGameStateLock = (gameId: string): Promise<NamedLock> => {
    return acquireLock(`gameState-${gameId}`);
};
