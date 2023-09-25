import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setLoadingAction } from "../../app/commonSlice";
import { RootState } from "../../app/store";
import { IBannerState } from "./propState";
import {
  createBanner,
  deleteBanner,
  updateBanner,
  getBanners,
  getBanner,
} from "./services";
import { BannerInterface, ISearchBanner } from "./banner.model";
import { defaultFilter } from "../../utils";

const initialState: IBannerState = {
  data: [],
  currentPage: 1,
  detail: {
    id: 1,
    name: "",
    sliders: [
      {
        content: '',
        description: '',
        imgage: '',
        path: '',
        title: ''
      }
    ],
  },
  modal: {
    isOpenModal: false,
    item: null,
    type: "addNew",
  },
};

export const getBannersAction = createAsyncThunk(
  "banner",
  async (filter: ISearchBanner, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingAction(true));
      const state = thunkAPI.getState() as RootState;
      const response: any = await getBanners(defaultFilter({...filter}));
      thunkAPI.dispatch(setLoadingAction(false));
      thunkAPI.dispatch(setPostAction(response?.data || []));
    } catch (error) {
      thunkAPI.dispatch(setLoadingAction(false));
    }
  }
);

export const getBannerDetail = createAsyncThunk(
  "detail",
  async (payload: { id: number }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingAction(true));
      const state = thunkAPI.getState() as RootState;
      const response: any = await getBanner(payload.id);
      thunkAPI.dispatch(setLoadingAction(false));
      thunkAPI.dispatch(setDetailAction(response?.data || []));
    } catch (error) {
      thunkAPI.dispatch(setLoadingAction(false));
    }
  }
);

export const createBannerAction = createAsyncThunk(
  "banner/createBannerAction",
  async (payload: any, { dispatch }) => {
    try {
      const banner = {
        ...payload.body,
      };
      dispatch(setLoadingAction(true));
      if (payload.type === "addNew") {
        await createBanner(banner);
      } else {
        await updateBanner(payload.id, banner);
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

export const deleteBannerAction = createAsyncThunk(
  "course/deleteCourseAction",
  async (payload: { id: number }, { dispatch }) => {
    try {
      dispatch(setLoadingAction(true));
      await deleteBanner(payload.id);
      dispatch(setLoadingAction(false));
      dispatch(getBannersAction({}));
    } catch (error) {
      dispatch(setLoadingAction(false));
    }
  }
);

export const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    setPostAction: (
      state: IBannerState,
      action: PayloadAction<BannerInterface[]>
    ) => {
      // console.log("action.payload :>> ", action.payload);
      state.data = action.payload;
      state.currentPage = 1;
    },
    setDetailAction: (
      state: IBannerState,
      action: PayloadAction<BannerInterface>
    ) => {
      // console.log("action.payload :>> ", action.payload);
      state.detail = action.payload;
    },
    setStatusModalAction: (
      state: IBannerState,
      action: PayloadAction<{
        isOpenModal: boolean;
        type: "addNew" | "update";
        item: BannerInterface | null;
      }>
    ) => {
      state.modal = action.payload;
    },
  },
});

export const { setPostAction, setStatusModalAction, setDetailAction } =
  bannerSlice.actions;

export default bannerSlice.reducer;
