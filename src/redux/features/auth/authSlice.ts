import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
  customId: string;
  role: string;
  iat: number;
  exp: number;
}

interface IState {
  user: null | IUser;
  token: null | string;
}
const initialState: IState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      const { user, token } = payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
