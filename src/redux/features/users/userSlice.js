import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Firebase
import { collection, query, getDocs } from "firebase/firestore";
import { firestore } from "../../../firebase";

// React Toastify
import { toast } from "react-toastify";

const initialState = { users: [], isLoggedIn: false, isLoading: true };

export const getUsers = createAsyncThunk("users/get", async () => {
  const collectionRef = collection(firestore, "Users");
  const queryRef = query(collectionRef);
  const docsRef = await getDocs(queryRef);
  const res = docsRef.docs.map((user) => user.data());

  return res;
});

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [getUsers.pending]: (state, payload) => {},
    [getUsers.fulfilled]: (state, payload) => {
      state.users = payload.payload;
      state.isLoading = false;
    },
    [getUsers.rejected]: (state, payload) => {
      toast.error("Loading Users Rejected");
    },
  },
});

// export const { login } = userSlice.actions;

export default userSlice.reducer;
