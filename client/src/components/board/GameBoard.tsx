import React from 'react';
import { useResizeDetector } from 'react-resize-detector';

import { GameBoardProps } from './props';
import LandscapeGameBoard from './LandscapeGameBoard';

import styles from './Board.module.less';

const GameBoard = (props: GameBoardProps) => {
    const { width, ref } = useResizeDetector();

    let boardComponent;
    if (width != null) {
        if (width > 600) {
            boardComponent = (
                <LandscapeGameBoard {...props} />
            )
        } else {
            boardComponent = (
                <div>Not implemented</div>
            )
        }
    }

    return (
        <div ref={ref} className={styles.gameBoard}>
            {boardComponent}
        </div>
    )
};

export default GameBoard;