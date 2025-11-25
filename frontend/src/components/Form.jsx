import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import { addUser } from '../features/users/userSlice.js';

const Form = () => {

  const schema = yup.object({
    firstName: yup.string().required("First Name is required").min(2, "Must be at least 2 characters"),

    lastName: yup.string().required("Last Name is required").min(2, "Must be at least 2 characters"),

    email: yup.string().email("Invalid email format").required("Email is required"),

    password: yup.string().required("Password is required").min(8, "Password must be at lest 8 characters").max(15, "Password cannot exceed 15 characters"),

    confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords does not match").required("Confirm Password is required"),

    phone: yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits").required("Phone number is required"),

    address: yup.string().required("Address is required").min(10, "Must be at least 10 characters").max(100, "Cannot exceed 100 characters"),

    dateofbirth: yup.string().required("Date of Birth is required")
    .test("valid-date", "Please enter a valid date", (value) =>{
      if(!value) return false; // if no value is provided, it's invalid
      const date = new Date(value);
      return !isNaN(date.getTime());
    })
    .test("future-date", "Date of Birth cannot be in the future", (value) => {
      if(!value) return true; // if no value, other validations will catch it
      const today = new Date();
      const date = new Date (value);
      return date <= today;
    }),

    gender: yup.string().oneOf(["male", "female", "others"], "Please select at least one gender").required("Gender is required"),

    course: yup.string().required("Please select a course"),

    studylevel: yup.array().of(yup.string()).min(1, "Please select at least one study level"),

    bio: yup.string().required("Bio is required").min(10, "Must be at least 10 characters").max(200, "Cannot exceed 200 characters"),

  });

  const {

    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },

  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      studylevel: [],
    }
  })

  const dispatch = useDispatch();

  // submit funtion 
  const onSubmit = async (data) => {
    // to wait for 2 seconds simulating an async operation
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data)
        dispatch(addUser(data))
      }, 2000)
    })

    console.log("data of the form is :", data);
    alert("Form submitted successfully!")

    setTimeout(() => {
      reset() //reset the fields after one second
    }, 1000)
  }

  return (
    <>
      <div className='min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex justify-center items-center py-10 px-4'>

        <div className='max-w-2xl w-full'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='bg-white rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-200'>
            {/* =============== Form Heading ============ */}
            <div className='text-center mb-8'>
              <h2 className='text-3xl font-bold text-gray-800'>Student Registration Form</h2>
              <p className='text-gray-600 mt-2'>Please fill in all the required details</p>
            </div>

            {/* ========= Inner Container ========= */}
            <div className='space-y-6'>
              {/* ======= First Name and Last Name ======= */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* ============= First Name Field ================= */}
                <div>
                  <label className='font-medium text-sm block text-gray-700 mb-2'>
                    First Name *
                  </label>
                  <input
                    {...register("firstName")}
                    type="text"
                    placeholder='Enter First Name...'
                    className={`w-full border px-4 py-3 border-gray-600 rounded-lg outline-0 transition-all  duration-200 ${errors.firstName ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"}`}
                  />
                  {/* ====== show error if there is any ======= */}
                  <p className='text-red-600 text-sm mt-1'>{errors.firstName?.message}</p>
                </div>

                {/* ============ Last Name field ======== */}

                <div>
                  <label className='font-medium text-sm block text-gray-700 mb-2'>
                    Last Name *
                  </label>
                  <input
                    {...register("lastName")}
                    type="text"
                    placeholder='Enter last Name...'
                    className={`w-full border px-4 py-3 border-gray-600 rounded-lg outline-0 transition-all duration-200 ${errors.lastName ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"}`}
                  />
                  <p className='text-red-500 text-sm mt-1'>{errors.lastName?.message}</p>
                </div>
              </div>


              {/* ======== Email and phone ======= */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Email *
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder='student@example.com'
                    className={`w-full border px-4 py-3 border-gray-600 rounded-lg outline-0 transition-all  duration-200 ${errors.email ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"}`}
                  />
                  {/* ====== show error if there is any ======= */}
                  <p className='text-red-600 text-sm mt-1'>{errors.email?.message}</p>
                </div>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Phone Number *
                  </label>
                  <input
                    {...register("phone")}
                    type="phone"
                    placeholder='98XXXXXXXX'
                    className={`w-full border px-4 py-3 border-gray-600 rounded-lg outline-0 transition-all  duration-200 ${errors.phone ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"}`}
                  />
                  <p className='text-red-600 text-sm mt-1'>{errors.phone?.message}</p>
                </div>

              </div>

              {/* ======= Password and Confirm Password ======= */}

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Password *
                  </label>
                  <input
                    {...register("password")}
                    type="password"
                    placeholder='Enter password'
                    className={`w-full border px-4 py-3 border-gray-600 rounded-lg outline-0 transition-all  duration-200 ${errors.phone ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"}`}
                  />
                  {/* ====== show error if there is any ======= */}
                  <p className='text-red-600 text-sm mt-1'>{errors.password?.message}</p>
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Confirm Password *
                  </label>
                  <input
                    {...register("confirmPassword")}
                    type="password"
                    placeholder='Confirm your password'
                    className={`w-full border px-4 py-3 border-gray-600 rounded-lg outline-0 transition-all  duration-200 ${errors.phone ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"}`}
                  />
                  <p className='text-red-600 text-sm mt-1'>{errors.confirmPassword?.message}</p>
                </div>

              </div>

              {/* ======= Address Field ======= */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Address *
                </label>
                <input
                  {...register("address")}
                  type="text"
                  placeholder='Enter your complete address'
                  className={`w-full border px-4 py-3 border-gray-600 rounded-lg outline-0 transition-all  duration-200 ${errors.phone ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"}`}
                />

                <p className='text-red-600 text-sm mt-1'>{errors.address?.message}</p>
              </div>

              {/* ======= Gender and DOB ======= */}

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* ======= Gender ======= */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Gender *
                  </label>

                  <div className='flex gap-6'>
                    {[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                      { value: "others", label: "Others" },
                    ].map((option, index) => (
                      <label key={index} className='flex items-center gap-2'>
                        <input
                          {...register("gender")}
                          type="radio"
                          value={option.value}
                          className='text-blue-600 focus:ring-blue-500'
                        />
                        {option.label}

                      </label>
                    ))
                    }

                  </div>
                  <p className='text-red-600 text-sm mt-1'>{errors.gender?.message}</p>

                </div>

                {/* ======= DOB ======= */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Date of Birth *
                  </label>
                  <input
                    {...register("dateofbirth")}
                    type="date"
                    className={`w-full border px-4 py-3 border-gray-600 rounded-lg outline-0 transition-all  duration-200 ${errors.phone ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"}`}
                  />

                  <p className='text-red-600 text-sm mt-1'>{errors.dateofbirth?.message}</p>
                </div>

              </div>

              {/* =========== Course selection  ============= */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Select Course *
                </label>
                <select
                  {...register("course")}
                  className='w-full border px-4 py-3 border-gray-600 rounded-lg outline-0 transition-all  duration-200'>
                  <option value="">-- Select a course --</option>
                  <option value="bca">BCA</option>
                  <option value="bsc-it">BSc IT</option>
                  <option value="btech">B.Tech</option>
                  <option value="mca">MCA</option>
                  <option value="msc-it">MSc IT</option>
                </select>

                <p className='text-red-600 text-sm mt-1'>{errors.course?.message}</p>
              </div>

              {/* ============ Study level=========== */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Study level *
                </label>

                <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                  {[
                    { value: "undergraduate", label: "Undergraduate" },
                    { value: "postgraduate", label: "Postgraduate" },
                    { value: "phd", label: "PhD" },
                    { value: "diploma", label: "Diploma" },
                    { value: "certificate", label: "Certificate" },
                  ].map((level, index) => (
                    <label key={index} className='flex items-center gap-2'>
                      <input
                        {...register("studylevel")}
                        type="checkbox"
                        value={level.value}
                        className='text-blue-600 focus:ring-blue-500'
                      />
                      <span className="text-sm text-gray-700">{level.label}</span>
                    </label>
                  ))
                  }

                </div>

                <p className='text-red-600 text-sm mt-1'>{errors.studylevel?.message}</p>
              </div>

              {/* ======== Bio/Student Info ============= */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Bio / Student Info *
                </label>
                <textarea
                  {...register("bio")}
                  rows="5"
                  placeholder='Write something about yourself...'
                  className={`w-full resize-none border px-4 py-3 border-gray-600 rounded-lg outline-0 transition-all  duration-200 ${errors.phone ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"}`}
                ></textarea>

                <p className='text-red-500 text-sm mt-1'>{errors.bio?.message}</p>
              </div>

              {/* =========== Submit Button ============= */}

              <div className='pt-4'>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? "Submitting...." : "Register Now"}
                </button>
              </div>

            </div>

          </form>
        </div >
      </div >

    </>
  )
}

export default Form