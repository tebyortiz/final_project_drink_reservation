import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Provider } from "../models/UsersModels";

interface ProvidersState {
  providers: Provider[];
}

const initialState: ProvidersState = {
  providers: [],
};

const providersSlice = createSlice({
  name: "providers",
  initialState,
  reducers: {
    addProvider: (state, action: PayloadAction<Provider>) => {
      state.providers.push(action.payload);
    },
  },
});

export const { addProvider } = providersSlice.actions;

export default providersSlice.reducer;
