import React from 'react';

import { useResizeDetector } from 'react-resize-detector';

import { PlayingCard } from '@cardgame/common';

import { Card } from '../card';

import styles from './CardLayouts.module.css';

const OVERLAP_DENOM = 2.5;

interface HandProps {
    cards?: PlayingCard[];
}

const Hand = (props: HandProps) => {
    const { width, height, ref } = useResizeDetector();

    let cardElements;

    if (width != null && props.cards?.length) {
        // let optimalCardWidth = Math.floor((width * OVERLAP_DENOM) / ((2 * props.cards.length) + 1));
        const m = 1 - (1 / OVERLAP_DENOM);
        let optimalCardWidth = Math.floor(width / (1 + (m * props.cards.length) - m));

        const calculatedHeight = optimalCardWidth * (7 / 5);

        if (height != null && calculatedHeight > height) {
            optimalCardWidth = height * (5 / 7);
        }

        cardElements = props.cards?.map((card, idx) => {
            return (
                <div
                    key={`card${idx}`}
                    style={{
                        marginLeft: idx ? Math.ceil(-1 * optimalCardWidth / OVERLAP_DENOM) : 0
                    }}
                >
                    <Card
                        card={card}
                        width={optimalCardWidth}
                        withHover
                    />
                </div>
            );
        });
    }

    return (
        <div ref={ref} className={styles.hand}>
            {cardElements}
        </div>
    );
};

export default Hand;