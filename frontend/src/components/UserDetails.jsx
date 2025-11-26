import { User, X } from 'lucide-react'
import React from 'react'

const UserDetails = ({ user, close }) => {
  return (
    <>
      <div className='fixed inset bg-black/40 bg-opacity-40 flex justify-center items-start z-30 w-full h-screen overflow-y-auto' onClick={close}>
        <div className='bg-white relative rounded-2xl max-w-[500px] md:max-w-3xl min-h-[85vh] w-full md:mx-auto'>
          {/* Modal Header */}
          <div className='flex justify-between items-center p-6 border-b border-gray-300'>

            <h3 className='text-3xl font-bold text-gray-800'>
              User Information
            </h3>

            {/* close button */}
            <X
              onClick={close}
              className='w-6 h-6 text-gray-600 transform transition-all hover:rotate-180 ease-in duration-200'
            />
          </div>

          {/* User details */}

          <div className="p-6 space-y-6">
            {/* Profile Header */}
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-indigo-600" />
              </div>
              <div>
                <h4 className="text-2xl font-semibold text-gray-800">
                  {user.firstName} {user.lastName}
                </h4>
                <p className="text-gray-600 text-lg">{user.email}</p>
              </div>
            </div>

            {/* personal information */}

            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8'>
              <div className='space-y-4'>

                <h5 className='text-lg text-gray-800 font-semibold border-b pb-2'>Personal Infromation</h5>

                <div>
                  <label className='text-sm font-medium text-gray-600'>First Name:</label>
                  <p className='text-lg text-gray-800'>{user.firstName}</p>
                </div>

                <div>
                  <label className='text-sm font-medium text-gray-600'>Last Name:</label>
                  <p className='text-lg text-gray-800'>{user.lastName}</p>
                </div>

                <div>
                  <label className='text-sm font-medium text-gray-600'>Phone:</label>
                  <p className='text-lg text-gray-800'>{user.phone}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-600'>Gender:</label>
                  <p className='text-lg text-gray-800'>{user.gender}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-600'>Date of Birth:</label>
                  <p className='text-lg text-gray-800'>{user.dateofbirth}</p>
                </div>
              </div>

              {/*  Academic Infromation*/}
              <div className='space-y-4'>
                <h5 className='text-lg text-gray-800 font-semibold border-b pb-2'>
                  Academic Infromation
                </h5>

                <div>
                  <label className='text-sm font-medium text-gray-600'>Email:</label>
                  <p className='text-lg text-gray-800'>{user.email}</p>
                </div>

                <div>
                  <label className='text-sm font-medium text-gray-600'>Course:</label>
                  <p className='text-lg text-gray-800'>{user.course}</p>
                </div>

                <div>
                  <label className='text-sm font-medium text-gray-600'>Study level:</label>
                  <p className='text-lg text-gray-800'>{user.studylevel.join(' ')}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-600'>Address:</label>
                  <p className='text-lg text-gray-800'>{user.address}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-600'>Bio:</label>
                  <p className='text-lg text-gray-800'>{user.bio}</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default UserDetails