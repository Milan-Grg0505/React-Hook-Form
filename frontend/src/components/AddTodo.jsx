import React, { useState } from 'react'
import {useDispatch} from "react-redux"
import { addTodo } from '../features/todo/todoSlice.js';

const AddTodo = () => {
  const [input,setInput] = useState("");

  const dispatch = useDispatch();

  const addTodoHandler = (e) =>{
    e.preventDefault();

    // call reducer inside the dispatch
    dispatch(addTodo(input)) // passing input as payload to the addTodo reducer

    setInput(""); // clear the input field after adding todo
  }
  return (
    <>
      <form onSubmit={addTodoHandler} className="flex max-w-2xl mx-auto p-6 mb-6 bg-white rounded-lg shadow-sm border border-gray-200 my-4">
        <div className="flex flex-1 gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Add
          </button>
        </div>
      </form>
    </>
  )
}

export default AddTodo