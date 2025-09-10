import { configureStore } from "@reduxjs/toolkit";
import { storagesApi } from "../api/storagesApi";
import { uiReducer } from "./uiSlice";

export const store = configureStore({
  reducer: {
    [storagesApi.reducerPath]: storagesApi.reducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(storagesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
