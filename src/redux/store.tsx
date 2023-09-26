import { configureStore } from "@reduxjs/toolkit";
import providersReducer from "./providersSlice";
import clientsReducer from "./ClientsSlice";

export const store = configureStore({
  reducer: {
    providers: providersReducer,
    clients: clientsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
