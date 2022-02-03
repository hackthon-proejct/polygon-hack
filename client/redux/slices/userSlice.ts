import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "scripts/redux/store";

export interface UserState {
  address: string;
}

const initialState: UserState = {
  address: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setAddressTo: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
  },
});

export const selectAddress = (state: RootState) => state.user.address;

export const { setAddressTo } = userSlice.actions;

export default userSlice.reducer;
