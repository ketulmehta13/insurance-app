import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../pages/AuthProvider";

const LoginPage = () => {
  const [role, setRole] = useState("agent");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-[#c7d2fe] to-[#a5b4fc] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl">
        {/* Header */}
        <div className="bg-indigo-600 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h5 className="text-indigo-50 text-lg font-medium">
                Welcome Back!
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

        {/* Login Form */}
        <div className="p-6 pt-4">
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              >
                <option value="admin">Admin</option>
                <option value="agent">Agent</option>
                <option value="customer">Customer</option>
              </select>
            </div>

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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {errors.general && (
              <div className="text-red-500 text-sm">{errors.general}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md font-semibold transition ${
                loading
                  ? "bg-gray-200 text-indigo-600"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {loading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin /> Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>

            <div className="text-center mt-3">
              <Link
                to="/forgetpassword"
                className="text-indigo-800 hover:underline text-sm font-medium"
              >
                Forgot your password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
