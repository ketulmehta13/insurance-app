import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { Loader2, User, Shield, FileText, Search, X, Send, Calendar, DollarSign, Building, AlertCircle, CheckCircle, ArrowLeft, Download, Edit3, Mail, Phone, MapPin, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { AuthContext } from "../pages/AuthProvider";
import CustomerMyInquiries from "./CustomerMyInquiries";

const InquiryForm = ({ onClose, onSuccess, selectedPolicyId }) => {
  const [policies, setPolicies] = useState([]);
  const [policyId, setPolicyId] = useState(selectedPolicyId || "");
  const [message, setMessage] = useState("");
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size should not exceed 5MB");
        return;
      }
      
      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setError("Please upload only PDF, JPG, or PNG files");
        return;
      }
      
      setDocument(file);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!policyId || !message.trim()) {
      setError("Please select a policy and enter your inquiry.");
      setLoading(false);
      return;
    }

    if (!document) {
      setError("Please upload a policy document.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      
      // Create FormData to handle file upload
      const formData = new FormData();
      formData.append('policy_id', policyId);
      formData.append('message', message);
      formData.append('document', document);

      await axios.post(
        "http://127.0.0.1:8000/inquiry/inquiries/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-700"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">New Inquiry</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-2"
          >
            <AlertCircle size={16} className="text-red-500" />
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Select Policy *
            </label>
            <select
              value={policyId}
              onChange={(e) => setPolicyId(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              required
            >
              <option value="">-- Select a policy --</option>
              {policies.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.policy_number} ({p.policy_type})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Inquiry Message *
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              placeholder="Describe your inquiry..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Upload Policy Document *
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
              required
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Supported formats: PDF, JPG, PNG (Max size: 5MB)
            </p>
            {document && (
              <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                Selected: {document.name}
              </p>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:border-slate-400 dark:hover:border-slate-500 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-600 to-slate-700 text-white rounded-xl font-semibold hover:from-cyan-700 hover:to-slate-800 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Submit
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// Edit Profile Modal Component - CORRECTED VERSION
const EditProfileModal = ({ isOpen, onClose, profileData, onSuccess }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    email: '',
    phone: '',
    gender: '',
    
    date_of_birth: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (profileData) {
      setFormData({
        first_name: profileData.first_name || '',
        email: profileData.email || '',
        phone: profileData.phone || '',
        gender: profileData.gender || '',
        
        date_of_birth: profileData.date_of_birth || '',
        address: profileData.address || ''
      });
    }
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const token = localStorage.getItem("accessToken");
      
      // EXCLUDE age from form data before sending (age is computed automatically)
      const { age, ...dataToSend } = formData;
      
      await axios.put(
        "http://127.0.0.1:8000/api/v1/accounts/update-profile/",
        dataToSend, // Send without age field
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Failed to update profile:", err);
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        const errorMessage = typeof errorData === 'string' 
          ? errorData 
          : Object.values(errorData)[0] || "Failed to update profile";
        setError(errorMessage);
      } else {
        setError("Failed to update profile. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-700"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-2"
          >
            <AlertCircle size={16} className="text-red-500" />
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* AGE FIELD REMOVED - Display as read-only instead */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Age (Calculated from Date of Birth)
              </label>
              <input
                type="text"
                value={profileData?.age || 'N/A'}
                readOnly
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-gray-100 dark:bg-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Age is automatically calculated from your date of birth
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              placeholder="Enter your complete address..."
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:border-slate-400 dark:hover:border-slate-500 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-600 to-slate-700 text-white rounded-xl font-semibold hover:from-cyan-700 hover:to-slate-800 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircle size={16} />
                  Save Profile
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);
  const policiesSectionRef = useRef(null);

  // Modal control
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [selectedPolicyId, setSelectedPolicyId] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState(false);

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

  const refreshProfileData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const profileResponse = await axios.get(
        "http://127.0.0.1:8000/api/v1/accounts/my-profile/",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setProfileData(profileResponse.data);
    } catch (err) {
      console.error("Failed to refresh profile data:", err);
    }
  };

  const handleEnquiry = (policy) => {
    setSelectedPolicyId(policy.id);
    setShowInquiryForm(true);
  };

  const handleDownload = async (policy) => {
    setDownloadingId(policy.id);
    
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/accounts/download-policy/${policy.id}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob'
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      const contentDisposition = response.headers['content-disposition'];
      let fileName = `policy_${policy.policy_number || policy.id}.pdf`;
      
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
        if (fileNameMatch) {
          fileName = fileNameMatch[1];
        }
      }
      
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
    } catch (err) {
      console.error("Failed to download policy:", err);
      
      const policyContent = `
POLICY DOCUMENT

Policy Number: ${policy.policy_number || 'N/A'}
Insurance Company: ${policy.insurance_company || 'N/A'}
Policy Type: ${policy.policy_type || 'N/A'}
Status: ${policy.status || 'N/A'}
Start Date: ${policy.start_date || 'N/A'}
End Date: ${policy.end_date || 'N/A'}
Premium Amount: ${policy.premium_amount || 'N/A'}
Sum Assured: ${policy.sum_assured || 'N/A'}

Customer Name: ${profileData?.first_name || user.username}

Generated on: ${new Date().toLocaleDateString()}
      `.trim();

      const blob = new Blob([policyContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `policy_${policy.policy_number || policy.id}.txt`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
    } finally {
      setDownloadingId(null);
    }
  };

  const closeInquiryForm = () => {
    setShowInquiryForm(false);
    setSelectedPolicyId(null);
  };

  const onInquirySuccess = () => {
    alert("Inquiry submitted successfully!");
  };

  const onEditProfileSuccess = () => {
    alert("Profile updated successfully!");
    refreshProfileData();
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'expired':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white via-cyan-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 flex flex-col items-center border border-slate-200 dark:border-slate-700"
        >
          <Loader2 className="w-12 h-12 text-cyan-600 animate-spin" />
          <p className="mt-4 text-slate-800 dark:text-slate-200 font-semibold text-lg">
            Loading your profile...
          </p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-cyan-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 text-center max-w-md border border-slate-200 dark:border-slate-700"
        >
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Error Loading Profile
          </h3>
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-slate-700 text-white rounded-xl font-semibold hover:from-cyan-700 hover:to-slate-800 transition-all"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-cyan-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 text-center max-w-md border border-slate-200 dark:border-slate-700"
        >
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-slate-600 dark:text-slate-300" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            No Profile Data
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            Please log in again to view your profile.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cyan-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 md:p-8 pt-24 transition-colors duration-500">
      <div className="container mx-auto max-w-6xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link
            to="/customerdashboard"
            className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 font-medium transition-colors duration-200"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden mb-8 border border-slate-200 dark:border-slate-700"
        >
          <div className="bg-gradient-to-r from-cyan-600 to-slate-700 text-white p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">My Profile</h1>
                  <p className="text-cyan-100 text-lg mt-1">
                    Welcome back, {profileData?.first_name || user.username}!
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowEditProfile(true)}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
              >
                <Edit3 size={16} />
                Edit Profile
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 md:p-8 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Personal Information
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">Full Name</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white pl-6">
                    {profileData?.first_name || user.username}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm font-medium">Email</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white pl-6">
                    {profileData?.email || user.email || "N/A"}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm font-medium">Phone Number</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white pl-6">
                    {profileData?.phone || "N/A"}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-medium">Gender</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white pl-6">
                    {profileData?.gender ? profileData.gender.charAt(0).toUpperCase() + profileData.gender.slice(1) : "N/A"}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">Age</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white pl-6">
                    {profileData?.age || "N/A"}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">Date of Birth</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white pl-6">
                    {profileData?.date_of_birth || "N/A"}
                  </p>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">Address</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white pl-6">
                    {profileData?.address || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Policy Summary
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-300">Total Policies</span>
                  <span className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                    {policies.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-300">Active Policies</span>
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {policies.filter(p => (p.status || "").toLowerCase() === "active").length}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Policies Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          ref={policiesSectionRef}
          className="mt-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Your Policies</h2>
            </div>
          </div>

          {policies.length === 0 ? (
            <div className="p-8 text-center">
              <Shield className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-500 dark:text-slate-400">No policies found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-900/50">
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">Policy Number</th>
                    <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">Company</th>
                    <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">Type</th>
                    <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">Status</th>
                    <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">Start Date</th>
                    <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">End Date</th>
                    <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">Premium</th>
                    <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">Sum Assured</th>
                    <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {policies.map((policy, index) => (
                    <motion.tr
                      key={policy.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                    >
                      <td className="p-4 text-slate-900 dark:text-slate-100 font-medium">
                        {policy.policy_number || "N/A"}
                      </td>
                      <td className="p-4 text-slate-600 dark:text-slate-300">
                        {policy.insurance_company || "N/A"}
                      </td>
                      <td className="p-4 text-slate-600 dark:text-slate-300">
                        {policy.policy_type || "N/A"}
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(policy.status)}`}>
                          {policy.status || "N/A"}
                        </span>
                      </td>
                      <td className="p-4 text-slate-600 dark:text-slate-300">
                        {policy.start_date || "N/A"}
                      </td>
                      <td className="p-4 text-slate-600 dark:text-slate-300">
                        {policy.end_date || "N/A"}
                      </td>
                      <td className="p-4 text-slate-600 dark:text-slate-300">
                        {policy.premium_amount || "N/A"}
                      </td>
                      <td className="p-4 text-slate-600 dark:text-slate-300">
                        {policy.sum_assured || "N/A"}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEnquiry(policy)}
                            className="px-3 py-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-lg hover:bg-cyan-200 dark:hover:bg-cyan-800/50 text-xs font-semibold transition-colors"
                          >
                            Enquiry
                          </button>
                          <button
                            onClick={() => handleDownload(policy)}
                            disabled={downloadingId === policy.id}
                            className="px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800/50 text-xs font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                          >
                            {downloadingId === policy.id ? (
                              <>
                                <Loader2 className="w-3 h-3 animate-spin" />
                                Downloading...
                              </>
                            ) : (
                              <>
                                <Download className="w-3 h-3" />
                                Download
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Modals */}
        <AnimatePresence>
          {showInquiryForm && (
            <InquiryForm
              selectedPolicyId={selectedPolicyId}
              onClose={closeInquiryForm}
              onSuccess={onInquirySuccess}
            />
          )}
          
          {showEditProfile && (
            <EditProfileModal
              isOpen={showEditProfile}
              onClose={() => setShowEditProfile(false)}
              profileData={profileData}
              onSuccess={onEditProfileSuccess}
            />
          )}
        </AnimatePresence>

        <CustomerMyInquiries />
      </div>
    </div>
  );
};

export default Profile;
