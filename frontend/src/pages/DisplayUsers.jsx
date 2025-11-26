import React, { useState } from 'react'
import UserTable from '../components/UserTable'
import EditUser from '../components/EditUser'
import { useSelector } from 'react-redux'

const DisplayUsers = () => {
  const [editUsers,setEditUsers]= useState(null)
  const users = useSelector(state => state.users.users)

  const editUser = users.find(u => u.id === editUsers);
  return (
    <>
    {
      !editUsers ? (
        <UserTable onEdit={(id) => setEditUsers(id)} />
        
      ) : (
        <EditUser
          editUsers={editUser}
          // onCancel = {()=>setEditUsers(null)}
        />
      )
    }
    </>
  )
}

export default DisplayUsers