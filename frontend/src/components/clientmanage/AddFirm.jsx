"use client";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddFirm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    family_head: "", // New field to store selected Family Head id
    firm_name: "",
    firm_type: "",
    contact_person_name: "",
    designation: "",
    mobile_no: "",
    email: "",
    address1: "",
    city: "",
    area: "",
    business_type: "",
  });

  const [familyHeads, setFamilyHeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // Fetch Family Heads for dropdown on mount
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/client/family-heads/")
      .then((resp) => setFamilyHeads(resp.data))
      .catch(() => setFamilyHeads([]));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsError(false);

    // Create FormData for form POST
    const submissionData = new FormData();
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== "") {
        submissionData.append(key, formData[key]);
      }
    }

    try {
        const response = await axios.post("http://127.0.0.1:8000/client/add-firm/", submissionData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setMessage(response.data.message || "Firm added successfully!");
        setIsError(false);
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } catch (error) {
        setMessage(error.response?.data?.detail || "An error occurred.");
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Add Firm
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Family Head Dropdown */}
            <div>
              <label
                htmlFor="family_head"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Family Head *
              </label>
              <select
                id="family_head"
                name="family_head"
                value={formData.family_head}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Family Head</option>
                {familyHeads.map((head) => (
                  <option key={head.id} value={head.id}>
                    {head.first_name} {head.last_name} ({head.email})
                  </option>
                ))}
              </select>
            </div>

            {/* Other firm fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Firm Name *
              </label>
              <input
                type="text"
                name="firm_name"
                value={formData.firm_name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Firm Type *
              </label>
              <select
                name="firm_type"
                value={formData.firm_type}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Firm Type</option>
                <option value="proprietorship">Proprietorship</option>
                <option value="partnership">Partnership</option>
                <option value="llp">LLP</option>
                <option value="private-limited">Private Limited</option>
                <option value="public-limited">Public Limited</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Person Name *
              </label>
              <input
                type="text"
                name="contact_person_name"
                value={formData.contact_person_name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Designation *
              </label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number *
              </label>
              <input
                type="tel"
                name="mobile_no"
                value={formData.mobile_no}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <textarea
                name="address1"
                value={formData.address1}
                onChange={handleInputChange}
                rows={3}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select City</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Chennai">Chennai</option>
                <option value="Kolkata">Kolkata</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Area *
              </label>
              <select
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Area</option>
                <option value="Area 1">Area 1</option>
                <option value="Area 2">Area 2</option>
                <option value="Area 3">Area 3</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Type *
              </label>
              <select
                name="business_type"
                value={formData.business_type}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Business Type</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="trading">Trading</option>
                <option value="service">Service</option>
              </select>
            </div>

            {message && (
              <div
                className={`p-4 rounded-md text-center font-medium ${
                  isError
                    ? "bg-red-100 text-red-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {message}
              </div>
            )}

            <div className="flex justify-end space-x-4 pt-4 border-t">
              <button
                type="button"
                onClick={() => navigate("/dashboard/clientmanage/ManageClients")}
                disabled={loading}
                className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors disabled:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
              >
                {loading ? "Saving..." : "Add Firm"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFirm;
