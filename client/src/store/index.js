import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users";
import regUsersReducer from "./registered";
import groupsReducer from "./groups";
import authReducer from "./auth";
import messagesReducer from "./messages";
import blockedReducer from "./blocked";

const store = configureStore({
  reducer: {
    users: usersReducer,
    registered: regUsersReducer,
    groups: groupsReducer,
    auth: authReducer,
    messages: messagesReducer,
    blocked: blockedReducer,
  },
});

export default store;
