// "use client"
// import React, { useState, useEffect } from "react";
// import axios from 'axios';

// const DeletedPolicies = () => {
//     const [deletedPolicies, setDeletedPolicies] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [entriesPerPage, setEntriesPerPage] = useState(10);
//     const [currentPage, setCurrentPage] = useState(1);

//     const fetchDeletedPolicies = async () => {
//         try {
//             setLoading(true);
//             const response = await axios.get("http://127.0.0.1:8000/policy/policies/deleted/");
//             setDeletedPolicies(response.data);
//         } catch (err) {
//             setError("Failed to fetch deleted policies.");
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchDeletedPolicies();
//     }, []);

//     const handleRestore = async (id) => {
//         if (window.confirm("Are you sure you want to restore this policy?")) {
//             try {
//                 await axios.post("http://127.0.0.1:8000/policy/policies/deleted/", { id });
//                 setDeletedPolicies(prev => prev.filter(p => p.id !== id));
//             } catch (err) {
//                 alert("Failed to restore policy.");
//             }
//         }
//     };

//     const handlePermanentDelete = async (id) => {
//         if (window.confirm("PERMANENTLY DELETE this policy? This action cannot be undone.")) {
//             try {
//                 await axios.delete("http://127.0.0.1:8000/policy/policies/deleted/", { data: { id } });
//                 setDeletedPolicies(prev => prev.filter(p => p.id !== id));
//             } catch (err) {
//                 alert("Failed to permanently delete policy.");
//             }
//         }
//     };
    
//     const filteredPolicies = deletedPolicies.filter((policy) =>
//         Object.values(policy).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase()))
//     );

//     const totalPages = Math.ceil(filteredPolicies.length / entriesPerPage);
//     const startIndex = (currentPage - 1) * entriesPerPage;
//     const paginatedPolicies = filteredPolicies.slice(startIndex, startIndex + entriesPerPage);

//     const formatCurrency = (amount) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

//     return (
//         <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Deleted Policies (Trash)</h1>
//             <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
//                 <div className="flex justify-end mb-4">
//                     <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md" placeholder="Search trash..."/>
//                 </div>
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-red-50">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Policy No</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Holder</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deleted Date</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {loading && <tr><td colSpan="5" className="text-center py-4">Loading...</td></tr>}
//                             {error && <tr><td colSpan="5" className="text-center py-4 text-red-500">{error}</td></tr>}
//                             {!loading && paginatedPolicies.map((policy) => (
//                                 <tr key={policy.id}>
//                                     <td className="px-6 py-4">{policy.policy_number}</td>
//                                     <td className="px-6 py-4">{policy.policy_holder_name}</td>
//                                     <td className="px-6 py-4">{policy.policy_type}</td>
//                                     <td className="px-6 py-4">{new Date(policy.deleted_at).toLocaleDateString()}</td>
//                                     <td className="px-6 py-4">
//                                         <div className="flex space-x-4">
//                                             <button onClick={() => handleRestore(policy.id)} className="text-green-600 hover:text-green-900">Restore</button>
//                                             <button onClick={() => handlePermanentDelete(policy.id)} className="text-red-600 hover:text-red-900">Delete Forever</button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DeletedPolicies;

"use client"
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import { 
  Trash2, 
  Search, 
  RotateCcw, 
  XCircle, 
  Calendar,
  FileText,
  User,
  Loader2,
  AlertCircle,
  Archive
} from "lucide-react";

const DeletedPolicies = () => {
    const [deletedPolicies, setDeletedPolicies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchDeletedPolicies = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://127.0.0.1:8000/policy/policies/deleted/");
            setDeletedPolicies(response.data);
        } catch (err) {
            setError("Failed to fetch deleted policies.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDeletedPolicies();
    }, []);

    const handleRestore = async (id) => {
        if (window.confirm("Are you sure you want to restore this policy?")) {
            try {
                await axios.post("http://127.0.0.1:8000/policy/policies/deleted/", { id });
                setDeletedPolicies(prev => prev.filter(p => p.id !== id));
            } catch (err) {
                alert("Failed to restore policy.");
            }
        }
    };

    const handlePermanentDelete = async (id) => {
        if (window.confirm("PERMANENTLY DELETE this policy? This action cannot be undone.")) {
            try {
                await axios.delete("http://127.0.0.1:8000/policy/policies/deleted/", { data: { id } });
                setDeletedPolicies(prev => prev.filter(p => p.id !== id));
            } catch (err) {
                alert("Failed to permanently delete policy.");
            }
        }
    };
    
    const filteredPolicies = deletedPolicies.filter((policy) =>
        Object.values(policy).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const totalPages = Math.ceil(filteredPolicies.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const paginatedPolicies = filteredPolicies.slice(startIndex, startIndex + entriesPerPage);

    const formatCurrency = (amount) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

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
                        Loading Deleted Policies
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                        Fetching deleted policy records...
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
                        Error Loading Policies
                    </h3>
                    <p className="text-red-600 dark:text-red-400 mb-6">{error}</p>
                    <button
                        onClick={fetchDeletedPolicies}
                        className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-200"
                    >
                        Try Again
                    </button>
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
                                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                                        <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
                                    </div>
                                    Deleted Policies (Trash)
                                </h1>
                                <p className="text-slate-600 dark:text-slate-300 mt-2">
                                    Manage deleted policy records - restore or permanently delete
                                </p>
                            </div>
                            <div className="bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-xl">
                                <span className="text-red-600 dark:text-red-400 font-semibold">
                                    {filteredPolicies.length} deleted policies
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Main Content */}
                    <motion.div variants={cardVariants}>
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                            <div className="p-6">
                                {/* Search Controls */}
                                <div className="flex items-center justify-end mb-6">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input 
                                            type="text" 
                                            value={searchTerm} 
                                            onChange={(e) => setSearchTerm(e.target.value)} 
                                            className="pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all w-80"
                                            placeholder="Search deleted policies..."
                                        />
                                    </div>
                                </div>

                                {/* Table */}
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                                        <thead className="bg-red-50 dark:bg-red-900/20">
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
                                                        <Calendar size={14} />
                                                        Deleted Date
                                                    </div>
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                                            <AnimatePresence>
                                                {paginatedPolicies.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="5" className="px-6 py-12 text-center">
                                                            <div className="flex flex-col items-center">
                                                                <Archive className="w-12 h-12 text-slate-400 mb-4" />
                                                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                                                    No Deleted Policies
                                                                </h3>
                                                                <p className="text-slate-600 dark:text-slate-300">
                                                                    No deleted policy records to display.
                                                                </p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    paginatedPolicies.map((policy, index) => (
                                                        <motion.tr
                                                            key={policy.id}
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -20 }}
                                                            transition={{ delay: index * 0.05 }}
                                                            className="hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                                                        >
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                                                                        <FileText className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                                                                    </div>
                                                                    <span className="text-sm font-medium text-slate-900 dark:text-white">
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
                                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                                                                    {policy.policy_type}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                                                    <Calendar className="w-4 h-4" />
                                                                    {new Date(policy.deleted_at).toLocaleDateString()}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                <div className="flex items-center gap-2">
                                                                    <motion.button
                                                                        whileHover={{ scale: 1.1 }}
                                                                        whileTap={{ scale: 0.9 }}
                                                                        onClick={() => handleRestore(policy.id)}
                                                                        className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                                                                        title="Restore Policy"
                                                                    >
                                                                        <RotateCcw className="w-4 h-4" />
                                                                    </motion.button>
                                                                    <motion.button
                                                                        whileHover={{ scale: 1.1 }}
                                                                        whileTap={{ scale: 0.9 }}
                                                                        onClick={() => handlePermanentDelete(policy.id)}
                                                                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                                        title="Delete Forever"
                                                                    >
                                                                        <XCircle className="w-4 h-4" />
                                                                    </motion.button>
                                                                </div>
                                                            </td>
                                                        </motion.tr>
                                                    ))
                                                )}
                                            </AnimatePresence>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Warning Notice */}
                    {deletedPolicies.length > 0 && (
                        <motion.div
                            variants={cardVariants}
                            className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 rounded-2xl p-6 border border-red-200 dark:border-red-800/30"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-red-600 rounded-xl flex items-center justify-center">
                                    <AlertCircle className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                        Important Notice
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-300 text-sm">
                                        Deleted policies can be restored or permanently deleted. Permanent deletion cannot be undone.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default DeletedPolicies;
