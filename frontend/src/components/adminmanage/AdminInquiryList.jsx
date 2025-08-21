// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminInquiryList = () => {
//   const [inquiries, setInquiries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [agents, setAgents] = useState([]);
//   const [assigningId, setAssigningId] = useState(null);
//   const [selectedAgentId, setSelectedAgentId] = useState("");
//   const [filterStatus, setFilterStatus] = useState("Pending");

//   useEffect(() => {
//     fetchInquiries();
//     fetchAgents();
//   }, []);

//   const fetchInquiries = async () => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const res = await axios.get("http://127.0.0.1:8000/inquiry/inquiries/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setInquiries(res.data);
//       setLoading(false);
//     } catch (err) {
//       setError("Failed to load inquiries");
//       setLoading(false);
//     }
//   };

//   const fetchAgents = async () => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const res = await axios.get("http://127.0.0.1:8000/agent/sub-agents/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setAgents(res.data);
//     } catch {
//       setAgents([]);
//     }
//   };

//   const updateInquiry = async (id, updates) => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       await axios.patch(
//         `http://127.0.0.1:8000/inquiry/inquiries/${id}/`,
//         updates,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchInquiries();
//       setAssigningId(null);
//       setSelectedAgentId("");
//     } catch {
//       alert("Failed to update inquiry");
//     }
//   };

//   const filteredInquiries = inquiries.filter(inq =>
//     filterStatus === "All" ? true : inq.status === filterStatus
//   );

//   return (
//     <div className="max-w-4xl mx-auto mt-10">
//       <h2 className="text-2xl font-bold mb-4">Customer Inquiries</h2>
//       <div className="flex space-x-3 mb-4">
//         {["All", "Pending", "Accepted", "Rejected", "Assigned"].map((status) => (
//           <button
//             key={status}
//             className={`px-3 py-1 rounded ${
//               filterStatus === status ? "bg-indigo-600 text-white" : "bg-gray-200"
//             }`}
//             onClick={() => setFilterStatus(status)}
//           >
//             {status}
//           </button>
//         ))}
//       </div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className="text-red-600">{error}</p>
//       ) : filteredInquiries.length === 0 ? (
//         <p>No inquiries found.</p>
//       ) : (
//         <table className="min-w-full border">
//           <thead>
//             <tr>
//               <th className="px-4 py-2">Customer</th>
//               <th className="px-4 py-2">Policy</th>
//               <th className="px-4 py-2">Message</th>
//               <th className="px-4 py-2">Status</th>
//               <th className="px-4 py-2">Agent</th>
//               <th className="px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredInquiries.map((inq) => (
//               <tr key={inq.id} className="border-t">
//                 <td className="px-4 py-2">{inq.customer.full_name}</td>
//                 <td className="px-4 py-2">
//                   {inq.policy.policy_number} ({inq.policy.policy_type})
//                 </td>
//                 <td className="px-4 py-2">{inq.message}</td>
//                 <td className="px-4 py-2">{inq.status}</td>
//                 <td className="px-4 py-2">
//                   {inq.assigned_subagent
//                     ? inq.assigned_subagent.first_name +
//                       " " +
//                       inq.assigned_subagent.last_name
//                     : "-"}
//                 </td>
//                 <td className="px-4 py-2 space-x-2">
//                   {inq.status === "Pending" && (
//                     <>
//                       <button
//                         onClick={() =>
//                           updateInquiry(inq.id, { status: "Accepted" })
//                         }
//                         className="bg-green-600 text-white px-2 py-1 rounded text-sm"
//                       >
//                         Accept
//                       </button>
//                       <button
//                         onClick={() =>
//                           updateInquiry(inq.id, { status: "Rejected" })
//                         }
//                         className="bg-red-600 text-white px-2 py-1 rounded text-sm"
//                       >
//                         Reject
//                       </button>
//                     </>
//                   )}
//                   {inq.status === "Accepted" && (
//                     <>
//                       <button
//                         className="bg-blue-600 text-white px-2 py-1 rounded text-sm"
//                         onClick={() => setAssigningId(inq.id)}
//                       >
//                         Assign Agent
//                       </button>
//                       {assigningId === inq.id && (
//                         <div className="mt-2">
//                           <select
//                             className="border rounded px-2 py-1"
//                             value={selectedAgentId}
//                             onChange={e => setSelectedAgentId(e.target.value)}
//                           >
//                             <option value="">Select agent</option>
//                             {agents.map(agent => (
//                               <option key={agent.id} value={agent.id}>
//                                 {agent.first_name} {agent.last_name}
//                               </option>
//                             ))}
//                           </select>
//                           <button
//                             className="ml-2 bg-indigo-600 text-white px-2 py-1 rounded text-sm"
//                             disabled={!selectedAgentId}
//                             onClick={() =>
//                               updateInquiry(inq.id, {
//                                 status: "Assigned",
//                                 assigned_subagent_id: selectedAgentId,
//                               })
//                             }
//                           >
//                             Save
//                           </button>
//                           <button
//                             className="ml-2 px-2 py-1 text-sm"
//                             onClick={() => setAssigningId(null)}
//                           >
//                             Cancel
//                           </button>
//                         </div>
//                       )}
//                     </>
//                   )}
//                   {inq.status === "Assigned" && (
//                     <span className="text-green-800 font-semibold">Assigned</span>
//                   )}
//                   {inq.status === "Rejected" && (
//                     <span className="text-red-800 font-semibold">Rejected</span>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default AdminInquiryList;

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
} from "lucide-react";

const AdminInquiryList = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [agents, setAgents] = useState([]);
  const [assigningId, setAssigningId] = useState(null);
  const [selectedAgentId, setSelectedAgentId] = useState("");
  const [filterStatus, setFilterStatus] = useState("Pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchInquiries();
    fetchAgents();
  }, []);

  const fetchInquiries = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get("http://127.0.0.1:8000/inquiry/inquiries/", {
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
        { headers: { Authorization: `Bearer ${token}` } }
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

  const filteredInquiries = inquiries.filter(inq => {
    const statusMatch =
      filterStatus === "All" ? true : inq.status === filterStatus;
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
      Pending: {
        color:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
        icon: <Clock size={12} />,
      },
      Accepted: {
        color:
          "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
        icon: <CheckCircle size={12} />,
      },
      Rejected: {
        color:
          "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
        icon: <XCircle size={12} />,
      },
      Assigned: {
        color:
          "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
        icon: <UserPlus size={12} />,
      },
    };
    return configs[status] || configs["Pending"];
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
              {["All", "Pending", "Accepted", "Rejected", "Assigned"].map(
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
                    {status}
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
                    <tr
                      key={inq.id}
                      className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                          </div>
                          <span className="font-medium text-slate-900 dark:text-white">
                            {inq.customer?.full_name || ""}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          <div className="font-medium text-slate-900 dark:text-white">
                            {inq.policy?.policy_number || ""}
                          </div>
                          <div className="text-slate-600 dark:text-slate-300">
                            {inq.policy?.policy_type || ""}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="max-w-xs truncate text-slate-600 dark:text-slate-300" title={inq.message}>
                          {inq.message}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.color}`}>
                          {statusConfig.icon}
                          {inq.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          {inq.assigned_subagent ? (
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                <User className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                              </div>
                              <span className="text-slate-900 dark:text-white">
                                {inq.assigned_subagent.first_name} {inq.assigned_subagent.last_name}
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
                          {inq.status === "Pending" && (
                            <>
                              <button
                                onClick={() => updateInquiry(inq.id, { status: "Accepted" })}
                                disabled={updatingId === inq.id}
                                className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-semibold hover:bg-green-700 transition-all duration-200 flex items-center gap-1 disabled:opacity-50"
                              >
                                {updatingId === inq.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle size={12} />}
                                Accept
                              </button>
                              <button
                                onClick={() => updateInquiry(inq.id, { status: "Rejected" })}
                                disabled={updatingId === inq.id}
                                className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition-all duration-200 flex items-center gap-1 disabled:opacity-50"
                              >
                                {updatingId === inq.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <XCircle size={12} />}
                                Reject
                              </button>
                            </>
                          )}

                          {inq.status === "Accepted" && (
                            <button
                              className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-all duration-200 flex items-center gap-1"
                              onClick={() => setAssigningId(inq.id)}
                            >
                              <UserPlus size={12} />
                              Assign Agent
                            </button>
                          )}

                          {inq.status === "Assigned" && (
                            <span className="px-3 py-1.5 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded-lg text-xs font-semibold">
                              Assigned
                            </span>
                          )}

                          {inq.status === "Rejected" && (
                            <span className="px-3 py-1.5 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 rounded-lg text-xs font-semibold">
                              Rejected
                            </span>
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
                                      status: "Assigned",
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInquiryList;
