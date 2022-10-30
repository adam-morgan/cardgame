interface Suit {
    abbr: string;
    name: string;
}
declare const getSuit: (abbr: string) => Suit;
export { Suit, getSuit };
