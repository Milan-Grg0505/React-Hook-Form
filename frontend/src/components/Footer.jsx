import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <footer className='py-10 bg-black text-white'>
        <div className='max-w-3xl md:max-w-5xl lg:max-w-7xl mx-auto px-4 md:px-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

            <div>
              <h3 className='text-2xl text-white'>Logo</h3>
            </div>

            <div>
              <h2 className='mb-2 text-lg font-bold'>Links</h2>
              <ul className='flex flex-col gap-2'>
                <Link>Home</Link>
                <Link>Register</Link>
              </ul>
            </div>
            <div className='w-[300px]'>
              <input type="text" 
              placeholder='Enter your email'
              className='border bg-white rounded-lg px-2 py-3 outline-none text-black'/>
              <button className='bg-indigo-700 px-4 py-3 rounded-lg hover:bg-indigo-800 transition-all ease-in duration-300'>Submit</button>
            </div>

          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer