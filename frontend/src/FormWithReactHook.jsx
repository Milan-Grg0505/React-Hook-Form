
import { useForm } from 'react-hook-form'

const FormWithReactHook = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting }
  } = ujseForm({});


  const onSubmit = async (data) => {

    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data)
      }, [2000])
    })

    console.log("form submitted successfully")
    console.log(data)

    setTimeout(() => {
      reset()//reset form after submitting
    }, 1000)

  }
  return (
    <>
      <div className='min-h-screen bg-gray-50 flex justify-center items-center'>

        <div className='max-w-md w-full'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='border border-gray-300 rounded-lg p-6 shadow-md flex flex-col gap-y-3'>
            <h2 className='text-center text-2xl font-bold'>React Hook Form</h2>

            {/* first name */}
            <div className='w-full'>
              <label htmlFor="firstName"
                className='block text-md font-medium text-gray-700 mb-2'
              >First Name</label>
              <input
                {...register("firstName", {
                  required: "First Name is required",
                  minLength: {
                    value: 2,
                    message: "First Name must be at least 2 characters"
                  }
                })}
                type="text"
                placeholder='First Name'
                className={`w-full border border-gray-300 rouded-lg px-3 py-2 rounded-lg outline-none ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
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
                ...register("lastName", {
                  required: "Last Name is required",
                })
                }
                type="text"
                placeholder='Last Name'
                className={`w-full border border-gray-300 rouded-lg px-3 py-2 outline-0 rounded-lg ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
              />

              {errors.lastName && (
                <p className='text-red-600'>{errors.lastName.message}</p>
              )}
            </div>


            {/* email section */}

            <div className='w-full'>
              <label htmlFor="email"
                className='block text-md text-gray-600 font-medium mb-2'>
                Email
              </label>

              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  },
                })}
                type="email"
                placeholder='Enter your email...'
                className={`w-full border border-gray-300 rouded-lg px-3 py-2 outline-0 rounded-lg ${errors.email ? "border-red-500" : "border-gray-300"}`}

              />

              <p className='text-red-600'>{errors.email?.message}</p>

            </div>


            {/* password section */}
            <div className='w-full'>
              <label
                htmlFor="lastName"
                className='block text-md font-medium text-gray-700 mb-2'
              >Password
              </label>

              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be up to 8 characters"
                  },
                  maxLength: {
                    value: 15,
                    message: "Password cannot exceed 15 characters"
                  }
                })}
                type="password"
                placeholder='Enter your password...'
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 outline-0 ${errors.password ? "border-red-500" : "border-gray-300"}`}
              />

              <p className='text-red-600'>{errors.password?.message}</p>

            </div>

            {/* confirm password section */}
            <div className='w-full'>

              <label
                htmlFor="confirmPassword"
                className='block text-md font-medium text-gray-700 mb-2'
              >Confirm Password
              </label>
              <input
                {
                ...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) => {
                    return value === getValues("password") || "Password doesnot match"
                  }

                })
                }
                type='password'
                placeholder='Confirm your password...'
                className={`w-full border border-gray-300 px-3 py-2 rounded-lg outline-0 ${errors.confirmPassword}`}
              />

              <p className='text-red-600'>{errors.confirmPassword?.message}</p>
            </div>

            {/* gender section */}
            <div className='w-full'>

              <label
                htmlFor="gender"
                className='block text-md font-medium text-gray-700 mb-2'
              >Gender
              </label>

              <div className="flex gap-4 items-center">
                {[{ value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "otherss", label: "Others" }
                ].map((option) => (
                  <label key={option.value} className='flex space-x-2 items-center'>

                    <input
                      {...register("gender", {
                        required: "Please select your gender"
                      })}
                      type="radio"
                      value={option.value}
                      className='text-blue-600 focus:ring-blue-500'
                    />
                    <span>{option.label}</span>

                  </label>
                ))}

              </div>
              <p className='text-red-600'>{errors.gender?.message}</p>
            </div>

            {/* skills section */}
            <div className="w-full">
              <label htmlFor="skills" className='text-md font-medium text-gray-600 mb-2'>
                Skills
              </label>

              {/* using array method to display checkbox of skills */}

              <div className='flex gap-4 items-center'>
                {[
                  { value: "node.js", label: "Node.js" },
                  { value: "react.js", label: "React.js" },
                  { value: "vue.js", label: "Vue.js" },
                  { value: "angular", label: "Angular" }
                ].map((option, index) => (
                  <label key={index} className='flex space-x-2 items-center'>

                    <input
                      {...register("skills", {
                        required: "Please select at least one skill"
                      })}
                      type="checkbox"
                      value={option.value}
                      className='text-blue-600 focus:ring-blue-500'
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>

              <p className='text-red-600'>{errors.skills?.message}</p>

            </div>

            {/* select country section */}

            <div className="w-full">
              <label htmlFor="country" className='text-md font-medium text-gray-600 mb-3'>
                Country
              </label>

              <select
              {...register("country",{
                required:"Please select your country"
              })}
              className={`w-full border border-gray-300  rounded-lg px-3 py-2 outline-0 ${errors.country ? "border-red-500":"border-gray-300"}`}
              >
                <option value="">Select your country</option>
                <option value="usa">USA</option>
                <option value="nepal">Nepal</option>
                <option value="china">China</option>
                <option value="korea">Korea</option>

              </select>

              <p className='text-red-600'>{errors.country?.message}</p>
            </div>

            {/* bio section */}

            <div className='w-full'>
              <label htmlFor="bio"
                className='block text-md font-medium text-gray-700 mb-2'
              >
                Bio
              </label>

              <textarea 
                {...register("bio",{
                  required:"Bio is required",
                  minLength:{
                    value:10,
                    message:"Bio must be at least 10 characters",
                  },
                  maxLength:{
                    value:200,
                    message:"Bio cannot exceed 200 characters"
                  }
                })}

                rows={5}
                className={`w-full resize-none border border-gray-300 rounded-lg px-3 py-2 outline-0 ${errors.bio ? "border-red-500":"border-gray-300"}`}
              />
              <p className='text-red-600'>{errors.bio?.message}</p>
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

export default FormWithReactHook