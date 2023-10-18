import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setLoadingAction } from "../../app/commonSlice";
import { RootState } from "../../app/store";
import { ILanguageState } from "./propState";
import {
  createLanguage,
  deleteLanguage,
  updateLanguage,
  getLanguages,
  getLanguage,
} from "./services";
import { ILanguage, ISearchLanguage } from "./language.model";
import { defaultFilter } from "../../utils";

const initialState: ILanguageState = {
  data: [],
  currentPage: 1,
  detail: {
    id: 1,
    code: "",
    name: "",
  },
  modal: {
    isOpenModal: false,
    item: null,
    type: "addNew",
  },
};

export const getLanguagesAction = createAsyncThunk(
  "languages",
  async (filter: ISearchLanguage, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingAction(true));
      const state = thunkAPI.getState() as RootState;
      const response: any = await getLanguages(defaultFilter({...filter}));
      thunkAPI.dispatch(setLoadingAction(false));
      thunkAPI.dispatch(setPostAction(response?.data || []));
    } catch (error) {
      thunkAPI.dispatch(setLoadingAction(false));
    }
  }
);

export const getLanguageDetail = createAsyncThunk(
  "language/detail",
  async (payload: { id: number }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingAction(true));
      const state = thunkAPI.getState() as RootState;
      const response: any = await getLanguage(payload.id);
      thunkAPI.dispatch(setLoadingAction(false));
      thunkAPI.dispatch(setDetailAction(response?.data || []));
    } catch (error) {
      thunkAPI.dispatch(setLoadingAction(false));
    }
  }
);

export const createLanguageAction = createAsyncThunk(
  "language/create",
  async (payload: any, { dispatch }) => {
    try {
      const body = {
        ...payload.body,
      };
      dispatch(setLoadingAction(true));
      if (payload.type === "addNew") {
        await createLanguage(body);
      } else {
        await updateLanguage(payload.id, body);
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

export const deleteLanguageAction = createAsyncThunk(
  "course/deleteCourseAction",
  async (payload: { id: number }, { dispatch }) => {
    try {
      dispatch(setLoadingAction(true));
      await deleteLanguage(payload.id);
      dispatch(setLoadingAction(false));
      // dispatch(getLanguagesAction({}));
    } catch (error) {
      dispatch(setLoadingAction(false));
    }
  }
);

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setPostAction: (
      state: ILanguageState,
      action: PayloadAction<ILanguage[]>
    ) => {
      // console.log("action.payload :>> ", action.payload);
      state.data = action.payload;
      state.currentPage = 1;
    },
    setDetailAction: (
      state: ILanguageState,
      action: PayloadAction<ILanguage>
    ) => {
      const payload: any = action.payload;
      delete payload['password']
      state.detail = payload;
    },
    setStatusModalAction: (
      state: ILanguageState,
      action: PayloadAction<{
        isOpenModal: boolean;
        type: "addNew" | "update";
        item: ILanguage | null;
      }>
    ) => {
      state.modal = action.payload;
    },
  },
});

export const { setPostAction, setStatusModalAction, setDetailAction } =
languageSlice.actions;

export default languageSlice.reducer;
