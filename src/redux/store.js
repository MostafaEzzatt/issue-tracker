import { configureStore } from "@reduxjs/toolkit";

// Reducers
import auth from "./features/auth/authSlice";
import users from "./features/users/userSlice";

export default configureStore({
  reducer: { auth, users },
});
