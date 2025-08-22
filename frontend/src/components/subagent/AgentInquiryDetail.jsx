import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  MessageSquare,
  User,
  FileText,
  UserCheck,
  ArrowLeft,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle,
  Eye,
  Shield,
} from "lucide-react";

const AgentInquiryDetail = () => {
  const { inquiryId } = useParams();
  const navigate = useNavigate();

  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [status, setStatus] = useState("");
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(
          `http://127.0.0.1:8000/inquiry/agent-inquiries/${inquiryId}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setInquiry(res.data);
        setStatus(res.data.status);
      } catch (err) {
        setError("Failed to load inquiry details.");
      } finally {
        setLoading(false);
      }
    };

    fetchInquiry();
  }, [inquiryId]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    if (updateError) setUpdateError(null);
    if (updateSuccess) setUpdateSuccess(false);
  };

  const handleUpdate = async () => {
    setUpdating(true);
    setUpdateError(null);
    setUpdateSuccess(false);

    try {
      const token = localStorage.getItem("accessToken");
      await axios.patch(
        `http://127.0.0.1:8000/inquiry/agent-inquiries/${inquiryId}/`,
        { status },
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'  // FIXED: Added Content-Type header
          } 
        }
      );
      setUpdateSuccess(true);
      setTimeout(() => {
        navigate("/dashboard/subagentmanagement/managesubagents");
      }, 2000);
    } catch (err) {
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.status?.[0] ||
        "Failed to update status.";
      setUpdateError(msg);
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
      Assigned: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
      "In Progress": "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
      Resolved: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
      Closed: "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300",
      Rejected: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
    };
    return (
      colors[status] ||
      "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300"
    );
  };

  const statusOptions = [
    { value: "pending", icon: "⏳", label: "Pending" },        // FIXED: lowercase values
    { value: "assigned", icon: "👤", label: "Assigned" },      // FIXED: lowercase values
    { value: "in_progress", icon: "🔄", label: "In Progress" }, // FIXED: lowercase values
    { value: "resolved", icon: "✅", label: "Resolved" },      // FIXED: lowercase values
    { value: "closed", icon: "🔒", label: "Closed" },          // FIXED: lowercase values
    { value: "rejected", icon: "❌", label: "Rejected" },      // FIXED: lowercase values
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Loader2 className="w-12 h-12 text-cyan-600 animate-spin mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Loading Inquiry Details
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            Fetching inquiry information...
          </p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 max-w-md w-full mx-6 text-center border border-red-200 dark:border-red-800"
        >
          <AlertCircle className="w-16 h-16 text-red-600 dark:text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Error Loading Inquiry
          </h3>
          <p className="text-red-600 dark:text-red-400 mb-6">{error}</p>
          <button
            onClick={() => navigate("/agent/inquiries")}
            className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-200"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  if (!inquiry) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 max-w-md w-full mx-6 text-center border border-slate-200 dark:border-slate-700"
        >
          <Eye className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            No Inquiry Found
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            The requested inquiry could not be found.
          </p>
          <button
            onClick={() => navigate("/agent/inquiries")}
            className="px-6 py-3 bg-slate-600 text-white rounded-xl font-semibold hover:bg-slate-700 transition-all duration-200"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-8 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <button
            onClick={() =>
              navigate("/dashboard/subagentmanagement/assignedinquiries")
            }
            className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 font-medium transition-colors duration-200"
          >
            <ArrowLeft size={18} />
            Back to Inquiries
          </button>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Inquiry Detail #{inquiry.id}
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      inquiry.status
                    )}`}
                  >
                    {inquiry.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Inquiry Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Customer Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-6 border border-blue-200 dark:border-blue-800/30"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Customer Information
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Customer Name
                      </p>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {inquiry.customer?.full_name || inquiry.customer?.username || "Unknown Customer"}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Policy Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-green-50 dark:bg-green-900/10 rounded-xl p-6 border border-green-200 dark:border-green-800/30"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-green-600 rounded-xl flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Policy Information
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Policy Details
                      </p>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {inquiry.policy?.policy_number || "N/A"}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {inquiry.policy?.policy_type || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Message Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-purple-50 dark:bg-purple-900/10 rounded-xl p-6 border border-purple-200 dark:border-purple-800/30"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-purple-600 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Customer Message
                </h3>
              </div>
              <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
                <p className="text-slate-900 dark:text-white leading-relaxed">
                  {inquiry.message || "No message"}
                </p>
              </div>
            </motion.div>

            {/* Assigned Agent */}
            {inquiry.assigned_subagent && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-orange-50 dark:bg-orange-900/10 rounded-xl p-6 border border-orange-200 dark:border-orange-800/30"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-orange-600 rounded-xl flex items-center justify-center">
                    <UserCheck className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Assigned Agent
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {inquiry.assigned_subagent?.first_name}{" "}
                      {inquiry.assigned_subagent?.last_name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Sub Agent
                    </p>
                    {inquiry.assigned_agent_details?.email && (
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        📧 {inquiry.assigned_agent_details.email}
                      </p>
                    )}
                    {inquiry.assigned_agent_details?.phone && (
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        📞 {inquiry.assigned_agent_details.phone}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Status Update Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-cyan-50 dark:bg-cyan-900/10 rounded-xl p-6 border border-cyan-200 dark:border-cyan-800/30"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-cyan-600 rounded-xl flex items-center justify-center">
                  <Save className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Update Status
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                  >
                    Select New Status
                  </label>
                  <select
                    id="status"
                    value={status}
                    onChange={handleStatusChange}
                    disabled={updating}
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all disabled:opacity-50"
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.icon} {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Messages */}
                <AnimatePresence>
                  {updateSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 rounded-xl text-center flex items-center justify-center gap-3 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800"
                    >
                      <CheckCircle size={20} />
                      Status updated successfully! Redirecting...
                    </motion.div>
                  )}
                  {updateError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 rounded-xl text-center flex items-center justify-center gap-3 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800"
                    >
                      <AlertCircle size={20} />
                      {updateError}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleUpdate}
                    disabled={updating}
                    className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
                  >
                    {updating ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        Update Status
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AgentInquiryDetail;
