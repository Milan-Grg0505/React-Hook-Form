import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo, updateTodo,fetchTodos } from '../features/todo/todoSlice.js'



const Todos = () => {
  const todos = useSelector((state) => state.todos.todos);
  const status = useSelector((state) => state.todos.status);
  const error = useSelector((state) => state.todos.error);
  console.log(todos)
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEditChange = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  }

  // useEffect(() =>{
  //   if(status === "idle"){
  //     dispatch(fetchTodos())
  //   }
  // },[dispatch,status])

  const saveUpdate = () => {
    dispatch(updateTodo({ id: editId, text: editText }))
    setEditId(null);
    setEditText("");
  }
  return (
    <>
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Todos</h2>

        <button 
        onClick={(e) => dispatch(fetchTodos())}
        className='bg-black text-white px-3 py-4 rounded-2xl'>
          Fetch Todo
        </button>

        {status === "loading" && <p>Loading todos ...</p>}
        {status === "rejected" && <p className='text-red-600'>Error:{error}</p>}
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center justify-between"
            >

              {editId === todo.id ? (
                <input
                  type="text"
                  className="border p-2 rounded w-full mr-4"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <span className="text-lg text-gray-800">{todo.title}</span>
              )}

              <div className="flex gap-2">

                {editId === todo.id ? (
                  <>
                    <button
                      onClick={saveUpdate}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                      Save
                    </button>

                    <button
                      onClick={() => setEditId(null)}
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditChange(todo)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => dispatch(removeTodo(todo.id))}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                    >
                      Delete
                    </button>
                  </>

                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Todos