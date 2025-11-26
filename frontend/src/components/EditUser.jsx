import React, { useEffect } from 'react';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, getUserById } from '../features/users/userSlice';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
  const editSchema = yup.object({
    firstName: yup.string().required("First Name is required").min(2, "Must be at least 2 characters"),
    lastName: yup.string().required("Last Name is required").min(2, "Must be at least 2 characters"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters").max(15, "Cannot exceed 15 characters"),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords do not match").required("Confirm Password is required"),
    phone: yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
    address: yup.string().required("Address is required").min(10, "Must be at least 10 characters").max(100, "Cannot exceed 100 characters"),
    dateofbirth: yup.string()
      .required("Date of Birth is required")
      .test("valid-date", "Please enter a valid date", value => !value ? false : !isNaN(new Date(value).getTime()))
      .test("future-date", "Date of Birth cannot be in the future", value => !value ? true : new Date(value) <= new Date()),
    gender: yup.string().oneOf(["male", "female", "others"], "Please select a gender").required("Gender is required"),
    course: yup.string().required("Please select a course"),
    studylevel: yup.array().of(yup.string()).min(1, "Please select at least one study level"),
    bio: yup.string().required("Bio is required").min(10, "Must be at least 10 characters").max(200, "Cannot exceed 200 characters"),
  });
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();
  // const userId = location.state?.userId;

  const users = useSelector(state => state.users.users);
  const editUsers = users.find(user => user.id === userId)

  // const editUsers = users.find((u) => u.id === userId)

  const { register, reset, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(editSchema),
    defaultValues: editUsers || { studylevel: [] }
  });



  useEffect(() => {
    if (editUsers) {
      reset(editUsers);
    }
  }, [editUsers, reset]);

  const onSubmit = async (data) => {
    try {
      // Include the user ID in the data
      const userDataWithId = { ...data, id: userId };

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(userDataWithId);
          dispatch(updateUser(userDataWithId));
        }, 2000);
      });

      alert("User updated successfully!");
      navigate("/displayUser");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-start py-10 px-4">
      <div className="max-w-3xl w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Edit User</h2>

          {/* First & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
              <input {...register("firstName")} placeholder="First Name" className={`w-full border px-4 py-3 rounded-lg outline-none transition duration-200 ${errors.firstName ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"}`} />
              <p className="text-red-500 text-sm mt-1">{errors.firstName?.message}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
              <input {...register("lastName")} placeholder="Last Name" className={`w-full border px-4 py-3 rounded-lg outline-none transition duration-200 ${errors.lastName ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"}`} />
              <p className="text-red-500 text-sm mt-1">{errors.lastName?.message}</p>
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input {...register("email")} type="email" placeholder="Email" className={`w-full border px-4 py-3 rounded-lg outline-none transition duration-200 ${errors.email ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"}`} />
              <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input {...register("phone")} type="tel" placeholder="10-digit phone" className={`w-full border px-4 py-3 rounded-lg outline-none transition duration-200 ${errors.phone ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"}`} />
              <p className="text-red-500 text-sm mt-1">{errors.phone?.message}</p>
            </div>
          </div>

          {/* Password & Confirm */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
              <input {...register("password")} type="password" placeholder="Password" className={`w-full border px-4 py-3 rounded-lg outline-none transition duration-200 ${errors.password ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"}`} />
              <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
              <input {...register("confirmPassword")} type="password" placeholder="Confirm Password" className={`w-full border px-4 py-3 rounded-lg outline-none transition duration-200 ${errors.confirmPassword ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"}`} />
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword?.message}</p>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
            <input {...register("address")} placeholder="Address" className={`w-full border px-4 py-3 rounded-lg outline-none transition duration-200 ${errors.address ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"}`} />
            <p className="text-red-500 text-sm mt-1">{errors.address?.message}</p>
          </div>

          {/* Gender & DOB */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
              <div className="flex gap-6">
                {["male", "female", "others"].map(g => (
                  <label key={g} className="flex items-center gap-2">
                    <input {...register("gender")} type="radio" value={g} className="text-blue-600 focus:ring-blue-500" />
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </label>
                ))}
              </div>
              <p className="text-red-500 text-sm mt-1">{errors.gender?.message}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
              <input {...register("dateofbirth")} type="date" className={`w-full border px-4 py-3 rounded-lg outline-none transition duration-200 ${errors.dateofbirth ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"}`} />
              <p className="text-red-500 text-sm mt-1">{errors.dateofbirth?.message}</p>
            </div>
          </div>

          {/* Course & Study Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course *</label>
            <select {...register("course")} className="w-full border px-4 py-3 rounded-lg outline-none transition duration-200 border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500">
              <option value="">-- Select --</option>
              <option value="bca">BCA</option>
              <option value="bsc-it">BSc IT</option>
              <option value="btech">B.Tech</option>
              <option value="mca">MCA</option>
              <option value="msc-it">MSc IT</option>
            </select>
            <p className="text-red-500 text-sm mt-1">{errors.course?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Study Level *</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["undergraduate", "postgraduate", "phd", "diploma", "certificate"].map(level => (
                <label key={level} className="flex items-center gap-2">
                  <input {...register("studylevel")} type="checkbox" value={level} className="text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-gray-700">{level.charAt(0).toUpperCase() + level.slice(1)}</span>
                </label>
              ))}
            </div>
            <p className="text-red-500 text-sm mt-1">{errors.studylevel?.message}</p>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio *</label>
            <textarea {...register("bio")} rows="4" placeholder="Write something about user..." className={`w-full border px-4 py-3 rounded-lg outline-none transition duration-200 ${errors.bio ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"}`}></textarea>
            <p className="text-red-500 text-sm mt-1">{errors.bio?.message}</p>
          </div>

          {/* Submit Button */}
          <div>
            <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-200 shadow-lg hover:shadow-xl">
              {isSubmitting ? "Updating..." : "Update User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
