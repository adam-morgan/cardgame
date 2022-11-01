import React from 'react';

import styles from './Home.module.less';

const HomeScreen = () => {
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
            </div>
        </div>
    );
};

export default HomeScreen;