import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestServer } from "../../utils";
import { IComment } from "../../types";

interface AddCommentPayload {
  hotelCode: string;
  content: string;
}

interface RemoveCommentPayload {
  hotelCode: string;
  commentId: string;
}

export const createCommentAsync = createAsyncThunk<IComment, AddCommentPayload>(
  "comments/addOne",
  async ({ hotelCode, content }, { rejectWithValue }) => {
    try {
      const response = await requestServer(
        `/hotel/${hotelCode}/comments`,
        "POST",
        {
          content,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Ошибка отправки комментария");
    }
  }
);

export const removeCommentAsync = createAsyncThunk<
  string,
  RemoveCommentPayload
>(
  "comments/removeOne",
  async ({ hotelCode, commentId }, { rejectWithValue }) => {
    try {
      await requestServer(
        `/hotel/${hotelCode}/comments/${commentId}`,
        "DELETE"
      );
      return commentId;
    } catch (error) {
      return rejectWithValue("Ошибка отправки комментария");
    }
  }
);
