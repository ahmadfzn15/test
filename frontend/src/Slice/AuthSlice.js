import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }) => {
    const response = await axios.post(
      "http://localhost:4000/api/auth/login",
      { username, password },
      { withCredentials: true }
    );
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: false, error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
      Cookies.remove("token");
    },
  },
  //   extraReducers: {
  //     [loginUser.pending]: (state) => {
  //       state.loading = true;
  //     },
  //     [loginUser.fulfilled]: (state, action) => {
  //       state.user = action.payload;
  //       state.loading = false;
  //     },
  //     [loginUser.rejected]: (state, action) => {
  //       state.loading = false;
  //       state.error = action.error.message;
  //     },
  //   },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
