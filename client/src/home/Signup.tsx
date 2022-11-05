import React, { useState } from 'react';

import { Alert } from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';

import {
    AccountCircle,
    Email,
    Save
} from '@mui/icons-material';

import { validation } from '@cardgame/common';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { isRequestPending, getSignupResponse, sendSignupRequest } from '../data/user/signupSlice';

import { TextField } from '../components/forms/TextField';

import styles from './Home.module.less';

const Signup = () => {
    const dispatch = useAppDispatch();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isValidEmail = email != null && validation.isEmailValid(email);
    const isValidUsername = username != null && validation.isUsernameValid(username);
    const isValidPassword = password != null && validation.isPasswordValid(password);

    let emailErrorText: string | undefined;
    if (email && !isValidEmail) {
        emailErrorText = 'Please enter a valid email address';
    }

    let usernameErrorText: string | undefined;
    if (username && !isValidUsername) {
        usernameErrorText = validation.getValidUsernameDescription();
    }

    let passwordErrorText: string | undefined;
    if (password && !isValidPassword) {
        passwordErrorText = validation.getValidPasswordDescription();
    }

    const requestPending = useAppSelector(isRequestPending);
    const response = useAppSelector(getSignupResponse);

    let alert: React.ReactNode | undefined;

    if (response?.created) {
        return (
            <div className={styles.signUpSection}>
                <Alert severity="success">
                    Your account sign up request was processed successfully.  You should receive an account activation
                    email shortly.
                </Alert>
            </div>
        );
    } else if (response?.failureReason) {
        alert = (
            <Alert severity="error">{response.failureReason}</Alert>
        );
    }

    return (
        <div className={styles.signUpSection}>
            {alert}
            <TextField
                label="Username"
                error={usernameErrorText != null}
                helperText={usernameErrorText}
                fullWidth
                value={username}
                onChange={(value) => setUsername(value)}
                startAdornment={(<AccountCircle />)}
            />
            <TextField
                label="Email"
                error={emailErrorText != null}
                helperText={emailErrorText}
                fullWidth
                value={email}
                onChange={(value) => setEmail(value)}
                startAdornment={(<Email />)}
            />
            <TextField
                type="password"
                label="Password"
                error={passwordErrorText != null}
                helperText={passwordErrorText}
                fullWidth
                value={password}
                onChange={(value) => setPassword(value)}
            />
            <LoadingButton
                variant="contained"
                loading={requestPending}
                startIcon={requestPending ? <Save /> : undefined}
                loadingPosition={requestPending ? "start" : undefined}
                disabled={!isValidUsername || !isValidEmail || !isValidPassword}
                onClick={() => {
                    if (requestPending) {
                        return;
                    }

                    dispatch(sendSignupRequest({
                        email,
                        username,
                        password
                    }));
                }}
            >
                Create Account
            </LoadingButton>
        </div>
    )
};

export default Signup;
