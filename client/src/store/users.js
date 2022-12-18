import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers, addNewUser, deleteUser } from "../api/users";

const initialUsersState = {
  users: [],
  username: "",
  room: "",
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const userAddition = createAsyncThunk(
  "users/newUser",
  async (user, thunkAPI) => {
    try {
      return await addNewUser(user);
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

export const getAllUsers = createAsyncThunk(
  "users/getUsers",
  async (thunkAPI) => {
    try {
      return await getUsers();
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

export const deleteOneUser = createAsyncThunk(
  "users/deleteUser",
  async (username, thunkAPI) => {
    try {
      return await deleteUser(username);
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

const usersSlice = createSlice({
  name: "users",
  initialState: initialUsersState,
  reducers: {
    reset: (state) => initialUsersState,
  },
  extraReducers: (builder) => {
    builder

      .addCase(userAddition.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(userAddition.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload.users;
        state.username = action.payload.username;
        state.room = action.payload.room;
      })
      .addCase(userAddition.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllUsers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload.users;
      })

      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteOneUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteOneUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = state.users.filter((user) => user._id !== action.payload);
      })

      .addCase(deleteOneUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default usersSlice.reducer;
export const { reset } = usersSlice.actions;
export const selectAllUsers = (state) => state.users.users;
