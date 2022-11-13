import React, { useEffect } from 'react';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import { useAppDispatch, useAppSelector } from './app/hooks';

import {
    initialize as initializeUser,
    getStatus as getUserStatus
} from './data/user/userSlice';

import HomeScreen from './home';

import Masker from './containers/masker/MaskerContainer';
import PopupAlert from './containers/alert/PopupAlertContainer';

import './App.css';
import TestLayout from './TestLayout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeScreen />,
    },
    {
        path: 'signUp',
        element: <HomeScreen mode="signUp" />
    },
    {
        path: 'test',
        element: <TestLayout />
    }
]);

const App = () => {
    const dispatch = useAppDispatch();
    const userStatus = useAppSelector(getUserStatus);

    useEffect(() => {
        if (userStatus === null) {
        dispatch(initializeUser());
        }
    }, [userStatus, dispatch]);

    const shouldRender = userStatus === 'loaded';

    return (
        <div className="App" data-theme="light">
            {shouldRender ? (<RouterProvider router={router} />) : null}
            <Masker />
            <PopupAlert />
        </div>
    );
}

export default App;
