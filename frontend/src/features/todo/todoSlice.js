import { createSlice,nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos:[{
    id:1, text:"Hello World",completed:true
  }]
}

// how to create a slice
export const todoSlice = createSlice({
  name:"todo",
  initialState,
  reducers:{
    addTodo: (state,action) =>{
          const todo = {
            id:nanoid(),
            text:action.payload, // to pass the text through payload which is a object
            completed:true
          };
          state.todos.push(todo) // update the initial state by pushing todo
    },

    removeTodo:(state,action) =>{
        state.todos = state.todos.filter((todo) => todo.id !== action.payload)  // if todo id is not equal to payload then keep it
    },

    updateTodo:(state,action) =>{
      state.todos = state.todos.map((todo) =>{
        if(todo.id === action.payload.id){
          return {
            ...todo,
            text:action.payload.text,
          }
        }else{
          return todo // return the todo as it is
        }
      })
    }
  }
});
5   

// Redux Toolkit sees these reducer names and automatically creates action creators like:

// todoSlice.actions.addTodo
// todoSlice.actions.removeTodo
// todoSlice.actions.updateTodo


export const {addTodo,removeTodo,updateTodo} = todoSlice.actions;


// store need to know about this slice and reducers
export default todoSlice.reducer;