import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userName: "Rainbow",
    userId: "",
    token: "",
    login: true,
  },
  reducers: {
    changeUserInfo: (state, action) => {
      return action.payload;
    },
  },
});

export const userSelectData = (state) => {
  return state.user;
};
export const { changeUserInfo } = userSlice.actions;
export default userSlice.reducer;
