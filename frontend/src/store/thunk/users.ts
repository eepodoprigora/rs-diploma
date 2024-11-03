import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestServer } from "../../utils";
import { IUser } from "../../types";

interface RegisterLoginUserPayload {
  email: string;
  password: string;
}

interface EditUserPayload {
  userId: string;
  roleId: number;
}

export const registerUser = createAsyncThunk<IUser, RegisterLoginUserPayload>(
  "user/register",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await requestServer("/auth/register", "POST", {
        email,
        password,
      });
      if (response.error) {
        return rejectWithValue(response.error);
      }
      sessionStorage.setItem("userData", JSON.stringify(response.user));
      return response.user;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      return rejectWithValue("Ошибка запроса: " + errorMessage);
    }
  }
);

export const loginUser = createAsyncThunk<IUser, RegisterLoginUserPayload>(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await requestServer("/auth/login", "POST", {
        email,
        password,
      });
      if (response.error) {
        return rejectWithValue(response.error);
      }
      sessionStorage.setItem("userData", JSON.stringify(response.user));
      return response.user;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      return rejectWithValue("Ошибка запроса: " + errorMessage);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await requestServer("/auth/logout", "POST");
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      return rejectWithValue(errorMessage);
    }
  }
);

export const getUsersAsync = createAsyncThunk<IUser[], void>(
  "user/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await requestServer("/users");
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

export const editUserAsync = createAsyncThunk(
  "user/edit",
  async ({ userId, roleId }: EditUserPayload, { rejectWithValue }) => {
    try {
      const response = await requestServer(`/users/${userId}`, "PATCH", {
        roleId,
      });
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteUserAsync = createAsyncThunk<string, string>(
  "user/delete",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await requestServer(`/users/${userId}`, "DELETE");
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      return rejectWithValue(errorMessage);
    }
  }
);
