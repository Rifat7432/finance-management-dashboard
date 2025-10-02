import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TUser = {
  name: string;
  email: string;
  password: string;
  image: string;
  image2: string;
  phone: string;
  resume: string;
};
type TValue = {
  user: TUser | null;
  decodeUser: { email: string; userId: string } | null;
  token: string;
  loading: boolean;
  collapsed: boolean;
};
const initialState: TValue = {
  user: null,
  loading: false,
  decodeUser: null,
  token: "",
  collapsed: false,
};
// product slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storUserData: (state, actions: PayloadAction<TUser>) => {
      state.user = actions.payload;
    },
    storDecodeUser: (
      state,
      actions: PayloadAction<{ email: string; userId: string }>
    ) => {
      state.decodeUser = actions.payload;
    },
    storToken: (state, actions: PayloadAction<string>) => {
      state.token = actions.payload;
    },
    logOut: (state) => {
      state.token = "";
      state.decodeUser = null;
      localStorage.removeItem("token");
    },
    setLoading: (state, actions: PayloadAction<boolean>) => {
      state.loading = actions.payload;
    },
    isCollapsed: (state, actions) => {
      state.collapsed = actions.payload;
    },
  },
});
export const {
  storUserData,
  setLoading,
  storToken,
  logOut,
  storDecodeUser,
  isCollapsed,
} = userSlice.actions;
export default userSlice.reducer;
