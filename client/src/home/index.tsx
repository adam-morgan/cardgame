import React, { useState } from 'react';
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    IconButton,
    InputAdornment,
    InputLabel,
    Link,
    OutlinedInput,
    TextField
} from '@mui/material';

import {
    AccountCircle,
    Lock,
    Visibility,
    VisibilityOff
} from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from '../app/hooks';

import { isLoggedIn } from '../data/user/userSlice';

import styles from './Home.module.less';

const HomeScreen = () => {
    const loggedIn = useAppSelector(isLoggedIn);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

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
                {!loggedIn ? (
                    <div className={styles.loginSection}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                            InputLabelProps={{
                                shrink: username?.length > 0,
                                className: username?.length > 0 ? undefined : styles.inputLabelNoShrink
                            }}
                        />
                        <FormControl fullWidth variant="outlined">
                            <InputLabel
                                htmlFor="password"
                                shrink={password?.length > 0}
                                className={password?.length > 0 ? undefined : styles.inputLabelNoShrink}
                            >
                                Password
                            </InputLabel>
                            <OutlinedInput
                                id="password"
                                label={password?.length > 0 ? 'Password' : undefined}
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <Lock />
                                    </InputAdornment>
                                }
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                            onMouseDown={(e) => e.preventDefault()}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
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
                        >
                            Sign Up
                        </Button>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default HomeScreen;
