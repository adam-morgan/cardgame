import React from 'react';

import { GameState, Player, PlayingCard } from '@cardgame/common';

export interface GameStateModifications {
    switchPlayers: (id1: string, id2: string) => void
    updatePlayer: (player: Player) => void
};
export interface GameBoardProps {
    gameState?: GameState
    playerId?: string
    playerCards?: PlayingCard[]
    cardsDraggable?: boolean | ((card:PlayingCard) => boolean)
    modificationFunctions?: GameStateModifications
    infoItem?: React.ReactNode
};
