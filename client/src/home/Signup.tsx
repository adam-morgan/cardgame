import React, { useState } from 'react';

import { Alert } from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';

import {
    AccountCircle,
    Email
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
    const [alertMsg, setAlertMsg] = useState<string>();

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
    } else if (alertMsg) {
        alert = (
            <Alert severity="error">{alertMsg}</Alert>
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
                disabled={requestPending}
                error={usernameErrorText != null}
                helperText={usernameErrorText}
                fullWidth
                value={username}
                onChange={(value) => setUsername(value)}
                startAdornment={(<AccountCircle />)}
            />
            <TextField
                label="Email"
                disabled={requestPending}
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
                disabled={requestPending}
                error={passwordErrorText != null}
                helperText={passwordErrorText}
                fullWidth
                value={password}
                onChange={(value) => setPassword(value)}
            />
            <LoadingButton
                variant="contained"
                loading={requestPending}
                onClick={async () => {
                    if (requestPending) {
                        return;
                    }

                    if (!isValidUsername || !isValidEmail || !isValidPassword) {
                        setAlertMsg('Please enter valid values for user, email, and password.');
                    } else {
                        await dispatch(sendSignupRequest({
                            email,
                            username,
                            password
                        }));

                        if (alertMsg) {
                            setAlertMsg(undefined);
                        }
                    }
                }}
            >
                Create Account
            </LoadingButton>
        </div>
    )
};

export default Signup;
