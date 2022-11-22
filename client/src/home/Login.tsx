import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Alert,
    Button,
    Checkbox,
    FormControlLabel,
    Link,
} from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';

import {
    AccountCircle
} from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from '../app/hooks';

import { getLoggingInStatus, login, getLoginFailed } from '../data/user/userSlice';
import { reset as resetSignup } from '../data/user/signupSlice';

import TextField from '../components/forms/TextField';

import styles from './Home.module.less';

const Login = () => {
    const dispatch = useAppDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alertMsg, setAlertMsg] = useState<string>();

    const loggingInStatus = useAppSelector(getLoggingInStatus);
    const loginFailed = useAppSelector(getLoginFailed);

    const loginPending = loggingInStatus === 'pending';

    const navigate = useNavigate();

    let _alertMsg = alertMsg;
    if (!_alertMsg && loginFailed) {
        _alertMsg = 'Invalid username and password specified, please try again.';
    }

    return (
        <div className={styles.loginSection}>
            {_alertMsg != null ? (
                <Alert severity='error'>{_alertMsg}</Alert>
            ) : null}
            <TextField
                label="Username or Email"
                disabled={loginPending}
                fullWidth
                value={username}
                onChange={(value) => setUsername(value)}
                startAdornment={(<AccountCircle />)}
            />
            <TextField
                type="password"
                label="Password"
                disabled={loginPending}
                fullWidth
                value={password}
                onChange={(value) => setPassword(value)}
            />
            <div className={styles.rememberAndForgot}>
                <FormControlLabel
                    label="Remember Me"
                    sx={{ color: 'text.secondary' }}
                    control={
                        <Checkbox size="small" />
                    }
                />
                <Link href="/forgotPassword">
                    Forgot Password?
                </Link>
            </div>
            <LoadingButton
                variant="contained"
                loading={loginPending}
                onClick={async () => {
                    if (loginPending) {
                        return;
                    }

                    if (!username || !password) {
                        setAlertMsg('Please enter both username/email and password.');
                    } else {
                        await dispatch(login({
                            usernameOrEmail: username,
                            password
                        }));

                        setAlertMsg(undefined);
                    }
                }}
            >
                Log In
            </LoadingButton>
            <Button
                variant="outlined"
                onClick={() => {
                    dispatch(resetSignup());
                    navigate('/signUp');
                }}
            >
                Sign Up
            </Button>
        </div>
    )
};

export default Login;
