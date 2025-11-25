import React, { useEffect } from 'react'
import * as yup from "yup"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import { updateUser } from '../features/users/userSlice'


const EditModal = ({ open, close, editUsers }) => {

  const editSchema = yup.object({
    firstName: yup.string().required("First Name is required").min(2, "Must be at least 2 characters"),

    lastName: yup.string().required("Last Name is required").min(2, "Must be at least 2 characters"),

    email: yup.string().email("Invalid email format").required("Email is required"),

    password: yup.string().required("Password is required").min(8, "Password must be at lest 8 characters").max(15, "Password cannot exceed 15 characters"),

    address: yup.string().required("Address is required").min(10, "Must be at least 10 characters").max(100, "Cannot exceed 100 characters"),
  })

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(editSchema, {
      defaultValues: editUsers
    })
  });

  const dispatch = useDispatch();
  useEffect(() => {
    reset(editUsers);
  }, [editUsers, reset]);


  if (!open) return null;

  const onSubmit = async (data) => {
    await new Promise((resolve,reject) =>{
      setTimeout(() =>{
        resolve(data)
        dispatch(updateUser(data))
      },2000)
    })

    alert("Form edited successfully")

    setTimeout(()=>{
      close();
    },1000)
  }

  return (
    <>
      <div className='fixed inset-0 bg-black/40 bg-opacity-40 flex justify-center items-center'>
        <div className='max-w-2xl w-full bg-white shadow-lg rounded-lg p-6'>

          <h2 className='text-2xl text-center mb-4'>Edit Users</h2>

          <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-4'>
            {/* First Name */}
            <div>
              <input
                {...register("firstName")}
                type='text'
                className="border p-2 w-full rounded-lg outline-none"
                placeholder="First Name"
              />
              <p className="text-red-500 text-sm">{errors.firstName?.message}</p>
            </div>

            {/* Last Name */}
            <div>
              <input
                {...register("lastName")}
                type='text'
                className="border p-2 w-full rounded-lg outline-none"
                placeholder="First Name"
              />
              <p className="text-red-500 text-sm">{errors.lastName?.message}</p>
            </div>

            {/* email */}
            <div>
              <input
                {...register("email")}
                type='email'
                className="border p-2 w-full rounded-lg outline-none"
                placeholder="First Name"
              />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>

            {/* password */}
            <div>
              <input
                {...register("password")}
                type='password'
                className="border p-2 w-full rounded-lg outline-none"
                placeholder="First Name"
              />
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>

            {/* address */}
            <div>
              <input
                {...register("address")}
                type='text'
                className="border p-2 w-full rounded-lg outline-none"
                placeholder="First Name"
              />
              <p className="text-red-500 text-sm">{errors.address?.message}</p>
            </div>

            {/* Submit */}
            <div className="flex items-center gap-3 mt-4">
              <button
                disabled={isSubmitting}
                type="submit"
                className="bg-blue-600 text-white px-5 py-2 rounded w-full"
              >
                {isSubmitting ? "Loading..." : "Edit"}
              </button>

              <button
                type="button"
                onClick={close}
                className="bg-gray-500 text-white px-5 py-2 rounded w-full"
              >
                Cancel
              </button>
            </div>


          </form>

        </div>

      </div>

    </>
  )
}

export default EditModal