import { configureStore } from "@reduxjs/toolkit";
import appSlice  from "./configureSlice";
import walletSlice from "./walletSlice";
import { thunk } from "redux-thunk";

export const store = configureStore({
    reducer: {
        appSlice,
        walletSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({thunk: true}).concat(thunk)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;