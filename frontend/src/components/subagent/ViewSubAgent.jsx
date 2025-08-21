// "use client"
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const DetailItem = ({ label, value }) => (
//     <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
//         <dt className="text-sm font-medium text-gray-500">{label}</dt>
//         <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value || '-'}</dd>
//     </div>
// );

// const ViewSubAgent = () => {
//     const { agentId } = useParams();
//     const navigate = useNavigate();
//     const [agentData, setAgentData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchAgentDetails = async () => {
//             try {
//                 const response = await axios.get(`http://127.0.0.1:8000/agent/sub-agents/${agentId}/`);
//                 setAgentData(response.data);
//             } catch (err) {
//                 setError("Failed to fetch sub-agent details.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchAgentDetails();
//     }, [agentId]);

//     if (loading) return <div className="p-6 text-center">Loading...</div>;
//     if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
//     if (!agentData) return null;

//     return (
//         <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
//             <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md border">
//                 <div className="px-4 py-5 sm:px-6 border-b">
//                     <h3 className="text-lg font-medium text-gray-900">Sub-Agent Details</h3>
//                 </div>
//                 <div className="px-4 py-5 sm:p-6">
//                     <dl className="divide-y divide-gray-200">
//                         {Object.entries(agentData).map(([key, value]) => (
//                              <DetailItem key={key} label={key.replace(/_/g, ' ')} value={value} />
//                         ))}
//                     </dl>
//                 </div>
//                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
//                     <button onClick={() => navigate('/dashboard')} className="px-4 py-2 bg-gray-600 text-white rounded-md">
//                         Back to List
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ViewSubAgent;

"use client"
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  Eye, 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  MapPin, 
  Briefcase,
  CreditCard,
  FileText,
  Loader2, 
  AlertCircle,
  UserCheck
} from 'lucide-react';

const DetailItem = ({ label, value, icon: Icon }) => (
    <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="py-4 sm:grid sm:grid-cols-3 sm:gap-6 items-center hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors rounded-lg px-4"
    >
        <dt className="text-sm font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-2">
            {Icon && <Icon className="w-4 h-4" />}
            {label}
        </dt>
        <dd className="mt-1 text-sm text-slate-900 dark:text-white sm:mt-0 sm:col-span-2 font-medium">
            {value || <span className="text-slate-400">Not provided</span>}
        </dd>
    </motion.div>
);

const ViewSubAgent = () => {
    const { agentId } = useParams();
    const navigate = useNavigate();
    const [agentData, setAgentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAgentDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/agent/sub-agents/${agentId}/`);
                setAgentData(response.data);
            } catch (err) {
                setError("Failed to fetch sub-agent details.");
            } finally {
                setLoading(false);
            }
        };
        fetchAgentDetails();
    }, [agentId]);

    const getFieldIcon = (key) => {
        const keyLower = key.toLowerCase();
        if (keyLower.includes('first_name') || keyLower.includes('last_name') || keyLower.includes('middle_name')) return User;
        if (keyLower.includes('phone') || keyLower.includes('mobile')) return Phone;
        if (keyLower.includes('email')) return Mail;
        if (keyLower.includes('address') || keyLower.includes('city') || keyLower.includes('state')) return MapPin;
        if (keyLower.includes('date') || keyLower.includes('dob') || keyLower.includes('joining')) return Calendar;
        if (keyLower.includes('agent_code')) return CreditCard;
        if (keyLower.includes('experience') || keyLower.includes('specialization')) return Briefcase;
        if (keyLower.includes('document') || keyLower.includes('resume')) return FileText;
        return null;
    };

    const getStatusColor = (status) => {
        const colors = {
            'Active': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
            'Inactive': 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300',
            'Suspended': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
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
                        Loading Agent Details
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                        Fetching sub-agent information...
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
                        Error Loading Agent
                    </h3>
                    <p className="text-red-600 dark:text-red-400 mb-6">{error}</p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-200"
                    >
                        Go Back
                    </button>
                </motion.div>
            </div>
        );
    }

    if (!agentData) return null;

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
                        onClick={() => navigate('/dashboard')}
                        className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 font-medium transition-colors duration-200"
                    >
                        <ArrowLeft size={18} />
                        Back to Dashboard
                    </button>
                </motion.div>

                {/* Main Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                        <div className="relative flex items-center gap-4">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                <UserCheck className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">
                                    Sub-Agent Details
                                </h1>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="bg-white/20 px-3 py-1 rounded-full text-white text-sm font-medium">
                                        {agentData.first_name} {agentData.last_name}
                                    </span>
                                    {agentData.status && (
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(agentData.status)}`}>
                                            {agentData.status}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="grid gap-2">
                                {Object.entries(agentData).map(([key, value], index) => {
                                    // Format the label
                                    const formattedLabel = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                                    
                                    // Handle special formatting for certain fields
                                    let displayValue = value;
                                    if (key === 'date_of_birth' || key === 'joining_date') {
                                        displayValue = value ? new Date(value).toLocaleDateString() : value;
                                    }
                                    
                                    return (
                                        <motion.div
                                            key={key}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 + index * 0.05 }}
                                        >
                                            <DetailItem 
                                                label={formattedLabel} 
                                                value={displayValue} 
                                                icon={getFieldIcon(key)}
                                            />
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>

                    {/* Footer */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 px-8 py-6 border-t border-slate-200 dark:border-slate-700">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-sm text-slate-600 dark:text-slate-400">
                                <p>Agent ID: <span className="font-medium">{agentId}</span></p>
                                <p>Agent Code: <span className="font-medium">{agentData.agent_code}</span></p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/dashboard')}
                                className="px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-semibold rounded-xl hover:from-slate-700 hover:to-slate-800 transition-all duration-200 shadow-lg"
                            >
                                Back to List
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Additional Info Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-800/30"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-600 rounded-xl flex items-center justify-center">
                            <Briefcase className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                Sub-Agent Information
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300 text-sm">
                                Complete profile and professional details for this sub-agent are displayed above.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ViewSubAgent;
