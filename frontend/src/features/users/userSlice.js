import { createSlice,nanoid } from "@reduxjs/toolkit";


const initialState = {
  users: JSON.parse(localStorage.getItem("users")) || []
};

const userSlice = createSlice({
  name:"users",
  initialState,
  reducers:{
    addUser:(state,action) =>{
      const user = {
        id: nanoid(),
        // firstName: action.payload.firstName,
        // lastName: action.payload.lastName,
        // email:action.payload.email,
        // password: action.payload.password,
        // address : action.payload.address,
      ...action.payload // spread operator to add multiple fields
      };

      state.users.push(user); //add new user to users array
      localStorage.setItem("users",JSON.stringify(state.users)); //update local storage
    },
    removeUser:(state,action) =>{
      state.users = state.users.filter((user) => user.id !== action.payload); // remove user whose id is not equal to payload
      localStorage.setItem("users",JSON.stringify(state.users))
    },
    updateUser:(state,action) =>{
      state.users = state.users.map((user) =>{
        if(user.id === action.payload.id){
          return {
            ...user,
            // firstName:action.payload.firstName,
            // lastName:action.payload.lastName,
            // email:action.payload.email,
            // password:action.payload.password,
            // address:action.payload.address,
            ...action.payload, // spread operator to update multiple fields
          }
        }else{
          return user; // return user as it is 
        }
      });
      localStorage.setItem("users",JSON.stringify(state.users));
    },
  }
});

export const {addUser,removeUser,updateUser,getUserById} = userSlice.actions;

export default userSlice.reducer;
