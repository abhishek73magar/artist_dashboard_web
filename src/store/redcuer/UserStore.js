import { createSlice } from "@reduxjs/toolkit"
import { PREV_PATH } from "libs/config"
import { REMOVEAUTH_TOKEN } from "libs/jwtToken"

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
  }
})

export const selectUser = (state) => state.user.user
export const selectPermission = (state) => state.user.permission
export const { _logout, _setUser } = UserStore.actions
export default UserStore