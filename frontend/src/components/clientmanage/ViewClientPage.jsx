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

// const ViewClient = () => {
//     const { clientType, clientId } = useParams();
//     const navigate = useNavigate();
//     const [clientData, setClientData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchClientDetails = async () => {
//             try {
//                 const decodedClientType = decodeURIComponent(clientType);
//                 const response = await axios.get(`http://127.0.0.1:8000/client/client-detail/${decodedClientType}/${clientId}/`);
//                 setClientData(response.data);
//             } catch (err) {
//                 setError("Failed to fetch client details.");
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchClientDetails();
//     }, [clientType, clientId]);

//     if (loading) return <div className="p-6 text-center">Loading...</div>;
//     if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
//     if (!clientData) return <div className="p-6 text-center">No client data found.</div>;

//     const decodedClientType = decodeURIComponent(clientType);

//     return (
//         <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
//             <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
//                 <div className="px-4 py-5 sm:px-6 border-b">
//                     <h3 className="text-lg leading-6 font-medium text-gray-900">
//                         Client Details - {decodedClientType}
//                     </h3>
//                     <p className="mt-1 max-w-2xl text-sm text-gray-500">
//                         Viewing record for ID: {clientId}
//                     </p>
//                 </div>
//                 <div className="px-4 py-5 sm:p-6">
//                     <dl className="divide-y divide-gray-200">
//                         {Object.entries(clientData).map(([key, value]) => (
//                             <DetailItem key={key} label={key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} value={value} />
//                         ))}
//                     </dl>
//                 </div>
//                 <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
//                     <button
//                         onClick={() => navigate('/dashboard')}
//                         className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700"
//                     >
//                         Back to List
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ViewClient;

"use client"
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  Eye, 
  ArrowLeft, 
  User, 
  Users, 
  Building, 
  Loader2, 
  AlertCircle,
  Calendar,
  Phone,
  Mail,
  MapPin,
  CreditCard
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

const ViewClient = () => {
    const { clientType, clientId } = useParams();
    const navigate = useNavigate();
    const [clientData, setClientData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClientDetails = async () => {
            try {
                const decodedClientType = decodeURIComponent(clientType);
                const response = await axios.get(`http://127.0.0.1:8000/client/client-detail/${decodedClientType}/${clientId}/`);
                setClientData(response.data);
            } catch (err) {
                setError("Failed to fetch client details.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchClientDetails();
    }, [clientType, clientId]);

    const getClientIcon = () => {
        const decodedType = decodeURIComponent(clientType).toLowerCase();
        switch(decodedType) {
            case 'family head':
            case 'familyhead':
                return Users;
            case 'family member':
            case 'familymember':
                return User;
            case 'firm':
                return Building;
            default:
                return Eye;
        }
    };

    const getClientColor = () => {
        const decodedType = decodeURIComponent(clientType).toLowerCase();
        switch(decodedType) {
            case 'family head':
            case 'familyhead':
                return { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400', gradient: 'from-blue-500 to-indigo-600' };
            case 'family member':
            case 'familymember':
                return { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400', gradient: 'from-green-500 to-emerald-600' };
            case 'firm':
                return { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-600 dark:text-orange-400', gradient: 'from-orange-500 to-amber-600' };
            default:
                return { bg: 'bg-cyan-100 dark:bg-cyan-900/30', text: 'text-cyan-600 dark:text-cyan-400', gradient: 'from-cyan-500 to-slate-600' };
        }
    };

    const getFieldIcon = (key) => {
        const keyLower = key.toLowerCase();
        if (keyLower.includes('phone') || keyLower.includes('mobile')) return Phone;
        if (keyLower.includes('email')) return Mail;
        if (keyLower.includes('address') || keyLower.includes('city') || keyLower.includes('area')) return MapPin;
        if (keyLower.includes('date') || keyLower.includes('dob')) return Calendar;
        if (keyLower.includes('aadhar') || keyLower.includes('card')) return CreditCard;
        if (keyLower.includes('name')) return User;
        return null;
    };

    const IconComponent = getClientIcon();
    const colors = getClientColor();
    const decodedClientType = decodeURIComponent(clientType);

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
                        Fetching client information...
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
                        onClick={() => navigate('/dashboard')}
                        className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-200"
                    >
                        Go Back
                    </button>
                </motion.div>
            </div>
        );
    }

    if (!clientData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 max-w-md w-full mx-6 text-center border border-slate-200 dark:border-slate-700"
                >
                    <Eye className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                        No Data Found
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-6">
                        No client data found for this record.
                    </p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-6 py-3 bg-slate-600 text-white rounded-xl font-semibold hover:bg-slate-700 transition-all duration-200"
                    >
                        Go Back
                    </button>
                </motion.div>
            </div>
        );
    }

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
                    <div className={`bg-gradient-to-r ${colors.gradient} px-6 py-8 relative overflow-hidden`}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                        <div className="relative flex items-center gap-4">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                <IconComponent className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">
                                    Client Details
                                </h3>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="bg-white/20 px-3 py-1 rounded-full text-white text-sm font-medium">
                                        {decodedClientType}
                                    </span>
                                    <span className="bg-white/20 px-3 py-1 rounded-full text-white text-sm font-medium">
                                        ID: {clientId}
                                    </span>
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
                                {Object.entries(clientData).map(([key, value], index) => (
                                    <motion.div
                                        key={key}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + index * 0.05 }}
                                    >
                                        <DetailItem 
                                            label={key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} 
                                            value={value} 
                                            icon={getFieldIcon(key)}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Footer */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 px-8 py-6 border-t border-slate-200 dark:border-slate-700">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-sm text-slate-600 dark:text-slate-400">
                                <p>Record ID: <span className="font-medium">{clientId}</span></p>
                                <p>Client Type: <span className="font-medium">{decodedClientType}</span></p>
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
                    className="mt-6 bg-gradient-to-r from-cyan-50 to-slate-50 dark:from-cyan-900/10 dark:to-slate-800/50 rounded-2xl p-6 border border-cyan-200 dark:border-cyan-800/30"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-cyan-600 rounded-xl flex items-center justify-center">
                            <Eye className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                Client Information
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300 text-sm">
                                All available information for this {decodedClientType.toLowerCase()} record is displayed above.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ViewClient;
