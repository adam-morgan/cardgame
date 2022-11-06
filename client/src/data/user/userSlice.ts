import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { LoginRequest, User } from '@cardgame/common';

import { checkSession, doLogin } from './api';
import { RootState } from '../../app/store';

export interface UserState {
    status: 'loading' | 'loaded' | 'failed' | null
    isLoggedIn: boolean
    loggingInStatus: 'pending' | 'done' | 'failed' | null
    loginFailed?: boolean
    user?: User
}

const initialState: UserState = {
    status: null,
    isLoggedIn: false,
    loggingInStatus: null,
    loginFailed: false
};

export const initialize = createAsyncThunk(
    'user/initialize',
    () => checkSession()
);

export const login = createAsyncThunk(
    'user/login',
    (request: LoginRequest) => doLogin(request)
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(initialize.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(initialize.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isAuthenticated;
                state.user = action.payload.user;
                state.status = 'loaded';
            })
            .addCase(initialize.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(login.pending, (state) => {
                state.loggingInStatus = 'pending';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isAuthenticated;
                state.user = action.payload.user;
                state.loggingInStatus = 'done';
                state.loginFailed = !action.payload.isAuthenticated;
            })
            .addCase(login.rejected, (state) => {
                state.loggingInStatus = 'failed';
                state.loginFailed = true;
            });
    }
});

export const getStatus = (state: RootState) => state.user.status;
export const getLoggingInStatus = (state: RootState) => state.user.loggingInStatus;
export const getUser = (state: RootState) => state.user.user;
export const isLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const getLoginFailed = (state: RootState) => state.user.loginFailed;

export default userSlice.reducer;
