import { createSlice } from "@reduxjs/toolkit";
import instance from "../axiosInstance";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    data: null,
    loading: false,
    error: null,
    loggedIn: false,
  },
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.loggedIn = true;
    },
    loginError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.loggedIn = false;
    },
    resetLoginState: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginError, resetLoginState } =
  loginSlice.actions;

export function doLogin(formData) {
  return async (dispatch) => {
    try {
      dispatch(loginRequest());
      // Lakukan request ke backend
      const response = await instance.post("/user/login", formData);
      console.log(response, "ini");

      localStorage.accessToken = response.data.accessToken;

      dispatch(loginSuccess(response.data.accessToken));
    } catch (error) {
      dispatch(loginError(error.response.data.message || "Login Failed"));
    }
  };
}

export default loginSlice.reducer;
