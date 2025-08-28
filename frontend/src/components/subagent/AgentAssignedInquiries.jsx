import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  User,
  FileText,
  Eye,
  Loader2,
  AlertCircle,
  Inbox,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

const AgentAssignedInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState("");

  const navigate = useNavigate();

  // Fetch all agents for dropdown
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get("http://127.0.0.1:8000/agent/sub-agents/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAgents(res.data);
      } catch (err) {
        console.error("Error fetching agents:", err);
      }
    };
    fetchAgents();
  }, []);

  // Handle agent selection
  const handleAgentChange = (e) => {
    const agentId = e.target.value;
    setSelectedAgent(agentId);
    fetchInquiries(agentId || null); // Pass null for 'all' or current user's inquiries
  };

  // Modified fetchInquiries function to accept agent filter
  const fetchInquiries = async (agentId = null) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      let url = "http://127.0.0.1:8000/inquiry/agent-inquiries/";

      // Add agent query parameter if agent is selected
      if (agentId) {
        url += `?agent=${agentId}`;
      }

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setInquiries(res.data);
    } catch (err) {
      console.error("Error fetching inquiries:", err);
      setError("Failed to load assigned inquiries.");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchInquiries();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      Open: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
      "In Progress":
        "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
      Resolved:
        "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
      Closed:
        "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300",
      Pending:
        "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
    };
    return (
      colors[status] ||
      "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300"
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

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
            Loading Inquiries
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            Fetching assigned inquiries...
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
            Error Loading Inquiries
          </h3>
          <p className="text-red-600 dark:text-red-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-200"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  // Updated empty state with back button
  if (inquiries.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-8">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate("/dashboard/inquiries")} // or your desired route
              className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 font-medium transition-colors duration-200"
            >
              <ArrowLeft size={18} />
              Back to Inquiries
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <Inbox className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              No Assigned Inquiries
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-lg mb-8">
              You don't have any assigned inquiries at the moment.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-8 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Header */}
          <motion.div variants={cardVariants}>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  Assigned Inquiries
                </h1>
                <p className="text-slate-600 dark:text-slate-300 mt-2">
                  Manage and respond to customer inquiries assigned to you
                </p>
              </div>

              {/* Agent Filter Dropdown */}
              <div className="bg-white rounded-xl p-4 shadow-lg border">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Filter by Agent
                </label>
                <select
                  value={selectedAgent}
                  onChange={handleAgentChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="">All Agents (My Inquiries)</option>
                  {agents.map((agent) => (
                    <option key={agent.id} value={agent.id}>
                      {agent.first_name} {agent.last_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Inquiries Table */}
          <motion.div variants={cardVariants}>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                    <thead className="bg-slate-50 dark:bg-slate-900/50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <User size={14} />
                            Customer
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <FileText size={14} />
                            Policy
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <MessageSquare size={14} />
                            Message
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    
                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                      <AnimatePresence>
                        {inquiries.map((inq, index) => (
                          <motion.tr
                            key={inq.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: index * 0.05 }}
                            className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
                            onClick={() =>
                              navigate(`/agent/inquiries/${inq.id}`)
                            }
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                                  <User className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-slate-900 dark:text-white">
                                    {inq.customer?.full_name ||
                                      "Unknown Customer"}
                                  </div>
                                  <div className="text-sm text-slate-500 dark:text-slate-400">
                                    Customer
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-slate-400" />
                                <span className="text-sm font-medium text-slate-900 dark:text-white">
                                  {inq.policy?.policy_number || "N/A"}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-slate-900 dark:text-white max-w-xs truncate">
                                {inq.message || "No message"}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                  inq.status
                                )}`}
                              >
                                {inq.status || "Unknown"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/agent/inquiries/${inq.id}`);
                                }}
                                
                                className="p-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                                title="View Inquiry"
                              >
                                <Eye className="w-4 h-4" />
                              </motion.button>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            variants={cardVariants}
            className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/10 dark:to-blue-900/10 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-800/30"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Inquiry Management
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  Click on any inquiry to view details and respond to customer
                  questions
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {inquiries.length}
                  </div>
                  <div className="text-slate-500 dark:text-slate-400">
                    Total
                  </div>
                </div>
                <div className="w-px h-8 bg-slate-300 dark:bg-slate-600"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {
                      inquiries.filter((inq) => inq.status === "Resolved")
                        .length
                    }
                  </div>
                  <div className="text-slate-500 dark:text-slate-400">
                    Resolved
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AgentAssignedInquiries;
