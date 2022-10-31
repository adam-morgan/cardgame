import React from 'react';
import { useDrop } from 'react-dnd';

import { PlayingCard } from '@cardgame/common';

import styles from './Board.module.less';

interface PlayAreaProps {

}

const PlayArea = (props: PlayAreaProps) => {
    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: 'card',
        drop: (item: PlayingCard) => {
            console.log(item.abbr);
        },
        collect: (monitor) => ({
            isOver: Boolean(monitor.isOver())
        })
    }));

    let className = styles.playArea;
    if (isOver) {
        className = `${className} ${styles.drop}`;
    }

    return (
        <div className={className} ref={dropRef} />
    );
};

export default PlayArea;