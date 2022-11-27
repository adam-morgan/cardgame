import { io } from 'socket.io-client';

const socket = io({
    transports: ['websocket']
});

const connPromise = new Promise<void>((resolve) => {
    socket.on('connect', () => resolve());
});

export const getSocket = async (waitForConnection = true) => {
    if (waitForConnection) {
        await connPromise;
    }

    return socket;
};
