import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  phone: string;
  email: string;
  photo: string;
  address: string;
  login: {
    username: string;
    password: string;
  };
}

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
  },
});

export const { addUser } = usersSlice.actions;

export default usersSlice.reducer;
