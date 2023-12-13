import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../models/UsersModels";

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
});

export default userSlice.reducer;