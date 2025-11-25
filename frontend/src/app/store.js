import {configureStore} from "@reduxjs/toolkit"
import todoReducer from "../features/todo/todoSlice.js"
import userReducer from "../features/users/userSlice.js"

export const store = configureStore({
  // add the reducer from todo slice in key and value pair
  reducer: {
    todos: todoReducer,
    users:userReducer
  }
});