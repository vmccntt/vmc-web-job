import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setLoadingAction } from "../../app/commonSlice";
import { RootState } from "../../app/store";
import { InforContactState } from "./propState";
import {
  createInforContact,
  deleteInforContact,
  updateInforContact,
  getInforContacts,
  getInforContact,
} from "./services";
import { InforContact, ISearchInforContact } from "./inforContact.model";
import { defaultFilter } from "../../utils";

const initialState: InforContactState = {
  data: [],
  currentPage: 1,
  detail: {
  },
  modal: {
    isOpenModal: false,
    item: null,
    type: "addNew",
  },
};

export const getInforContactsAction = createAsyncThunk(
  "contacts",
  async (filter: ISearchInforContact, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingAction(true));
      const state = thunkAPI.getState() as RootState;
      const response: any = await getInforContacts(defaultFilter({...filter}));
      thunkAPI.dispatch(setLoadingAction(false));
      thunkAPI.dispatch(setInforContactAction(response?.data || []));
    } catch (error) {
      thunkAPI.dispatch(setLoadingAction(false));
    }
  }
);

export const getInforContactDetail = createAsyncThunk(
  "contact/detail",
  async (payload: { id: number }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingAction(true));
      const state = thunkAPI.getState() as RootState;
      const response: any = await getInforContact(payload.id);
      thunkAPI.dispatch(setLoadingAction(false));
      thunkAPI.dispatch(setDetailAction(response?.data || []));
    } catch (error) {
      thunkAPI.dispatch(setLoadingAction(false));
    }
  }
);

export const createInforContactAction = createAsyncThunk(
  "contact/create",
  async (payload: any, { dispatch }) => {
    try {
      const banner = {
        ...payload.body,
      };
      dispatch(setLoadingAction(true));
      if (payload.type === "addNew") {
        await createInforContact(banner);
      } else {
        await updateInforContact(payload.id, banner);
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

export const deleteInforContactAction = createAsyncThunk(
  "course/deleteCourseAction",
  async (payload: { id: number }, { dispatch }) => {
    try {
      dispatch(setLoadingAction(true));
      await deleteInforContact(payload.id);
      dispatch(setLoadingAction(false));
      dispatch(getInforContactsAction({}));
    } catch (error) {
      dispatch(setLoadingAction(false));
    }
  }
);

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setInforContactAction: (
      state: InforContactState,
      action: PayloadAction<InforContact[]>
    ) => {
      // console.log("action.payload :>> ", action.payload);
      state.data = action.payload;
      state.currentPage = 1;
    },
    setDetailAction: (
      state: InforContactState,
      action: PayloadAction<InforContact>
    ) => {
      const payload: any = action.payload;
      delete payload['password']
      state.detail = payload;
    },
    setStatusModalAction: (
      state: InforContactState,
      action: PayloadAction<{
        isOpenModal: boolean;
        type: "addNew" | "update";
        item: InforContact | null;
      }>
    ) => {
      state.modal = action.payload;
    },
  },
});

export const { setInforContactAction, setStatusModalAction, setDetailAction } =
contactSlice.actions;

export default contactSlice.reducer;
