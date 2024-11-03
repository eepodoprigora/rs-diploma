import { createAsyncThunk } from "@reduxjs/toolkit";
import { mapHotelForServer, requestServer } from "../../utils";

import { IHotel, IHotelFormValues } from "../../types";

interface HotelsResponse {
  hotels: IHotel[];
}

export const loadHotelByCodeAsync = createAsyncThunk(
  "hotels/loadHotelByCode",
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await requestServer(`/hotel/${code}`);

      return response.data;
    } catch (error) {
      return rejectWithValue("Ошибка загрузки отеля");
    }
  }
);

export const loadHotelsAsync = createAsyncThunk<
  { hotels: IHotel[]; totalCount: number },
  { limit: number; searchPhrase: string }
>("hotels/loadHotels", async ({ limit, searchPhrase }, { rejectWithValue }) => {
  try {
    const response = await requestServer<HotelsResponse>(
      `/?limit=${limit}&search=${encodeURIComponent(searchPhrase)}`
    );
    if (response.error) {
      return rejectWithValue(response.error);
    }
    return response.data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Неизвестная ошибка";
    return rejectWithValue(errorMessage);
  }
});

export const addHotelAsync = createAsyncThunk<
  IHotel, // Тип возвращаемого значения
  IHotelFormValues // Тип аргумента
>("hotels/addHotel", async (hotelData, { rejectWithValue }) => {
  try {
    const mappedHotelData = mapHotelForServer(hotelData); // Применяем маппинг к данным отеля
    const response = await requestServer<HotelsResponse>(
      "/",
      "POST",
      mappedHotelData
    );

    if (response.error) {
      return rejectWithValue(response.error);
    }
    return response.data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Неизвестная ошибка";
    return rejectWithValue(errorMessage);
  }
});

export const updateHotelAsync = createAsyncThunk<
  IHotel, // Тип возвращаемого значения
  { code: string; hotelData: IHotelFormValues } // Тип аргумента, теперь это объект
>("hotels/updateHotel", async ({ code, hotelData }, { rejectWithValue }) => {
  try {
    const mappedHotelData = mapHotelForServer(hotelData);
    const response = await requestServer<HotelsResponse>(
      `/hotel/${code}/edit`,
      "PATCH",
      mappedHotelData
    );

    if (response.error) {
      return rejectWithValue(response.error);
    }
    return response.data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Неизвестная ошибка";
    return rejectWithValue(errorMessage);
  }
});

export const removeHotelAsync = createAsyncThunk(
  "hotels/deleteByCode",
  async (code: string, { rejectWithValue }) => {
    try {
      await requestServer(`/hotel/${code}`, "DELETE");
      return code;
    } catch (error) {
      return rejectWithValue("Ошибка загрузки отеля");
    }
  }
);
