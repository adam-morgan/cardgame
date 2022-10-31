import React from 'react';
import { useResizeDetector } from 'react-resize-detector';

import { Hand } from '../cardLayouts';

import PlayArea from './PlayArea';
import { GameBoardProps } from './props';

import styles from './Board.module.less';

const LandscapeGameBoard = (props: GameBoardProps) => {
    const { width, ref } = useResizeDetector();

    const outerStyle = {
        borderRadius: width == null ? 0 : `${Math.floor(width * 0.1)}px`
    }

    const innerStyle = {
        borderRadius: width == null ? 0 : `${Math.floor(width * 0.1) - 20}px`
    }

    let playerHand;
    if (props.playerCards != null) {
        playerHand = (
            <Hand 
                cards={props.playerCards} 
                cardsDraggable={props.cardsDraggable} 
            />
        );
    }

    return (
        <div ref={ref} className={styles.landscapeGameBoard}>
            <div className={styles.landscapeGameBoardOuter} style={outerStyle}>
                <div className={styles.landscapeGameBoardInner} style={innerStyle}>
                    <div className={styles.landscapeGameBoardMain}>
                        <div className={styles.landscapePlayArea}>
                            <div className={styles.landscapePlayAreaInner}>
                                <PlayArea />
                            </div>
                        </div>
                        <div className={styles.landscapeHandTray}>
                            <div className={styles.landscapeHandTrayInner}>
                                <div className={styles.landscapeHandTrayCards}>
                                    {playerHand}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandscapeGameBoard;