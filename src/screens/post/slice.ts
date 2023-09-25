import { ISearchPost, PostInterface } from "./../../models/post";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setLoadingAction } from "../../app/commonSlice";
import { RootState } from "../../app/store";
import { IPostState } from "./propState";
import {
  createPost,
  deletePost,
  updatePost,
  getPosts,
  getPost,
} from "./services";
import { defaultFilter } from "../../utils";
import { ISearchCategory } from "../category/category.model";

const initialState: IPostState = {
  data: [],
  currentPage: 1,
  count: 0,
  detail: {
    isPublish: false,
    contentHtml: "",
    icon: "",
    id: 1,
    name: "",
    title: "",
    content: "",
  },
  modal: {
    isOpenModal: false,
    item: null,
    type: "addNew",
  },
};

export const getPostsAction = createAsyncThunk(
  "post",
  async (filter: ISearchPost, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingAction(true));
      const state = thunkAPI.getState() as RootState;
      const response: any = await getPosts(defaultFilter(filter));
      thunkAPI.dispatch(setLoadingAction(false));
      thunkAPI.dispatch(setPostAction(response?.data || []));
      thunkAPI.dispatch(setPostCountAction(response?.count || 0));
    } catch (error) {
      thunkAPI.dispatch(setLoadingAction(false));
    }
  }
);

export const getPostDetail = createAsyncThunk(
  "postDetail",
  async ({ id }: { id: any }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingAction(true));
      const state = thunkAPI.getState() as RootState;
      const response: any = await getPost(id);
      thunkAPI.dispatch(setLoadingAction(false));
      thunkAPI.dispatch(setDetailAction(response?.data));
    } catch (error) {
      thunkAPI.dispatch(setLoadingAction(false));
    }
  }
);

export const createPostAction = createAsyncThunk(
  "post/createPostAction",
  async (payload: any, { dispatch }) => {
    try {
      const post = {
        ...payload.post,
      };
      dispatch(setLoadingAction(true));
      if (payload.type === "addNew") {
        await createPost(post);
      } else {
        await updatePost(payload.id, post);
      }
      dispatch(setLoadingAction(false));
      dispatch(
        setStatusModalAction({ item: null, isOpenModal: false, type: "addNew" })
      );
      // dispatch(getPostsAction());
    } catch (error) {
      dispatch(setLoadingAction(false));
    }
  }
);

export const deletePostAction = createAsyncThunk(
  "course/deleteCourseAction",
  async (payload: { id: number }, { dispatch }) => {
    try {
      dispatch(setLoadingAction(true));
      await deletePost(payload.id);
      dispatch(setLoadingAction(false));
      dispatch(getPostsAction({}));
    } catch (error) {
      dispatch(setLoadingAction(false));
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostAction: (
      state: IPostState,
      action: PayloadAction<PostInterface[]>
    ) => {
      // console.log("action.payload post :>> ", action);
      state.data = action.payload;
      state.currentPage = 1;
    },
    setPostCountAction: (state: IPostState, action: PayloadAction<number>) => {
      state.count = action.payload;
      state.currentPage = 1;
    },
    setDetailAction: (
      state: IPostState,
      action: PayloadAction<PostInterface>
    ) => {
      // console.log("action.payload :>> ", action.payload);
      state.detail = action.payload;
      state.currentPage = 1;
    },
    setStatusModalAction: (
      state: IPostState,
      action: PayloadAction<{
        isOpenModal: boolean;
        type: "addNew" | "update";
        item: PostInterface | null;
      }>
    ) => {
      state.modal = action.payload;
    },
  },
});

export const {
  setPostAction,
  setStatusModalAction,
  setDetailAction,
  setPostCountAction,
} = postSlice.actions;

export default postSlice.reducer;
