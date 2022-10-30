interface Suit {
    abbr: string;
    name: string;
}

const SUITS: { [key: string]: Suit } = {
    h: { abbr: 'h', name: 'Hearts' },
    d: { abbr: 'd', name: 'Diamonds' },
    s: { abbr: 's', name: 'Spades' },
    c: { abbr: 'c', name: 'Clubs' }
};

const getSuit = (abbr: string): Suit => {
    return SUITS[abbr];
};

export {
    Suit,
    getSuit
};