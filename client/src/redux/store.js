import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todoSlice from "./slice/todoSlice";
import { apiSlice } from "./apiCalls/todoApi";

const rootReducer = combineReducers({
    todoSlice: todoSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()

    .concat(apiSlice.middleware)

}

)