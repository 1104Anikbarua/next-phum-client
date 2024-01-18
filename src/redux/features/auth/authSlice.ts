import { createSlice } from "@reduxjs/toolkit";

interface IState {
  user: null | object;
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
    logout: (state, { payload }) => {
      console.log(payload);
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.actions;
