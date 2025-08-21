// "use client";
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const AddNewPolicy = () => {
//   const navigate = useNavigate();

//   // State for the form data, using snake_case to match the Django model
//   const [formData, setFormData] = useState({
//     policy_number: "",
//     insurance_company: "",
//     policy_type: "",
//     start_date: "",
//     end_date: "",
//     premium_amount: "",
//     sum_assured: "",
//     status: "Pending",
//     policy_document: null,
//   });

//   // State to manage the selected policy holder
//   const [policyHolder, setPolicyHolder] = useState({ id: "", type: "" });
//   const [allClients, setAllClients] = useState([]);

//   // State for UI feedback
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [message, setMessage] = useState("");

//   // Fetch all clients to populate the dropdown
//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const response = await axios.get("http://127.0.0.1:8000/client/manage-clients/");
//         setAllClients(response.data);
//       } catch (err) {
//         setError("Failed to load clients for policy holder selection.");
//         console.error(err);
//       }
//     };
//     fetchClients();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       policy_document: e.target.files[0] || null,
//     }));
//   };

//   const handlePolicyHolderChange = (e) => {
//     const [id, type] = e.target.value.split("|");
//     setPolicyHolder({ id, type });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!policyHolder.id || !policyHolder.type) {
//       setError("You must select a policy holder.");
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setMessage("");

//     const submissionData = new FormData();

//     // Append form fields
//     for (const key in formData) {
//       if (formData[key]) {
//         submissionData.append(key, formData[key]);
//       }
//     }

//     // IMPORTANT: Replace 7,8,9 with actual content type IDs from your database
//     let contentTypeId;
//     if (policyHolder.type === "Family Head") contentTypeId = 7;
//     else if (policyHolder.type === "Family Member") contentTypeId = 8;
//     else if (policyHolder.type === "Firm") contentTypeId = 9;

//     if (!contentTypeId) {
//       setError("Could not determine client type. Please check configuration.");
//       setLoading(false);
//       return;
//     }

//     submissionData.append("content_type", contentTypeId);
//     submissionData.append("object_id", policyHolder.id);

//     try {
//       await axios.post("http://127.0.0.1:8000/policy/policies/", submissionData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setMessage("Policy created successfully!");
//       setTimeout(() => navigate("/dashboard/policymanagement/managepolicy"), 2000);
//     } catch (err) {
//       setError("Failed to create policy. Please check the form and try again.");
//       console.error(err.response ?? err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Add New Policy</h1>
//         <div className="bg-white rounded-lg shadow-md p-6 md:p-8 border border-gray-200">
//           <form onSubmit={handleSubmit} className="space-y-8">
//             {/* Policy Holder Selection */}
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Policy Holder</h2>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Select an Existing Client *
//               </label>
//               <select
//                 value={`${policyHolder.id}|${policyHolder.type}`}
//                 onChange={handlePolicyHolderChange}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="|">-- Choose a Client --</option>
//                 {allClients.map((client) => (
//                   <option key={`${client.client_type}-${client.id}`} value={`${client.id}|${client.client_type}`}>
//                     {client.full_name} ({client.client_type})
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Policy Details */}
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Policy Details</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Policy Number *</label>
//                   <input
//                     type="text"
//                     name="policy_number"
//                     value={formData.policy_number}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Company *</label>
//                   <input
//                     type="text"
//                     name="insurance_company"
//                     value={formData.insurance_company}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Policy Type *</label>
//                   <select
//                     name="policy_type"
//                     value={formData.policy_type}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   >
//                     <option value="">Select Type</option>
//                     <option value="Health">Health</option>
//                     <option value="Life">Life</option>
//                     <option value="Vehicle">Vehicle</option>
//                     <option value="Travel">Travel</option>
//                     <option value="Property">Property</option>
//                     <option value="Business">Business</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
//                   <select
//                     name="status"
//                     value={formData.status}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   >
//                     <option value="Pending">Pending</option>
//                     <option value="Active">Active</option>
//                     <option value="Expired">Expired</option>
//                     <option value="Cancelled">Cancelled</option>
//                     <option value="Due Renewal">Due Renewal</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
//                   <input
//                     type="date"
//                     name="start_date"
//                     value={formData.start_date}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
//                   <input
//                     type="date"
//                     name="end_date"
//                     value={formData.end_date}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Premium Amount *</label>
//                   <input
//                     type="number"
//                     step="0.01"
//                     name="premium_amount"
//                     value={formData.premium_amount}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Sum Assured *</label>
//                   <input
//                     type="number"
//                     step="0.01"
//                     name="sum_assured"
//                     value={formData.sum_assured}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Document Upload */}
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Document Upload</h2>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Policy Document</label>
//                 <input
//                   type="file"
//                   name="policy_document"
//                   onChange={handleFileChange}
//                   className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                 />
//               </div>
//             </div>

//             {/* Messages */}
//             {message && <div className="p-4 text-center text-green-800 bg-green-100 rounded-md">{message}</div>}
//             {error && <div className="p-4 text-center text-red-800 bg-red-100 rounded-md">{error}</div>}

//             <div className="flex justify-end space-x-4 pt-4 border-t">
//               <button
//                 type="button"
//                 onClick={() => navigate("/dashboard/policymanagement/managepolicy")}
//                 className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
//                 disabled={loading}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
//               >
//                 {loading ? "Creating..." : "Create Policy"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddNewPolicy;
    
"use client";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { 
  FileText, 
  User, 
  Calendar, 
  DollarSign, 
  Upload, 
  ArrowLeft,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle,
  Building,
  Shield
} from "lucide-react";

const AddNewPolicy = () => {
  const navigate = useNavigate();

  // State for the form data, using snake_case to match the Django model
  const [formData, setFormData] = useState({
    policy_number: "",
    insurance_company: "",
    policy_type: "",
    start_date: "",
    end_date: "",
    premium_amount: "",
    sum_assured: "",
    status: "Pending",
    policy_document: null,
  });

  // State to manage the selected policy holder
  const [policyHolder, setPolicyHolder] = useState({ id: "", type: "" });
  const [allClients, setAllClients] = useState([]);

  // State for UI feedback
  const [loading, setLoading] = useState(false);
  const [loadingClients, setLoadingClients] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch all clients to populate the dropdown
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoadingClients(true);
        const response = await axios.get("http://127.0.0.1:8000/client/manage-clients/");
        setAllClients(response.data);
      } catch (err) {
        setError("Failed to load clients for policy holder selection.");
        console.error(err);
      } finally {
        setLoadingClients(false);
      }
    };
    fetchClients();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (message || error) {
      setMessage("");
      setError(null);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      policy_document: e.target.files[0] || null,
    }));
  };

  const handlePolicyHolderChange = (e) => {
    const [id, type] = e.target.value.split("|");
    setPolicyHolder({ id, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!policyHolder.id || !policyHolder.type) {
      setError("You must select a policy holder.");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage("");

    const submissionData = new FormData();

    // Append form fields
    for (const key in formData) {
      if (formData[key]) {
        submissionData.append(key, formData[key]);
      }
    }

    // IMPORTANT: Replace 7,8,9 with actual content type IDs from your database
    let contentTypeId;
    if (policyHolder.type === "Family Head") contentTypeId = 7;
    else if (policyHolder.type === "Family Member") contentTypeId = 8;
    else if (policyHolder.type === "Firm") contentTypeId = 9;

    if (!contentTypeId) {
      setError("Could not determine client type. Please check configuration.");
      setLoading(false);
      return;
    }

    submissionData.append("content_type", contentTypeId);
    submissionData.append("object_id", policyHolder.id);

    try {
      await axios.post("http://127.0.0.1:8000/policy/policies/", submissionData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Policy created successfully!");
      setTimeout(() => navigate("/dashboard/policymanagement/managepolicy"), 2000);
    } catch (err) {
      setError("Failed to create policy. Please check the form and try again.");
      console.error(err.response ?? err);
    } finally {
      setLoading(false);
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

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
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

  const policyTypes = [
    { value: "Health", icon: "🏥", color: "text-blue-600" },
    { value: "Life", icon: "❤️", color: "text-red-600" },
    { value: "Vehicle", icon: "🚗", color: "text-green-600" },
    { value: "Travel", icon: "✈️", color: "text-purple-600" },
    { value: "Property", icon: "🏠", color: "text-orange-600" },
    { value: "Business", icon: "💼", color: "text-indigo-600" },
    { value: "Other", icon: "📋", color: "text-gray-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-8 transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-6">
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-6">
            <FileText className="text-indigo-600 dark:text-indigo-400" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Add New Policy
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Create a comprehensive insurance policy for your clients
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          <form onSubmit={handleSubmit}>
            <div className="p-8 space-y-12">
              
              {/* Policy Holder Selection */}
              <motion.div variants={sectionVariants}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Policy Holder
                  </h2>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-6 border border-blue-200 dark:border-blue-800/30">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                    Select an Existing Client *
                  </label>
                  <div className="relative">
                    <select
                      value={`${policyHolder.id}|${policyHolder.type}`}
                      onChange={handlePolicyHolderChange}
                      required
                      disabled={loadingClients}
                      className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all disabled:opacity-50"
                    >
                      <option value="|">
                        {loadingClients ? "Loading clients..." : "-- Choose a Client --"}
                      </option>
                      {allClients.map((client) => (
                        <option key={`${client.client_type}-${client.id}`} value={`${client.id}|${client.client_type}`}>
                          {client.full_name} ({client.client_type})
                        </option>
                      ))}
                    </select>
                    {loadingClients && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <Loader2 className="w-5 h-5 text-cyan-600 animate-spin" />
                      </div>
                    )}
                  </div>
                  {allClients.length === 0 && !loadingClients && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-2">
                      <AlertCircle size={16} />
                      No clients found. Please add clients first.
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Policy Details */}
              <motion.div variants={sectionVariants}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Policy Details
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Policy Number *
                    </label>
                    <input
                      type="text"
                      name="policy_number"
                      value={formData.policy_number}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                      placeholder="Enter policy number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      <div className="flex items-center gap-2">
                        <Building size={16} />
                        Insurance Company *
                      </div>
                    </label>
                    <input
                      type="text"
                      name="insurance_company"
                      value={formData.insurance_company}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                      placeholder="Enter insurance company"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Policy Type *
                    </label>
                    <select
                      name="policy_type"
                      value={formData.policy_type}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                    >
                      <option value="">Select Type</option>
                      {policyTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.icon} {type.value}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Status *
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                    >
                      <option value="Pending">🕐 Pending</option>
                      <option value="Active">✅ Active</option>
                      <option value="Expired">❌ Expired</option>
                      <option value="Cancelled">🚫 Cancelled</option>
                      <option value="Due Renewal">🔄 Due Renewal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        Start Date *
                      </div>
                    </label>
                    <input
                      type="date"
                      name="start_date"
                      value={formData.start_date}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        End Date *
                      </div>
                    </label>
                    <input
                      type="date"
                      name="end_date"
                      value={formData.end_date}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} />
                        Premium Amount *
                      </div>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      name="premium_amount"
                      value={formData.premium_amount}
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
                        Sum Assured *
                      </div>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      name="sum_assured"
                      value={formData.sum_assured}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Document Upload */}
              <motion.div variants={sectionVariants}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                    <Upload className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Document Upload
                  </h2>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/10 rounded-xl p-6 border border-purple-200 dark:border-purple-800/30">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                    Policy Document
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
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    Upload PDF, DOC, or image files (max 10MB)
                  </p>
                </div>
              </motion.div>

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
                  disabled={loading || loadingClients}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Create Policy
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddNewPolicy;
