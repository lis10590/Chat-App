import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users";
import regUsersReducer from "./registered";
import groupsReducer from "./groups";

const store = configureStore({
  reducer: {
    users: usersReducer,
    registered: regUsersReducer,
    groups: groupsReducer,
  },
});

export default store;
