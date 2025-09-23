import { configureStore } from "@reduxjs/toolkit";
import { storagesApi } from "../api/storagesApi";
import { uiReducer } from "./uiSlice";
import { authApi } from "../api/authApi";
import { authReducer } from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [storagesApi.reducerPath]: storagesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([storagesApi.middleware, authApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
