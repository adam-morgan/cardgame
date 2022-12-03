import React, { useEffect, useState } from 'react';

import { Button } from '@mui/material';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import Screen from '../../components/screen/Screen';
import GameBoard from '../../components/board/GameBoard';
import MessageArea from '../../components/board/MessageArea';

import Toast from '../../components/util/Toast';

import {
    isGameInitialized,
    gameInitializationFailed,
    getGameState,
    getPlayerId,
    initializeGame,
    switchPlayers,
    updatePlayer
} from '../../data/game/gameSlice';

import styles from './Game.module.less';
import { Player } from '@cardgame/common';

interface GameContainerProps {
    gameId: string
}

const GameContainer = (props: GameContainerProps) => {
    const dispatch = useAppDispatch();
    const isInitialized = useAppSelector(isGameInitialized(props.gameId));
    const failed = useAppSelector(gameInitializationFailed(props.gameId));
    const gameState = useAppSelector(getGameState(props.gameId));
    const playerId = useAppSelector(getPlayerId(props.gameId));

    useEffect(() => {
        if (!isInitialized && !failed) {
            dispatch(initializeGame(props.gameId));
        }
    }, [isInitialized, failed, props.gameId, dispatch]);

    const [showCopyPopup, setShowCopyPopup] = useState(false);

    const allowModifications = !gameState?.started &&
        playerId === gameState?.players[0].id;

    let modificationFunctions;
    if (allowModifications) {
        modificationFunctions = {
            switchPlayers: (id1: string, id2: string) => {
                dispatch(switchPlayers(props.gameId, id1, id2));
            },
            updatePlayer: (player: Player) => {
                dispatch(updatePlayer(props.gameId, player));
            }
        }
    }

    const messages: (string | React.ReactNode)[] = [];

    if (gameState?.players.some((p) => p.type === 'pending')) {
        messages.push((
            <span>
                Invite players by sending this code:&nbsp;
                <span className={styles.joinCode}>{gameState.joinCode}</span>
                &nbsp;(
                <Button
                    className={styles.copyButton}
                    onClick={() => {
                        navigator.clipboard.writeText(gameState.joinCode);
                        setShowCopyPopup(true);
                    }}
                >
                    Copy
                </Button>
                )
            </span>
        ));
    }

    return (
        <Screen smallBanner>
            <div className={styles.main}>
                <MessageArea messages={messages} />
                <div className={styles.board}>
                    <GameBoard
                        gameState={gameState}
                        playerId={playerId}
                        modificationFunctions={modificationFunctions}
                    />
                </div>
            </div>
            <Toast
                open={showCopyPopup}
                message="Code copied to clipboard."
                onClose={() => setShowCopyPopup(false)}
                autoHideDuration={5000}
            />
        </Screen>
    );
};

export default GameContainer;
