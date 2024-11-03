import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestServer } from "../../utils";
import { IBooking } from "../../types/booking-type";

interface AddBookingPayload {
  hotelCode: string;
  user: string;
  phone: string;
  check_in: string;
  check_out: string;
}

interface EditBookingPayload {
  id: string;
  check_in: string;
  check_out: string;
  phone: string;
}

export const createBookingAsync = createAsyncThunk<IBooking, AddBookingPayload>(
  "bookings/addOne",
  async (
    { hotelCode, user, phone, check_in, check_out },
    { rejectWithValue }
  ) => {
    try {
      const response = await requestServer(
        `/hotel/${hotelCode}/bookings`,
        "POST",
        { hotelCode, user, phone, check_in, check_out }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Ошибка отправки брони");
    }
  }
);

export const getBookingsAsync = createAsyncThunk(
  "bookings/loadAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await requestServer("/bookings");
      return response.data;
    } catch (error) {
      return rejectWithValue("Ошибка загрузки броней");
    }
  }
);

export const deleteBookingAsync = createAsyncThunk<string, string>(
  "bookings/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await requestServer(`/bookings/${id}`, "DELETE");
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return id;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      return rejectWithValue(errorMessage);
    }
  }
);

export const editBooking = createAsyncThunk<IBooking, EditBookingPayload>(
  "bookings/edit",
  async ({ id, check_in, check_out, phone }, { rejectWithValue }) => {
    try {
      const response = await requestServer(`/bookings/${id}`, "PATCH", {
        check_in,
        check_out,
        phone,
      });
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      return rejectWithValue(errorMessage);
    }
  }
);
