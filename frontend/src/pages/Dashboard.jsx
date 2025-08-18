import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { Loader2, User, Shield, FileText, Search } from "lucide-react";
import { AuthContext } from "../pages/AuthProvider";
import CustomerMyInquiries from "./CustomerMyInquiries";

// InquiryForm component defined inline as a modal
const InquiryForm = ({ onClose, onSuccess, selectedPolicyId }) => {
  const [policies, setPolicies] = useState([]);
  const [policyId, setPolicyId] = useState(selectedPolicyId || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(
        "http://127.0.0.1:8000/api/v1/accounts/my-policies/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPolicies(res.data);
    } catch (err) {
      console.error("Failed to load policies", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!policyId || !message.trim()) {
      setError("Please select a policy and enter your inquiry.");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        "http://127.0.0.1:8000/inquiry/inquiries/",
        { policy_id: policyId, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onSuccess();
      onClose();
    } catch (err) {
      if (err.response) {
        if (typeof err.response.data === "string") {
          setError(err.response.data);
        } else if (err.response.data && typeof err.response.data === "object") {
          const field = Object.keys(err.response.data)[0];
          setError(
            `${field ? field + ": " : ""}${
              err.response.data[field]?.[0] || "Invalid data."
            }`
          );
        } else {
          setError("Failed to submit inquiry. Please try again.");
        }
        console.error("Backend error:", err.response.data);
      } else {
        setError("Failed to submit inquiry. Please try again.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">New Inquiry</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-semibold">Select Policy:</label>
          <select
            value={policyId}
            onChange={(e) => setPolicyId(e.target.value)}
            className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">-- Select a policy --</option>
            {policies.map((p) => (
              <option key={p.id} value={p.id}>
                {p.policy_number} ({p.policy_type})
              </option>
            ))}
          </select>

          <label className="block mb-2 font-semibold">Inquiry Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            required
          ></textarea>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const policiesSectionRef = useRef(null);

  // Inquiry modal control
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [selectedPolicyId, setSelectedPolicyId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      if (!user || !localStorage.getItem("accessToken")) {
        setError("User not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      const accessToken = localStorage.getItem("accessToken");

      try {
        const profileResponse = await axios.get(
          "http://127.0.0.1:8000/api/v1/accounts/my-profile/",
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        setProfileData(profileResponse.data);

        const policiesResponse = await axios.get(
          "http://127.0.0.1:8000/api/v1/accounts/my-policies/",
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        setPolicies(policiesResponse.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        if (err.response?.status === 404) {
          setError("Profile or policies not found. Please contact support.");
        } else if (err.response?.status === 403) {
          setError(
            "Access denied. Please ensure you're logged in as a customer."
          );
        } else {
          setError("Failed to load profile data. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleEnquiry = (policy) => {
    setSelectedPolicyId(policy.id);
    setShowInquiryForm(true);
  };

  const closeInquiryForm = () => {
    setShowInquiryForm(false);
    setSelectedPolicyId(null);
  };

  const onInquirySuccess = () => {
    alert("Inquiry submitted successfully!");
  };

  

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
          <p className="mt-4 text-indigo-800 font-semibold text-lg">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Error Loading Profile
          </h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Profile Data
          </h3>
          <p className="text-gray-600">
            Please log in again to view your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 md:p-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">My Profile</h1>
                <p className="text-indigo-100 text-lg mt-1">
                  Welcome back, {profileData?.first_name || user.username}!
                </p>
                
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Personal Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Personal Information
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">Full Name</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 pl-6">
                    {profileData?.first_name || user.username}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats: Policies */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Policy Summary
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Policies</span>
                  <span className="text-2xl font-bold text-indigo-600">
                    {policies.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Policies</span>
                  <span className="text-2xl font-bold text-green-600">
                    {
                      policies.filter(
                        (p) => (p.status || "").toLowerCase() === "active"
                      ).length
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Policies display table */}
        <div
          ref={policiesSectionRef}
          className="mt-12 bg-white rounded-xl shadow-md p-6"
        >
          <h2 className="text-2xl font-bold mb-4 text-indigo-700 flex items-center">
            <FileText className="w-6 h-6 mr-2 text-indigo-500" />
            Your Policies
          </h2>
          {policies.length === 0 ? (
            <p className="text-gray-500">No policies found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="bg-indigo-50">
                    <th className="px-4 py-2">Policy Number</th>
                    <th className="px-4 py-2">Insurance Company</th>
                    <th className="px-4 py-2">Policy Type</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Start Date</th>
                    <th className="px-4 py-2">End Date</th>
                    <th className="px-4 py-2">Premium</th>
                    <th className="px-4 py-2">Sum Assured</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {policies.map((policy) => (
                    <tr key={policy.id} className="border-b">
                      <td className="px-4 py-2">
                        {policy.policy_number || "N/A"}
                      </td>
                      <td className="px-4 py-2">
                        {policy.insurance_company || "N/A"}
                      </td>
                      <td className="px-4 py-2">
                        {policy.policy_type || "N/A"}
                      </td>
                      <td className="px-4 py-2">{policy.status || "N/A"}</td>
                      <td className="px-4 py-2">
                        {policy.start_date || "N/A"}
                      </td>
                      <td className="px-4 py-2">{policy.end_date || "N/A"}</td>
                      <td className="px-4 py-2">
                        {policy.premium_amount || "N/A"}
                      </td>
                      <td className="px-4 py-2">
                        {policy.sum_assured || "N/A"}
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleEnquiry(policy)}
                          className="px-2 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 text-sm font-semibold"
                        >
                          Enquiry
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Inquiry Form Modal */}
        {showInquiryForm && (
          <InquiryForm
            selectedPolicyId={selectedPolicyId}
            onClose={closeInquiryForm}
            onSuccess={onInquirySuccess}
          />
        )}
         <CustomerMyInquiries />
      </div>
    </div>
  );
};

export default Profile;
