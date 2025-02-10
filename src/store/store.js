import { configureStore } from "@reduxjs/toolkit";
import UserStore from "./redcuer/UserStore";

const store = configureStore({
  reducer: {
    user: UserStore.reducer
  }
})

export default store;