import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slice/AuthSlice";

export default configureStore({
  reducer: {
    auth: AuthSlice,
  },
});
