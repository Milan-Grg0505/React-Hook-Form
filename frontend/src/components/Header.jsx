import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {


  return (
    <>
      <header className='sticky top-0 right-0 left-0 bg-indigo-700 shadow-lg z-20'>

        <div className='max-w-4xl md:max-w-7xl  mx-auto px-4 md:px-6 h-16'>

          <nav className='flex justify-between items-center h-full'>
            <div>
              <h3 className='text-2xl text-white'>Logo</h3>
            </div>

            <ul className='flex gap-4 items-center'>

              <NavLink to="/" className={({ isActive }) => 
                `text-white font-medium text-lg ${isActive ? "text-indigo-300" : "text-white"} hover:text-indigo-300`
              }>
                Home
              </NavLink>
              <NavLink to="/register" className={({ isActive }) => 
                `text-white font-medium text-lg ${isActive ? "text-indigo-300" : "text-white"} hover:text-indigo-300`
              }>
                Regsiter
              </NavLink>


            </ul>
          </nav>

        </div>

      </header>
    </>
  )
}

export default Header