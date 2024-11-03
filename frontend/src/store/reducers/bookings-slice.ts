import { createSlice } from "@reduxjs/toolkit";
import { IBooking } from "../../types";
import {
  deleteBookingAsync,
  editBooking,
  getBookingsAsync,
} from "../thunk/bookings";

export interface IBookingState {
  bookings: IBooking[];
  loading: boolean;
  error: string | null;
}

const initialState: IBookingState = {
  bookings: [],
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBookingsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookingsAsync.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.loading = false;
      })
      .addCase(getBookingsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteBookingAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBookingAsync.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter(
          (booking) => booking.id !== action.payload
        );

        state.loading = false;
      })
      .addCase(deleteBookingAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(editBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editBooking.fulfilled, (state, action) => {
        const index = state.bookings.findIndex(
          (booking) => booking.id === action.payload.id
        );

        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(editBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// export const { clearSelectedUser, setUser } = usersSlice.actions;
export const bookingReducer = bookingSlice.reducer;
