import React from 'react';
import CSS from 'csstype';
import { useDrag } from 'react-dnd';

import { PlayingCard } from '@cardgame/common';

import { renderComponent as renderFrontComponent } from './front';
import { renderComponent as renderBackComponent } from './back';

import styles from './Card.module.less';

interface CardProps {
    card?: PlayingCard
    width?: number
    withHover?: boolean
    draggable?: boolean
}

const Card = (props: CardProps) => {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'card',
        item: props.card,
        collect: (monitor) => ({
            isDragging: Boolean(monitor.isDragging())
        }),
        canDrag: () => props.draggable ?? false
    }));

    let cardComponent;
    if (isDragging) {
        cardComponent = (<div />);
    } else {
        cardComponent = props.card == null ?
            renderBackComponent() :
            renderFrontComponent(props.card);
    }

    const style: CSS.Properties = {};

    if (props.width) {
        style.width = `${props.width}px`;
        style.height = `${(props.width * 7) / 5}px`;
    }

    let className = styles.card;

    if (isDragging) {
        className = `${className} ${styles.isDragging}`;
    } else if (props.withHover) {
        className = `${className} ${styles.cardWithHover}`;
    }

    return (
        <div
            className={className}
            style={style}
            ref={(node) => {
                dragRef(node);

                if (props.withHover && node != null) {
                    node.addEventListener('mouseover', () => {
                        node.style.transform = 'translate3d(0px, 0px, 0px) scale(1.1)';
                    });

                    node.addEventListener('mouseout', () => {
                        node.style.transform = 'translate3d(0px, 0px, 0px) scale(1.0)';
                    });
                }
            }}
        >
            {cardComponent}
        </div>
    );
};

export default Card;
