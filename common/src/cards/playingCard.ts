import { getSuit, Suit } from './suit.js';

const SUITS = [getSuit('h'), getSuit('d'), getSuit('s'), getSuit('c')];
const VALUES = ['a', '2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k'];

class PlayingCard {
    private idx: number;
    value: string;
    suit: Suit;
    abbr: string;

    constructor(idx: number) {
        this.idx = idx;
        this.suit = SUITS[Math.floor(this.idx / 13)];
        this.value = VALUES[this.idx % 13];
        this.abbr = `${this.value}${this.suit.abbr}`;
    }
}

export {
    PlayingCard
};
