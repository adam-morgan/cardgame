import { createSlice } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { v4 as uuid } from 'uuid';

import { RootState } from '../../app/store';

interface MaskerInstance {
    id: string
}

export interface MaskerState {
    instanceStack: MaskerInstance[]
}

const initialState: MaskerState = {
    instanceStack: []
};

export const showMasker = () => (dispatch: Dispatch) => {
    const id = uuid();
    dispatch(maskerSlice.actions.addMaskerInstance({ id }));

    return {
        close: () => {
            dispatch(maskerSlice.actions.removeMaskerInstance(id));
        }
    };
};

export const maskerSlice = createSlice({
    name: 'masker',
    initialState,
    reducers: {
        addMaskerInstance: (state, { payload }) => {
            state.instanceStack.push(payload);
        },
        removeMaskerInstance: (state, { payload }) => {
            state.instanceStack = state.instanceStack.filter((i) => i.id !== payload);
        }
    },
});

export const isShowingMasker = (state: RootState) => state.containers.masker.instanceStack.length > 0;

export default maskerSlice.reducer;
