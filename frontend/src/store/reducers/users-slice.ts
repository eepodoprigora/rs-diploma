import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  registerUser,
  logoutUser,
  loginUser,
  getUsersAsync,
  editUserAsync,
  deleteUserAsync,
} from "../thunk/users";
import { IUser } from "../../types";

export interface IUsersState {
  users: IUser[];
  authenticatedUser: IUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: IUsersState = {
  users: [],
  authenticatedUser: null,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.authenticatedUser = action.payload;
    },
    getUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },
    clearSelectedUser: (state) => {
      state.authenticatedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.authenticatedUser = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.authenticatedUser = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.authenticatedUser = null;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getUsersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(getUsersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(editUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(
          (user) => user.id === action.payload.data.id
        );
        if (index !== -1) {
          state.users[index] = action.payload.data;
        }
      })
      .addCase(editUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        const userId = action.meta.arg; // userId передается в action.meta.arg
        state.users = state.users.filter((user) => user.id !== userId);
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedUser, setUser } = usersSlice.actions;
export const userReducer = usersSlice.reducer;
