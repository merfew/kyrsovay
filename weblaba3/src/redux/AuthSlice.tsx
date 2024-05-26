import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  userId: string;
  isLogin: boolean;
  atoken: Token;
}

export interface Token {
  isPresent: boolean;
  token: string;
}

const initialState: CounterState = {
  userId: "",
  isLogin: false,
  atoken: {
    isPresent: false,
    token: " "
  }
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLogin = true;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.atoken.isPresent = true;
      state.atoken.token = action.payload;
    },
    enter: (state, action: PayloadAction<string>) => {
      state.atoken.isPresent = false;
      state.atoken.token = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
  
});

export const { login, setToken, enter, setUserId } = authSlice.actions;