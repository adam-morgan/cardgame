import { createSlice } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { v4 as uuid } from 'uuid';

import { RootState } from '../../app/store';

type AlertType = 'success' | 'info' | 'warning' | 'error';

interface AlertInstance {
    id: string,
    text: string,
    title: string,
    type?: AlertType,
    buttonText: string
}

export interface AlertState {
    instanceStack: AlertInstance[]
}

const initialState: AlertState = {
    instanceStack: []
};

interface ShowAlertReq {
    type?: AlertType
    title?: string
    text: string
    buttonText?: string
}

export const showAlert = (req: ShowAlertReq) => (dispatch: Dispatch) => {
    const id = uuid();
    dispatch(alertSlice.actions.addAlertInstance({
        id,
        text: req.text,
        title: req.title,
        type: req.type,
        buttonText: req.buttonText ?? 'Ok'
    }));
};

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        addAlertInstance: (state, { payload }) => {
            state.instanceStack.push(payload);
        },
        removeAlertInstance: (state, { payload }) => {
            state.instanceStack = state.instanceStack.filter((i) => i.id !== payload);
        }
    },
});

export const { removeAlertInstance } = alertSlice.actions;

export const getAlert = (state: RootState) => {
    const stack = state.containers.alert.instanceStack;

    if (!stack.length) {
        return undefined;
    }

    return stack[stack.length - 1];
};

export default alertSlice.reducer;
