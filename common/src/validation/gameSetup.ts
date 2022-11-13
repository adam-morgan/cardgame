import { GameSetup } from '../game/gameSetup.js';

export const isGameSetupValid = (gameSetup: GameSetup) => {
    if (gameSetup == null) {
        return false;
    }

    if (gameSetup.numPlayers == null) {
        return false;
    }

    return true;
};
