import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import toastReducer from "./slice/toastSlice";
import cartReducer from "./slice/cartSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    toast: toastReducer,
    cart: cartReducer,
  },
});
