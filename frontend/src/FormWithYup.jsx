import React from 'react'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from 'react-hook-form';

const FormWithYup = () => {

  const schema = yup.object({
    firstName: yup
      .string()
      .required("First Name is requried"),
    lastName: yup
      .string()
      .required('Last Name is reqeuired'),

    email: yup.string().email().required('Email is required'),
    // age:yup.number().integer().min(18).max(80).required("Age is requrired"),
    password: yup.string().min(8).max(15)
      .required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "Password doesnt match")
      .required("confirm Password is required"),

    gender: yup.string()
      .oneOf(["male", "female", "others"], "Please select valid genders").
      required("Please select your gender"),

    hobbies: yup.array()
      .of(yup.string()) //defines the schema or types for each array
      .min(1, "Please select at least one hobby"),

    countries: yup.string().min(1, "Select at least one country"),

    bio:yup
    .string()
    .min(10,"Must be at least 10 characters")
    .max(200,"Cannot exceed 200 characters")

  });


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      hobbies: [],

    }
  });


  const onSubmit = async (data) => {

    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data)
      }, 2000)
    })

    console.log("form submitted successfully")
    console.log(data)

    setTimeout(() => {
      reset()//reset form after submitting
    }, 1000)

  }


  return (
    <>
      <div className='min-h-screen bg-gray-50 flex justify-center items-center py-6'>

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
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
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
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 outline-0 ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
              />

              {errors.lastName && (
                <p className='text-red-600'>{errors.lastName.message}</p>
              )}
            </div>

            {/* email field */}
            <div className='w-full'>
              <label htmlFor="email"
                className='block text-md font-medium text-gray-700 mb-2'
              >Email
              </label>

              <input
                {...register("email")}
                type="email"
                placeholder='someone@gmail.com'
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 outline-0 ${errors.lastName ? "border-red-500" : "border-gray-300"}`}

              />
              {errors.email && (
                <p className='text-red-600'>{errors.email.message}</p>
              )}

            </div>

            {/* password field */}
            <div className='w-full'>
              <label htmlFor="password"
                className='block text-md font-medium text-gray-700 mb-2'
              >Password
              </label>

              <input
                {...register("password")}
                type="password"
                placeholder='Enter password'
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 outline-0 ${errors.password ? "border-red-500" : "border-gray-300"}`}

              />
              {errors.password && (
                <p className='text-red-600'>{errors.password.message}</p>
              )}

            </div>

            {/* confirm password field */}

            <div className='w-full'>
              <label htmlFor="confirmPassword"
                className='block text-md font-medium text-gray-700 mb-2'>
                Confirm Password
              </label>

              <input
                {...register("confirmPassword")}
                type="password"
                placeholder='Enter ConfirmPassword'
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 outline-0 ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
              />

              {errors.confirmPassword && (
                <p className='text-red-600'>{errors.confirmPassword.message}</p>
              )}

            </div>


            {/*  Gender Section*/}
            <div className='w-full'>
              <label htmlFor="gender" className='block text-md text-gray-700 mb-2 font-medium'>Gender</label>

              <div className='flex gap-2 items-center text-md'>
                <input type="radio" {...register("gender")} value="male" /> Male
                <input type="radio" {...register("gender")} value="female" /> Female
                <input type="radio" {...register("gender")} value="others" /> Others

              </div>

              {errors.gender && (
                <p className='text-red-600'>{errors.gender.message}</p>
              )}
            </div>


            {/* hobby field */}
            <div className='w-full'>

              <label htmlFor="hobbies" className='block text-md text-gray-700 mb-2 font-medium'>Hobbies</label>

              <div className='flex gap-2 item-center flex-wrap text-md'>

                <input
                  {...register("hobbies")}
                  type="checkbox"
                  value="reading"
                />Reading

                <input
                  {...register("hobbies")}
                  type="checkbox"
                  value="sports"
                />Sports

                <input
                  {...register("hobbies")}
                  type="checkbox"
                  value="music"
                />Music

                <input
                  {...register("hobbies")}
                  type="checkbox"
                  value="travel"
                />Travel

                <input
                  {...register("hobbies")}
                  type="checkbox"
                  value="gaming"
                />Gaming

              </div>

              {errors.hobbies && (
                <p className='text-red-600'>{errors.hobbies.message}</p>
              )}

            </div>

            {/* country field */}
            <div className='w-full'>
              <label htmlFor="countries"
                className='text-md text-gray-700 mb-2 font-medium'>
                Country
              </label>

              <select
                {...register("countries")}
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none ${errors.countries ? "border-red-600" : "border-gray-300"}`}
              >

                <option value="">Select a country:</option>
                <option value="nepal">Nepal</option>
                <option value="usa">USA</option>
                <option value="china">China</option>
                <option value="canada">Canada</option>
                <option value="korea">Korea</option>

              </select>
              {errors.countries && (
                <p className='text-red-600'>{errors.countries.message}</p>
              )}

            </div>

            {/*  Bio field*/}

            <div className='w-full'>
              <label htmlFor="bio"
                className='text-md font-medium text-gray-700 mb-2'>
                Bio
              </label>

              <textarea
                {...register("bio")}
                rows={5}
                placeholder='Tell us about yourself...'
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${errors.bio ? "border-red-500" : "border-gray-300"}`}
              ></textarea>
            {errors.bio && (
              <p className='text-red-600'>{errors.bio.message}</p>
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