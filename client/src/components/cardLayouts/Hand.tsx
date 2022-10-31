import React from 'react';

import { useResizeDetector } from 'react-resize-detector';

import { PlayingCard } from '@cardgame/common';

import { Card } from '../card';

import styles from './CardLayouts.module.less';

const OVERLAP_DENOM = 3;

interface HandProps {
    cards?: PlayingCard[];
    cardsDraggable?: boolean | ((card:PlayingCard) => boolean);
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
            let draggable;
            if (props.cardsDraggable != null) {
                if (typeof props.cardsDraggable === 'boolean') {
                    draggable = props.cardsDraggable;
                } else {
                    draggable = props.cardsDraggable(card);
                }
            }

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
                        draggable={draggable}
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