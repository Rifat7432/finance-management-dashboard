import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface User {
  id: string
  email: string
  name: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  resetEmail: string | null
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  resetEmail: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.resetEmail = null
    },
    setResetEmail: (state, action: PayloadAction<string>) => {
      state.resetEmail = action.payload
    },
  },
})

export const { setCredentials, logout, setResetEmail } = authSlice.actions
export default authSlice.reducer
