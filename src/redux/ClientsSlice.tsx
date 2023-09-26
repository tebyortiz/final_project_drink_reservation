import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client } from "../models/UsersModels";

interface UsersState {
  client: Client[];
}

const initialState: UsersState = {
  client: [],
};
const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    addClient: (state, action: PayloadAction<Client>) => {
      state.client.push(action.payload);
    },
  },
});

export const { addClient } = clientsSlice.actions;

export default clientsSlice.reducer;
