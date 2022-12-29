import { GameState, PlayingCard } from '@cardgame/common';

export const getShuffledDeck = (): PlayingCard[] => {
    const deck: PlayingCard[] = [];

    for (let i = 0; i < 52; i++) {
        deck.push(new PlayingCard(i));
    }

    for (let i = deck.length - 1; i > 0; i--) {
		const newIndex = Math.floor(Math.random() * (i + 1));
		[deck[i], deck[newIndex]] = [deck[newIndex], deck[i]];
	}

    return deck;
};

export const dealCards = (gameState: GameState) => {
    // Need to know which player is the dealer, then deal cards
};
