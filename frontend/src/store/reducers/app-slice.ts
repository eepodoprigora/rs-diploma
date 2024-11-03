import { createSlice } from "@reduxjs/toolkit";

export interface IAppState {
  wasLogout: boolean;
  isModalOpened: boolean;
}

const initialState: IAppState = {
  wasLogout: false,
  isModalOpened: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.wasLogout = true;
    },
    setIsModalOpened: (state, action) => {
      state.isModalOpened = action.payload;
    },
  },
});

export const { logout, setIsModalOpened } = appSlice.actions;
export const appReducer = appSlice.reducer;
