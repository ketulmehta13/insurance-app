"use client";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddNewPolicy = () => {
  const navigate = useNavigate();

  // State for the form data, using snake_case to match the Django model
  const [formData, setFormData] = useState({
    policy_number: "",
    insurance_company: "",
    policy_type: "",
    start_date: "",
    end_date: "",
    premium_amount: "",
    sum_assured: "",
    status: "Pending",
    policy_document: null,
  });

  // State to manage the selected policy holder
  const [policyHolder, setPolicyHolder] = useState({ id: "", type: "" });
  const [allClients, setAllClients] = useState([]);

  // State for UI feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch all clients to populate the dropdown
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/client/manage-clients/");
        setAllClients(response.data);
      } catch (err) {
        setError("Failed to load clients for policy holder selection.");
        console.error(err);
      }
    };
    fetchClients();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      policy_document: e.target.files[0] || null,
    }));
  };

  const handlePolicyHolderChange = (e) => {
    const [id, type] = e.target.value.split("|");
    setPolicyHolder({ id, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!policyHolder.id || !policyHolder.type) {
      setError("You must select a policy holder.");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage("");

    const submissionData = new FormData();

    // Append form fields
    for (const key in formData) {
      if (formData[key]) {
        submissionData.append(key, formData[key]);
      }
    }

    // IMPORTANT: Replace 7,8,9 with actual content type IDs from your database
    let contentTypeId;
    if (policyHolder.type === "Family Head") contentTypeId = 7;
    else if (policyHolder.type === "Family Member") contentTypeId = 8;
    else if (policyHolder.type === "Firm") contentTypeId = 9;

    if (!contentTypeId) {
      setError("Could not determine client type. Please check configuration.");
      setLoading(false);
      return;
    }

    submissionData.append("content_type", contentTypeId);
    submissionData.append("object_id", policyHolder.id);

    try {
      await axios.post("http://127.0.0.1:8000/policy/policies/", submissionData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Policy created successfully!");
      setTimeout(() => navigate("/dashboard/policymanagement/managepolicy"), 2000);
    } catch (err) {
      setError("Failed to create policy. Please check the form and try again.");
      console.error(err.response ?? err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Add New Policy</h1>
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Policy Holder Selection */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Policy Holder</h2>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select an Existing Client *
              </label>
              <select
                value={`${policyHolder.id}|${policyHolder.type}`}
                onChange={handlePolicyHolderChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="|">-- Choose a Client --</option>
                {allClients.map((client) => (
                  <option key={`${client.client_type}-${client.id}`} value={`${client.id}|${client.client_type}`}>
                    {client.full_name} ({client.client_type})
                  </option>
                ))}
              </select>
            </div>

            {/* Policy Details */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Policy Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Policy Number *</label>
                  <input
                    type="text"
                    name="policy_number"
                    value={formData.policy_number}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Company *</label>
                  <input
                    type="text"
                    name="insurance_company"
                    value={formData.insurance_company}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Policy Type *</label>
                  <select
                    name="policy_type"
                    value={formData.policy_type}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Type</option>
                    <option value="Health">Health</option>
                    <option value="Life">Life</option>
                    <option value="Vehicle">Vehicle</option>
                    <option value="Travel">Travel</option>
                    <option value="Property">Property</option>
                    <option value="Business">Business</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Active">Active</option>
                    <option value="Expired">Expired</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Due Renewal">Due Renewal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                  <input
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
                  <input
                    type="date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Premium Amount *</label>
                  <input
                    type="number"
                    step="0.01"
                    name="premium_amount"
                    value={formData.premium_amount}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sum Assured *</label>
                  <input
                    type="number"
                    step="0.01"
                    name="sum_assured"
                    value={formData.sum_assured}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Document Upload */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Document Upload</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Policy Document</label>
                <input
                  type="file"
                  name="policy_document"
                  onChange={handleFileChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>

            {/* Messages */}
            {message && <div className="p-4 text-center text-green-800 bg-green-100 rounded-md">{message}</div>}
            {error && <div className="p-4 text-center text-red-800 bg-red-100 rounded-md">{error}</div>}

            <div className="flex justify-end space-x-4 pt-4 border-t">
              <button
                type="button"
                onClick={() => navigate("/dashboard/policymanagement/managepolicy")}
                className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
              >
                {loading ? "Creating..." : "Create Policy"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewPolicy;
    