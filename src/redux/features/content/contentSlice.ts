import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  content: {
    id: string;
    title: string;
    duration: string;
    category: string;
    videoUrl: string;
  }[];
};

const initialState: TInitialState = {
    content:[]
};
// content slice
export const contentSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
});
export const {} = contentSlice.actions;
export default contentSlice.reducer;
