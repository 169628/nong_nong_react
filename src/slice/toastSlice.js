import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    type: null,
    message: null,
  },
};

const toastSlice = createSlice({
  name: "toast",
  initialState, //值在上面的 initialState
  reducers: {
    //使用 actions 改變 slice 中的值，有外部傳入的值才需要 "action 參數" 不然只要 state 就好
    pushToast(state, action) {
      const { type, message } = action.payload;

      state.data = {
        type,
        message,
      };
    },
  },
});

export const { pushToast } = toastSlice.actions; // 匯出 action

export default toastSlice.reducer; // 匯出 slice
