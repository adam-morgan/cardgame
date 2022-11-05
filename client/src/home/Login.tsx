import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Button,
    Checkbox,
    FormControlLabel,
    Link,
} from '@mui/material';

import {
    AccountCircle
} from '@mui/icons-material';

import { useAppDispatch } from '../app/hooks';

import { reset as resetSignup } from '../data/user/signupSlice';

import { TextField } from '../components/forms/TextField';

import styles from './Home.module.less';

const Login = () => {
    const dispatch = useAppDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    return (
        <div className={styles.loginSection}>
            <TextField
                label="Username or Email"
                fullWidth
                value={username}
                onChange={(value) => setUsername(value)}
                startAdornment={(<AccountCircle />)}
            />
            <TextField
                type="password"
                label="Password"
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
            <Button
                variant="contained"
            >
                Log In
            </Button>
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
