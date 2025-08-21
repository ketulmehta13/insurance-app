// "use client"
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';

// const AddFamilyMember = () => {
//   const navigate = useNavigate();
  
//   // State for the form data, using snake_case to match the Django model
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     middle_name: "",
//     relation: "",
//     mobile_no: "",
//     whatsapp_no: "",
//     email: "",
//     gender: "",
//     dob: "",
//     aadhar_no: "",
//     family_head: "", // This will store the ID of the selected FamilyHead
//   });

//   const [sameAsMobile, setSameAsMobile] = useState(true);
//   const [familyHeads, setFamilyHeads] = useState([]); // To store the list of family heads
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [isError, setIsError] = useState(false);

//   // Fetch the list of family heads when the component mounts
//   useEffect(() => {
//     const fetchFamilyHeads = async () => {
//       try {
//         // This GET request fetches all family heads for the dropdown
//         const response = await axios.get("http://127.0.0.1:8000/client/family-heads/");
//         setFamilyHeads(response.data);
//       } catch (error) {
//         console.error("Failed to fetch family heads:", error);
//         setMessage("Could not load family heads. Please try again later.");
//         setIsError(true);
//       }
//     };
//     fetchFamilyHeads();
//   }, []); // Empty dependency array means this runs once on mount

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (name === "sameAsMobile") {
//       setSameAsMobile(checked);
//       if (checked) {
//         setFormData(prev => ({ ...prev, whatsapp_no: prev.mobile_no }));
//       }
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value,
//       }));
//        // If mobile number is updated, also update whatsapp number if checkbox is checked
//       if (name === "mobile_no" && sameAsMobile) {
//         setFormData(prev => ({ ...prev, whatsapp_no: value }));
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");
//     setIsError(false);

//     if (!formData.family_head) {
//         setMessage("Please select a Family Head.");
//         setIsError(true);
//         setLoading(false);
//         return;
//     }

//     try {
//       // This POST request sends the new member's data to the backend
//       const response = await axios.post("http://127.0.0.1:8000/client/add-family-member/", formData);
//       setMessage(response.data.message || "Family member added successfully!");
//       setIsError(false);
//       setTimeout(() => {
//         navigate("/dashboard"); // Or wherever you list members
//       }, 2000);
//     } catch (error) {
//       console.error("Submission failed:", error);
//       if (error.response && error.response.data) {
//         const errorMessages = Object.entries(error.response.data)
//           .map(([key, value]) => `${key.replace(/_/g, ' ')}: ${Array.isArray(value) ? value.join(', ') : value}`)
//           .join('; ');
//         setMessage(`Submission failed: ${errorMessages}`);
//       } else {
//         setMessage(error.message || "An unexpected error occurred.");
//       }
//       setIsError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen font-sans">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Add Family Member</h1>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6 md:p-8 border border-gray-200">
//           <form onSubmit={handleSubmit} className="space-y-6">
            
//             {/* Family Head Selection Dropdown */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Select Family Head *</label>
//               <select
//                 name="family_head"
//                 value={formData.family_head}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//               >
//                 <option value="">-- Choose a Family Head --</option>
//                 {familyHeads.map(head => (
//                   <option key={head.id} value={head.id}>
//                     {head.first_name} {head.last_name} (ID: {head.id})
//                   </option>
//                 ))}
//               </select>
//             </div>
            
//             <hr/>

//             {/* Personal Information */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
//                 <input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
//                 <input type="text" name="middle_name" value={formData.middle_name} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
//                 <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Relation to Head *</label>
//                 <select name="relation" value={formData.relation} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
//                   <option value="">Select Relation</option>
//                   <option value="spouse">Spouse</option>
//                   <option value="son">Son</option>
//                   <option value="daughter">Daughter</option>
//                   <option value="father">Father</option>
//                   <option value="mother">Mother</option>
//                   <option value="brother">Brother</option>
//                   <option value="sister">Sister</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
//                 <select name="gender" value={formData.gender} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
//                   <option value="">Select Gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
//             </div>

//             {/* Contact Information */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
//                 <input type="tel" name="mobile_no" value={formData.mobile_no} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Number</label>
//                 <div className="space-y-2">
//                   <input type="tel" name="whatsapp_no" value={formData.whatsapp_no} onChange={handleInputChange} disabled={sameAsMobile} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" />
//                   <label className="flex items-center">
//                     <input type="checkbox" name="sameAsMobile" checked={sameAsMobile} onChange={handleInputChange} className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
//                     <span className="text-sm text-gray-600">Same as mobile number</span>
//                   </label>
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
//                 <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
//                 <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Card Number</label>
//                 <input type="text" name="aadhar_no" value={formData.aadhar_no} onChange={handleInputChange} placeholder="XXXX-XXXX-XXXX" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
//               </div>
//             </div>
            
//             {/* Message Display */}
//             {message && (
//                 <div className={`p-4 rounded-md text-center font-medium ${isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
//                 {message}
//                 </div>
//             )}

//             {/* Form Actions */}
//             <div className="flex justify-end space-x-4 pt-4 border-t">
//               <button type="button" onClick={() => navigate("/dashboard/clientmanage/ManageClients")} disabled={loading} className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors disabled:bg-gray-400">
//                 Cancel
//               </button>
//               <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center">
//                 {loading ? 'Saving...' : 'Add Family Member'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddFamilyMember;


"use client"
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import { 
  Users, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  CreditCard, 
  Heart, 
  ArrowLeft,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle,
  MessageSquare
} from "lucide-react";

const AddFamilyMember = () => {
  const navigate = useNavigate();
  
  // State for the form data, using snake_case to match the Django model
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
    relation: "",
    mobile_no: "",
    whatsapp_no: "",
    email: "",
    gender: "",
    dob: "",
    aadhar_no: "",
    family_head: "", // This will store the ID of the selected FamilyHead
  });

  const [sameAsMobile, setSameAsMobile] = useState(true);
  const [familyHeads, setFamilyHeads] = useState([]); // To store the list of family heads
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // Fetch the list of family heads when the component mounts
  useEffect(() => {
    const fetchFamilyHeads = async () => {
      try {
        // This GET request fetches all family heads for the dropdown
        const response = await axios.get("http://127.0.0.1:8000/client/family-heads/");
        setFamilyHeads(response.data);
      } catch (error) {
        console.error("Failed to fetch family heads:", error);
        setMessage("Could not load family heads. Please try again later.");
        setIsError(true);
      }
    };
    fetchFamilyHeads();
  }, []); // Empty dependency array means this runs once on mount

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "sameAsMobile") {
      setSameAsMobile(checked);
      if (checked) {
        setFormData(prev => ({ ...prev, whatsapp_no: prev.mobile_no }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
       // If mobile number is updated, also update whatsapp number if checkbox is checked
      if (name === "mobile_no" && sameAsMobile) {
        setFormData(prev => ({ ...prev, whatsapp_no: value }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsError(false);

    if (!formData.family_head) {
        setMessage("Please select a Family Head.");
        setIsError(true);
        setLoading(false);
        return;
    }

    try {
      // This POST request sends the new member's data to the backend
      const response = await axios.post("http://127.0.0.1:8000/client/add-family-member/", formData);
      setMessage(response.data.message || "Family member added successfully!");
      setIsError(false);
      setTimeout(() => {
        navigate("/dashboard"); // Or wherever you list members
      }, 2000);
    } catch (error) {
      console.error("Submission failed:", error);
      if (error.response && error.response.data) {
        const errorMessages = Object.entries(error.response.data)
          .map(([key, value]) => `${key.replace(/_/g, ' ')}: ${Array.isArray(value) ? value.join(', ') : value}`)
          .join('; ');
        setMessage(`Submission failed: ${errorMessages}`);
      } else {
        setMessage(error.message || "An unexpected error occurred.");
      }
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 dark:bg-cyan-900/30 rounded-full mb-6">
            <Users className="text-cyan-600 dark:text-cyan-400" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Add Family Member
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Add a new member to an existing family group
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Family Head Selection Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Select Family Head *</label>
              <select
                name="family_head"
                value={formData.family_head}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              >
                <option value="">-- Choose a Family Head --</option>
                {familyHeads.map(head => (
                  <option key={head.id} value={head.id}>
                    {head.first_name} {head.last_name} (ID: {head.id})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="border-b border-slate-200 dark:border-slate-700"></div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">First Name *</label>
                <input 
                  type="text" 
                  name="first_name" 
                  value={formData.first_name} 
                  onChange={handleInputChange} 
                  required 
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Middle Name</label>
                <input 
                  type="text" 
                  name="middle_name" 
                  value={formData.middle_name} 
                  onChange={handleInputChange} 
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  placeholder="Enter middle name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Last Name *</label>
                <input 
                  type="text" 
                  name="last_name" 
                  value={formData.last_name} 
                  onChange={handleInputChange} 
                  required 
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Relation to Head *</label>
                <select 
                  name="relation" 
                  value={formData.relation} 
                  onChange={handleInputChange} 
                  required 
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                >
                  <option value="">Select Relation</option>
                  <option value="spouse">Spouse</option>
                  <option value="son">Son</option>
                  <option value="daughter">Daughter</option>
                  <option value="father">Father</option>
                  <option value="mother">Mother</option>
                  <option value="brother">Brother</option>
                  <option value="sister">Sister</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Gender *</label>
                <select 
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleInputChange} 
                  required 
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Mobile Number *</label>
                <input 
                  type="tel" 
                  name="mobile_no" 
                  value={formData.mobile_no} 
                  onChange={handleInputChange} 
                  required 
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  placeholder="Enter mobile number"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">WhatsApp Number</label>
                <div className="space-y-2">
                  <input 
                    type="tel" 
                    name="whatsapp_no" 
                    value={formData.whatsapp_no} 
                    onChange={handleInputChange} 
                    disabled={sameAsMobile} 
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all disabled:bg-slate-100 dark:disabled:bg-slate-600"
                    placeholder="Enter WhatsApp number"
                  />
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="sameAsMobile" 
                      checked={sameAsMobile} 
                      onChange={handleInputChange} 
                      className="w-4 h-4 text-cyan-600 border-slate-300 rounded focus:ring-cyan-500"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-300">Same as mobile number</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Date of Birth *</label>
                <input 
                  type="date" 
                  name="dob" 
                  value={formData.dob} 
                  onChange={handleInputChange} 
                  required 
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Aadhar Card Number</label>
                <input 
                  type="text" 
                  name="aadhar_no" 
                  value={formData.aadhar_no} 
                  onChange={handleInputChange} 
                  placeholder="XXXX-XXXX-XXXX" 
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                />
              </div>
            </div>
            
            {/* Message Display */}
            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-4 rounded-xl text-center flex items-center justify-center gap-3 ${
                    isError 
                      ? 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800' 
                      : 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800'
                  }`}
                >
                  {isError ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
                  {message}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
              <motion.button 
                type="button" 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/dashboard/clientmanage/ManageClients")} 
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
                className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-slate-700 text-white font-semibold rounded-xl hover:from-cyan-700 hover:to-slate-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Add Family Member
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

export default AddFamilyMember;
