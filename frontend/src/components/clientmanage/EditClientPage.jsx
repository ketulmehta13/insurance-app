// "use client"
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const EditClient = () => {
//     const { clientType, clientId } = useParams();
//     const decodedClientType = decodeURIComponent(clientType);
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [message, setMessage] = useState("");

//     useEffect(() => {
//         const fetchClientDetails = async () => {
//             try {
//                 const response = await axios.get(`http://127.0.0.1:8000/client/client-detail/${decodedClientType}/${clientId}/`);
//                 setFormData(response.data);
//             } catch (err) {
//                 setError("Failed to fetch client details for editing.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchClientDetails();
//     }, [decodedClientType, clientId]);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setMessage("");
//         setError(null);
//         try {
//             await axios.patch(`http://127.0.0.1:8000/client/client-detail/${decodedClientType}/${clientId}/`, formData);
//             setMessage("Client updated successfully!");
//             setTimeout(() => navigate('/dashboard/manageclient'), 2000);
//         } catch (err) {
//             setError("Failed to update client.");
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) return <div className="p-6 text-center">Loading form...</div>;
//     if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
//     if (!formData) return null;

//     const renderFormFields = () => {
//         return Object.keys(formData).map(key => {
//             if (key === 'id' || key.includes('_at') || key.includes('_file') || key.includes('_logo')) return null;
            
//             return (
//                 <div key={key}>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                         {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
//                     </label>
//                     <input
//                         type="text"
//                         name={key}
//                         value={formData[key] || ''}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>
//             );
//         });
//     };

//     return (
//         <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
//             <div className="max-w-4xl mx-auto">
//                 <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Edit {decodedClientType}</h1>
//                 <div className="bg-white rounded-lg shadow-md p-6 md:p-8 border border-gray-200">
//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         {renderFormFields()}
                        
//                         {message && <div className="p-4 text-center text-green-800 bg-green-100 rounded-md">{message}</div>}
//                         {error && <div className="p-4 text-center text-red-800 bg-red-100 rounded-md">{error}</div>}

//                         <div className="flex justify-end space-x-4 pt-4 border-t">
//                             <button type="button" onClick={() => navigate("/dashboard")} disabled={loading} className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors disabled:bg-gray-400">
//                                 Cancel
//                             </button>
//                             <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400">
//                                 {loading ? 'Saving...' : 'Save Changes'}
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EditClient;

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
  User,
  Users,
  Building
} from 'lucide-react';

const EditClient = () => {
    const { clientType, clientId } = useParams();
    const decodedClientType = decodeURIComponent(clientType);
    const navigate = useNavigate();

    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchClientDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/client/client-detail/${decodedClientType}/${clientId}/`);
                setFormData(response.data);
            } catch (err) {
                setError("Failed to fetch client details for editing.");
            } finally {
                setLoading(false);
            }
        };
        fetchClientDetails();
    }, [decodedClientType, clientId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError(null);
        try {
            await axios.patch(`http://127.0.0.1:8000/client/client-detail/${decodedClientType}/${clientId}/`, formData);
            setMessage("Client updated successfully!");
            setTimeout(() => navigate('/dashboard/manageclient'), 2000);
        } catch (err) {
            setError("Failed to update client.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getClientIcon = () => {
        switch(decodedClientType.toLowerCase()) {
            case 'family head':
            case 'familyhead':
                return Users;
            case 'family member':
            case 'familymember':
                return User;
            case 'firm':
                return Building;
            default:
                return Edit3;
        }
    };

    const getClientColor = () => {
        switch(decodedClientType.toLowerCase()) {
            case 'family head':
            case 'familyhead':
                return 'blue';
            case 'family member':
            case 'familymember':
                return 'green';
            case 'firm':
                return 'orange';
            default:
                return 'cyan';
        }
    };

    const renderFormFields = () => {
        const excludedFields = ['id', '_at', '_file', '_logo'];
        const fields = Object.keys(formData).filter(key => 
            !excludedFields.some(excluded => key.includes(excluded))
        );

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map((key, index) => (
                    <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                            {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </label>
                        <input
                            type="text"
                            name={key}
                            value={formData[key] || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                            placeholder={`Enter ${key.replace(/_/g, ' ')}`}
                        />
                    </motion.div>
                ))}
            </div>
        );
    };

    const IconComponent = getClientIcon();
    const colorClass = getClientColor();

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
                        Loading Client Details
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                        Fetching client information for editing...
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
                        Error Loading Client
                    </h3>
                    <p className="text-red-600 dark:text-red-400 mb-6">{error}</p>
                    <button
                        onClick={() => navigate("/dashboard")}
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
                        onClick={() => navigate("/dashboard")}
                        className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 font-medium transition-colors duration-200"
                    >
                        <ArrowLeft size={18} />
                        Back to Dashboard
                    </button>
                </motion.div>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-${colorClass}-100 dark:bg-${colorClass}-900/30 rounded-full mb-6`}>
                        <IconComponent className={`text-${colorClass}-600 dark:text-${colorClass}-400`} size={32} />
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                        Edit {decodedClientType}
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300">
                        Update client information and save changes
                    </p>
                </motion.div>

                {/* Form Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8"
                >
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Form Fields */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                                    <Edit3 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                    Client Information
                                </h2>
                            </div>
                            
                            {renderFormFields()}
                        </div>
                        
                        {/* Message Display */}
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
                        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                            <motion.button 
                                type="button" 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate("/dashboard")} 
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
                                className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-slate-700 text-white font-semibold rounded-xl hover:from-cyan-700 hover:to-slate-800 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
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

export default EditClient;
