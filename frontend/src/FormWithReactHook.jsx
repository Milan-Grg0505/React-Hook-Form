
import { useForm } from 'react-hook-form'

const FormWithReactHook = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({});


  const onSubmit = (data) => {
    console.log("form submitted successfully")
    console.log(data)

    reset()//reset form after submitting

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
                ...register("lastName", {
                  required: "Last Name is required",
                })
                }
                type="text"
                placeholder='Last Name'
                className={`w-full border border-gray-300 rouded-lg px-3 py-2 ouline-0 ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
              />

              {errors.lastName && (
                <p className='text-red-600'>{errors.lastName.message}</p>
              )}
            </div>


            {/* email section */}

            <div className='w-full'>
              <label htmlFor="email"
                className='block text-md text-gray-600 font-medium mb-2'>
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
                className={`w-full border border-gray-300 rouded-lg px-3 py-2 ouline-0 ${errors.email ? "border-red-500" : "border-gray-300"}`}

              />

              <p className='text-red-600'>{errors.email?.message}</p>

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