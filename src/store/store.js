import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    // ทำการเพิ่ม storeSlice/ข้อมูล
    user: userSlice,
  },
});
