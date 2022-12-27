import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "../api/auth";

const initialAuthState = {
  user: {},
  token: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const userRegistration = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await registerUser(user);
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

export const userLogin = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      return await loginUser(user);
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

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    reset: (state) => initialAuthState,
  },
  extraReducers: (builder) => {
    builder

      .addCase(userRegistration.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(userRegistration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(userRegistration.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(userLogin.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { reset } = authSlice.actions;
