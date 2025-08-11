import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const RegisterPage = () => {
  const [role, setRole] = useState("customer");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-[#c7d2fe] to-[#a5b4fc] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h5 className="text-indigo-100 text-lg font-medium">
                  Join Us Today!
                </h5>
                <h3 className="text-white text-2xl font-bold mt-1">
                  PR ADVISORS
                </h3>
              </div>
              <div className="w-20">
                <img
                  src="https://pradvisors.reachassuree.com/assets/images/profile-img.png"
                  alt="Profile"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-6">
            <form className="space-y-4" onSubmit={handleRegistration}>
              {/* Role */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Role
                </label>
                <select
                  id="role"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                <option value="admin">Admin</option>
                  <option value="customer">Customer</option>
                </select>
              </div>

              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter username"
                  autoComplete="off"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                {errors.username && (
                  <small className="text-red-500">{errors.username}</small>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full px-3 py-2 border  rounded-md focus:ring-2 "
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {errors.password && (
                  <small className="text-red-500">{errors.password}</small>
                )}
              </div>

              {/* Success Message */}
              {success && (
                <div className="text-green-700">Registration Successful!</div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 px-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                    Please wait...
                  </>
                ) : (
                  "Register"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
