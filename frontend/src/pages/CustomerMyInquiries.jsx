import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { 
  MessageCircle, 
  User, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  FileText, 
  RefreshCw, 
  Download,
  Eye,
  Calendar,
  Paperclip
} from "lucide-react";

const CustomerMyInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem("accessToken");
      console.log("Token exists:", !!token);
      
      if (!token) {
        throw new Error("No access token found. Please log in again.");
      }

      console.log("Making request to:", "http://127.0.0.1:8000/inquiry/my-inquiries/");
      
      const res = await axios.get("http://127.0.0.1:8000/inquiry/my-inquiries/", {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      
      console.log("API Response:", res);
      console.log("API Data:", res.data);
      
      setInquiries(res.data || []);
      
    } catch (err) {
      console.error("Full error:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);
      
      if (err.response?.status === 404) {
        setError("Inquiry service not found. Please contact support.");
      } else if (err.response?.status === 401) {
        setError("Authentication failed. Please log in again.");
        localStorage.removeItem("accessToken");
      } else if (err.response?.status === 403) {
        setError("You don't have permission to view inquiries.");
      } else if (err.code === 'ERR_NETWORK') {
        setError("Cannot connect to server. Please check if the server is running.");
      } else {
        setError(err.response?.data?.error || err.message || "Failed to load your inquiries.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDownloadDocument = async (inquiry) => {
    if (!inquiry.document_url) {
      alert("No document available for this inquiry.");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(inquiry.document_url, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', inquiry.document_name || `inquiry_${inquiry.id}_document.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download document:", error);
      alert("Failed to download document. Please try again.");
    }
  };

  const viewInquiryDetail = (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowDetailModal(true);
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'resolved':
      case 'closed':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'pending':
        return <Clock className="text-yellow-500" size={16} />;
      case 'accepted':
        return <CheckCircle className="text-blue-500" size={16} />;
      case 'rejected':
        return <AlertCircle className="text-red-500" size={16} />;
      case 'in progress':
      case 'assigned':
        return <Loader2 className="text-blue-500 animate-spin" size={16} />;
      default:
        return <AlertCircle className="text-gray-500" size={16} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'resolved':
      case 'closed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'accepted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'in progress':
      case 'assigned':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="mt-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 text-center border border-slate-200 dark:border-slate-700">
        <Loader2 className="w-8 h-8 text-cyan-600 animate-spin mx-auto mb-3" />
        <p className="text-slate-600 dark:text-slate-300">Loading your inquiries...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 text-center border border-red-200 dark:border-red-800">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          Error Loading Inquiries
        </h3>
        <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
        <button
          onClick={fetchInquiries}
          className="inline-flex items-center gap-2 px-6 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-800/30 transition-colors font-semibold"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      </div>
    );
  }

  if (inquiries.length === 0) {
    return (
      <div className="mt-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 text-center border border-slate-200 dark:border-slate-700">
        <MessageCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          No Inquiries Found
        </h3>
        <p className="text-slate-600 dark:text-slate-300">
          You haven't submitted any inquiries yet.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">My Inquiries</h2>
              <span className="ml-auto px-3 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-full text-sm font-semibold">
                {inquiries.length} Total
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-900/50">
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <FileText size={16} />
                      Policy Number
                    </div>
                  </th>
                  <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <MessageCircle size={16} />
                      Message
                    </div>
                  </th>
                  <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <Paperclip size={16} />
                      Document
                    </div>
                  </th>
                  <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      Status
                    </div>
                  </th>
                  <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      Assigned Agent
                    </div>
                  </th>
                  <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq, index) => (
                  <motion.tr
                    key={inq.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                          <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {inq.policy?.policy_number || 'N/A'}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 max-w-xs">
                      <p className="text-slate-600 dark:text-slate-300 truncate" title={inq.message}>
                        {inq.message?.length > 50 ? `${inq.message.substring(0, 50)}...` : inq.message}
                      </p>
                    </td>
                    <td className="p-4">
                      {inq.has_document ? (
                        <button
                          onClick={() => handleDownloadDocument(inq)}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800/50 text-xs font-semibold transition-colors"
                        >
                          <Download size={12} />
                          Download
                        </button>
                      ) : (
                        <span className="text-slate-400 text-xs">No document</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(inq.status)}
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(inq.status)}`}>
                          {inq.status}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                          <User className="w-3 h-3 text-slate-500" />
                        </div>
                        <span className="text-slate-600 dark:text-slate-300">
                          {inq.assigned_agent_name || "Not assigned"}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => viewInquiryDetail(inq)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-lg hover:bg-cyan-200 dark:hover:bg-cyan-800/50 text-xs font-semibold transition-colors"
                      >
                        <Eye size={12} />
                        View Details
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedInquiry && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Inquiry Details
              </h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Policy
                </label>
                <p className="text-slate-900 dark:text-white">
                  {selectedInquiry.policy?.policy_number} - {selectedInquiry.policy?.policy_type}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Message
                </label>
                <p className="text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  {selectedInquiry.message}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Status
                </label>
                <div className="flex items-center gap-2">
                  {getStatusIcon(selectedInquiry.status)}
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedInquiry.status)}`}>
                    {selectedInquiry.status}
                  </span>
                </div>
              </div>

              {selectedInquiry.has_document && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Uploaded Document
                  </label>
                  <button
                    onClick={() => handleDownloadDocument(selectedInquiry)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download size={16} />
                    Download Document
                  </button>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Assigned Agent
                </label>
                <p className="text-slate-900 dark:text-white">
                  {selectedInquiry.assigned_agent_name || "Not assigned yet"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Created Date
                </label>
                <p className="text-slate-900 dark:text-white">
                  {new Date(selectedInquiry.created_at).toLocaleDateString()}
                </p>
              </div>

              {selectedInquiry.admin_response && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Admin Response
                  </label>
                  <p className="text-slate-900 dark:text-white bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    {selectedInquiry.admin_response}
                  </p>
                </div>
              )}

              {selectedInquiry.agent_response && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Agent Response
                  </label>
                  <p className="text-slate-900 dark:text-white bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                    {selectedInquiry.agent_response}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default CustomerMyInquiries;
