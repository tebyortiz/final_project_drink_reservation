import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client } from "../models/UsersModels";

interface ClientsState {
  clients: Client[];
}

const initialState: ClientsState = {
  clients: [],
};

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    addClient: (state, action: PayloadAction<Client>) => {
      state.clients = [...state.clients, action.payload];
    },
  },
});

export const { addClient } = clientsSlice.actions;

export default clientsSlice.reducer;
