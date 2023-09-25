import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CommonState {
  isLoading: boolean;
  isMobile: boolean
}

const initialState: CommonState = {
  isLoading: false,
  isMobile: false
};

export const CommonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setMobileModeAction: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
  },
});

export const { setLoadingAction, setMobileModeAction } = CommonSlice.actions;

export default CommonSlice.reducer;
