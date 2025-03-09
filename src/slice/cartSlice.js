import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  num: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //actions
    getCartNum(state, action) {
      state.num = action.payload;
    },
    // 購物車歸零，登出時用
    initCartNum(state) {
      state.num = 0;
    },
  },
});

// 讓其他元件可以呼叫購物車，重整購物車狀態，使用上面的 action 改變購物車的數量
export const asyncCart = createAsyncThunk(
  "cart/asyncCart", // 上面 createSlice name 的名稱跟這個 async function 的名稱
  async (action, { dispatch, getState }) => {
    // 因為我需要取得其他 slice 的資料，所以需要 "getState"
    try {
      const state = getState();
      const userId = state.user.userId;
      const result = await axios.get(
        `${import.meta.env.VITE_APP_URL}/carts/${userId}`
      );
      if (result.data?.result == 1) {
        dispatch(getCartNum(result.data?.data?.[0]?.carts?.length));
      }
    } catch (error) {
      console.log(error);
    }
  }
);
// 這邊已經 export 出去了，不需要再 export

export const { initCartNum, getCartNum } = cartSlice.actions;

export default cartSlice.reducer;
