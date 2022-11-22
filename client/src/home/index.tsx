import React, { useState } from 'react';

import { useAppSelector } from '../app/hooks';
import { isLoggedIn } from '../data/user/userSlice';

import Screen from '../components/screen/Screen';

import Login from './Login';
import Signup from './Signup';
import CreateGame from './CreateGame';
import { SmallBannerContext } from './context';

interface HomeScreenProps {
    mode: 'home' | 'signUp'
}

const HomeScreen = (props: HomeScreenProps) => {
    const [smallBanner, setSmallBanner] = useState(false);
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
        <SmallBannerContext.Provider value={{ setSmallBanner }}>
            <Screen smallBanner={smallBanner}>
                {smallBanner ? null : homeContent}
            </Screen>
        </SmallBannerContext.Provider>
    );
};

HomeScreen.defaultProps = {
    mode: 'home'
};

export default HomeScreen;
