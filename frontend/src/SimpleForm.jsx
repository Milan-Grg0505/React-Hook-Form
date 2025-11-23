import React,{useState} from 'react'

const SimpleForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <>
      <div className='min-h-screen bg-gray-50 flex justify-center items-center'>

        <div className='max-w-md w-full'>
          <form
            onSubmit={handleSubmit}
            className='border border-gray-300 rounded-lg p-6 shadow-md flex flex-col gap-y-3'>
            <h2 className='text-center text-2xl font-bold'>Simple Form</h2>

            {/* first name */}
            <div className='w-full'>
              <label htmlFor="firstName"
                className='block text-md font-medium text-gray-700 mb-2'
              >First Name</label>
              <input
                type="text"
                placeholder='First Name'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                className='w-full border border-gray-300 rouded-lg px-3 py-2 ouline-0'
              />
              {errors.firstName && (
                <p className='text-red-600'>{errors.firstName}</p>
              )}
            </div>

            {/* last name */}

            <div className='w-full'>
              <label htmlFor="lastName"
                className='block text-md font-medium text-gray-700 mb-2'
              >Last Name</label>
              <input
                type="text"
                placeholder='Last Name'
                value={formData.lastName}
                name='lastName'
                onChange={handleChange}
                className='w-full border border-gray-300 rouded-lg px-3 py-2 ouline-0'
              />

              {errors.lastName && (
                <p className='text-red-600'>{errors.lastName}</p>
              )}
            </div>

            <button
              type='submit'
              className='inline-block bg-blue-600 text-white hover:bg-blue-700 transform transition-all ease-in duration-300 py-3 rounded-lg'
            >
              Submit
            </button>
          </form>

        </div>



      </div>
    </>
  )
}

export default SimpleForm