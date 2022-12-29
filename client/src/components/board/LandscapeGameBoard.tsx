import React from 'react';
import { useResizeDetector } from 'react-resize-detector';

import { Hand } from '../cardLayouts';

import PlayArea from './PlayArea';
import PlayerAvatar from './PlayerAvatar';
import { GameBoardProps } from './props';

import styles from './Board.module.less';

const SIZE_RATIO = 0.6;

const LandscapeGameBoard = (props: GameBoardProps) => {
    const { width, height, ref } = useResizeDetector();

    let boardWidth;
    let boardHeight;

    if (width && height) {
        if (width * SIZE_RATIO > height) {
            boardHeight = height;
            boardWidth = Math.floor(height * (1 + SIZE_RATIO));
        } else {
            boardWidth = width;
            boardHeight = Math.floor(width * SIZE_RATIO);
        }
    }

    const boardStyle = {
        width: boardWidth,
        height: boardHeight
    }

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

    const allowModification = props.modificationFunctions != null;

    const players = [];
    let myPlayerAvatar;

    if (props.gameState?.players?.length) {
        let myIdx = props.gameState.players.findIndex((p) => p.id === props.playerId);

        if (myIdx < 0) {
            myIdx = 0;
        }

        const myPlayer = props.gameState.players[myIdx];
        let myPlayerSize = 50;

        if (boardWidth && boardHeight) {
            myPlayerSize = Math.min(100, Math.floor(Math.min((boardWidth * 0.8) - 60, (boardHeight * 0.3) - 60)));
        }

        myPlayerAvatar = (
            <div key={myPlayer.id}>
                <PlayerAvatar
                    player={myPlayer}
                    size={myPlayerSize}
                />
            </div>
        );

        const numPlayers = props.gameState.players.length;

        for (let i = myIdx + 1; i < myIdx + numPlayers; i++) {
            const arrayIdx = i % numPlayers;
            const player = props.gameState.players[arrayIdx];

            const position = i - myIdx;

            let boardPosition;
            if (position === 1) {
                if (numPlayers === 2) {
                    boardPosition = 3;
                } else {
                    boardPosition = 1;
                }
            } else if (position === 2) {
                if (numPlayers === 3 || numPlayers === 4) {
                    boardPosition = 3;
                } else {
                    boardPosition = 2;
                }
            } else if (position === 3) {
                if (numPlayers === 4) {
                    boardPosition = 5;
                } else if (numPlayers === 5) {
                    boardPosition = 4;
                } else if (numPlayers === 6) {
                    boardPosition = 3;
                }
            } else if (position === 4) {
                if (numPlayers === 5) {
                    boardPosition = 5;
                } else {
                    boardPosition = 4;
                }
            } else {
                boardPosition = 5;
            }

            players.push((
                <div key={`${player.id}${allowModification ? '_y' : '_n'}`} className={styles[`player${boardPosition}`]}>
                    <PlayerAvatar
                        player={player}
                        allowDrag={allowModification}
                        onDrop={(p) => {
                            props.modificationFunctions?.switchPlayers(p.id, player.id);
                        }}
                        updatePlayer={props.modificationFunctions?.updatePlayer}
                    />
                </div>
            ))
        }
    }

    return (
        <div ref={ref} className={styles.landscapeGameBoardWrapper}>
            <div className={styles.landscapeGameBoard} style={boardStyle}>
                <div className={styles.landscapeGameBoardOuter} style={outerStyle}>
                    <div className={styles.landscapeGameBoardInner} style={innerStyle}>
                        <div className={styles.landscapeGameBoardMain}>
                            <div className={styles.landscapePlayArea}>
                                <div className={styles.landscapePlayAreaInner}>
                                    <PlayArea />
                                </div>
                            </div>
                        </div>
                    </div>
                    {players}
                </div>
                <div className={styles.landscapeHandTray}>
                    <div className={styles.landscapeHandTrayInner}>
                        <div className={styles.landscapeTrayPlayerAvatar}>
                            {myPlayerAvatar}
                        </div>
                        <div className={styles.landscapeHandTrayCards}>
                            {playerHand}
                        </div>
                        <div className={styles.landscapeTrayInfoItem}>
                            {props.infoItem}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandscapeGameBoard;
