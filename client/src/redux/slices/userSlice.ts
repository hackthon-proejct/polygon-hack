import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "scripts/redux/store";

export interface UserState {
  address: string;
  user_id: string;
  twitter_handle: string;
}

const initialState: UserState = {
  address: "",
  user_id: "",
  twitter_handle: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAddressTo: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setUserIdTo: (state, action: PayloadAction<string>) => {
      state.user_id = action.payload;
    },
    setTwitterHandleTo: (state, action: PayloadAction<string>) => {
      state.twitter_handle = action.payload;
    },
  },
});

export const selectAddress = (state: RootState) => state.user.address;
export const selectUserId = (state: RootState) => state.user.user_id;
export const selectTwitterHandle = (state: RootState) =>
  state.user.twitter_handle;

export const { setAddressTo, setUserIdTo, setTwitterHandleTo } =
  userSlice.actions;

export default userSlice.reducer;
