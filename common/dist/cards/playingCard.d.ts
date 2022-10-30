import { Suit } from './suit';
declare class PlayingCard {
    private idx;
    value: string;
    suit: Suit;
    abbr: string;
    constructor(idx: number);
}
export { PlayingCard };
