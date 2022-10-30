import React from 'react';

import { useResizeDetector } from 'react-resize-detector';

import styles from './Board.module.css';

interface GameBoardProps {
    
}

const GameBoard = (props: GameBoardProps) => {
    const { width, ref } = useResizeDetector();

    const outerStyle = {
        borderRadius: width == null ? 0 : `${Math.floor(width * 0.1)}px`
    }

    const innerStyle = {
        borderRadius: width == null ? 0 : `${Math.floor(width * 0.1) - 20}px`
    }

    return (
        <div ref={ref} className={styles.gameBoard}>
            <div className={styles.gameBoardOuter} style={outerStyle}>
                <div className={styles.gameBoardInner} style={innerStyle}>

                </div>
            </div>
        </div>
    );
};

export default GameBoard;