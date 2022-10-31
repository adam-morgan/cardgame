import { PlayingCard } from "@cardgame/common"

export interface GameBoardProps {
    playerCards?: PlayingCard[],
    cardsDraggable?: boolean | ((card:PlayingCard) => boolean);
};