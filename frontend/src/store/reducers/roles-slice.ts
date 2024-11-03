import { createSlice } from "@reduxjs/toolkit";
import { getRolesAsync } from "../thunk/roles";

export interface IrolesState {
  roles: [];
  loading: boolean;
  error: string | null;
}

const initialState: IrolesState = {
  roles: [],
  loading: false,
  error: null,
};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRolesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRolesAsync.fulfilled, (state, action) => {
        state.roles = action.payload;
        state.loading = false;
      })
      .addCase(getRolesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const rolesReducer = rolesSlice.reducer;
