const SUITS = {
    h: { abbr: 'h', name: 'Hearts' },
    d: { abbr: 'd', name: 'Diamonds' },
    s: { abbr: 's', name: 'Spades' },
    c: { abbr: 'c', name: 'Clubs' }
};
const getSuit = (abbr) => {
    return SUITS[abbr];
};
export { getSuit };
