import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users";
import groupsReducer from "./groups";
import authReducer from "./auth";
import messagesReducer from "./messages";
import blockedReducer from "./blocked";

const store = configureStore({
  reducer: {
    users: usersReducer,
    groups: groupsReducer,
    auth: authReducer,
    messages: messagesReducer,
    blocked: blockedReducer,
  },
});

export default store;
