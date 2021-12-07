import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../models/user';

export interface LoginPayload {
  username: string;
  password: string;
  navigate?: object;
}

export interface IAuthState {
  isLoggedIn: boolean;
  logging?: boolean;
  currentUser?: IUser;
}

const initialState: IAuthState = {
  isLoggedIn: false,
  logging: false,
  currentUser: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.logging = true;
    },
    loginSuccess(state, action: PayloadAction<IUser>) {
      state.isLoggedIn = true;
      state.logging = false;
      state.currentUser = action.payload;
    },
    loginFail(state, action: PayloadAction) {
      state.isLoggedIn = false;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
    },
  },
});

// Actions
export const authActions = authSlice.actions;

// Selectors
export const authSelectors = (state: any) => state.auth;

// Reducers
export const authReducer = authSlice.reducer;

export default authReducer;
