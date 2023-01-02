import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMessages,
  getMessagesByUsername,
  addMessage,
} from "../api/messages";

const initialMessagesState = {
  messages: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getAllMessages = createAsyncThunk(
  "messages/getMessages",
  async (thunkAPI) => {
    try {
      return await getMessages();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllMessagesByUsername = createAsyncThunk(
  "messages/getMessagesByUsername",
  async (username, thunkAPI) => {
    try {
      return await getMessagesByUsername(username);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const messageAddition = createAsyncThunk(
  "groups/addMessage",
  async (obj, thunkAPI) => {
    try {
      return await addMessage(obj);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState: initialMessagesState,
  reducers: {
    reset: (state) => initialMessagesState,
  },
  extraReducers: (builder) => {
    builder

      .addCase(messageAddition.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(messageAddition.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messages = action.payload;
      })
      .addCase(messageAddition.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getAllMessages.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messages = action.payload;
      })

      .addCase(getAllMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getAllMessagesByUsername.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllMessagesByUsername.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messages = action.payload;
      })

      .addCase(getAllMessagesByUsername.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default messagesSlice.reducer;
export const { reset } = messagesSlice.actions;
export const selectAllMessages = (state) => state.messages.messages;
