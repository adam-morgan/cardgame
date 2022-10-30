import React from 'react';

import { PlayingCard } from '@cardgame/common';

import { Hand } from './components/cardLayouts';
import { GameBoard } from './components/board';

import styles from './TestLayout.module.css';

const TestLayout = () => {
    return (
        <div
            className={styles.testLayout}
        >
            {/* <Hand cards={[
                new PlayingCard(9),
                new PlayingCard(10),
                new PlayingCard(11),
                new PlayingCard(12),
                new PlayingCard(0)
            ]} /> */}

            <GameBoard />
        </div>
    );
};

export default TestLayout;