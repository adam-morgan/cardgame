import React from 'react';
import { useResizeDetector } from 'react-resize-detector';

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
// import { TouchBackend } from 'react-dnd-touch-backend';

import { GameBoardProps } from './props';
import LandscapeGameBoard from './LandscapeGameBoard';

import styles from './Board.module.less';

const GameBoard = (props: GameBoardProps) => {
    const dndBackend = HTML5Backend;

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
        <DndProvider backend={dndBackend}>
            <div ref={ref} className={styles.gameBoard}>
                {boardComponent}
            </div>
        </DndProvider>
    )
};

export default GameBoard;
