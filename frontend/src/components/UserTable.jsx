import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeUser } from '../features/users/userSlice.js'

// lucide-react icons
import { Eye, Pencil, Trash2, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import UserDetails from './UserDetails.jsx'

const UserTable = () => {

  const users = useSelector((state) => state.users.users)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null);

  const handleView = (user) => {
    setModalOpen(true);
    setSelectedUser(user)
  }

  const handleClose = () => {
    setModalOpen(false)
    setSelectedUser(null)
  }



  const handleEdit = (user) => {
    navigate(`/editUser/${user.id}`);
  }

  return (
    <>
      {/* user Details */}
      {modalOpen && selectedUser && (
        <UserDetails close={handleClose} user={selectedUser} />
      )}
      <div className="p-6 min-h-screen bg-gray-50">

        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          User Management
        </h2>

        <div className="max-w-7xl mx-auto shadow-xl bg-white">
          <div className='overflow-x-auto'>
            {/* Table */}
            <table className="w-full min-w-[800px]">
              <thead className="bg-indigo-600 text-white">
                <tr className="text-left">
                  <th className="p-4 font-semibold">First Name</th>
                  <th className="p-4 font-semibold">Last Name</th>
                  <th className="p-4 font-semibold">Email</th>
                  <th className="p-4 font-semibold">Course</th>
                  <th className="p-4 font-semibold">Gender</th>
                  <th className="p-4 font-semibold">Study Level</th>
                  <th className="p-4 font-semibold">DOB</th>
                  <th className="p-4 font-semibold text-center">Action</th>
                </tr>
              </thead>

              <tbody>

                {users.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-10 text-center text-gray-500">
                      <User className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-100 transition duration-200"
                    >
                      <td className="p-4">{user.firstName}</td>
                      <td className="p-4">{user.lastName}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">{user.course}</td>
                      <td className="p-4">{user.gender}</td>
                      <td className="p-4">{user.studylevel?.join(', ')}</td>
                      <td className="p-4">{user.dateofbirth}</td>

                      <td className="p-4 flex gap-2 items-center">

                        {/* view Button */}
                        <button
                          onClick={() => handleView(user)}
                          className="inline-flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        >
                          <Eye className='w-5 h-5' />
                        </button>
                        {/* Edit Button */}
                        <button
                          onClick={() => handleEdit(user)}
                          className="inline-flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                        >
                          <Pencil className='w-5 h-5' />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => dispatch(removeUser(user.id))}
                          className="inline-flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        >
                          <Trash2 className='w-5 h-5' />
                        </button>

                      </td>
                    </tr>
                  ))
                )}

              </tbody>
            </table>

          </div>

        </div>



      </div>
    </>
  )
}

export default UserTable
