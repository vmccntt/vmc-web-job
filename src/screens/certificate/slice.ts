import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setLoadingAction } from "../../app/commonSlice";
import { RootState } from "../../app/store";
import { IPartnerState } from "./propState";
import {
  createPartner,
  deletePartner,
  updatePartner,
  getPartners,
  getPartner,
} from "./services";
import { IPartner, ISearchUser } from "./certificate.model";
import { defaultFilter } from "../../utils";

const initialState: IPartnerState = {
  data: [],
  currentPage: 1,
  detail: {
    id: 1,
    name: "",
  },
  modal: {
    isOpenModal: false,
    item: null,
    type: "addNew",
  },
};

export const getUsersAction = createAsyncThunk(
  "partners",
  async (filter: ISearchUser, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingAction(true));
      const state = thunkAPI.getState() as RootState;
      const response: any = await getPartners(defaultFilter({...filter}));
      thunkAPI.dispatch(setLoadingAction(false));
      thunkAPI.dispatch(setPostAction(response?.data || []));
    } catch (error) {
      thunkAPI.dispatch(setLoadingAction(false));
    }
  }
);

export const getUserDetail = createAsyncThunk(
  "partner/detail",
  async (payload: { id: number }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingAction(true));
      const state = thunkAPI.getState() as RootState;
      const response: any = await getPartner(payload.id);
      thunkAPI.dispatch(setLoadingAction(false));
      thunkAPI.dispatch(setDetailAction(response?.data || []));
    } catch (error) {
      thunkAPI.dispatch(setLoadingAction(false));
    }
  }
);

export const createUserAction = createAsyncThunk(
  "partner/create",
  async (payload: any, { dispatch }) => {
    try {
      const banner = {
        ...payload.body,
      };
      dispatch(setLoadingAction(true));
      if (payload.type === "addNew") {
        await createPartner(banner);
      } else {
        await updatePartner(payload.id, banner);
      }
      dispatch(setLoadingAction(false));
      dispatch(
        setStatusModalAction({ item: null, isOpenModal: false, type: "addNew" })
      );
      // dispatch(getBannersAction());
    } catch (error) {
      dispatch(setLoadingAction(false));
    }
  }
);

export const deleteUserAction = createAsyncThunk(
  "course/deleteCourseAction",
  async (payload: { id: number }, { dispatch }) => {
    try {
      dispatch(setLoadingAction(true));
      await deletePartner(payload.id);
      dispatch(setLoadingAction(false));
      dispatch(getUsersAction({}));
    } catch (error) {
      dispatch(setLoadingAction(false));
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setPostAction: (
      state: IPartnerState,
      action: PayloadAction<IPartner[]>
    ) => {
      // console.log("action.payload :>> ", action.payload);
      state.data = action.payload;
      state.currentPage = 1;
    },
    setDetailAction: (
      state: IPartnerState,
      action: PayloadAction<IPartner>
    ) => {
      const payload: any = action.payload;
      delete payload['password']
      state.detail = payload;
    },
    setStatusModalAction: (
      state: IPartnerState,
      action: PayloadAction<{
        isOpenModal: boolean;
        type: "addNew" | "update";
        item: IPartner | null;
      }>
    ) => {
      state.modal = action.payload;
    },
  },
});

export const { setPostAction, setStatusModalAction, setDetailAction } =
userSlice.actions;

export default userSlice.reducer;
