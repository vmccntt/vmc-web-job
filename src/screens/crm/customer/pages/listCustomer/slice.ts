import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setLoadingAction } from "../../../../../app/commonSlice";
import { trimParam } from "../../../../../utils";
import { getAllGroup, getDetailCustomerByMaDoiTac, getListCustomerCond } from "../../services";

const initialState: any = {
  data: [],
  dataAllGroup: [],
  dataDetail: null,
  totalField: 0,
};

export const getListCustomerAction = createAsyncThunk(
  "SearchBP",
  async (filter: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingAction(true));
      const response: any = await getListCustomerCond(trimParam({ ...filter }));
      thunkAPI.dispatch(setListCustomerAction(response));
      thunkAPI.dispatch(setLoadingAction(false));
    } catch (error) {
      thunkAPI.dispatch(setLoadingAction(false));
    }
  }
);

export const getAllGroupAction = createAsyncThunk(
  "getAllGroup",
  async (filter: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingAction(true));
      const response: any = await getAllGroup();
      thunkAPI.dispatch(setListGroupAction(response));
      thunkAPI.dispatch(setLoadingAction(false));
    } catch (error) {
      thunkAPI.dispatch(setLoadingAction(false));
    }
  }
);

export const getDetailCustomerAction = createAsyncThunk(
  "SearchDetailCustomer",
  async (id: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingAction(true));
      const response: any = await getDetailCustomerByMaDoiTac(id);
      thunkAPI.dispatch(setDetailCustomerAction(response));
      thunkAPI.dispatch(setLoadingAction(false));
    } catch (error) {
      thunkAPI.dispatch(setLoadingAction(false));
    }
  }
);

export const customerSlice = createSlice({
  name: "list-customer",
  initialState,
  reducers: {
    setListCustomerAction: (state: any, action: PayloadAction<any>) => {
      // console.log('acp: ', action.payload);
      state.data = action.payload;
    },
    setListGroupAction: (state: any, action: PayloadAction<any>) => {
      state.dataAllGroup = action?.payload.map((x: any) => {
        return({label: x?.tenNhom, value: x?.tenNhom});
      });
    },
    setDetailCustomerAction: (state: any, action: PayloadAction<any>) => {
      state.dataDetail = action.payload;
      state.totalField = Object.keys(action.payload).length;
    },
  },
});

export const {
  setListCustomerAction,
  setDetailCustomerAction,
  setListGroupAction
} = customerSlice.actions;

export default customerSlice.reducer;