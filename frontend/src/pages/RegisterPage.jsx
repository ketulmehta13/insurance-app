// import React, { useState } from "react";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSpinner } from "@fortawesome/free-solid-svg-icons";

// const RegisterPage = () => {
//   const [role, setRole] = useState("customer");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleRegistration = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrors({});
//     setSuccess(false);

//     const userData = { username, password, role };

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/v1/register/",
//         userData
//       );
//       console.log("Registration successful", response.data);
//       setSuccess(true);
//       setUsername("");
//       setPassword("");
//     } catch (error) {
//       setErrors(error.response?.data || {});
//       console.error("Registration error: ", error.response?.data);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-[#c7d2fe] to-[#a5b4fc] flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white rounded-lg shadow-xl overflow-hidden">
//           {/* Header */}
//           <div className="bg-indigo-600 p-6">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h5 className="text-indigo-100 text-lg font-medium">
//                   Join Us Today!
//                 </h5>
//                 <h3 className="text-white text-2xl font-bold mt-1">
//                   PR ADVISORS
//                 </h3>
//               </div>
//               <div className="w-20">
//                 <img
//                   src="https://pradvisors.reachassuree.com/assets/images/profile-img.png"
//                   alt="Profile"
//                   className="w-full h-auto"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Form */}
//           <div className="p-6">
//             <form className="space-y-4" onSubmit={handleRegistration}>
//               {/* Role */}
//               <div>
//                 <label
//                   htmlFor="role"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Select Role
//                 </label>
//                 <select
//                   id="role"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2"
//                   value={role}
//                   onChange={(e) => setRole(e.target.value)}
//                   required
//                 >
//                 <option value="admin">Admin</option>
//                   <option value="customer">Customer</option>
//                 </select>
//               </div>

//               {/* Username */}
//               <div>
//                 <label
//                   htmlFor="username"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Username
//                 </label>
//                 <input
//                   type="text"
//                   id="username"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="Enter username"
//                   autoComplete="off"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   required
//                 />
//                 {errors.username && (
//                   <small className="text-red-500">{errors.username}</small>
//                 )}
//               </div>

//               {/* Password */}
//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Password
//                 </label>
//                 <input
//                   id="password"
//                   type="password"
//                   className="w-full px-3 py-2 border  rounded-md focus:ring-2 "
//                   placeholder="Enter password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 {errors.password && (
//                   <small className="text-red-500">{errors.password}</small>
//                 )}
//               </div>

//               {/* Success Message */}
//               {success && (
//                 <div className="text-green-700">Registration Successful!</div>
//               )}

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="w-full py-2 px-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <>
//                     <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
//                     Please wait...
//                   </>
//                 ) : (
//                   "Register"
//                 )}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;


import React, { useState } from "react";
import axios from "axios";
import { Loader2, Eye, EyeOff, User, Lock, UserCheck, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [role, setRole] = useState("customer");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccess(false);

    const userData = { username, password, role };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/register/",
        userData
      );
      console.log("Registration successful", response.data);
      setSuccess(true);
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrors(error.response?.data || {});
      console.error("Registration error: ", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cyan-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4 pt-20 transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-r from-cyan-600 to-slate-700 dark:from-cyan-700 dark:to-slate-800 p-6"
        >
          <div className="flex justify-between items-start">
            <div>
              <motion.h5
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-cyan-100 text-base font-medium"
              >
                Join Us Today!
              </motion.h5>
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white text-xl font-bold mt-1"
              >
                <span className="text-cyan-200">PR-Advisor</span>
              </motion.h3>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.5 }}
              className="w-16"
            >
              <img
                src="https://pradvisors.reachassuree.com/assets/images/profile-img.png"
                alt="Profile"
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-6"
        >
          <form className="space-y-4" onSubmit={handleRegistration}>
            {/* Role Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label
                htmlFor="role"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
              >
                Select Role
              </label>
              <div className="relative">
                <UserCheck className="absolute left-3 top-2.5 text-slate-400 dark:text-slate-500" size={16} />
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="admin">Admin</option>
                  <option value="customer">Customer</option>
                </select>
              </div>
            </motion.div>

            {/* Username */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
              >
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 text-slate-400 dark:text-slate-500" size={16} />
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter username"
                  autoComplete="off"
                  required
                />
              </div>
              {errors.username && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1"
                >
                  <small className="text-red-500 text-xs">{errors.username}</small>
                </motion.div>
              )}
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-slate-400 dark:text-slate-500" size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1"
                >
                  <small className="text-red-500 text-xs">{errors.password}</small>
                </motion.div>
              )}
            </motion.div>

            {/* Success Message */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2"
                >
                  <CheckCircle size={16} className="text-green-600 dark:text-green-400" />
                  <p className="text-green-600 dark:text-green-400 text-sm font-medium">
                    Registration Successful!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* General Error */}
            <AnimatePresence>
              {errors.non_field_errors && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                >
                  <p className="text-red-600 dark:text-red-400 text-sm">
                    {errors.non_field_errors}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                loading
                  ? "bg-slate-200 dark:bg-slate-700 text-slate-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyan-600 to-slate-700 hover:from-cyan-700 hover:to-slate-800 text-white shadow-md hover:shadow-lg"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Please wait...
                </>
              ) : (
                <>
                  <UserCheck size={16} />
                  Register
                </>
              )}
            </motion.button>

            {/* Login Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center pt-4 border-t border-slate-200 dark:border-slate-700"
            >
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 font-semibold hover:underline transition-colors duration-200"
                >
                  Sign in here
                </Link>
              </p>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;

