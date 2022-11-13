import { combineReducers, configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import alertReducer from '../containers/alert/alertSlice';
import maskerReducer from '../containers/masker/maskerSlice';
import signupReducer from '../data/user/signupSlice';
import userReducer from '../data/user/userSlice';

export const store = configureStore({
  reducer: {
    containers: combineReducers({
        alert: alertReducer,
        masker: maskerReducer
    }),
    signup: signupReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
