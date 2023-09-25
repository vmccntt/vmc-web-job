import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setLoadingAction } from "../../app/commonSlice";
import { RootState } from "../../app/store";
import { ICategory, ISearchCategory } from "./category.model";
import { ICategoryState } from "./propState";
import {
  createCategory,
  deleteCategory,
  updateCategory,
  getCategories,
  getCategory,
  getCategoriesTree,
} from "./services";
import { defaultFilter } from "../../utils";

const initialState: ICategoryState = {
  data: [],
  currentPage: 1,
  count: 0,
  detail: {
    id: "",
    title: "",
    url: "",
    isMenu: false,
    parentId: "",
    categoryId: "",
    description: "",
    indexSort: "",
  },
  modal: {
    isOpenModal: false,
    item: null,
    type: "addNew",
  },
};

export const getCategorysAction = createAsyncThunk(
  "category",
  async (filter: ISearchCategory, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingAction(true));
      const state = thunkAPI.getState() as RootState;
      const response: any = await getCategories(defaultFilter({...filter}));
      thunkAPI.dispatch(setLoadingAction(false));
      thunkAPI.dispatch(setPostAction(response?.data || []));
    } catch (error) {
      thunkAPI.dispatch(setLoadingAction(false));
    }
  }
);

export const getCategorysTreeAction = createAsyncThunk(
  "category",
  async (filter: ISearchCategory, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingAction(true));
      // const state = thunkAPI.getState() as RootState;
      const response: any = await getCategoriesTree(defaultFilter({...filter}));
      thunkAPI.dispatch(setLoadingAction(false));
      
      thunkAPI.dispatch(setPostAction(response?.data || []));
      thunkAPI.dispatch(setPostCountAction(response?.count || 0));
    } catch (error) {
      thunkAPI.dispatch(setLoadingAction(false));
    }
  }
);

export const getCategoryDetail = createAsyncThunk(
  "category/detail",
  async (payload: { id: string }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingAction(true));
      const state = thunkAPI.getState() as RootState;
      const response: any = await getCategory(payload.id);
      thunkAPI.dispatch(setLoadingAction(false));
      thunkAPI.dispatch(setDetailAction(response?.data || []));
    } catch (error) {
      thunkAPI.dispatch(setLoadingAction(false));
    }
  }
);

export const createCategoryAction = createAsyncThunk(
  "category/createCategoryAction",
  async (payload: any, { dispatch }) => {
    try {
      const body = {
        ...payload.body,
      };
      dispatch(setLoadingAction(true));
      if (payload.type === "addNew") {
        await createCategory(body);
      } else {
        await updateCategory(payload.id, body);
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

export const deleteCategoryAction = createAsyncThunk(
  "course/deleteCourseAction",
  async (payload: { id: any }, { dispatch }) => {
    try {
      dispatch(setLoadingAction(true));
      await deleteCategory(payload.id);
      dispatch(setLoadingAction(false));
      dispatch(getCategorysTreeAction({}));
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
      state: ICategoryState,
      action: PayloadAction<ICategory[]>
    ) => {
      console.log("action.payload :>> ", action.payload);
      state.data = action.payload;
      state.currentPage = 1;
    },
    setPostCountAction: (
      state: ICategoryState,
      action: PayloadAction<number>
    ) => {
      state.count = action.payload;
      // state.currentPage = 1;
    },
    setDetailAction: (
      state: ICategoryState,
      action: PayloadAction<ICategory>
    ) => {
      // console.log("action.payload :>> ", action.payload);
      state.detail = action.payload;
    },
    setStatusModalAction: (
      state: ICategoryState,
      action: PayloadAction<{
        isOpenModal: boolean;
        type: "addNew" | "update";
        item: ICategory | null;
      }>
    ) => {
      state.modal = action.payload;
    },
  },
});

export const { setPostAction, setStatusModalAction, setDetailAction, setPostCountAction } =
  bannerSlice.actions;

export default bannerSlice.reducer;
