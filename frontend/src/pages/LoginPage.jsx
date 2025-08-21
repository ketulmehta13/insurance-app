// import React, { useState, useContext } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSpinner } from "@fortawesome/free-solid-svg-icons";
// import { AuthContext } from "../pages/AuthProvider";

// const LoginPage = () => {
//   const [role, setRole] = useState("agent");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { setIsLoggedIn, setUser } = useContext(AuthContext);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrors({});

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/v1/accounts/unified-login/",
//         { username, password, role }
//       );

//       // Ensure token exists
//       if (!response.data.access || !response.data.refresh) {
//         setErrors({
//           general: response.data.detail || "Invalid login response.",
//         });
//         setLoading(false);
//         return;
//       }

//       localStorage.setItem("accessToken", response.data.access);
//       localStorage.setItem("refreshToken", response.data.refresh);
//       const userData = {
//         username: response.data.username,
//         role: response.data.role,
//         email: response.data.email || "",
//       };

//       // Store user data in localStorage
//       localStorage.setItem("user", JSON.stringify(userData));

//       // Update context state
//       setUser(userData);

//       console.log("Login successful", response.data);
//       setIsLoggedIn(true);

//       const role1 = response.data.role;
//       if (role1 === "admin") {
//         navigate("/dashboard");
//       } else if (role1 === "agent") {
//         navigate("/agentdashboard");
//       } else if (role1 === "customer") {
//         navigate("/customerdashboard");
//       } else {
//         navigate("/login");
//       }
//     } catch (error) {
//       setErrors({
//         general:
//           error.response?.data?.detail ||
//           error.message ||
//           "Login failed. Check credentials.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-[#c7d2fe] to-[#a5b4fc] flex items-center justify-center p-4">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-xl">
//         {/* Header */}
//         <div className="bg-indigo-600 p-6">
//           <div className="flex justify-between items-start">
//             <div>
//               <h5 className="text-indigo-50 text-lg font-medium">
//                 Welcome Back!
//               </h5>
//               <h3 className="text-white text-2xl font-bold mt-1">
//                 PR ADVISORS
//               </h3>
//             </div>
//             <div className="w-20">
//               <img
//                 src="https://pradvisors.reachassuree.com/assets/images/profile-img.png"
//                 alt="Profile"
//                 className="w-full h-auto"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Login Form */}
//         <div className="p-6 pt-4">
//           <form className="space-y-4" onSubmit={handleLogin}>
//             <div>
//               <label
//                 htmlFor="role"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Select Role
//               </label>
//               <select
//                 id="role"
//                 value={role}
//                 onChange={(e) => setRole(e.target.value)}
//                 className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//               >
//                 <option value="admin">Admin</option>
//                 <option value="agent">Agent</option>
//                 <option value="customer">Customer</option>
//               </select>
//             </div>

//             <div>
//               <label
//                 htmlFor="username"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Username
//               </label>
//               <input
//                 type="text"
//                 id="username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//                 required
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//                 required
//               />
//             </div>

//             {errors.general && (
//               <div className="text-red-500 text-sm">{errors.general}</div>
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full py-2 rounded-md font-semibold transition ${
//                 loading
//                   ? "bg-gray-200 text-indigo-600"
//                   : "bg-indigo-600 text-white hover:bg-indigo-700"
//               }`}
//             >
//               {loading ? (
//                 <>
//                   <FontAwesomeIcon icon={faSpinner} spin /> Logging in...
//                 </>
//               ) : (
//                 "Login"
//               )}
//             </button>

//             <div className="text-center mt-3">
//               <Link
//                 to="/forgetpassword"
//                 className="text-indigo-800 hover:underline text-sm font-medium"
//               >
//                 Forgot your password?
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Loader2, Eye, EyeOff, User, Lock, UserCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../pages/AuthProvider";

const LoginPage = () => {
  const [role, setRole] = useState("agent");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/accounts/unified-login/",
        { username, password, role }
      );

      // Ensure token exists
      if (!response.data.access || !response.data.refresh) {
        setErrors({
          general: response.data.detail || "Invalid login response.",
        });
        setLoading(false);
        return;
      }

      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      const userData = {
        username: response.data.username,
        role: response.data.role,
        email: response.data.email || "",
      };

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      // Update context state
      setUser(userData);

      console.log("Login successful", response.data);
      setIsLoggedIn(true);

      const role1 = response.data.role;
      if (role1 === "admin") {
        navigate("/dashboard");
      } else if (role1 === "agent") {
        navigate("/agentdashboard");
      } else if (role1 === "customer") {
        navigate("/customerdashboard");
      } else {
        navigate("/login");
      }
    } catch (error) {
      setErrors({
        general:
          error.response?.data?.detail ||
          error.message ||
          "Login failed. Check credentials.",
      });
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
                Welcome Back!
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

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-6"
        >
          <form className="space-y-4" onSubmit={handleLogin}>
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
                <UserCheck
                  className="absolute left-3 top-2.5 text-slate-400 dark:text-slate-500"
                  size={16}
                />
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="admin">Admin</option>
                  <option value="agent">Agent</option>
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
                <User
                  className="absolute left-3 top-2.5 text-slate-400 dark:text-slate-500"
                  size={16}
                />
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your username"
                  required
                />
              </div>
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
                <Lock
                  className="absolute left-3 top-2.5 text-slate-400 dark:text-slate-500"
                  size={16}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
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
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
              {errors.general && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                >
                  <p className="text-red-600 dark:text-red-400 text-sm">
                    {errors.general}
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
                  Logging in...
                </>
              ) : (
                "Login"
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
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 font-semibold hover:underline transition-colors duration-200"
                >
                 Register
                </Link>
              </p>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
