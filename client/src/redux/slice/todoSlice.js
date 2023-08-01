import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todoSlice",
  initialState: {
    todo: null,
    id: null
  },
  reducers: {
    setTodo: (state, action) => {
      state.todo = action.payload;
    },
   
  },
})

export const { setTodo } = todoSlice.actions;
export default todoSlice.reducer;