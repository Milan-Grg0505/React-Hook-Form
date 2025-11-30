import { createAsyncThunk, createSlice,nanoid } from "@reduxjs/toolkit";

// createasync task => if we want to do delay task we use thunk middleware

export const fetchTodos = createAsyncThunk('fetchTodos',async() =>{
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await response.json();
  return data.slice(0,3);
})

const initialState = {
  todos:[{
    id:1, title:"Hello World",completed:true
  }],
  status:"idle",
  error:null,
}

// how to create a slice
export const todoSlice = createSlice({
  name:"todo",
  initialState,
  reducers:{
    addTodo: (state,action) =>{
          const todo = {
            id:nanoid(),
            title:action.payload, // to pass the title through payload which is a object
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
            title:action.payload.title,
          }
        }else{
          return todo // return the todo as it is
        }
      })
    }
  },
  extraReducers:(builder) =>{
    builder
    .addCase(fetchTodos.pending,(state) =>{
        state.status = "loading";
        state.error = null;
    })
    .addCase(fetchTodos.fulfilled,(state,action) =>{
      state.status = "succeeded";
      // state.todos = action.payload
      state.todos = [...state.todos,...action.payload]
    })
    .addCase(fetchTodos.rejected,(state,action)=>{
      state.status = "rejected";
      state.todos = action.error.message
    })
  }
});
 

// Redux Toolkit sees these reducer names and automatically creates action creators like:

// todoSlice.actions.addTodo
// todoSlice.actions.removeTodo
// todoSlice.actions.updateTodo


export const {addTodo,removeTodo,updateTodo} = todoSlice.actions;


// store need to know about this slice and reducers
export default todoSlice.reducer;

