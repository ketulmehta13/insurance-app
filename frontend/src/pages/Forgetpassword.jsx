import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';


const ForgotPassword = () => {
  const location = useLocation();
  const userType = location.state?.userType || 'agent';
  const [activeMethod, setActiveMethod] = useState(userType === 'customer' ? 'sms' : 'email');
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-[#c7d2fe] to-[#a5b4fc] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-indigo-600 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-white text-2xl font-bold">Reset Password</h3>
                
              </div>
              <div className="flex items-center">
                <Link 
                  to="/login" 
                  className="text-indigo-100 hover:text-white text-sm flex items-center"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 mr-1" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  BACK TO LOGIN
                </Link>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-6 pt-4">
            <div className="flex border-b border-gray-200">
              <button
                className={`py-2 px-4 font-medium text-sm w-1/2 ${activeMethod === 'email' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
                onClick={() => setActiveMethod('email')}
              >
                {userType === 'customer' ? 'Email' : 'Agent Email'}
              </button>
              <button
                className={`py-2 px-4 font-medium text-sm w-1/2 ${activeMethod === 'sms' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
                onClick={() => setActiveMethod('sms')}
              >
                {userType === 'customer' ? 'Mobile' : 'Agent Mobile'}
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeMethod === 'email' ? (
              <form className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {userType === 'customer' ? 'Customer Email' : 'Agent Email'}:
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder={`Enter ${userType === 'customer' ? 'customer' : 'agent'} email`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Send OTP
                </button>
              </form>
            ) : (
              <form className="space-y-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    {userType === 'customer' ? 'Customer Mobile' : 'Agent Mobile'}:
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder={`Enter ${userType === 'customer' ? 'customer' : 'agent'} mobile number`}
                    maxLength="10"
                    pattern="[0-9]{10}"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Send OTP
                </button>
                
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;