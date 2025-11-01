import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  updateAd: {
    _id: string;
    name: string;
    startDate: string;
    duration: string;
    endDate: string;
    url: string;
  } | null;
  isUpdateModalOpen: boolean;
  isCreateModalOpen: boolean;

  page: number;
  limit: number;
};

const initialState: TInitialState = {
  updateAd: null,
  isUpdateModalOpen: false,
  isCreateModalOpen: false,
  page: 1,
  limit: 10,
};
// ad slice
export const adSlice = createSlice({
  name: "Ad",
  initialState,
  reducers: {
    setUpdateAd: (state, action) => {
      state.updateAd = action.payload;
    },
    setIsUpdateAdModalOpen: (state, action) => {
      state.isUpdateModalOpen = action.payload;
    },
    setIsCreateAdModalOpen: (state, action) => {
      state.isCreateModalOpen = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});
export const {
  setUpdateAd,
  setIsCreateAdModalOpen,
  setIsUpdateAdModalOpen,
  setPage,
} = adSlice.actions;
export default adSlice.reducer;
