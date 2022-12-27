import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users";
import regUsersReducer from "./registered";
import groupsReducer from "./groups";
import authReducer from "./auth";

const store = configureStore({
  reducer: {
    users: usersReducer,
    registered: regUsersReducer,
    groups: groupsReducer,
    auth: authReducer,
  },
});

export default store;
