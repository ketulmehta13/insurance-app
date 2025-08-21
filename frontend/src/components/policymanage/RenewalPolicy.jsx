// "use client";
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';

// const RenewalPolicy = () => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedPolicy, setSelectedPolicy] = useState(null);
//   const [policiesDueForRenewal, setPoliciesDueForRenewal] = useState([]);
//   const [renewalData, setRenewalData] = useState({
//     new_premium_amount: "",
//     new_sum_assured: "",
//     renewal_date: "",
//     new_end_date: "",
//     remarks: "",
//   });

//   // UI state
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [message, setMessage] = useState("");

//   // Fetch policies due for renewal from the backend
//   useEffect(() => {
//     const fetchPolicies = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("http://127.0.0.1:8000/policy/policies/due-for-renewal/");
//         setPoliciesDueForRenewal(response.data);
//       } catch (err) {
//         setError("Failed to load policies due for renewal.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPolicies();
//   }, []);

//   // Apply the search filter
//   const filteredPolicies = policiesDueForRenewal.filter((policy) =>
//     Object.values(policy).some((value) =>
//       String(value).toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   // Handler for selecting a policy to renew
//   const handleSelectPolicy = (policy) => {
//     setSelectedPolicy(policy);
//     setRenewalData({
//       new_premium_amount: policy.premium_amount || "",
//       new_sum_assured: policy.sum_assured || "",
//       renewal_date: new Date().toISOString().split('T')[0],
//       new_end_date: "",
//       remarks: "",
//     });
//     setError(null);
//     setMessage("");
//   };

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setRenewalData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Form submit: renew policy
//   const handleRenewal = async (e) => {
//     e.preventDefault();
//     if (loading) return; // Prevent double submission
//     setLoading(true);
//     setMessage("");
//     setError(null);

//     const dataToSubmit = {
//       ...renewalData,
//       policy: selectedPolicy.id,
//     };

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/policy/policies/renew/", dataToSubmit);
//       setMessage(response.data.message || "Policy renewed successfully!");

//       // Remove the renewed policy
//       setPoliciesDueForRenewal(prev =>
//         prev.filter(p => p.id !== selectedPolicy.id)
//       );
//       setSelectedPolicy(null);
//       setRenewalData({
//         new_premium_amount: "",
//         new_sum_assured: "",
//         renewal_date: "",
//         new_end_date: "",
//         remarks: "",
//       });
//     } catch (err) {
//       setError("Failed to renew policy. Please check the details.");
//       console.error(err.response ? err.response.data : err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Improved formatter that doesn't break on empty value
//   const formatCurrency = (amount) => {
//     if (amount === null || amount === undefined || amount === "") return "-";
//     return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
//   };

//   return (
//     <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Policy Renewal</h1>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//         {/* Policies List */}
//         <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-lg font-semibold text-gray-900">Policies Due for Renewal</h2>
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-md"
//               placeholder="Search policies..."
//             />
//           </div>
//           <div className="space-y-3 max-h-[60vh] overflow-y-auto">
//             {loading && <p>Loading policies...</p>}
//             {error && <p className="text-red-500">{error}</p>}
//             {!loading && filteredPolicies.length === 0 && (
//               <p className="text-center text-gray-500 py-8">No policies are due for renewal.</p>
//             )}
//             {filteredPolicies.map((policy) => (
//               <div
//                 key={policy.id}
//                 className={`p-4 border rounded-lg cursor-pointer ${
//                   selectedPolicy?.id === policy.id
//                     ? "border-blue-500 bg-blue-50"
//                     : "border-gray-200 hover:border-gray-300"
//                 }`}
//                 onClick={() => handleSelectPolicy(policy)}
//               >
//                 <div className="flex justify-between">
//                   <div>
//                     <h3 className="font-medium">{policy.policy_number}</h3>
//                     <p className="text-sm text-gray-600">{policy.policy_holder_name}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm font-medium">{formatCurrency(policy.sum_assured)}</p>
//                     <p className="text-sm text-gray-600">Premium: {formatCurrency(policy.premium_amount)}</p>
//                   </div>
//                 </div>
//                 <p className="text-sm text-gray-600 mt-2">Expires on: {policy.end_date}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Renewal Form */}
//         <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Renewal Details</h2>
//           {selectedPolicy ? (
//             <form onSubmit={handleRenewal} className="space-y-6">
//               <div className="bg-gray-50 p-4 rounded-lg text-sm">
//                 <p>
//                   Renewing Policy:{" "}
//                   <span className="font-medium">{selectedPolicy.policy_number}</span>{" "}
//                   for <span className="font-medium">{selectedPolicy.policy_holder_name}</span>
//                 </p>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Renewal Date *
//                   </label>
//                   <input
//                     type="date"
//                     name="renewal_date"
//                     value={renewalData.renewal_date}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     New Expiry Date *
//                   </label>
//                   <input
//                     type="date"
//                     name="new_end_date"
//                     value={renewalData.new_end_date}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     New Sum Assured *
//                   </label>
//                   <input
//                     type="number"
//                     name="new_sum_assured"
//                     value={renewalData.new_sum_assured}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     New Premium Amount *
//                   </label>
//                   <input
//                     type="number"
//                     name="new_premium_amount"
//                     value={renewalData.new_premium_amount}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Remarks
//                 </label>
//                 <textarea
//                   name="remarks"
//                   value={renewalData.remarks}
//                   onChange={handleInputChange}
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   placeholder="Any additional notes..."
//                 />
//               </div>
//               {message && (
//                 <div className="p-3 text-center text-green-800 bg-green-100 rounded-md">
//                   {message}
//                 </div>
//               )}
//               {error && (
//                 <div className="p-3 text-center text-red-800 bg-red-100 rounded-md">
//                   {error}
//                 </div>
//               )}
//               <div className="flex justify-end space-x-4 pt-4 border-t">
//                 <button
//                   type="button"
//                   onClick={() => setSelectedPolicy(null)}
//                   className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
//                   disabled={loading}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-400"
//                 >
//                   {loading ? "Renewing..." : "Renew Policy"}
//                 </button>
//               </div>
//             </form>
//           ) : (
//             <div className="text-center py-16 text-gray-500">
//               <p className="text-lg font-medium">
//                 Select a policy from the list to begin renewal.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RenewalPolicy;

"use client";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import { 
  RotateCcw, 
  Search, 
  FileText, 
  User, 
  Calendar, 
  DollarSign, 
  MessageSquare,
  Loader2,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Save,
  Shield
} from "lucide-react";

const RenewalPolicy = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [policiesDueForRenewal, setPoliciesDueForRenewal] = useState([]);
  const [renewalData, setRenewalData] = useState({
    new_premium_amount: "",
    new_sum_assured: "",
    renewal_date: "",
    new_end_date: "",
    remarks: "",
  });

  // UI state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch policies due for renewal from the backend
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://127.0.0.1:8000/policy/policies/due-for-renewal/");
        setPoliciesDueForRenewal(response.data);
      } catch (err) {
        setError("Failed to load policies due for renewal.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPolicies();
  }, []);

  // Apply the search filter
  const filteredPolicies = policiesDueForRenewal.filter((policy) =>
    Object.values(policy).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Handler for selecting a policy to renew
  const handleSelectPolicy = (policy) => {
    setSelectedPolicy(policy);
    setRenewalData({
      new_premium_amount: policy.premium_amount || "",
      new_sum_assured: policy.sum_assured || "",
      renewal_date: new Date().toISOString().split('T')[0],
      new_end_date: "",
      remarks: "",
    });
    setError(null);
    setMessage("");
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (message || error) {
      setMessage("");
      setError(null);
    }
    setRenewalData((prev) => ({ ...prev, [name]: value }));
  };

  // Form submit: renew policy
  const handleRenewal = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent double submission
    setLoading(true);
    setMessage("");
    setError(null);

    const dataToSubmit = {
      ...renewalData,
      policy: selectedPolicy.id,
    };

    try {
      const response = await axios.post("http://127.0.0.1:8000/policy/policies/renew/", dataToSubmit);
      setMessage(response.data.message || "Policy renewed successfully!");

      // Remove the renewed policy
      setPoliciesDueForRenewal(prev =>
        prev.filter(p => p.id !== selectedPolicy.id)
      );
      setSelectedPolicy(null);
      setRenewalData({
        new_premium_amount: "",
        new_sum_assured: "",
        renewal_date: "",
        new_end_date: "",
        remarks: "",
      });
    } catch (err) {
      setError("Failed to renew policy. Please check the details.");
      console.error(err.response ? err.response.data : err);
    } finally {
      setLoading(false);
    }
  };

  // Improved formatter that doesn't break on empty value
  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined || amount === "") return "-";
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
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
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
            <RotateCcw className="text-green-600 dark:text-green-400" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Policy Renewal
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Renew existing insurance policies with updated terms
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Policies List */}
          <motion.div variants={cardVariants}>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-600 rounded-xl flex items-center justify-center">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      Policies Due for Renewal
                    </h2>
                  </div>
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-semibold">
                    {filteredPolicies.length} policies
                  </span>
                </div>
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                    placeholder="Search policies..."
                  />
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                  {loading && (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-8 h-8 text-cyan-600 animate-spin" />
                      <span className="ml-3 text-slate-600 dark:text-slate-300">Loading policies...</span>
                    </div>
                  )}
                  
                  {error && (
                    <div className="flex items-center justify-center py-12">
                      <div className="text-center">
                        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                        <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
                      </div>
                    </div>
                  )}
                  
                  {!loading && filteredPolicies.length === 0 && !error && (
                    <div className="text-center py-16">
                      <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                        No Policies Due
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300">
                        No policies are currently due for renewal.
                      </p>
                    </div>
                  )}

                  <AnimatePresence>
                    {filteredPolicies.map((policy, index) => (
                      <motion.div
                        key={policy.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                          selectedPolicy?.id === policy.id
                            ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20"
                            : "border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500"
                        }`}
                        onClick={() => handleSelectPolicy(policy)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="w-4 h-4 text-slate-500" />
                              <h3 className="font-semibold text-slate-900 dark:text-white">
                                {policy.policy_number}
                              </h3>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <User className="w-4 h-4 text-slate-400" />
                              <p className="text-sm text-slate-600 dark:text-slate-300">
                                {policy.policy_holder_name}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">
                              {formatCurrency(policy.sum_assured)}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-300">
                              Premium: {formatCurrency(policy.premium_amount)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-200 dark:border-slate-600">
                          <Calendar className="w-4 h-4 text-orange-500" />
                          <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                            Expires: {policy.end_date}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Renewal Form */}
          <motion.div variants={cardVariants}>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
                    <RotateCcw className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Renewal Details
                  </h2>
                </div>
              </div>

              <div className="p-6">
                {selectedPolicy ? (
                  <form onSubmit={handleRenewal} className="space-y-6">
                    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-4 rounded-xl border border-cyan-200 dark:border-cyan-800/30">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                        <div>
                          <p className="text-sm text-slate-700 dark:text-slate-300">
                            Renewing Policy: <span className="font-semibold text-slate-900 dark:text-white">{selectedPolicy.policy_number}</span>
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            For: <span className="font-medium">{selectedPolicy.policy_holder_name}</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            Renewal Date *
                          </div>
                        </label>
                        <input
                          type="date"
                          name="renewal_date"
                          value={renewalData.renewal_date}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            New Expiry Date *
                          </div>
                        </label>
                        <input
                          type="date"
                          name="new_end_date"
                          value={renewalData.new_end_date}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                          <div className="flex items-center gap-2">
                            <DollarSign size={16} />
                            New Sum Assured *
                          </div>
                        </label>
                        <input
                          type="number"
                          name="new_sum_assured"
                          value={renewalData.new_sum_assured}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                          <div className="flex items-center gap-2">
                            <DollarSign size={16} />
                            New Premium Amount *
                          </div>
                        </label>
                        <input
                          type="number"
                          name="new_premium_amount"
                          value={renewalData.new_premium_amount}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        <div className="flex items-center gap-2">
                          <MessageSquare size={16} />
                          Remarks
                        </div>
                      </label>
                      <textarea
                        name="remarks"
                        value={renewalData.remarks}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all resize-none"
                        placeholder="Any additional notes..."
                      />
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

                    <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedPolicy(null)}
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
                        className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Renewing...
                          </>
                        ) : (
                          <>
                            <Save size={18} />
                            Renew Policy
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                      <RotateCcw className="w-10 h-10 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      Ready to Renew
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      Select a policy from the list to begin the renewal process.
                    </p>
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

export default RenewalPolicy;
