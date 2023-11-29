import { configureStore } from "@reduxjs/toolkit";
import providersReducer from "./ProvidersSlice";
import clientsReducer from "./ClientsSlice";
import userReducer from "./UserSlice";
import purchaseListReducer from "./PurchaseListSlice";

export const store = configureStore({
  reducer: {
    providers: providersReducer,
    clients: clientsReducer,
    user: userReducer,
    purchaseList: purchaseListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
