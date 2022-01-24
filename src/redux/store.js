import { configureStore } from "@reduxjs/toolkit";

// Reducers
import auth from "./features/auth/authSlice";
import users from "./features/users/userSlice";
import projects from "./features/projects/projectSlice";
import tickets from "./features/tickets/ticketsSlice";

export default configureStore({
  reducer: { auth, users, projects, tickets },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
