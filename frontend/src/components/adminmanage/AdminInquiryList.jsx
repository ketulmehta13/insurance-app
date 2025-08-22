import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MessageCircle,
  User,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  UserPlus,
  Loader2,
  AlertCircle,
  Filter,
  Search,
  Download,
  Eye,
  Edit,
  Paperclip
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const AdminInquiryList = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [agents, setAgents] = useState([]);
  const [assigningId, setAssigningId] = useState(null);
  const [selectedAgentId, setSelectedAgentId] = useState("");
  const [filterStatus, setFilterStatus] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [response, setResponse] = useState("");
  const [newStatus, setNewStatus] = useState("");


  useEffect(() => {
    fetchInquiries();
    fetchAgents();
  }, []);


  const fetchInquiries = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get("http://127.0.0.1:8000/inquiry/admin-inquiries/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInquiries(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load inquiries");
      setLoading(false);
    }
  };


  const fetchAgents = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get("http://127.0.0.1:8000/agent/sub-agents/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAgents(res.data);
    } catch {
      setAgents([]);
    }
  };


  const updateInquiry = async (id, updates) => {
    setUpdatingId(id);
    try {
      const token = localStorage.getItem("accessToken");
      await axios.patch(
        `http://127.0.0.1:8000/inquiry/inquiries/${id}/`,
        updates,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );
      await fetchInquiries();
      setAssigningId(null);
      setSelectedAgentId("");
    } catch {
      alert("Failed to update inquiry");
    } finally {
      setUpdatingId(null);
    }
  };


  const updateInquiryWithResponse = async () => {
    if (!selectedInquiry || !newStatus) {
      alert("Please select a status");
      return;
    }

    if (newStatus === "assigned" && !selectedAgentId) {
      alert("Please select an agent when assigning");
      return;
    }

    setUpdatingId(selectedInquiry.id);
    try {
      const token = localStorage.getItem("accessToken");
      
      // Prepare update data
      const updateData = { 
        status: newStatus,
        response: response 
      };
      
      // Add agent assignment if status is assigned
      if (newStatus === "assigned" && selectedAgentId) {
        updateData.assigned_subagent_id = selectedAgentId;
      }

      await axios.put(
        `http://127.0.0.1:8000/inquiry/inquiries/${selectedInquiry.id}/status/`,
        updateData,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );
      
      await fetchInquiries();
      setShowResponseModal(false);
      setResponse("");
      setNewStatus("");
      setSelectedInquiry(null);
      setSelectedAgentId(""); // Reset agent selection
    } catch (error) {
      console.error("Failed to update inquiry:", error);
      alert("Failed to update inquiry");
    } finally {
      setUpdatingId(null);
    }
  };


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


  const openResponseModal = (inquiry) => {
    setSelectedInquiry(inquiry);
    setNewStatus(inquiry.status);
    setResponse("");
    setSelectedAgentId(""); // Reset agent selection
    setShowResponseModal(true);
  };


  const viewInquiryDetail = (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowDetailModal(true);
  };


  const filteredInquiries = inquiries.filter(inq => {
    const statusMatch = filterStatus === "All" ? true : inq.status.toLowerCase() === filterStatus.toLowerCase();
    const searchMatch =
      searchTerm === "" ||
      (inq.customer?.full_name &&
        inq.customer.full_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (inq.policy?.policy_number &&
        inq.policy.policy_number
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (inq.message &&
        inq.message.toLowerCase().includes(searchTerm.toLowerCase()));
    return statusMatch && searchMatch;
  });


  const getStatusConfig = status => {
    const configs = {
      pending: {
        color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
        icon: <Clock size={12} />,
      },
      accepted: {
        color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
        icon: <CheckCircle size={12} />,
      },
      rejected: {
        color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
        icon: <XCircle size={12} />,
      },
      assigned: {
        color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
        icon: <UserPlus size={12} />,
      },
      resolved: {
        color: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
        icon: <CheckCircle size={12} />,
      },
      closed: {
        color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
        icon: <XCircle size={12} />,
      },
    };
    return configs[status?.toLowerCase()] || configs["pending"];
  };


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 p-8">
        <Loader2 className="w-12 h-12 text-cyan-600 animate-spin mb-4" />
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
          Loading Inquiries
        </h3>
        <p className="text-slate-600 dark:text-slate-300">
          Fetching customer inquiries...
        </p>
      </div>
    );
  }


  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 p-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 max-w-md w-full text-center border border-red-200 dark:border-red-800">
          <AlertCircle className="w-16 h-16 text-red-600 dark:text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Error Loading Inquiries
          </h3>
          <p className="text-red-600 dark:text-red-400 mb-6">{error}</p>
          <button
            onClick={fetchInquiries}
            className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }


  return (
    <>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              Customer Inquiries
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mt-1">
              Manage and assign customer inquiries to agents
            </p>
          </div>
          <div className="text-slate-600 dark:text-slate-300">
            <span className="text-2xl font-bold">{filteredInquiries.length}</span>
            <span className="text-sm ml-1">inquiries</span>
          </div>
        </div>


        {/* Filters and Search */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by customer, policy, or message..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                />
              </div>
            </div>


            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              <div className="flex flex-wrap gap-2">
                {["All", "pending", "accepted", "rejected", "assigned", "resolved", "closed"].map(
                  status => (
                    <button
                      key={status}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        filterStatus === status
                          ? "bg-cyan-600 text-white shadow-lg"
                          : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                      }`}
                      onClick={() => setFilterStatus(status)}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>


        {/* Inquiries List */}
        {filteredInquiries.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-12 text-center border border-slate-200 dark:border-slate-700">
            <MessageCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No Inquiries Found
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              {searchTerm
                ? "Try adjusting your search terms."
                : "No customer inquiries available."}
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-900/50">
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        Customer
                      </div>
                    </th>
                    <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">
                      <div className="flex items-center gap-2">
                        <FileText size={16} />
                        Policy
                      </div>
                    </th>
                    <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">
                      Message
                    </th>
                    <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">
                      <div className="flex items-center gap-2">
                        <Paperclip size={16} />
                        Document
                      </div>
                    </th>
                    <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">
                      Status
                    </th>
                    <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">
                      Agent
                    </th>
                    <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInquiries.map((inq, index) => {
                    const statusConfig = getStatusConfig(inq.status);
                    return (
                      <motion.tr
                        key={inq.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                            </div>
                            <span className="font-medium text-slate-900 dark:text-white">
                              {inq.customer_name || inq.customer?.full_name || "N/A"}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            <div className="font-medium text-slate-900 dark:text-white">
                              {inq.policy_number || inq.policy?.policy_number || "N/A"}
                            </div>
                            <div className="text-slate-600 dark:text-slate-300">
                              {inq.policy_type || inq.policy?.policy_type || "N/A"}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="max-w-xs truncate text-slate-600 dark:text-slate-300" title={inq.message}>
                            {inq.message?.length > 50 ? `${inq.message.substring(0, 50)}...` : inq.message}
                          </div>
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
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.color}`}>
                            {statusConfig.icon}
                            {inq.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            {inq.assigned_agent_name || inq.assigned_subagent ? (
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                  <User className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                                </div>
                                <span className="text-slate-900 dark:text-white">
                                  {inq.assigned_agent_name || `${inq.assigned_subagent?.first_name} ${inq.assigned_subagent?.last_name}`}
                                </span>
                              </div>
                            ) : (
                              <span className="text-slate-500 dark:text-slate-400">
                                Not assigned
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => viewInquiryDetail(inq)}
                              className="px-3 py-1.5 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-lg text-xs font-semibold hover:bg-cyan-200 dark:hover:bg-cyan-800/50 transition-all duration-200 flex items-center gap-1"
                            >
                              <Eye size={12} />
                              View
                            </button>
                            
                            <button
                              onClick={() => openResponseModal(inq)}
                              className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-xs font-semibold hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-all duration-200 flex items-center gap-1"
                            >
                              <Edit size={12} />
                              Update
                            </button>


                            {(inq.status === "accepted" || inq.status === "pending") && (
                              <button
                                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-all duration-200 flex items-center gap-1"
                                onClick={() => setAssigningId(inq.id)}
                              >
                                <UserPlus size={12} />
                                Assign
                              </button>
                            )}
                          </div>


                          {assigningId === inq.id && (
                            <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
                              <div className="space-y-3">
                                <select
                                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                  value={selectedAgentId}
                                  onChange={e => setSelectedAgentId(e.target.value)}
                                >
                                  <option value="">Select agent</option>
                                  {agents.map(agent => (
                                    <option key={agent.id} value={agent.id}>
                                      {agent.first_name} {agent.last_name}
                                    </option>
                                  ))}
                                </select>
                                <div className="flex gap-2">
                                  <button
                                    className="flex-1 px-3 py-2 bg-cyan-600 text-white rounded-lg text-xs font-semibold hover:bg-cyan-700 transition-all duration-200 disabled:opacity-50"
                                    disabled={!selectedAgentId || updatingId === inq.id}
                                    onClick={() =>
                                      updateInquiry(inq.id, {
                                        status: "assigned",
                                        assigned_subagent_id: selectedAgentId,
                                      })
                                    }
                                  >
                                    {updatingId === inq.id ? (
                                      <Loader2 className="w-3 h-3 animate-spin mx-auto" />
                                    ) : (
                                      "Assign"
                                    )}
                                  </button>
                                  <button
                                    className="px-3 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-600 transition-all duration-200"
                                    onClick={() => {
                                      setAssigningId(null);
                                      setSelectedAgentId("");
                                    }}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>


      {/* Detail Modal */}
      <AnimatePresence>
        {showDetailModal && selectedInquiry && (
          <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
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
                    Customer
                  </label>
                  <p className="text-slate-900 dark:text-white">
                    {selectedInquiry.customer_name || selectedInquiry.customer?.full_name || "N/A"}
                  </p>
                </div>


                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Policy
                  </label>
                  <p className="text-slate-900 dark:text-white">
                    {selectedInquiry.policy_number || selectedInquiry.policy?.policy_number} - {selectedInquiry.policy_type || selectedInquiry.policy?.policy_type}
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


        {/* Response Modal */}
        {showResponseModal && selectedInquiry && (
          <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 max-w-lg w-full border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Update Inquiry Status
                </h3>
                <button
                  onClick={() => setShowResponseModal(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  ×
                </button>
              </div>


              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    New Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                    <option value="assigned">Assigned</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                {/* Agent Assignment for Assigned Status */}
                {newStatus === "assigned" && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Assign to Agent
                    </label>
                    <select
                      value={selectedAgentId}
                      onChange={(e) => setSelectedAgentId(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="">Select an agent</option>
                      {agents.map(agent => (
                        <option key={agent.id} value={agent.id}>
                          {agent.first_name} {agent.last_name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}


                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Response Message (Optional)
                  </label>
                  <textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    rows="4"
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Enter your response to the customer..."
                  />
                </div>
              </div>


              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => {
                    setShowResponseModal(false);
                    setSelectedAgentId(""); // Reset agent selection
                  }}
                  className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={updateInquiryWithResponse}
                  disabled={!newStatus || updatingId === selectedInquiry.id || (newStatus === "assigned" && !selectedAgentId)}
                  className="flex-1 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {updatingId === selectedInquiry.id ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Inquiry"
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};


export default AdminInquiryList;
