// "use client"
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import axios from 'axios';

// const ManageClients = () => {
//     const navigate = useNavigate(); // Initialize the navigate function
//     const [clients, setClients] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const [searchTerm, setSearchTerm] = useState("");
//     const [entriesPerPage, setEntriesPerPage] = useState(10);
//     const [currentPage, setCurrentPage] = useState(1);
    
//     // Fetch data from the backend when the component mounts
//     useEffect(() => {
//         const fetchClients = async () => {
//             try {
//                 setLoading(true);
//                 const response = await axios.get("http://127.0.0.1:8000/client/manage-clients/");
//                 setClients(response.data);
//                 setError(null);
//             } catch (err) {
//                 setError("Failed to fetch client data. Please try again later.");
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchClients();
//     }, []);

//     const stats = [
//         { title: "Total Groups", value: clients.filter(c => c.client_type === 'Family Head').length, color: "bg-blue-500" },
//         { title: "Family Heads", value: clients.filter(c => c.client_type === 'Family Head').length, color: "bg-green-500" },
//         { title: "Total Members", value: clients.filter(c => c.client_type === 'Family Member').length, color: "bg-purple-500" },
//         { title: "Total Firms", value: clients.filter(c => c.client_type === 'Firm').length, color: "bg-orange-500" },
//     ];

//     const columns = [
//         { key: "id", label: "ID" },
//         { key: "client_type", label: "Type" },
//         { key: "group_with", label: "Group With" },
//         { key: "full_name", label: "Full Name" },
//         { key: "relation", label: "Relation/Designation" },
//         { key: "gender", label: "Gender" },
//         { key: "mobile_no", label: "Mobile No" },
//         { key: "email", label: "Email" },
//         { key: "client_status", label: "Status" },
//         { key: "actions", label: "Actions" },
//     ];

//     const filteredClients = clients.filter((client) =>
//         Object.values(client).some((value) =>
//             String(value).toLowerCase().includes(searchTerm.toLowerCase())
//         )
//     );

//     const totalPages = Math.ceil(filteredClients.length / entriesPerPage);
//     const startIndex = (currentPage - 1) * entriesPerPage;
//     const paginatedClients = filteredClients.slice(startIndex, startIndex + entriesPerPage);

//     const handleView = (id, client_type) => {
//         // CORRECTED: Added '/dashboard' prefix to the URL
//         navigate(`/dashboard/client/view/${encodeURIComponent(client_type)}/${id}`);
//     };

//     const handleEdit = (id, client_type) => {
//         // CORRECTED: Added '/dashboard' prefix to the URL
//         navigate(`/dashboard/client/edit/${encodeURIComponent(client_type)}/${id}`);
//     };

//     const handleDelete = async (id, client_type) => {
//         if (window.confirm(`Are you sure you want to delete this ${client_type}?`)) {
//             try {
//                 await axios.delete("http://127.0.0.1:8000/client/manage-clients/", {
//                     data: { id, client_type } // Send payload in the 'data' property for DELETE requests
//                 });
//                 // Refresh the list by filtering out the deleted client
//                 setClients(prevClients => prevClients.filter(c => !(c.id === id && c.client_type === client_type)));
//             } catch (err) {
//                 setError("Failed to delete client. Please try again.");
//                 console.error(err);
//             }
//         }
//     };

//     if (loading) return <div className="p-6 text-center text-gray-600">Loading client data...</div>;
//     if (error) return <div className="p-6 text-center text-red-600 bg-red-50 rounded-lg">{error}</div>;

//     return (
//         <div className="space-y-6 p-4 md:p-6">
//             <h1 className="text-2xl font-bold text-gray-900">Manage Clients</h1>
            
//             {/* Statistics Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {stats.map((stat, index) => (
//                     <div key={index} className="bg-white rounded-lg shadow-sm p-6 border-l-4" style={{ borderColor: stat.color.replace('bg-', '#') }}>
//                         <p className="text-sm font-medium text-gray-600">{stat.title}</p>
//                         <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
//                     </div>
//                 ))}
//             </div>

//             {/* Search and Controls */}
//             <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//                 <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//                     <div className="flex items-center space-x-2">
//                         <label className="text-sm font-medium text-gray-700">Show</label>
//                         <select
//                             value={entriesPerPage}
//                             onChange={(e) => { setEntriesPerPage(Number(e.target.value)); setCurrentPage(1); }}
//                             className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         >
//                             <option value={10}>10</option>
//                             <option value={25}>25</option>
//                             <option value={50}>50</option>
//                         </select>
//                         <span className="text-sm text-gray-600">entries</span>
//                     </div>
//                     <div className="w-full md:w-auto">
//                         <input
//                             type="text"
//                             value={searchTerm}
//                             onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
//                             className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="Search clients..."
//                         />
//                     </div>
//                 </div>

//                 {/* Data Table */}
//                 <div className="overflow-x-auto mt-4">
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 {columns.map((column) => (
//                                     <th key={column.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                         {column.label}
//                                     </th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {paginatedClients.map((client) => (
//                                 <tr key={`${client.client_type}-${client.id}`} className="hover:bg-gray-50">
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.id}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.client_type}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.group_with}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.full_name}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.relation}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.gender}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.mobile_no}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.email}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <span className={`px-2 py-1 text-xs font-semibold rounded-full ${client.client_status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
//                                             {client.client_status}
//                                         </span>
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                         <div className="flex space-x-2">
//                                             <button onClick={() => handleView(client.id, client.client_type)} className="text-blue-600 hover:text-blue-900">View</button>
//                                             <button onClick={() => handleEdit(client.id, client.client_type)} className="text-green-600 hover:text-green-900">Edit</button>
//                                             <button onClick={() => handleDelete(client.id, client.client_type)} className="text-red-600 hover:text-red-900">Delete</button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Pagination */}
//                 <div className="flex items-center justify-between mt-4">
//                     <div className="text-sm text-gray-700">
//                         Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, filteredClients.length)} of {filteredClients.length} entries
//                     </div>
//                     <div className="flex space-x-1">
//                         <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50">Prev</button>
//                         {[...Array(totalPages).keys()].map(page => (
//                             <button key={page + 1} onClick={() => setCurrentPage(page + 1)} className={`px-3 py-1 border rounded-md ${currentPage === page + 1 ? 'bg-blue-600 text-white' : 'border-gray-300'}`}>{page + 1}</button>
//                         ))}
//                         <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50">Next</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ManageClients;

"use client"
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import { 
  Users, 
  User, 
  Building, 
  Search, 
  Eye, 
  Edit3, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  Loader2,
  AlertCircle,
  Filter,
  MoreHorizontal
} from "lucide-react";

const ManageClients = () => {
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    
    // Fetch data from the backend when the component mounts
    useEffect(() => {
        const fetchClients = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://127.0.0.1:8000/client/manage-clients/");
                setClients(response.data);
                setError(null);
            } catch (err) {
                setError("Failed to fetch client data. Please try again later.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchClients();
    }, []);

    const stats = [
        { 
            title: "Total Groups", 
            value: clients.filter(c => c.client_type === 'Family Head').length, 
            color: "from-blue-500 to-indigo-600",
            bgColor: "bg-blue-100 dark:bg-blue-900/20",
            icon: Users
        },
        { 
            title: "Family Heads", 
            value: clients.filter(c => c.client_type === 'Family Head').length, 
            color: "from-green-500 to-emerald-600",
            bgColor: "bg-green-100 dark:bg-green-900/20",
            icon: User
        },
        { 
            title: "Total Members", 
            value: clients.filter(c => c.client_type === 'Family Member').length, 
            color: "from-purple-500 to-violet-600",
            bgColor: "bg-purple-100 dark:bg-purple-900/20",
            icon: Users
        },
        { 
            title: "Total Firms", 
            value: clients.filter(c => c.client_type === 'Firm').length, 
            color: "from-orange-500 to-amber-600",
            bgColor: "bg-orange-100 dark:bg-orange-900/20",
            icon: Building
        },
    ];

    const columns = [
        { key: "id", label: "ID" },
        { key: "client_type", label: "Type" },
        { key: "group_with", label: "Group With" },
        { key: "full_name", label: "Full Name" },
        { key: "relation", label: "Relation/Designation" },
        { key: "gender", label: "Gender" },
        { key: "mobile_no", label: "Mobile No" },
        { key: "email", label: "Email" },
        { key: "client_status", label: "Status" },
        { key: "actions", label: "Actions" },
    ];

    const filteredClients = clients.filter((client) =>
        Object.values(client).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const totalPages = Math.ceil(filteredClients.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const paginatedClients = filteredClients.slice(startIndex, startIndex + entriesPerPage);

    const handleView = (id, client_type) => {
        navigate(`/dashboard/client/view/${encodeURIComponent(client_type)}/${id}`);
    };

    const handleEdit = (id, client_type) => {
        navigate(`/dashboard/client/edit/${encodeURIComponent(client_type)}/${id}`);
    };

    const handleDelete = async (id, client_type) => {
        if (window.confirm(`Are you sure you want to delete this ${client_type}?`)) {
            try {
                await axios.delete("http://127.0.0.1:8000/client/manage-clients/", {
                    data: { id, client_type }
                });
                setClients(prevClients => prevClients.filter(c => !(c.id === id && c.client_type === client_type)));
            } catch (err) {
                setError("Failed to delete client. Please try again.");
                console.error(err);
            }
        }
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
            <div className="flex items-center justify-center min-h-96 p-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                >
                    <Loader2 className="w-12 h-12 text-cyan-600 animate-spin mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                        Loading Clients
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                        Fetching client data...
                    </p>
                </motion.div>
            </div>
        );
    }

    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center min-h-96 p-8"
            >
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 max-w-md w-full text-center border border-red-200 dark:border-red-800">
                    <AlertCircle className="w-16 h-16 text-red-600 dark:text-red-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                        Error Loading Clients
                    </h3>
                    <p className="text-red-600 dark:text-red-400 mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-200"
                    >
                        Try Again
                    </button>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 p-6"
        >
            {/* Header */}
            <motion.div variants={cardVariants}>
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                            <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center">
                                <Users className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                            </div>
                            Manage Clients
                        </h1>
                        <p className="text-slate-600 dark:text-slate-300 mt-2">
                            View and manage all client records in one place
                        </p>
                    </div>
                </div>
            </motion.div>
            
            {/* Statistics Cards */}
            <motion.div variants={cardVariants}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

            {/* Search and Controls */}
            <motion.div variants={cardVariants}>
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                    <div className="p-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-4">
                                <Filter className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Show</label>
                                    <select
                                        value={entriesPerPage}
                                        onChange={(e) => { setEntriesPerPage(Number(e.target.value)); setCurrentPage(1); }}
                                        className="px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                                    >
                                        <option value={10}>10</option>
                                        <option value={25}>25</option>
                                        <option value={50}>50</option>
                                    </select>
                                    <span className="text-sm text-slate-600 dark:text-slate-400">entries</span>
                                </div>
                            </div>
                            <div className="relative w-full md:w-auto">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                    className="w-full md:w-80 pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                                    placeholder="Search clients..."
                                />
                            </div>
                        </div>

                        {/* Data Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                                <thead className="bg-slate-50 dark:bg-slate-900/50">
                                    <tr>
                                        {columns.map((column) => (
                                            <th key={column.key} className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                {column.label}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                                    <AnimatePresence>
                                        {paginatedClients.map((client, index) => (
                                            <motion.tr
                                                key={`${client.client_type}-${client.id}`}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">
                                                    #{client.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300">
                                                        {client.client_type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">{client.group_with}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">{client.full_name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">{client.relation}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">{client.gender}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">{client.mobile_no}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">{client.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                                        client.client_status === "Active" 
                                                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" 
                                                            : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                                                    }`}>
                                                        {client.client_status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex items-center gap-2">
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={() => handleView(client.id, client.client_type)} 
                                                            className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                                            title="View"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </motion.button>
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={() => handleEdit(client.id, client.client_type)} 
                                                            className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Edit3 className="w-4 h-4" />
                                                        </motion.button>
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={() => handleDelete(client.id, client.client_type)} 
                                                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                            title="Delete"
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
                                Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(startIndex + entriesPerPage, filteredClients.length)}</span> of <span className="font-medium">{filteredClients.length}</span> entries
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
                                    {[...Array(totalPages).keys()].slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2)).map(page => (
                                        <motion.button
                                            key={page + 1}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setCurrentPage(page + 1)} 
                                            className={`px-3 py-2 rounded-lg transition-colors ${
                                                currentPage === page + 1 
                                                    ? 'bg-cyan-600 text-white shadow-lg' 
                                                    : 'border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                                            }`}
                                        >
                                            {page + 1}
                                        </motion.button>
                                    ))}
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
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ManageClients;
