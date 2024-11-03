import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestServer } from "../../utils";

export const getRolesAsync = createAsyncThunk(
  "roles/loadAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await requestServer("/users/roles");
      return response.data;
    } catch (error) {
      return rejectWithValue("Ошибка загрузки ролей");
    }
  }
);
