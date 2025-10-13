import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  updateContent: {
    _id: string;
    title: string;
    duration: string;
    category: string;
    videoUrl: string;
  } | null;
  isUpdateModalOpen: boolean;
  isCreateModalOpen: boolean;
  contentCategory:
    | "All"
    | "Budget"
    | "Debt"
    | "Saving"
    | "Investment"
    | "Taxation";
  page: number;
  limit: number;
};

const initialState: TInitialState = {
  updateContent: null,
  isUpdateModalOpen: false,
  isCreateModalOpen: false,
  contentCategory: "All",
  page: 1,
  limit: 10,
};
// content slice
export const contentSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setUpdateContent: (state, action) => {
      state.updateContent = action.payload;
    },
    setIsUpdateModalOpen: (state, action) => {
      state.isUpdateModalOpen = action.payload;
    },
    setIsCreateModalOpen: (state, action) => {
      state.isCreateModalOpen = action.payload;
    },
    setContentCategory: (state, action) => {
      state.contentCategory = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});
export const {
  setUpdateContent,
  setIsCreateModalOpen,
  setIsUpdateModalOpen,
  setContentCategory,setPage
} = contentSlice.actions;
export default contentSlice.reducer;
