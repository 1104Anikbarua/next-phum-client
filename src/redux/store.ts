import { configureStore } from "@reduxjs/toolkit";
import { adminApi } from "../api/api";

const store = configureStore({
  reducer: {
    [adminApi.reducerPath]: adminApi.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
