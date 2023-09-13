import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Provider {
  company: {
    name: string;
    logo: string;
    phone: string;
    email: string;
  };
  service: {
    type: string;
  };
  responsibleCompany: {
    name: string;
    phone: string;
    email: string;
    photo: string;
  };
  login: {
    username: string;
    password: string;
  };
}

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
