import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface UserState {
    status: 'loading' | 'loaded' | 'failed' | null,
    isLoggedIn: boolean
}

const initialState: UserState = {
    status: null,
    isLoggedIn: false
};

export const initialize = createAsyncThunk(
    'user/initialize',
    async () => {
        // TODO
        return { isLoggedIn: false };
    }
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
                state.isLoggedIn = action.payload.isLoggedIn;
                state.status = 'loaded';
            })
            .addCase(initialize.rejected, (state) => {
                state.status = 'failed';
            });
    }
});

export const getStatus = (state: RootState) => state.user.status;
export const isLoggedIn = (state: RootState) => state.user.isLoggedIn;

export default userSlice.reducer;