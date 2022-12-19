import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users";
import regUsersReducer from "./registered";

const store = configureStore({
  reducer: {
    users: usersReducer,
    registered: regUsersReducer,
  },
});

export default store;
