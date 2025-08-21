// "use client";
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const ManagePolicy = () => {
//   const navigate = useNavigate();
//   const [policies, setPolicies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filterStatus, setFilterStatus] = useState("");
//   const [filterType, setFilterType] = useState("");

//   // Fetch data from the backend whenever the dropdown filters change
//   useEffect(() => {
//     const fetchPolicies = async () => {
//       try {
//         setLoading(true);
//         const params = new URLSearchParams();
//         if (filterStatus) params.append("status", filterStatus);
//         if (filterType) params.append("policy_type", filterType);

//         const response = await axios.get("http://127.0.0.1:8000/policy/policies/", {
//           params,
//         });
//         setPolicies(response.data);
//         setError(null);
//       } catch (err) {
//         setError("Failed to fetch policy data.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPolicies();
//   }, [filterStatus, filterType]);

//   // Reset currentPage to 1 whenever filter, search term or entries per page change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [filterStatus, filterType, searchTerm, entriesPerPage]);

//   // Filter based on search term applied after data fetching
//   const filteredPolicies = policies.filter((policy) =>
//     Object.values(policy).some((value) =>
//       String(value).toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   // Calculate total pages (ensure minimum 1)
//   const totalPages = Math.max(1, Math.ceil(filteredPolicies.length / entriesPerPage));
//   const startIndex = (currentPage - 1) * entriesPerPage;
//   const paginatedPolicies = filteredPolicies.slice(startIndex, startIndex + entriesPerPage);

//   const stats = [
//     { title: "Total Policies", value: policies.length, color: "bg-blue-500" },
//     {
//       title: "Active Policies",
//       value: policies.filter((p) => p.status === "Active").length,
//       color: "bg-green-500",
//     },
//     {
//       title: "Expired Policies",
//       value: policies.filter((p) => p.status === "Expired").length,
//       color: "bg-purple-500",
//     },
//     {
//       title: "Cancelled Policies",
//       value: policies.filter((p) => p.status === "Cancelled").length,
//       color: "bg-red-500",
//     },
//     {
//       title: "Pending Policies",
//       value: policies.filter((p) => p.status === "Pending").length,
//       color: "bg-yellow-500",
//     },
//     // Removed "Lapsed Policies" as it is not part of your backend choices
//   ];

//   // Navigation functions
//   const handleView = (id) => navigate(`/dashboard/policy/view/${id}`);
// const handleEdit = (id) => navigate(`/dashboard/policy/edit/${id}`);



//   const handleRenew = () => navigate("/dashboard/policymanagement/renewal");

//   // Delete handler
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this policy?")) {
//       try {
//         await axios.delete(`http://127.0.0.1:8000/policy/policies/${id}/`);
//         setPolicies((prev) => prev.filter((p) => p.id !== id));
//       } catch (err) {
//         setError("Failed to delete policy.");
//         console.error(err);
//       }
//     }
//   };

//   // Currency formatter with safe fallback
//   const formatCurrency = (amount) => {
//     if (amount === null || amount === undefined) return "-";
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumFractionDigits: 0,
//     }).format(amount);
//   };

//   return (
//     <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Manage Policy</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//         {stats.map((stat, idx) => (
//           <div
//             key={idx}
//             className="bg-white rounded-lg shadow-sm p-6 border-l-4"
//             style={{ borderColor: stat.color.replace("bg-", "#") }}
//           >
//             <p className="text-sm font-medium text-gray-600">{stat.title}</p>
//             <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
//           </div>
//         ))}
//       </div>

//       <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//         {/* Filters */}
//         <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
//           <div className="flex items-center space-x-4">
//             <div>
//               <label className="text-sm font-medium text-gray-700">Status</label>
//               <select
//                 value={filterStatus}
//                 onChange={(e) => setFilterStatus(e.target.value)}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded"
//               >
//                 <option value="">All</option>
//                 <option value="Active">Active</option>
//                 <option value="Expired">Expired</option>
//                 <option value="Cancelled">Cancelled</option>
//                 <option value="Pending">Pending</option>
//                 <option value="Due for Renewal">Due for Renewal</option>
//               </select>
//             </div>

//             <div>
//               <label className="text-sm font-medium text-gray-700">Policy Type</label>
//               <select
//                 value={filterType}
//                 onChange={(e) => setFilterType(e.target.value)}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded"
//               >
//                 <option value="">All</option>
//                 <option value="Health">Health</option>
//                 <option value="Life">Life</option>
//                 <option value="Vehicle">Vehicle</option>
//                 <option value="Travel">Travel</option>
//                 <option value="Property">Property</option>
//                 <option value="Business">Business</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//           </div>

//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search policies..."
//             className="p-2 border border-gray-300 rounded w-full max-w-xs"
//           />
//         </div>

//         {/* Data Table */}
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Policy No
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Holder
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Type
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Sum Assured
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Expiry Date
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Actions
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading && (
//                 <tr key="loading">
//                   <td colSpan={7} className="text-center py-4">
//                     Loading...
//                   </td>
//                 </tr>
//               )}

//               {error && (
//                 <tr key="error">
//                   <td colSpan={7} className="text-center py-4 text-red-500">
//                     {error}
//                   </td>
//                 </tr>
//               )}

//               {!loading && paginatedPolicies.map((policy) => (
//                 <tr key={policy.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
//                     {policy.policy_number}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {policy.policy_holder_name}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {policy.policy_type}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {formatCurrency(policy.sum_assured)}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                         policy.status === "Active"
//                           ? "bg-green-100 text-green-800"
//                           : "bg-yellow-100 text-yellow-800"
//                       }`}
//                     >
//                       {policy.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {policy.end_date}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleView(policy.id)}
//                         className="text-blue-600 hover:text-blue-900"
//                       >
//                         View
//                       </button>
//                       <button
//                         onClick={() => handleEdit(policy.id)}
//                         className="text-green-600 hover:text-green-900"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleRenew()}
//                         className="text-purple-600 hover:text-purple-900"
//                       >
//                         Renew
//                       </button>
//                       <button
//                         onClick={() => handleDelete(policy.id)}
//                         className="text-red-600 hover:text-red-900"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}

//               {!loading && paginatedPolicies.length === 0 && (
//                 <tr key="no-data">
//                   <td colSpan={7} className="text-center py-4">
//                     No policies found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="flex items-center justify-between mt-4">
//           <div className="text-sm text-gray-700">
//             Showing {startIndex + 1} to{" "}
//             {Math.min(startIndex + entriesPerPage, filteredPolicies.length)} of{" "}
//             {filteredPolicies.length} entries
//           </div>

//           <div className="flex space-x-1">
//             <button
//               onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//               disabled={currentPage === 1}
//               className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
//             >
//               Prev
//             </button>

//             {[...Array(totalPages)].map((_, idx) => {
//               const pageNum = idx + 1;
//               return (
//                 <button
//                   key={pageNum}
//                   onClick={() => setCurrentPage(pageNum)}
//                   className={`px-3 py-1 border rounded ${
//                     currentPage === pageNum
//                       ? "bg-blue-600 text-white"
//                       : "border-gray-300"
//                   }`}
//                 >
//                   {pageNum}
//                 </button>
//               );
//             })}

//             <button
//               onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//               disabled={currentPage === totalPages}
//               className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManagePolicy;

"use client";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { 
  FileText, 
  Search, 
  Eye, 
  Edit3, 
  RotateCcw, 
  Trash2, 
  Filter,
  ChevronLeft, 
  ChevronRight,
  Loader2,
  AlertCircle,
  User,
  Calendar,
  DollarSign,
  Shield
} from "lucide-react";

const ManagePolicy = () => {
  const navigate = useNavigate();
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");

  // Fetch data from the backend whenever the dropdown filters change
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (filterStatus) params.append("status", filterStatus);
        if (filterType) params.append("policy_type", filterType);

        const response = await axios.get("http://127.0.0.1:8000/policy/policies/", {
          params,
        });
        setPolicies(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch policy data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPolicies();
  }, [filterStatus, filterType]);

  // Reset currentPage to 1 whenever filter, search term or entries per page change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus, filterType, searchTerm, entriesPerPage]);

  // Filter based on search term applied after data fetching
  const filteredPolicies = policies.filter((policy) =>
    Object.values(policy).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Calculate total pages (ensure minimum 1)
  const totalPages = Math.max(1, Math.ceil(filteredPolicies.length / entriesPerPage));
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedPolicies = filteredPolicies.slice(startIndex, startIndex + entriesPerPage);

  const stats = [
    { 
      title: "Total Policies", 
      value: policies.length, 
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      icon: FileText
    },
    {
      title: "Active Policies",
      value: policies.filter((p) => p.status === "Active").length,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      icon: Shield
    },
    {
      title: "Expired Policies",
      value: policies.filter((p) => p.status === "Expired").length,
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
      icon: Calendar
    },
    {
      title: "Cancelled Policies",
      value: policies.filter((p) => p.status === "Cancelled").length,
      color: "from-red-500 to-pink-600",
      bgColor: "bg-red-100 dark:bg-red-900/20",
      icon: AlertCircle
    },
    {
      title: "Pending Policies",
      value: policies.filter((p) => p.status === "Pending").length,
      color: "from-yellow-500 to-orange-600",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
      icon: Loader2
    },
  ];

  // Navigation functions
  const handleView = (id) => navigate(`/dashboard/policy/view/${id}`);
  const handleEdit = (id) => navigate(`/dashboard/policy/edit/${id}`);
  const handleRenew = () => navigate("/dashboard/policymanagement/renewalpolicy");

  // Delete handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this policy?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/policy/policies/${id}/`);
        setPolicies((prev) => prev.filter((p) => p.id !== id));
      } catch (err) {
        setError("Failed to delete policy.");
        console.error(err);
      }
    }
  };

  // Currency formatter with safe fallback
  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return "-";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
      'Expired': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
      'Cancelled': 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300',
      'Pending': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
      'Due for Renewal': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
    };
    return colors[status] || 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
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
            Loading Policies
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            Fetching policy data...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
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
                    <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  Manage Policies
                </h1>
                <p className="text-slate-600 dark:text-slate-300 mt-2">
                  View and manage all insurance policies
                </p>
              </div>
            </div>
          </motion.div>

          {/* Statistics Cards */}
          <motion.div variants={cardVariants}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                  >
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-5 rounded-full -mr-10 -mt-10`}></div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                          {stat.title}
                        </p>
                        <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                          {stat.value}
                        </p>
                      </div>
                      <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={cardVariants}>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="p-6">
                {/* Filters */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <Filter className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                    <div className="flex flex-wrap items-center gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Status</label>
                        <select
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          className="px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                        >
                          <option value="">All</option>
                          <option value="Active">Active</option>
                          <option value="Expired">Expired</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Pending">Pending</option>
                          <option value="Due for Renewal">Due for Renewal</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Policy Type</label>
                        <select
                          value={filterType}
                          onChange={(e) => setFilterType(e.target.value)}
                          className="px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                        >
                          <option value="">All</option>
                          <option value="Health">🏥 Health</option>
                          <option value="Life">❤️ Life</option>
                          <option value="Vehicle">🚗 Vehicle</option>
                          <option value="Travel">✈️ Travel</option>
                          <option value="Property">🏠 Property</option>
                          <option value="Business">💼 Business</option>
                          <option value="Other">📋 Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="relative w-full lg:w-auto">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search policies..."
                      className="pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all w-full lg:w-80"
                    />
                  </div>
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                    <thead className="bg-slate-50 dark:bg-slate-900/50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <FileText size={14} />
                            Policy No
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <User size={14} />
                            Holder
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <DollarSign size={14} />
                            Sum Assured
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} />
                            Expiry Date
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                      <AnimatePresence>
                        {error && (
                          <tr>
                            <td colSpan={7} className="px-6 py-12 text-center">
                              <div className="flex flex-col items-center">
                                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                                <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
                              </div>
                            </td>
                          </tr>
                        )}

                        {!loading && paginatedPolicies.length === 0 && !error && (
                          <tr>
                            <td colSpan={7} className="px-6 py-12 text-center">
                              <div className="flex flex-col items-center">
                                <FileText className="w-12 h-12 text-slate-400 mb-4" />
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                  No Policies Found
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300">
                                  No policies match your current search criteria.
                                </p>
                              </div>
                            </td>
                          </tr>
                        )}

                        {!loading && paginatedPolicies.map((policy, index) => (
                          <motion.tr
                            key={policy.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: index * 0.05 }}
                            className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                                  <FileText className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                                </div>
                                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                  {policy.policy_number}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-slate-400" />
                                <span className="text-sm text-slate-900 dark:text-white">
                                  {policy.policy_holder_name}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300">
                                {policy.policy_type}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">
                              {formatCurrency(policy.sum_assured)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(policy.status)}`}>
                                {policy.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                <Calendar className="w-4 h-4" />
                                {policy.end_date}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center gap-2">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleView(policy.id)}
                                  className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                  title="View Policy"
                                >
                                  <Eye className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleEdit(policy.id)}
                                  className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                                  title="Edit Policy"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleRenew()}
                                  className="p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                                  title="Renew Policy"
                                >
                                  <RotateCcw className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleDelete(policy.id)}
                                  className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                  title="Delete Policy"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </motion.button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                    <span className="font-medium">{Math.min(startIndex + entriesPerPage, filteredPolicies.length)}</span> of{" "}
                    <span className="font-medium">{filteredPolicies.length}</span> entries
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Prev
                    </motion.button>

                    <div className="flex gap-1">
                      {[...Array(totalPages)].slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2)).map((_, idx) => {
                        const pageNum = Math.max(0, currentPage - 3) + idx + 1;
                        return (
                          <motion.button
                            key={pageNum}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-3 py-2 rounded-lg transition-colors ${
                              currentPage === pageNum
                                ? 'bg-cyan-600 text-white shadow-lg'
                                : 'border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {pageNum}
                          </motion.button>
                        );
                      })}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-1"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
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

export default ManagePolicy;
