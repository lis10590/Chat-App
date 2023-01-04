import { createSlice } from "@reduxjs/toolkit";

const initialBlockedState = [];

const blockedSlice = createSlice({
  name: "blocked",
  initialState: initialBlockedState,
  reducers: {
    addBlocked(state, action) {
      state.push(action.payload);
    },
    removeBlocked(state, action) {
      return state.filter((user) => user !== action.payload);
    },
  },
});

export default blockedSlice.reducer;
export const blockedActions = blockedSlice.actions;
