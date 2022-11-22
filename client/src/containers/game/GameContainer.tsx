import React, { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import Screen from '../../components/screen/Screen';
import GameBoard from '../../components/board/GameBoard';

import {
    isGameInitialized,
    gameInitializationFailed,
    getGameState,
    getPlayerId,
    initializeGame
} from '../../data/game/gameSlice';

import styles from './Game.module.less';

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

    return (
        <Screen smallBanner>
            <div className={styles.main}>
                <div className={styles.board}>
                    <GameBoard gameState={gameState} playerId={playerId} />
                </div>
            </div>
        </Screen>
    );
};

export default GameContainer;
