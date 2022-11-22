import { GameState, PlayingCard } from "@cardgame/common"

export interface GameBoardProps {
    gameState?: GameState,
    playerId?: string,
    playerCards?: PlayingCard[],
    cardsDraggable?: boolean | ((card:PlayingCard) => boolean);
};
