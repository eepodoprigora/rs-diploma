import { createSlice } from "@reduxjs/toolkit";
import {
  loadHotelsAsync,
  loadHotelByCodeAsync,
  addHotelAsync,
  removeHotelAsync,
} from "../thunk/hotels"; // Импортируйте ваш thunk
import { IHotel } from "../../types";
import { createCommentAsync, removeCommentAsync } from "../thunk/comments";

export interface IHotelsState {
  hotels: IHotel[];
  selectedHotel: IHotel | null;
  loading: boolean;
  error: string | null;
  totalCount: number;
}

const initialState: IHotelsState = {
  hotels: [],
  selectedHotel: null,
  loading: false,
  error: null,
  totalCount: 0,
};

const hotelsSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    clearSelectedHotel: (state) => {
      state.selectedHotel = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadHotelsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadHotelsAsync.fulfilled, (state, action) => {
        state.hotels = action.payload.hotels;
        state.totalCount = action.payload.totalCount;
        state.loading = false;
      })
      .addCase(loadHotelsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loadHotelByCodeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadHotelByCodeAsync.fulfilled, (state, action) => {
        state.selectedHotel = action.payload;
        state.loading = false;
      })
      .addCase(loadHotelByCodeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createCommentAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCommentAsync.fulfilled, (state, action) => {
        state.selectedHotel?.comments.push(action.payload);
        state.loading = false;
      })
      .addCase(createCommentAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(removeCommentAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCommentAsync.fulfilled, (state, action) => {
        if (state.selectedHotel) {
          state.selectedHotel.comments = state.selectedHotel.comments.filter(
            (comment) => comment.id !== action.payload
          );
        }
        state.loading = false;
      })
      .addCase(removeCommentAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addHotelAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addHotelAsync.fulfilled, (state, action) => {
        state.hotels.push(action.payload);
        state.loading = true;
      })
      .addCase(addHotelAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(removeHotelAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeHotelAsync.fulfilled, (state, action) => {
        state.hotels = state.hotels.filter(
          (hotel) => hotel.code !== action.payload
        );
        state.loading = false;
      })
      .addCase(removeHotelAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSelectedHotel } = hotelsSlice.actions;
export const hotelsReducer = hotelsSlice.reducer;
