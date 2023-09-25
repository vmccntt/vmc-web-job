import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Config from "../constant";
import { get } from "lodash";
import { IUserInfo, LoginForm } from "../models/user";
import { getUserInfo, login, logOut } from "../services/auth";
import { setLoadingAction } from "./commonSlice";
export interface AuthState {
  userInfo: IUserInfo;
}

const initialState: AuthState = {
  userInfo: {
    email: "",
    password: "",
    access_token: "",
    userId: undefined,
    firstName: "",
    fullName: "",
    id: 0,
    isActive: false,
    lastName: "",
    phoneNumber: "",
  },
};

export const signInAction = createAsyncThunk(
  "auth/signInAction",
  async (loginForm: LoginForm, { dispatch }) => {
    try {
      dispatch(setLoadingAction(true));
      const response = await login(loginForm);

      const accessToken = response.access_token ? response.access_token : "";
      localStorage.setItem(Config.TOKEN, accessToken);
      const userInfo: any = await getUserInfo(get(response, "user.id", 0));
      
      dispatch(setUserInfoAction({ ...response, ...userInfo.data }));
      dispatch(setLoadingAction(false));

      return response;
    } catch (error) {
      dispatch(setLoadingAction(false));
    }
  }
);

export const signOutAction = createAsyncThunk(
  "auth/signOutAction",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoadingAction(true));
      await logOut();
      dispatch(setLoadingAction(false));
    } catch (error) {
      dispatch(setLoadingAction(false));
    }
  }
);

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfoAction: (state, action: PayloadAction<IUserInfo>) => {
      state.userInfo = action.payload;
    },
    resetUserInfoAction: (state) => {
      state.userInfo = initialState.userInfo;
    },
  },
});

export const { setUserInfoAction, resetUserInfoAction } = AuthSlice.actions;

export default AuthSlice.reducer;
