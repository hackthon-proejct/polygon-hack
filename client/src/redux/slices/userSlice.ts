import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "scripts/redux/store";

export interface UserState {
  address: string;
  user_id: string;
}

const initialState: UserState = {
  address: "",
  user_id: "",
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
  },
});

export const selectAddress = (state: RootState) => state.user.address;
export const selectUserId = (state: RootState) => state.user.user_id;

export const { setAddressTo, setUserIdTo } = userSlice.actions;

export default userSlice.reducer;
