import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userName: "",
  userId: "",
  token: "",
  isAuthenticated: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.userName = action.payload.userName;
      state.userId = action.payload.userId;
      state.token = action.payload.token;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state) => {
      state.loading = false;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.userName = "";
      state.userId = "";
      state.token = "";
      state.isAuthenticated = false;
    },
    checkAuthStatus: (state, action) => {
      state.isAuthenticated = action.payload.login;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
  checkAuthStatus,
} = userSlice.actions;

// Async thunk for login
export const loginUser = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_APP_URL}/users/login`,
      { email, password }
    );

    if (res.data.result === 1) {
      const { user, userId, token } = res.data.data;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      dispatch(loginSuccess({ userName: user, userId, token }));
    } else {
      console.error("Login failed:", res.data.message);
      dispatch(loginFailure("登入失敗，請再試一次！"));
    }
  } catch (error) {
    console.error("Login request error:", error);
    dispatch(loginFailure("登入失敗，請再試一次！"));
  }
};

// Async thunk for registrations
export const registerUser = (email, password, name) => async (dispatch) => {
  dispatch(registerStart());
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_APP_URL}/users/register`,
      { email, password, name }
    );
    //console.log(res.data.result);
    if (res.data.result === 1) {
      dispatch(registerSuccess());
    } else if (
      res.data.result === 0 &&
      res.data.error === "this email already exists"
    ) {
      dispatch(registerFailure("此 Email 已經註冊！"));
    } else {
      dispatch(registerFailure("註冊失敗，請再試一次！"));
    }
  } catch (error) {
    dispatch(registerFailure("註冊失敗，請再試一次！"));
  }
};

// Async thunk for checking authentication
export const checkAuthStatusAsync = () => async (dispatch) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_APP_URL}/users/check`);
    dispatch(checkAuthStatus(res.data)); // Response data includes `login` field
  } catch (error) {
    dispatch(checkAuthStatus({ login: false }));
  }
};

export const userSelectData = (state) => {
  return state.user;
};

export default userSlice.reducer;
