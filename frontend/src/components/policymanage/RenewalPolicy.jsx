"use client";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const RenewalPolicy = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [policiesDueForRenewal, setPoliciesDueForRenewal] = useState([]);
  const [renewalData, setRenewalData] = useState({
    new_premium_amount: "",
    new_sum_assured: "",
    renewal_date: "",
    new_end_date: "",
    remarks: "",
  });

  // UI state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch policies due for renewal from the backend
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://127.0.0.1:8000/policy/policies/due-for-renewal/");
        setPoliciesDueForRenewal(response.data);
      } catch (err) {
        setError("Failed to load policies due for renewal.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPolicies();
  }, []);

  // Apply the search filter
  const filteredPolicies = policiesDueForRenewal.filter((policy) =>
    Object.values(policy).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Handler for selecting a policy to renew
  const handleSelectPolicy = (policy) => {
    setSelectedPolicy(policy);
    setRenewalData({
      new_premium_amount: policy.premium_amount || "",
      new_sum_assured: policy.sum_assured || "",
      renewal_date: new Date().toISOString().split('T')[0],
      new_end_date: "",
      remarks: "",
    });
    setError(null);
    setMessage("");
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRenewalData((prev) => ({ ...prev, [name]: value }));
  };

  // Form submit: renew policy
  const handleRenewal = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent double submission
    setLoading(true);
    setMessage("");
    setError(null);

    const dataToSubmit = {
      ...renewalData,
      policy: selectedPolicy.id,
    };

    try {
      const response = await axios.post("http://127.0.0.1:8000/policy/policies/renew/", dataToSubmit);
      setMessage(response.data.message || "Policy renewed successfully!");

      // Remove the renewed policy
      setPoliciesDueForRenewal(prev =>
        prev.filter(p => p.id !== selectedPolicy.id)
      );
      setSelectedPolicy(null);
      setRenewalData({
        new_premium_amount: "",
        new_sum_assured: "",
        renewal_date: "",
        new_end_date: "",
        remarks: "",
      });
    } catch (err) {
      setError("Failed to renew policy. Please check the details.");
      console.error(err.response ? err.response.data : err);
    } finally {
      setLoading(false);
    }
  };

  // Improved formatter that doesn't break on empty value
  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined || amount === "") return "-";
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Policy Renewal</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Policies List */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Policies Due for Renewal</h2>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Search policies..."
            />
          </div>
          <div className="space-y-3 max-h-[60vh] overflow-y-auto">
            {loading && <p>Loading policies...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && filteredPolicies.length === 0 && (
              <p className="text-center text-gray-500 py-8">No policies are due for renewal.</p>
            )}
            {filteredPolicies.map((policy) => (
              <div
                key={policy.id}
                className={`p-4 border rounded-lg cursor-pointer ${
                  selectedPolicy?.id === policy.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handleSelectPolicy(policy)}
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{policy.policy_number}</h3>
                    <p className="text-sm text-gray-600">{policy.policy_holder_name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatCurrency(policy.sum_assured)}</p>
                    <p className="text-sm text-gray-600">Premium: {formatCurrency(policy.premium_amount)}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">Expires on: {policy.end_date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Renewal Form */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Renewal Details</h2>
          {selectedPolicy ? (
            <form onSubmit={handleRenewal} className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg text-sm">
                <p>
                  Renewing Policy:{" "}
                  <span className="font-medium">{selectedPolicy.policy_number}</span>{" "}
                  for <span className="font-medium">{selectedPolicy.policy_holder_name}</span>
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Renewal Date *
                  </label>
                  <input
                    type="date"
                    name="renewal_date"
                    value={renewalData.renewal_date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Expiry Date *
                  </label>
                  <input
                    type="date"
                    name="new_end_date"
                    value={renewalData.new_end_date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Sum Assured *
                  </label>
                  <input
                    type="number"
                    name="new_sum_assured"
                    value={renewalData.new_sum_assured}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Premium Amount *
                  </label>
                  <input
                    type="number"
                    name="new_premium_amount"
                    value={renewalData.new_premium_amount}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Remarks
                </label>
                <textarea
                  name="remarks"
                  value={renewalData.remarks}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Any additional notes..."
                />
              </div>
              {message && (
                <div className="p-3 text-center text-green-800 bg-green-100 rounded-md">
                  {message}
                </div>
              )}
              {error && (
                <div className="p-3 text-center text-red-800 bg-red-100 rounded-md">
                  {error}
                </div>
              )}
              <div className="flex justify-end space-x-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setSelectedPolicy(null)}
                  className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-400"
                >
                  {loading ? "Renewing..." : "Renew Policy"}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-16 text-gray-500">
              <p className="text-lg font-medium">
                Select a policy from the list to begin renewal.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RenewalPolicy;
