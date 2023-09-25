import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setLoadingAction } from "../../app/commonSlice";
// import { RootState } from "../../app/store";
import { IRecruimentState } from "./propState";
import {
  createRecruiment,
  deleteRecruiment,
  updateRecruiment,
  getRecruiments,
  getRecruiment,
} from "./services";
import { IRecruiment, ISearchRecruiment } from "./recruiment.model";
import { defaultFilter } from "../../utils";

const initialState: IRecruimentState = {
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

export const getRecruimentsAction = createAsyncThunk(
  "languages",
  async (filter: ISearchRecruiment, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingAction(true));
      // const state = thunkAPI.getState() as RootState;
      const response: any = await getRecruiments(defaultFilter({...filter}));
      thunkAPI.dispatch(setLoadingAction(false));
      thunkAPI.dispatch(setPostAction(response?.data || []));
    } catch (error) {
      thunkAPI.dispatch(setLoadingAction(false));
    }
  }
);

export const getRecruimentDetail = createAsyncThunk(
  "language/detail",
  async (payload: { id: number }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingAction(true));
      // const state = thunkAPI.getState() as RootState;
      const response: any = await getRecruiment(payload.id);
      thunkAPI.dispatch(setLoadingAction(false));
      thunkAPI.dispatch(setDetailAction(response?.data || []));
    } catch (error) {
      thunkAPI.dispatch(setLoadingAction(false));
    }
  }
);

export const createRecruimentAction = createAsyncThunk(
  "language/create",
  async (payload: any, { dispatch }) => {
    try {
      const body = {
        ...payload.body,
      };
      dispatch(setLoadingAction(true));
      if (payload.type === "addNew") {
        await createRecruiment(body);
      } else {
        await updateRecruiment(payload.id, body);
      }
      dispatch(setLoadingAction(false));
      dispatch(
        setStatusModalAction({ item: null, isOpenModal: false, type: "addNew" })
      );
    } catch (error) {
      dispatch(setLoadingAction(false));
    }
  }
);

export const deleteRecruimentAction = createAsyncThunk(
  "course/deleteCourseAction",
  async (payload: { id: number }, { dispatch }) => {
    try {
      dispatch(setLoadingAction(true));
      await deleteRecruiment(payload.id);
      dispatch(setLoadingAction(false));
      dispatch(getRecruimentsAction({}));
    } catch (error) {
      dispatch(setLoadingAction(false));
    }
  }
);

export const recruimentSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setPostAction: (
      state: IRecruimentState,
      action: PayloadAction<IRecruiment[]>
    ) => {
      console.log("action.payload :>> ", action.payload);
      state.data = action.payload;
      state.currentPage = 1;
    },
    setDetailAction: (
      state: IRecruimentState,
      action: PayloadAction<IRecruiment>
    ) => {
      const payload: any = action.payload;
      delete payload['password']
      state.detail = payload;
    },
    setStatusModalAction: (
      state: IRecruimentState,
      action: PayloadAction<{
        isOpenModal: boolean;
        type: "addNew" | "update";
        item: IRecruiment | null;
      }>
    ) => {
      state.modal = action.payload;
    },
  },
});

export const { setPostAction, setStatusModalAction, setDetailAction } =
recruimentSlice.actions;

export default recruimentSlice.reducer;
