// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { API_BASE_URL, ROLES } from '../../config';
// import { useDispatch } from 'react-redux';
// import { login } from '../../reducers/users';
// // import { login } from '../../reducers/user';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const apiPayload = {
//       email,
//       password,
//     };
//     try {
//       const response = await axios.post(`${API_BASE_URL}api/auth/login`, apiPayload);
//       if (response.status === 200) {
//         console.log('Login successful', response.data);

//         // Example: destructure the API response
//         const { _id, username, access_token } = response.data;

//         // Dispatch login to Redux
//         dispatch(
//           login({
//             id: _id,
//             name: username,
//             role: ROLES.ADMIN, // assume admin for now
//             email_id: email,
//             access_token: access_token,
//             is_logged_in: true,
//           })
//         );

//         navigate('/dashboard');
//       }
//     } catch (error) {
//       console.error('Login failed', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex flex-col justify-center px-6 py-12 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <img className="mx-auto h-24 w-auto" src="assets/logo.png" alt="Your Company" />
//         <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
//           Sign in to your account
//         </h2>
//       </div>
//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email address
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                 />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="current-password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                 />
//               </div>
//             </div>
//             <div>
//               <button
//                 type="submit"
//                 className="w-full flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//               >
//                 Sign in
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL, ROLES } from "../../config";
import { useDispatch } from "react-redux";
import { login } from "../../reducers/users";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const apiPayload = { email, password };
      const response = await axios.post(
        `${API_BASE_URL}api/auth/login`,
        apiPayload
      );

      if (response.status === 200) {
        console.log("Login successful", response.data);

        const { _id, username, access_token } = response.data;

        // ✅ Save in Redux store
        dispatch(
          login({
            id: _id,
            name: username,
            role: ROLES.ADMIN, // You can dynamically set role if API provides it
            email_id: email,
            access_token: access_token,
            is_logged_in: true,
          })
        );

        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login failed", err);
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl backdrop-blur-sm">
          {/* Header Section */}
          <div className="px-8 pt-8 pb-6 text-center">
            <div className="mb-6">
              <div className="mx-auto h-32 w-32 flex items-center justify-center">
                {/* <span className="text-white text-2xl font-bold">L</span> */}
                <img src="assets/logo.png" alt="Your Company" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400 text-sm">Sign in to your account</p>
          </div>

          {/* Form */}
          <form className="px-8 pb-8" onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg !text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-600"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 rounded-lg !text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-600"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && <p className="text-red-500 text-sm">{error}</p>}

              {/* Forgot Password */}
              {/* <div className="flex justify-end">
                <button type="button" className="text-sm text-blue-400 hover:text-blue-300">
                  Forgot your password?
                </button>
              </div> */}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                } text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              >
                <span className="text-white">
                  {loading ? "Signing In..." : "Sign In"}
                </span>
              </button>
            </div>

            {/* Footer */}
            {/* <div className="mt-8 pt-6 border-t border-gray-800 text-center">
              <p className="text-gray-400 text-sm">
                Don't have an account?{" "}
                <button className="text-blue-400 hover:text-blue-300 font-medium">
                  Sign up
                </button>
              </p>
            </div> */}
          </form>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-xs">
            Protected by advanced security measures
          </p>
        </div>
      </div>
    </div>
  );
}
