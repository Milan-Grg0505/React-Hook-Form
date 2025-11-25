import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { removeUser } from '../features/users/userSlice.js';
import EditModal from './EditModal.jsx';
const UserTable = () => {
  // select users from redux store
  const users = useSelector((state) => state.users.users);
  // initialize dispatch
  const dispatch = useDispatch();

  const [modalOpen,setModalOpen] = useState(false);
  const [editUsers, setEditUsers] = useState(null);

  

  const handleEdit = (user) =>{
    
    setEditUsers(user)
    setModalOpen(true) // to open modal
  }

  return (
    <>
      <div className='p-6'>
        <h2 className='text-2xl font-bold mb-4 text-center'>User Table Component</h2>

        <table className='w-full border border-grey-500 shadow-lg'>
          <thead className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold'>
            <tr>
              <th className='border p-2'>First Name</th>
              <th className='border p-2'>Last Name</th>
              <th className='border p-2'>Email</th>
              <th className='border p-2'>Password</th>
              <th className='border p-2'>Address</th>
              <th className='border p-2'>Action</th>
            </tr>
          </thead>

          <tbody>
            {/* User rows will go here */}
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className='text-center p-4'>No users available</td>
              </tr>
            ) : (
              // mapping user data to table rows after selecting from redux store
              users.map((user) => (
                <tr key={user.id} className='text-center'>
                  <td className="border p-2">{user.firstName}</td>
                  <td className="border p-2">{user.lastName}</td>
                  <td className='border p-2'>{user.email}</td>
                  <td className="border p-2">{user.password}</td>
                  <td className="border p-2">{user.address}</td>
                  <td className='border p-2 space-x-3'>

                    <button
                      onClick={()=>handleEdit(user)}
                      className='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600'>
                      Edit
                    </button>
                    <button
                      onClick={() => dispatch(removeUser(user.id))}
                      className='px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600'>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>


        </table>

        {/* =============== Edit Modal =============== */}
        {editUsers && (
          <EditModal
            editUsers={editUsers}
            open={modalOpen}
            close={() => setModalOpen(false)}
          />
        )}
      </div>
    </>
  )
}

export default UserTable