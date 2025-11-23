import React from 'react'
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup"
import { useForm } from 'react-hook-form';

const FormWithYup = () => {

  const schema = yup.object({
    firstName:yup
    .string()
    .required("First Name is requried"),
    lastName:yup
    .string()
    .required('Last Name is reqeuired'),

    // email:yup.string().email().required('Email is required'),
    // age:yup.number().integer().min(18).max(80).required("Age is requrired"),
    // password:yup.string().min(8).max(15).required('Password is required'),
    // confirmPassword:yup.string().oneOf([yup.ref("passsword"),null],"Password doesnt match")
    // .required("confirm Password is required")
  });

  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver:yupResolver(schema)
  });


  const onSubmit = async (data) => {

    await new Promise((resolve,reject) =>{
      setTimeout(() =>{
          resolve(data)
      },2000)
    })

    console.log("form submitted successfully")
    console.log(data)

    setTimeout(() =>{
      reset()//reset form after submitting
    },1000)

  }


  return (
    <>
      <div className='min-h-screen bg-gray-50 flex justify-center items-center'>

        <div className='max-w-md w-full'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='border border-gray-300 rounded-lg p-6 shadow-md flex flex-col gap-y-3'>
            <h2 className='text-center text-2xl font-bold'> Form Validation With Yup</h2>

            {/* first name */}
            <div className='w-full'>
              <label htmlFor="firstName"
                className='block text-md font-medium text-gray-700 mb-2'
              >First Name</label>
              <input
                {...register("firstName")}
                type="text"
                placeholder='First Name'
                className={`w-full border border-gray-300 rouded-lg px-3 py-2 ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.firstName && (
                <p className='text-red-600'>{errors.firstName.message}</p>
              )}
            </div>

            {/* last name */}

            <div className='w-full'>
              <label htmlFor="lastName"
                className='block text-md font-medium text-gray-700 mb-2'
              >Last Name</label>
              <input
                {
                ...register("lastName")
                }
                type="text"
                placeholder='Last Name'
                className={`w-full border border-gray-300 rouded-lg px-3 py-2 ouline-0 ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
              />

              {errors.lastName && (
                <p className='text-red-600'>{errors.lastName.message}</p>
              )}
            </div>

            {/* button to submit form */}
            <button
              type='submit'
              disabled={isSubmitting}
              className='inline-block bg-blue-600 text-white hover:bg-blue-700 transform transition-all ease-in duration-300 py-3 rounded-lg'
            >
              {isSubmitting ? "Loading..." : "Submit"}
            </button>
          </form>

        </div>



      </div>
    </>
  )
}

export default FormWithYup