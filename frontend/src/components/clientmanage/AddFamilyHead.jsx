

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AddFamilyHead = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
    group_type: "",
    address1: "",
    city: "",
    area: "",
    mobile_no: "",
    email: "",
    gender: "",
    dob: "",
    client_status: "",
    business_type: "",
    aadhar_no: "",
    marriage_status: "",
    joined_by: "",
  });

  // State for loading, messages, and dynamic dropdowns
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [cities, setCities] = useState(["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"]);
  const [areas, setAreas] = useState(["Area 1", "Area 2", "Area 3"]);
  const [showAddCity, setShowAddCity] = useState(false);
  const [showAddArea, setShowAddArea] = useState(false);
  const [newCity, setNewCity] = useState("");
  const [newArea, setNewArea] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (message) {
        setMessage("");
        setIsError(false);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addCity = () => {
    if (newCity.trim()) {
      const trimmedCity = newCity.trim();
      setCities((prev) => [...prev, trimmedCity]);
      setFormData((prev) => ({ ...prev, city: trimmedCity }));
      setNewCity("");
      setShowAddCity(false);
    }
  };

  const addArea = () => {
    if (newArea.trim()) {
      const trimmedArea = newArea.trim();
      setAreas((prev) => [...prev, trimmedArea]);
      setFormData((prev) => ({ ...prev, area: trimmedArea }));
      setNewArea("");
      setShowAddArea(false);
    }
  };

  const handleSubmit = async (e) => {
    // Prevent the form from causing a page reload
    e.preventDefault();
    
    // --- CRUCIAL DEBUGGING STEP ---
    // This will tell us if the function is being called at all.
    console.log("handleSubmit function triggered!");
    console.log("Form data being sent:", formData);

    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const response = await axios.post("http://127.0.0.1:8000/client/add-family-head/", formData);
      
      setMessage(response.data.message || "Family head saved successfully!");
      setIsError(false);
      
      setFormData({
        first_name: "", last_name: "", middle_name: "", group_type: "", address1: "",
        city: "", area: "", mobile_no: "", email: "", gender: "", dob: "",
        client_status: "", business_type: "", aadhar_no: "", marriage_status: "", joined_by: "",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

    } catch (error) {
      console.error("Submission failed:", error);
       if (error.response && error.response.data) {
        const errorMessages = Object.entries(error.response.data)
            .map(([key, value]) => `${key.replace(/_/g, ' ')}: ${Array.isArray(value) ? value.join(', ') : value}`)
            .join('; ');
        setMessage(`Submission failed: ${errorMessages}`);
      } else {
        setMessage(error.message || "An unexpected error occurred. Please try again.");
      }
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Add Family Head</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 border border-gray-200">
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {/* Personal Information Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3 mb-6">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input type="text" name="first_name" value={formData.first_name}
                      onChange={handleInputChange} required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
                    <input type="text" name="middle_name" value={formData.middle_name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input type="text" name="last_name" value={formData.last_name}
                      onChange={handleInputChange} required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                  </div>
                </div>
              </div>

              {/* Contact and Address Section */}
              <div>
                 <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3 mb-6">
                  Contact & Address
                </h2>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                        <textarea name="address1" value={formData.address1}
                        onChange={handleInputChange} rows="3" required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                            <div className="flex space-x-2">
                                <select name="city" value={formData.city} onChange={handleInputChange} required className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                                <option value="">Select City</option>
                                {cities.map((city, index) => (<option key={index} value={city}>{city}</option>))}
                                </select>
                                <button type="button" onClick={() => setShowAddCity(true)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Add
                                </button>
                            </div>
                            {showAddCity && (
                                <div className="mt-2 flex space-x-2 p-2 bg-gray-50 rounded-md">
                                <input type="text" value={newCity} onChange={(e) => setNewCity(e.target.value)} placeholder="Enter new city" className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                                <button type="button" onClick={addCity} className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">Save</button>
                                <button type="button" onClick={() => setShowAddCity(false)} className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors">Cancel</button>
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Area *</label>
                            <div className="flex space-x-2">
                                <select name="area" value={formData.area} onChange={handleInputChange} required className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                                <option value="">Select Area</option>
                                {areas.map((area, index) => (<option key={index} value={area}>{area}</option>))}
                                </select>
                                <button type="button" onClick={() => setShowAddArea(true)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Add
                                </button>
                            </div>
                            {showAddArea && (
                                <div className="mt-2 flex space-x-2 p-2 bg-gray-50 rounded-md">
                                <input type="text" value={newArea} onChange={(e) => setNewArea(e.target.value)} placeholder="Enter new area" className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                                <button type="button" onClick={addArea} className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">Save</button>
                                <button type="button" onClick={() => setShowAddArea(false)} className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors">Cancel</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                            <input type="tel" name="mobile_no" value={formData.mobile_no} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                        </div>
                    </div>
                </div>
              </div>

              {/* Additional Information Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3 mb-6">
                  Additional Information
                </h2>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                            <select name="gender" value={formData.gender} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                            <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Marriage Status *</label>
                            <select name="marriage_status" value={formData.marriage_status} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                                <option value="">Select Status</option>
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                                <option value="divorced">Divorced</option>
                                <option value="widowed">Widowed</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Card Number *</label>
                            <input type="text" name="aadhar_no" value={formData.aadhar_no} onChange={handleInputChange} placeholder="XXXX-XXXX-XXXX" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Group Type *</label>
                            <select name="group_type" value={formData.group_type} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                                <option value="">Select Group Type</option>
                                <option value="new">New</option>
                                <option value="existing">Existing</option>
                            </select>
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Business Type *</label>
                            <select name="business_type" value={formData.business_type} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                                <option value="">Select Business Type</option>
                                <option value="individual">Individual</option>
                                <option value="business">Business</option>
                                <option value="corporate">Corporate</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Client Status *</label>
                            <select name="client_status" value={formData.client_status} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                                <option value="">Select Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Pending">Pending</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Client Joined With Us By *</label>
                        <select name="joined_by" value={formData.joined_by} onChange={handleInputChange} required className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                            <option value="">Select Method</option>
                            <option value="referral">Referral</option>
                            <option value="online">Online</option>
                            <option value="agent">Agent</option>
                            <option value="advertisement">Advertisement</option>
                            <option value="walk-in">Walk-in</option>
                        </select>
                    </div>
                </div>
              </div>

              {/* Message Display */}
              {message && (
                <div className={`p-4 rounded-md text-center ${isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                  {message}
                </div>
              )}

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button type="button" onClick={() => navigate("/dashboard/clientmanage/ManageClients")}
                  disabled={loading}
                  className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-gray-400">
                  Cancel
                </button>
                <button type="submit" disabled={loading}
                  className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-400 disabled:cursor-not-allowed flex items-center">
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFamilyHead;
