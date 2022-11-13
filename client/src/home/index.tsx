import React from 'react';

import { useAppSelector } from '../app/hooks';
import { isLoggedIn } from '../data/user/userSlice';

import Login from './Login';
import Signup from './Signup';
import CreateGame from './CreateGame';

import styles from './Home.module.less';

interface HomeScreenProps {
    mode: 'home' | 'signUp'
}

const HomeScreen = (props: HomeScreenProps) => {
    const loggedIn = useAppSelector(isLoggedIn);

    let homeContent: React.ReactNode | null;
    if (props.mode === 'signUp') {
        homeContent = <Signup />;
    } else if (props.mode === 'home') {
        homeContent = (
            <>
                {!loggedIn ? (<Login key="login"/>) : null}
                <CreateGame key="createGame" />
            </>
        );
    }

    return (
        <div className={styles.home}>
            <div className={styles.homeContent}>
                <div className={styles.homeLogo}>
                    <div className={styles.homeLogoImages}>
                        <img className={styles.homeImageCards} src="/cards_icon.svg" alt="Cards" />
                        <img className={styles.homeImage120s} src="/120s.svg" alt="120s" />
                        <img className={styles.homeImageCardGame} src="/card_game.svg" alt="Card Game" />
                    </div>
                </div>
                {homeContent}
            </div>
        </div>
    );
};

HomeScreen.defaultProps = {
    mode: 'home'
};

export default HomeScreen;
