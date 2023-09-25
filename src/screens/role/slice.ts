import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setLoadingAction } from "../../app/commonSlice";
// import { RootState } from "../../app/store";
import {
  createUser,
  deleteUser,
  updateUser,
  getUser,
  getRoleGroup,
} from "../user/services";

import { defaultFilter } from "../../utils";
import { IRoleState } from "./propState";
import { IRoleGroupResponseModel } from "./role.model";
import { createRole, deleteRole, getListRoleGroup, updateRole } from "./services";

const initialState: IRoleState = {
  data: [],
  currentPage: 1,
  count: 0,
};

export const getRoleGroupsAction = createAsyncThunk(
  "role",
  async (filter: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingAction(true));
      // const state = thunkAPI.getState() as RootState;
      const response: any = await getListRoleGroup(defaultFilter({ ...filter }));
      thunkAPI.dispatch(setListRoleGroupAction(response));
      thunkAPI.dispatch(setLoadingAction(false));
    } catch (error) {
      thunkAPI.dispatch(setLoadingAction(false));
    }
  }
);


export const getRoleDetail = createAsyncThunk(
  "role/detail",
  async (payload: { id: number }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingAction(true));
      // const statek = thunkAPI.getState() as RootState;
      const response: any = await getUser(payload.id);
      thunkAPI.dispatch(setLoadingAction(false));
    } catch (error) {
      thunkAPI.dispatch(setLoadingAction(false));
    }
  }
);

export const createRoleAction = createAsyncThunk(
  "role/create",
  async (payload: any, { dispatch }) => {
    try {
      const body = {
        ...payload.body,
      };
      dispatch(setLoadingAction(true));
      if (payload.type === "addNew") {
        await createRole(body);
      } else {
        await updateRole(payload.id, body);
      }
      dispatch(setLoadingAction(false));
   
      // dispatch(getBannersAction());
    } catch (error) {
      dispatch(setLoadingAction(false));
    }
  }
);

export const deleteRoleAction = createAsyncThunk(
  "course/deleteCourseAction",
  async (payload: { id: number }, { dispatch }) => {
    try {
      dispatch(setLoadingAction(true));
      await deleteRole(payload.id);
      dispatch(setLoadingAction(false));
      dispatch(getRoleGroupsAction({}));
    } catch (error) {
      dispatch(setLoadingAction(false));
    }
  }
);

export const getRoleGroupAction = createAsyncThunk(
  "role/group",
  async (payload: any, { dispatch }) => {
    try {
      dispatch(setLoadingAction(true));
      const response = await getRoleGroup();
      // dispatch(setListRoleGroupAction(response.data));
      dispatch(setLoadingAction(false));
    } catch (error) {
      dispatch(setLoadingAction(false));
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setListRoleGroupAction: (state: IRoleState, action: PayloadAction<IRoleGroupResponseModel>) => {
      // console.log(' action.payload;: ',  action.payload);
      state.data = action.payload.data;
      state.count = action.payload.count;
      state.currentPage = 1;
    },
  
  },
});

export const {
  setListRoleGroupAction,
} = userSlice.actions;

export default userSlice.reducer;
