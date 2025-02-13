import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { authApi } from "libs/api"
import { PREV_PATH } from "libs/config"
import { DECODE_TOKEN, REMOVEAUTH_TOKEN, SETAUTH_TOKEN } from "libs/jwtToken"

const _verifyUser = createAsyncThunk("verify_profile", () => authApi.verify())

const initialState = {
  user: null,
  permission: null
}
const UserStore = createSlice({
  name: "user",
  initialState,
  reducers: {
    _setUser: (state, action) => {
      state.user = action.payload
      state.permission = state.user ? state.user.permission : null
    },
    _logout: (state) => {
      state.user = null
      state.permission = null
      REMOVEAUTH_TOKEN()
      localStorage.setItem(PREV_PATH, window.location.pathname)
      location.href = '/login'
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(_verifyUser.fulfilled, (state, action) => { 
        const token = action.payload.token
        if(token){
          const decode = DECODE_TOKEN(token)
          SETAUTH_TOKEN(token)
          state.user = decode
          state.permission = state.user ? state.user.permission : null;
        }
      })
      .addCase(_verifyUser.rejected, (state, action) => {
        console.log(action.error)
        // state.user = null
        // state.permission = null
        // REMOVEAUTH_TOKEN()
        // localStorage.setItem(PREV_PATH, window.location.pathname)
        // location.href = '/login'
      })
  }
})

export const selectUser = (state) => state.user.user
export const selectPermission = (state) => state.user.permission
export const { _logout, _setUser } = UserStore.actions
export { _verifyUser }
export default UserStore