import { configureStore } from "@reduxjs/toolkit";
import providersReducer from "./providersSlice";

export const store = configureStore({
  reducer: {
    providers: providersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
