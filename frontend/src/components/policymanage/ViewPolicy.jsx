// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const DetailItem = ({ label, value }) => (
//   <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
//     <dt className="text-sm font-medium text-gray-500">{label}</dt>
//     <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value || '-'}</dd>
//   </div>
// );

// const ViewPolicy = () => {
//   // Use the parameter name matching your Router config (id OR policyId)
//   const { policyId } = useParams(); 
//   const navigate = useNavigate();
//   const [policyData, setPolicyData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPolicyDetails = async () => {
//       try {
//         const response = await axios.get(`http://127.0.0.1:8000/policy/policies/${policyId}/`);
//         setPolicyData(response.data);
//       } catch (err) {
//         setError("Failed to fetch policy details.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPolicyDetails();
//   }, [policyId]); // match param name here

//   if (loading) return <div className="p-6 text-center">Loading Policy Details...</div>;
//   if (error) return <div className="p-6 text-center text-red-500 bg-red-50 rounded-lg">{error}</div>;
//   if (!policyData) return <div className="p-6 text-center">No policy data found.</div>;

//   return (
//     <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
//         <div className="px-4 py-5 sm:px-6 border-b">
//           <h3 className="text-lg leading-6 font-medium text-gray-900">
//             Policy Details
//           </h3>
//           <p className="mt-1 max-w-2xl text-sm text-gray-500">
//             Viewing Policy: <span className="font-semibold">{policyData.policy_number}</span>
//           </p>
//         </div>
//         <div className="px-4 py-5 sm:p-6">
//           <dl className="divide-y divide-gray-200">
//             {Object.entries(policyData).map(([key, value]) => {
//               if (key === 'id' || key === 'content_type' || key === 'object_id' || key === 'policy_document') return null;
//               return (
//                 <DetailItem 
//                   key={key} 
//                   label={key.replace(/\_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} 
//                   value={value} 
//                 />
//               );
//             })}
//              {policyData.policy_document && (
//                 <DetailItem 
//                   label="Policy Document" 
//                   value={<a href={policyData.policy_document} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Document</a>} 
//                 />
//               )}
//           </dl>
//         </div>
//         <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
//           <button
//             onClick={() => navigate('/dashboard/policymanagement/managepolicy')}
//             className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700"
//           >
//             Back to List
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewPolicy;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  Eye, 
  ArrowLeft, 
  FileText, 
  User, 
  Calendar, 
  DollarSign, 
  Building, 
  Shield,
  ExternalLink,
  Loader2, 
  AlertCircle,
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

const ViewPolicy = () => {
  // Use the parameter name matching your Router config (id OR policyId)
  const { policyId } = useParams(); 
  const navigate = useNavigate();
  const [policyData, setPolicyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolicyDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/policy/policies/${policyId}/`);
        setPolicyData(response.data);
      } catch (err) {
        setError("Failed to fetch policy details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPolicyDetails();
  }, [policyId]); // match param name here

  const getFieldIcon = (key) => {
    const keyLower = key.toLowerCase();
    if (keyLower.includes('policy_number') || keyLower.includes('number')) return FileText;
    if (keyLower.includes('holder') || keyLower.includes('name')) return User;
    if (keyLower.includes('company') || keyLower.includes('insurer')) return Building;
    if (keyLower.includes('type')) return Shield;
    if (keyLower.includes('date') || keyLower.includes('start') || keyLower.includes('end')) return Calendar;
    if (keyLower.includes('amount') || keyLower.includes('premium') || keyLower.includes('sum')) return DollarSign;
    if (keyLower.includes('phone') || keyLower.includes('mobile')) return Phone;
    if (keyLower.includes('email')) return Mail;
    if (keyLower.includes('address')) return MapPin;
    if (keyLower.includes('document')) return CreditCard;
    return null;
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

  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined || amount === "") return "-";
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
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
            Fetching policy information...
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
            onClick={() => navigate('/dashboard/policymanagement/managepolicy')}
            className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-200"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  if (!policyData) {
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
            No policy data found for this record.
          </p>
          <button
            onClick={() => navigate('/dashboard/policymanagement/managepolicy')}
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
            onClick={() => navigate('/dashboard/policymanagement/managepolicy')}
            className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 font-medium transition-colors duration-200"
          >
            <ArrowLeft size={18} />
            Back to Policies
          </button>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Policy Details
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-white text-sm font-medium">
                    {policyData.policy_number}
                  </span>
                  {policyData.status && (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(policyData.status)}`}>
                      {policyData.status}
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
                {Object.entries(policyData).map(([key, value], index) => {
                  if (key === 'id' || key === 'content_type' || key === 'object_id' || key === 'policy_document') return null;
                  
                  // Format currency values
                  let displayValue = value;
                  if ((key.includes('amount') || key.includes('sum')) && value) {
                    displayValue = formatCurrency(value);
                  }
                  
                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                    >
                      <DetailItem 
                        label={key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} 
                        value={displayValue} 
                        icon={getFieldIcon(key)}
                      />
                    </motion.div>
                  );
                })}
                
                {/* Policy Document */}
                {policyData.policy_document && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <DetailItem 
                      label="Policy Document" 
                      value={
                        <a 
                          href={policyData.policy_document} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 font-medium transition-colors"
                        >
                          View Document
                          <ExternalLink size={14} />
                        </a>
                      }
                      icon={CreditCard}
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="bg-slate-50 dark:bg-slate-900/50 px-8 py-6 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-slate-600 dark:text-slate-400">
                <p>Policy ID: <span className="font-medium">{policyId}</span></p>
                <p>Policy Number: <span className="font-medium">{policyData.policy_number}</span></p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dashboard/policymanagement/managepolicy')}
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
          className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-800/30"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Insurance Policy Information
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Complete policy details and coverage information are displayed above.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ViewPolicy;
