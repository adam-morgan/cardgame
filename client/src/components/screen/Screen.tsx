import React from 'react';

import styles from './Screen.module.less';

interface ScreenProps {
    smallBanner: boolean,
    children: React.ReactNode
}

const Screen = (props: ScreenProps) => {
    return (
        <div className={`${styles.screen}${props.smallBanner ? ` ${styles.smallBanner}` : ''}`}>
            <div className={styles.screenContent}>
                <div className={styles.screenLogo}>
                    <div className={styles.screenLogoImages}>
                        <img className={styles.screenImageCards} src="/cards_icon.svg" alt="Cards" />
                        <img className={styles.screenImage120s} src="/120s.svg" alt="120s" />
                        <img className={styles.screenImageCardGame} src="/card_game.svg" alt="Card Game" />
                    </div>
                </div>
                {props.children}
            </div>
        </div>
    )
};

export default Screen;
