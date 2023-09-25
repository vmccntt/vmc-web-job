import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setLoadingAction } from "../../app/commonSlice";
// import { RootState } from "../../app/store";
import { defaultFilter } from "../../utils";
import { IUserState } from "./propState";
import {
  createUser,
  deleteUser,
  getRole,
  getRoleGroup,
  getUser,
  getUsers,
  updateUser,
} from "./services";
import {
  IRoleGroupModel,
  IRoleModuleModel,
  ISearchUser,
  IUser
} from "./user.model";

const initialState: IUserState = {
  data: [],
  currentPage: 1,
  permission: [],
  permissionObj: {},
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
  "users",
  async (filter: ISearchUser, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingAction(true));
      // const state = thunkAPI.getState() as RootState;
      const response: any = await getUsers(defaultFilter({ ...filter }));
      thunkAPI.dispatch(setLoadingAction(false));
      thunkAPI.dispatch(setPostAction(response?.data || []));
    } catch (error) {
      thunkAPI.dispatch(setLoadingAction(false));
    }
  }
);

export const getUserRoleAction = createAsyncThunk(
  "users/role",
  async (payload: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingAction(true));
      const response = await getRole();
      thunkAPI.dispatch(setLoadingAction(false));
      thunkAPI.dispatch(setUserPermissionAction(response?.data || []));
    } catch (error) {
      thunkAPI.dispatch(setLoadingAction(false));
    }
  }
);

export const getUserDetail = createAsyncThunk(
  "user/detail",
  async (payload: { id: number }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingAction(true));
      // const statek = thunkAPI.getState() as RootState;
      const response: any = await getUser(payload.id);
      thunkAPI.dispatch(setLoadingAction(false));
      thunkAPI.dispatch(setDetailAction(response?.data || []));
    } catch (error) {
      thunkAPI.dispatch(setLoadingAction(false));
    }
  }
);

export const createUserAction = createAsyncThunk(
  "user/create",
  async (payload: any, { dispatch }) => {
    try {
      const banner = {
        ...payload.body,
      };
      dispatch(setLoadingAction(true));
      if (payload.type === "addNew") {
        await createUser(banner);
      } else {
        await updateUser(payload.id, banner);
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
      await deleteUser(payload.id);
      dispatch(setLoadingAction(false));
      dispatch(getUsersAction({}));
    } catch (error) {
      dispatch(setLoadingAction(false));
    }
  }
);
export const getRoleGroupAction = createAsyncThunk(
  "user/group",
  async (payload: any, { dispatch }) => {
    try {
      dispatch(setLoadingAction(true));
      const response = await getRoleGroup();
      dispatch(seRoleGroupAction(response.data));
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
    setPostAction: (state: IUserState, action: PayloadAction<IUser[]>) => {
      state.data = action.payload;
      state.currentPage = 1;
    },
    setDetailAction: (state: IUserState, action: PayloadAction<IUser>) => {
      const payload: any = action.payload;
      delete payload["password"];
      state.detail = payload;
    },
    setStatusModalAction: (
      state: IUserState,
      action: PayloadAction<{
        isOpenModal: boolean;
        type: "addNew" | "update";
        item: IUser | null;
      }>
    ) => {
      state.modal = action.payload;
    },
    setUserPermissionAction: (
      state: IUserState,
      action: PayloadAction<IRoleModuleModel[]>
    ) => {
      state.permission = action.payload;
      const permissionObj: any = {};
      action.payload.forEach((item) => {
        const permission: any = item?.permission;
        if (permission) {
          for (const key in permission) {
            const keyPer = `${item.module}.${key}`;
            permissionObj[keyPer] = permission[key];
          }
        }
      });
      state.permissionObj = permissionObj;
    },
    seRoleGroupAction: (
      state: IUserState,
      action: PayloadAction<IRoleGroupModel[]>
    ) => {
      state.roleGroup = action.payload;
    },
  },
});

export const {
  setPostAction,
  setStatusModalAction,
  setDetailAction,
  setUserPermissionAction,
  seRoleGroupAction,
} = userSlice.actions;

export default userSlice.reducer;
