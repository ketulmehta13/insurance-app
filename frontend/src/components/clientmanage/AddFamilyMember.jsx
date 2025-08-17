"use client"
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AddFamilyMember = () => {
  const navigate = useNavigate();
  
  // State for the form data, using snake_case to match the Django model
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
    relation: "",
    mobile_no: "",
    whatsapp_no: "",
    email: "",
    gender: "",
    dob: "",
    aadhar_no: "",
    family_head: "", // This will store the ID of the selected FamilyHead
  });

  const [sameAsMobile, setSameAsMobile] = useState(true);
  const [familyHeads, setFamilyHeads] = useState([]); // To store the list of family heads
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // Fetch the list of family heads when the component mounts
  useEffect(() => {
    const fetchFamilyHeads = async () => {
      try {
        // This GET request fetches all family heads for the dropdown
        const response = await axios.get("http://127.0.0.1:8000/client/family-heads/");
        setFamilyHeads(response.data);
      } catch (error) {
        console.error("Failed to fetch family heads:", error);
        setMessage("Could not load family heads. Please try again later.");
        setIsError(true);
      }
    };
    fetchFamilyHeads();
  }, []); // Empty dependency array means this runs once on mount

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "sameAsMobile") {
      setSameAsMobile(checked);
      if (checked) {
        setFormData(prev => ({ ...prev, whatsapp_no: prev.mobile_no }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
       // If mobile number is updated, also update whatsapp number if checkbox is checked
      if (name === "mobile_no" && sameAsMobile) {
        setFormData(prev => ({ ...prev, whatsapp_no: value }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsError(false);

    if (!formData.family_head) {
        setMessage("Please select a Family Head.");
        setIsError(true);
        setLoading(false);
        return;
    }

    try {
      // This POST request sends the new member's data to the backend
      const response = await axios.post("http://127.0.0.1:8000/client/add-family-member/", formData);
      setMessage(response.data.message || "Family member added successfully!");
      setIsError(false);
      setTimeout(() => {
        navigate("/dashboard"); // Or wherever you list members
      }, 2000);
    } catch (error) {
      console.error("Submission failed:", error);
      if (error.response && error.response.data) {
        const errorMessages = Object.entries(error.response.data)
          .map(([key, value]) => `${key.replace(/_/g, ' ')}: ${Array.isArray(value) ? value.join(', ') : value}`)
          .join('; ');
        setMessage(`Submission failed: ${errorMessages}`);
      } else {
        setMessage(error.message || "An unexpected error occurred.");
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
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Add Family Member</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Family Head Selection Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Family Head *</label>
              <select
                name="family_head"
                value={formData.family_head}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="">-- Choose a Family Head --</option>
                {familyHeads.map(head => (
                  <option key={head.id} value={head.id}>
                    {head.first_name} {head.last_name} (ID: {head.id})
                  </option>
                ))}
              </select>
            </div>
            
            <hr/>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
                <input type="text" name="middle_name" value={formData.middle_name} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Relation to Head *</label>
                <select name="relation" value={formData.relation} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Relation</option>
                  <option value="spouse">Spouse</option>
                  <option value="son">Son</option>
                  <option value="daughter">Daughter</option>
                  <option value="father">Father</option>
                  <option value="mother">Mother</option>
                  <option value="brother">Brother</option>
                  <option value="sister">Sister</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                <select name="gender" value={formData.gender} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                <input type="tel" name="mobile_no" value={formData.mobile_no} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Number</label>
                <div className="space-y-2">
                  <input type="tel" name="whatsapp_no" value={formData.whatsapp_no} onChange={handleInputChange} disabled={sameAsMobile} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" />
                  <label className="flex items-center">
                    <input type="checkbox" name="sameAsMobile" checked={sameAsMobile} onChange={handleInputChange} className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span className="text-sm text-gray-600">Same as mobile number</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Card Number</label>
                <input type="text" name="aadhar_no" value={formData.aadhar_no} onChange={handleInputChange} placeholder="XXXX-XXXX-XXXX" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            
            {/* Message Display */}
            {message && (
                <div className={`p-4 rounded-md text-center font-medium ${isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                {message}
                </div>
            )}

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-4 border-t">
              <button type="button" onClick={() => navigate("/dashboard/clientmanage/ManageClients")} disabled={loading} className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors disabled:bg-gray-400">
                Cancel
              </button>
              <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center">
                {loading ? 'Saving...' : 'Add Family Member'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFamilyMember;
