import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CreateAccountRequest, CreateAccountResponse } from '@cardgame/common';

import { RootState } from '../../app/store';

import { sendSignupRequest as sendSignupRequestApi } from './api';

export interface SignupState {
    requestPending: boolean
    response?: CreateAccountResponse
}

const initialState: SignupState = {
    requestPending: false
};

export const sendSignupRequest = createAsyncThunk(
    'signup/sendRequest',
    async (request: CreateAccountRequest) => {
        return sendSignupRequestApi(request);
    }
);

export const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        reset: (state) => {
            state.requestPending = false;
            delete state.response;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendSignupRequest.pending, (state) => {
                state.requestPending = true;
            })
            .addCase(sendSignupRequest.fulfilled, (state, action) => {
                state.requestPending = false;
                state.response = action.payload;
            })
            .addCase(sendSignupRequest.rejected, (state) => {
                state.requestPending = false;
                state.response = {
                    created: false,
                    failureReason: 'Server returned an unknown response.'
                }
            });
    }
});

export const { reset } = signupSlice.actions;

export const isRequestPending = (state: RootState) => state.signup.requestPending;
export const getSignupResponse = (state: RootState) => state.signup.response;

export default signupSlice.reducer;
