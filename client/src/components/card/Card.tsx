import React from 'react';
import CSS from 'csstype';

import { PlayingCard } from '@cardgame/common';

import { renderComponent as renderFrontComponent } from './front';
import { renderComponent as renderBackComponent } from './back';

import styles from './Card.module.css';

interface CardProps {
    card?: PlayingCard;
    width?: number
    withHover?: boolean
}

const Card = (props: CardProps) => {
    console.log(PlayingCard);

    const cardComponent = props.card == null ?
        renderBackComponent() :
        renderFrontComponent(props.card);

    const style: CSS.Properties = {};

    if (props.width) {
        style.width = `${props.width}px`;
        style.height = `${(props.width * 7) / 5}px`;
    }

    let className = styles.card;

    if (props.withHover) {
        className = `${className} ${styles.cardWithHover}`;
    }

    return (
        <div 
            className={className}
            style={style}
        >
            {cardComponent}
        </div>
    );
};

export default Card;