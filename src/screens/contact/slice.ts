import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setLoadingAction } from "../../app/commonSlice";
import { RootState } from "../../app/store";
import { IContactState } from "./propState";
import {
  createContact,
  deleteContact,
  updateContact,
  getContacts,
  getContact,
} from "./services";
import { IContact, ISearchContact } from "./contact.model";
import { defaultFilter } from "../../utils";

const initialState: IContactState = {
  data: [],
  currentPage: 1,
  detail: {
    name: "",
    content: "",
    id: 1,
    phone: ""
  },
  modal: {
    isOpenModal: false,
    item: null,
    type: "addNew",
  },
};

export const getContactsAction = createAsyncThunk(
  "contacts",
  async (filter: ISearchContact, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingAction(true));
      const state = thunkAPI.getState() as RootState;
      const response: any = await getContacts(defaultFilter({...filter}));
      thunkAPI.dispatch(setLoadingAction(false));
      thunkAPI.dispatch(setPostAction(response?.data || []));
    } catch (error) {
      thunkAPI.dispatch(setLoadingAction(false));
    }
  }
);

export const getContactDetail = createAsyncThunk(
  "contact/detail",
  async (payload: { id: number }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingAction(true));
      const state = thunkAPI.getState() as RootState;
      const response: any = await getContact(payload.id);
      thunkAPI.dispatch(setLoadingAction(false));
      thunkAPI.dispatch(setDetailAction(response?.data || []));
    } catch (error) {
      thunkAPI.dispatch(setLoadingAction(false));
    }
  }
);

export const createContactAction = createAsyncThunk(
  "contact/create",
  async (payload: any, { dispatch }) => {
    try {
      const banner = {
        ...payload.body,
      };
      dispatch(setLoadingAction(true));
      if (payload.type === "addNew") {
        await createContact(banner);
      } else {
        await updateContact(payload.id, banner);
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

export const deleteContactAction = createAsyncThunk(
  "course/deleteCourseAction",
  async (payload: { id: number }, { dispatch }) => {
    try {
      dispatch(setLoadingAction(true));
      await deleteContact(payload.id);
      dispatch(setLoadingAction(false));
      dispatch(getContactsAction({}));
    } catch (error) {
      dispatch(setLoadingAction(false));
    }
  }
);

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setPostAction: (
      state: IContactState,
      action: PayloadAction<IContact[]>
    ) => {
      // console.log("action.payload :>> ", action.payload);
      state.data = action.payload;
      state.currentPage = 1;
    },
    setDetailAction: (
      state: IContactState,
      action: PayloadAction<IContact>
    ) => {
      const payload: any = action.payload;
      delete payload['password']
      state.detail = payload;
    },
    setStatusModalAction: (
      state: IContactState,
      action: PayloadAction<{
        isOpenModal: boolean;
        type: "addNew" | "update";
        item: IContact | null;
      }>
    ) => {
      state.modal = action.payload;
    },
  },
});

export const { setPostAction, setStatusModalAction, setDetailAction } =
contactSlice.actions;

export default contactSlice.reducer;
