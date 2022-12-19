import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRegUsers, addNewRegUser, deleteRegUser } from "../api/registered";

const initialRegUsersState = {
  registered: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const regUserAddition = createAsyncThunk(
  "registered/newRegUser",
  async (user, thunkAPI) => {
    try {
      return await addNewRegUser(user);
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

export const getAllRegUsers = createAsyncThunk(
  "registered/getRegUsers",
  async (thunkAPI) => {
    try {
      return await getRegUsers();
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

export const deleteOneRegUser = createAsyncThunk(
  "registered/deleteRegUser",
  async (username, thunkAPI) => {
    try {
      return await deleteRegUser(username);
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

const regUsersSlice = createSlice({
  name: "registered",
  initialState: initialRegUsersState,
  reducers: {
    reset: (state) => initialRegUsersState,
  },
  extraReducers: (builder) => {
    builder

      .addCase(regUserAddition.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(regUserAddition.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.registered = action.payload;
      })
      .addCase(regUserAddition.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllRegUsers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllRegUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.registered = action.payload;
      })

      .addCase(getAllRegUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteOneRegUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteOneRegUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.registered = state.registered.filter(
          (user) => user._id !== action.payload
        );
      })

      .addCase(deleteOneRegUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default regUsersSlice.reducer;
export const { reset } = regUsersSlice.actions;
export const selectAllRegUsers = (state) => state.registered.registered;
