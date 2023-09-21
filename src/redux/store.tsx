import { configureStore } from "@reduxjs/toolkit";
import providersReducer from "./providersSlice";
import usersReducer from "./ClientsSlice";

export const store = configureStore({
  reducer: {
    providers: providersReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
