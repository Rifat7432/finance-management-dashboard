import { createSlice } from "@reduxjs/toolkit";

type TValue = {
  page: number;
  limit: number;
};
const initialState: TValue = {
  page: 1,
  limit: 10,
};
// product slice
export const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});
export const { setPage } = financeSlice.actions;
export default financeSlice.reducer;
