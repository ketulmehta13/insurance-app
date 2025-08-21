// "use client"
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';

// const ManageSubAgents = () => {
//     const navigate = useNavigate();
//     const [subAgents, setSubAgents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const [searchTerm, setSearchTerm] = useState("");
//     const [entriesPerPage, setEntriesPerPage] = useState(10);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [filterStatus, setFilterStatus] = useState("");
//     const [filterSpecialization, setFilterSpecialization] = useState("");

//     useEffect(() => {
//         const fetchSubAgents = async () => {
//             try {
//                 setLoading(true);
//                 const params = new URLSearchParams();
//                 if (filterStatus) params.append('status', filterStatus);
//                 if (filterSpecialization) params.append('specialization', filterSpecialization);

//                 const response = await axios.get("http://127.0.0.1:8000/agent/sub-agents/", { params });
//                 setSubAgents(response.data);
//             } catch (err) {
//                 setError("Failed to fetch sub-agent data.");
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchSubAgents();
//     }, [filterStatus, filterSpecialization]);

//     const filteredAgents = subAgents.filter((agent) =>
//         `${agent.first_name} ${agent.last_name} ${agent.agent_code} ${agent.email}`
//         .toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const totalPages = Math.ceil(filteredAgents.length / entriesPerPage);
//     const startIndex = (currentPage - 1) * entriesPerPage;
//     const paginatedAgents = filteredAgents.slice(startIndex, startIndex + entriesPerPage);

//     const handleView = (id) => navigate(`/dashboard/subagent/view/${id}`);
//     const handleEdit = (id) => navigate(`/dashboard/subagent/edit/${id}`);

//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure you want to delete this sub-agent?")) {
//             try {
//                 await axios.delete(`http://127.0.0.1:8000/agent/sub-agents/${id}/`);
//                 setSubAgents(prev => prev.filter(agent => agent.id !== id));
//             } catch (err) {
//                 setError("Failed to delete sub-agent.");
//             }
//         }
//     };
    
//     const formatCurrency = (amount) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

//     return (
//         <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Manage Sub Agents</h1>
            
//             {/* Filters and Search */}
//             <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 mb-6">
//                 <div className="flex flex-wrap items-center justify-between gap-4">
//                     <div className="flex items-center space-x-4">
//                         <div>
//                             <label className="text-sm font-medium text-gray-700">Status</label>
//                             <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 rounded-md">
//                                 <option value="">All</option>
//                                 <option value="Active">Active</option>
//                                 <option value="Inactive">Inactive</option>
//                                 <option value="Suspended">Suspended</option>
//                             </select>
//                         </div>
//                         <div>
//                             <label className="text-sm font-medium text-gray-700">Specialization</label>
//                              <select value={filterSpecialization} onChange={(e) => setFilterSpecialization(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 rounded-md">
//                                 <option value="">All</option>
//                                 <option value="Life Insurance">Life Insurance</option>
//                                 <option value="Health Insurance">Health Insurance</option>
//                                 <option value="Motor Insurance">Motor Insurance</option>
//                             </select>
//                         </div>
//                     </div>
//                     <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md" placeholder="Search by name, code, email..."/>
//                 </div>
//             </div>

//             {/* Data Table */}
//             <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Agent Code</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Specialization</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {loading && <tr><td colSpan="6" className="text-center py-4">Loading agents...</td></tr>}
//                             {error && <tr><td colSpan="6" className="text-center py-4 text-red-500">{error}</td></tr>}
//                             {!loading && paginatedAgents.map((agent) => (
//                                 <tr key={agent.id}>
//                                     <td className="px-6 py-4 text-sm font-medium text-blue-600">{agent.agent_code}</td>
//                                     <td className="px-6 py-4 text-sm text-gray-900">{`${agent.first_name} ${agent.last_name}`}</td>
//                                     <td className="px-6 py-4 text-sm text-gray-500">{agent.mobile_no}</td>
//                                     <td className="px-6 py-4 text-sm text-gray-500">{agent.specialization}</td>
//                                     <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${agent.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{agent.status}</span></td>
//                                     <td className="px-6 py-4 text-sm font-medium">
//                                         <div className="flex space-x-2">
//                                             <button onClick={() => handleView(agent.id)} className="text-blue-600 hover:text-blue-900">View</button>
//                                             <button onClick={() => handleEdit(agent.id)} className="text-green-600 hover:text-green-900">Edit</button>
//                                             <button onClick={() => handleDelete(agent.id)} className="text-red-600 hover:text-red-900">Delete</button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//                  {/* Pagination would go here */}
//             </div>
//         </div>
//     );
// };

// export default ManageSubAgents;

"use client"
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import { 
  Users, 
  UserCheck, 
  Search, 
  Eye, 
  Edit3, 
  Trash2, 
  Filter,
  ChevronLeft, 
  ChevronRight,
  Loader2,
  AlertCircle,
  Phone,
  Mail,
  CreditCard,
  User
} from "lucide-react";

const ManageSubAgents = () => {
    const navigate = useNavigate();
    const [subAgents, setSubAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterStatus, setFilterStatus] = useState("");
    const [filterSpecialization, setFilterSpecialization] = useState("");

    useEffect(() => {
        const fetchSubAgents = async () => {
            try {
                setLoading(true);
                const params = new URLSearchParams();
                if (filterStatus) params.append('status', filterStatus);
                if (filterSpecialization) params.append('specialization', filterSpecialization);

                const response = await axios.get("http://127.0.0.1:8000/agent/sub-agents/", { params });
                setSubAgents(response.data);
            } catch (err) {
                setError("Failed to fetch sub-agent data.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchSubAgents();
    }, [filterStatus, filterSpecialization]);

    const filteredAgents = subAgents.filter((agent) =>
        `${agent.first_name} ${agent.last_name} ${agent.agent_code} ${agent.email}`
        .toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredAgents.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const paginatedAgents = filteredAgents.slice(startIndex, startIndex + entriesPerPage);

    const handleView = (id) => navigate(`/dashboard/subagent/view/${id}`);
    const handleEdit = (id) => navigate(`/dashboard/subagent/edit/${id}`);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this sub-agent?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/agent/sub-agents/${id}/`);
                setSubAgents(prev => prev.filter(agent => agent.id !== id));
            } catch (err) {
                setError("Failed to delete sub-agent.");
            }
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            'Active': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
            'Inactive': 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300',
            'Suspended': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
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
                        Loading Sub Agents
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                        Fetching agent data...
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
                                    <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
                                        <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    Manage Sub Agents
                                </h1>
                                <p className="text-slate-600 dark:text-slate-300 mt-2">
                                    View and manage all registered sub-agents
                                </p>
                            </div>
                            <div className="bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-xl">
                                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                                    {filteredAgents.length} agents
                                </span>
                            </div>
                        </div>
                    </motion.div>
                    
                    {/* Filters and Search */}
                    <motion.div variants={cardVariants}>
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
                            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
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
                                                <option value="Active">✅ Active</option>
                                                <option value="Inactive">⏸️ Inactive</option>
                                                <option value="Suspended">🚫 Suspended</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Specialization</label>
                                            <select 
                                                value={filterSpecialization} 
                                                onChange={(e) => setFilterSpecialization(e.target.value)} 
                                                className="px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                                            >
                                                <option value="">All</option>
                                                <option value="Life Insurance">❤️ Life Insurance</option>
                                                <option value="Health Insurance">🏥 Health Insurance</option>
                                                <option value="Motor Insurance">🚗 Motor Insurance</option>
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
                                        className="pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all w-full lg:w-80"
                                        placeholder="Search by name, code, email..."
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Data Table */}
                    <motion.div variants={cardVariants}>
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                            <div className="p-6">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                                        <thead className="bg-slate-50 dark:bg-slate-900/50">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                    <div className="flex items-center gap-2">
                                                        <CreditCard size={14} />
                                                        Agent Code
                                                    </div>
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                    <div className="flex items-center gap-2">
                                                        <User size={14} />
                                                        Name
                                                    </div>
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                    <div className="flex items-center gap-2">
                                                        <Phone size={14} />
                                                        Contact
                                                    </div>
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                    Specialization
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                    Status
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
                                                        <td colSpan="6" className="px-6 py-12 text-center">
                                                            <div className="flex flex-col items-center">
                                                                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                                                                <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}

                                                {!loading && paginatedAgents.length === 0 && !error && (
                                                    <tr>
                                                        <td colSpan="6" className="px-6 py-12 text-center">
                                                            <div className="flex flex-col items-center">
                                                                <Users className="w-12 h-12 text-slate-400 mb-4" />
                                                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                                                    No Sub Agents Found
                                                                </h3>
                                                                <p className="text-slate-600 dark:text-slate-300">
                                                                    No sub-agents match your current search criteria.
                                                                </p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}

                                                {!loading && paginatedAgents.map((agent, index) => (
                                                    <motion.tr
                                                        key={agent.id}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -20 }}
                                                        transition={{ delay: index * 0.05 }}
                                                        className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                                                    >
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                                                                    <CreditCard className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                                                                </div>
                                                                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                                                    {agent.agent_code}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                                                                    <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                                                </div>
                                                                <div>
                                                                    <div className="text-sm font-medium text-slate-900 dark:text-white">
                                                                        {`${agent.first_name} ${agent.last_name}`}
                                                                    </div>
                                                                    <div className="text-sm text-slate-500 dark:text-slate-400">
                                                                        Sub Agent
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center gap-2">
                                                                <Phone className="w-4 h-4 text-slate-400" />
                                                                <span className="text-sm text-slate-600 dark:text-slate-300">
                                                                    {agent.mobile_no}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                                                                {agent.specialization}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(agent.status)}`}>
                                                                {agent.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                            <div className="flex items-center gap-2">
                                                                <motion.button
                                                                    whileHover={{ scale: 1.1 }}
                                                                    whileTap={{ scale: 0.9 }}
                                                                    onClick={() => handleView(agent.id)}
                                                                    className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                                                    title="View Agent"
                                                                >
                                                                    <Eye className="w-4 h-4" />
                                                                </motion.button>
                                                                <motion.button
                                                                    whileHover={{ scale: 1.1 }}
                                                                    whileTap={{ scale: 0.9 }}
                                                                    onClick={() => handleEdit(agent.id)}
                                                                    className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                                                                    title="Edit Agent"
                                                                >
                                                                    <Edit3 className="w-4 h-4" />
                                                                </motion.button>
                                                                <motion.button
                                                                    whileHover={{ scale: 1.1 }}
                                                                    whileTap={{ scale: 0.9 }}
                                                                    onClick={() => handleDelete(agent.id)}
                                                                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                                    title="Delete Agent"
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
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                                        <div className="text-sm text-slate-600 dark:text-slate-400">
                                            Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                                            <span className="font-medium">{Math.min(startIndex + entriesPerPage, filteredAgents.length)}</span> of{" "}
                                            <span className="font-medium">{filteredAgents.length}</span> entries
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
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
                                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                                disabled={currentPage === totalPages}
                                                className="px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-1"
                                            >
                                                Next
                                                <ChevronRight className="w-4 h-4" />
                                            </motion.button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default ManageSubAgents;
