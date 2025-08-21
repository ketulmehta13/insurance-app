// "use client"
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const EditPolicy = () => {
//     const { policyId } = useParams();
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState(null);
//     const [newPolicyDocument, setNewPolicyDocument] = useState(null); // State for new file upload
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [message, setMessage] = useState("");

//     useEffect(() => {
//         const fetchPolicyDetails = async () => {
//             try {
//                 const response = await axios.get(`http://127.0.0.1:8000/policy/policies/${policyId}/`);
//                 setFormData(response.data);
//             } catch (err) {
//                 setError("Failed to fetch policy details for editing.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPolicyDetails();
//     }, [policyId]);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };
    
//     const handleFileChange = (e) => {
//         setNewPolicyDocument(e.target.files[0] || null);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setMessage("");
//         setError(null);

//         const submissionData = new FormData();

//         // Append all form fields EXCEPT the policy_document URL
//         Object.entries(formData).forEach(([key, value]) => {
//             if (key !== 'policy_holder_name' && key !== 'policy_document') {
//                 submissionData.append(key, value);
//             }
//         });

//         // If a new document was selected, append it to the form data.
//         if (newPolicyDocument) {
//             submissionData.append('policy_document', newPolicyDocument);
//         }

//         try {
//             await axios.patch(`http://127.0.0.1:8000/policy/policies/${policyId}/`, submissionData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             setMessage("Policy updated successfully!");
//             setTimeout(() => navigate('/dashboard/policymanagement/managepolicy'), 2000);
//         } catch (err) {
//             setError("Failed to update policy.");
//             console.error(err.response ? err.response.data : err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) return <div className="p-6 text-center">Loading form...</div>;
//     if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
//     if (!formData) return null;

//     return (
//         <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
//             <div className="max-w-4xl mx-auto">
//                 <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Edit Policy: {formData.policy_number}</h1>
//                 <div className="bg-white rounded-lg shadow-md p-6 md:p-8 border border-gray-200">
//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Policy Holder</label>
//                                 <input type="text" value={formData.policy_holder_name} disabled className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"/>
//                             </div>
//                              <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
//                                 <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md">
//                                     <option value="Active">Active</option>
//                                     <option value="Expired">Expired</option>
//                                     <option value="Cancelled">Cancelled</option>
//                                     <option value="Pending">Pending</option>
//                                     <option value="Due for Renewal">Due for Renewal</option>
//                                 </select>
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Premium Amount</label>
//                                 <input type="number" name="premium_amount" value={formData.premium_amount} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
//                             </div>
//                              <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Sum Assured</label>
//                                 <input type="number" name="sum_assured" value={formData.sum_assured} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
//                             </div>
//                              <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
//                                 <input type="date" name="end_date" value={formData.end_date} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
//                             </div>
//                              <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Upload New Policy Document</label>
//                                 <input type="file" name="policy_document" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
//                                 {formData.policy_document && !newPolicyDocument && (
//                                     <p className="text-xs text-gray-500 mt-1">Current: <a href={formData.policy_document} target="_blank" rel="noopener noreferrer" className="text-blue-600">View Document</a></p>
//                                 )}
//                             </div>
//                         </div>
                        
//                         {message && <div className="p-4 text-center text-green-800 bg-green-100 rounded-md">{message}</div>}
//                         {error && <div className="p-4 text-center text-red-800 bg-red-100 rounded-md">{error}</div>}

//                         <div className="flex justify-end space-x-4 pt-4 border-t">
//                             <button type="button" onClick={() => navigate("/dashboard/policymanagement/managepolicy")} disabled={loading} className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700">
//                                 Cancel
//                             </button>
//                             <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
//                                 {loading ? 'Saving...' : 'Save Changes'}
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EditPolicy;

"use client"
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  Edit3, 
  ArrowLeft, 
  Save, 
  Loader2, 
  AlertCircle, 
  CheckCircle,
  FileText,
  User,
  DollarSign,
  Calendar,
  Upload,
  ExternalLink,
  Shield
} from 'lucide-react';

const EditPolicy = () => {
    const { policyId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(null);
    const [newPolicyDocument, setNewPolicyDocument] = useState(null); // State for new file upload
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchPolicyDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/policy/policies/${policyId}/`);
                setFormData(response.data);
            } catch (err) {
                setError("Failed to fetch policy details for editing.");
            } finally {
                setLoading(false);
            }
        };
        fetchPolicyDetails();
    }, [policyId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (message || error) {
            setMessage("");
            setError(null);
        }
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleFileChange = (e) => {
        setNewPolicyDocument(e.target.files[0] || null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError(null);

        const submissionData = new FormData();

        // Append all form fields EXCEPT the policy_document URL
        Object.entries(formData).forEach(([key, value]) => {
            if (key !== 'policy_holder_name' && key !== 'policy_document') {
                submissionData.append(key, value);
            }
        });

        // If a new document was selected, append it to the form data.
        if (newPolicyDocument) {
            submissionData.append('policy_document', newPolicyDocument);
        }

        try {
            await axios.patch(`http://127.0.0.1:8000/policy/policies/${policyId}/`, submissionData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage("Policy updated successfully!");
            setTimeout(() => navigate('/dashboard/policymanagement/managepolicy'), 2000);
        } catch (err) {
            setError("Failed to update policy.");
            console.error(err.response ? err.response.data : err);
        } finally {
            setLoading(false);
        }
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

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <Loader2 className="w-12 h-12 text-cyan-600 animate-spin mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                        Loading Policy Details
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                        Fetching policy information for editing...
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
                        Error Loading Policy
                    </h3>
                    <p className="text-red-600 dark:text-red-400 mb-6">{error}</p>
                    <button
                        onClick={() => navigate("/dashboard/policymanagement/managepolicy")}
                        className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-200"
                    >
                        Go Back
                    </button>
                </motion.div>
            </div>
        );
    }

    if (!formData) return null;

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
                        onClick={() => navigate("/dashboard/policymanagement/managepolicy")}
                        className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 font-medium transition-colors duration-200"
                    >
                        <ArrowLeft size={18} />
                        Back to Policies
                    </button>
                </motion.div>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-6">
                        <Edit3 className="text-indigo-600 dark:text-indigo-400" size={32} />
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                        Edit Policy
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-300">
                        <FileText size={16} />
                        <span className="font-medium">{formData.policy_number}</span>
                    </div>
                </motion.div>

                {/* Form Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8"
                >
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Policy Holder Section */}
                        <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-6 border border-blue-200 dark:border-blue-800/30">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
                                    <User className="w-4 h-4 text-white" />
                                </div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                    Policy Holder Information
                                </h2>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                    Policy Holder
                                </label>
                                <input 
                                    type="text" 
                                    value={formData.policy_holder_name} 
                                    disabled 
                                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-100 dark:bg-slate-600 text-slate-600 dark:text-slate-300 cursor-not-allowed"
                                />
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    Policy holder cannot be changed
                                </p>
                            </div>
                        </div>

                        {/* Editable Fields */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                    <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                    Policy Details
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                        Status
                                    </label>
                                    <select 
                                        name="status" 
                                        value={formData.status} 
                                        onChange={handleInputChange} 
                                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                                    >
                                        <option value="Active">✅ Active</option>
                                        <option value="Expired">❌ Expired</option>
                                        <option value="Cancelled">🚫 Cancelled</option>
                                        <option value="Pending">🕐 Pending</option>
                                        <option value="Due for Renewal">🔄 Due for Renewal</option>
                                    </select>
                                    <div className="mt-2">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(formData.status)}`}>
                                            Current: {formData.status}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} />
                                            End Date
                                        </div>
                                    </label>
                                    <input 
                                        type="date" 
                                        name="end_date" 
                                        value={formData.end_date} 
                                        onChange={handleInputChange} 
                                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                        <div className="flex items-center gap-2">
                                            <DollarSign size={16} />
                                            Premium Amount
                                        </div>
                                    </label>
                                    <input 
                                        type="number" 
                                        name="premium_amount" 
                                        value={formData.premium_amount} 
                                        onChange={handleInputChange} 
                                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                                        placeholder="0.00"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                        <div className="flex items-center gap-2">
                                            <DollarSign size={16} />
                                            Sum Assured
                                        </div>
                                    </label>
                                    <input 
                                        type="number" 
                                        name="sum_assured" 
                                        value={formData.sum_assured} 
                                        onChange={handleInputChange} 
                                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Document Upload Section */}
                        <div className="bg-purple-50 dark:bg-purple-900/10 rounded-xl p-6 border border-purple-200 dark:border-purple-800/30">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 bg-purple-600 rounded-xl flex items-center justify-center">
                                    <Upload className="w-4 h-4 text-white" />
                                </div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                    Policy Document
                                </h2>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                        Upload New Policy Document
                                    </label>
                                    <input 
                                        type="file" 
                                        name="policy_document" 
                                        onChange={handleFileChange} 
                                        className="w-full text-sm text-slate-500 dark:text-slate-400
                                            file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0
                                            file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700
                                            hover:file:bg-purple-200 dark:file:bg-purple-900/30 dark:file:text-purple-300
                                            file:transition-colors cursor-pointer"
                                    />
                                </div>
                                
                                {formData.policy_document && !newPolicyDocument && (
                                    <div className="flex items-center gap-2 p-3 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                                        <FileText className="w-4 h-4 text-slate-500" />
                                        <span className="text-sm text-slate-600 dark:text-slate-300">Current document:</span>
                                        <a 
                                            href={formData.policy_document} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="inline-flex items-center gap-1 text-sm text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 font-medium transition-colors"
                                        >
                                            View Document
                                            <ExternalLink size={12} />
                                        </a>
                                    </div>
                                )}

                                {newPolicyDocument && (
                                    <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span className="text-sm text-green-700 dark:text-green-300">
                                            New document selected: {newPolicyDocument.name}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Messages */}
                        <AnimatePresence>
                            {message && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="p-4 rounded-xl text-center flex items-center justify-center gap-3 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800"
                                >
                                    <CheckCircle size={20} />
                                    {message}
                                </motion.div>
                            )}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="p-4 rounded-xl text-center flex items-center justify-center gap-3 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800"
                                >
                                    <AlertCircle size={20} />
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Form Actions */}
                        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-8 border-t border-slate-200 dark:border-slate-700">
                            <motion.button 
                                type="button" 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate("/dashboard/policymanagement/managepolicy")} 
                                disabled={loading} 
                                className="px-8 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 disabled:opacity-50"
                            >
                                Cancel
                            </motion.button>
                            <motion.button 
                                type="submit" 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={loading} 
                                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save size={18} />
                                        Save Changes
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default EditPolicy;
