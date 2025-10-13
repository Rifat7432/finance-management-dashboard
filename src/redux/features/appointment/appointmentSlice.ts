import { TAppointment } from "@/global/global.interface";
import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  appointment: TAppointment | null;
  status: "pending" | "complete" | "All";
};

const initialState: TInitialState = {
  appointment: null,
  status: "All",
};
// appointment slice
export const appointmentSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setAppointment: (state, actions) => {
      state.appointment = actions.payload;
    },
    setStatus: (state, actions) => {
      state.status = actions.payload;
    },
  },
});
export const { setStatus, setAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;
