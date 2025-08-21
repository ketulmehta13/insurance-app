

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';

// const AddFamilyHead = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     middle_name: "",
//     group_type: "",
//     address1: "",
//     city: "",
//     area: "",
//     mobile_no: "",
//     email: "",
//     gender: "",
//     dob: "",
//     client_status: "",
//     business_type: "",
//     aadhar_no: "",
//     marriage_status: "",
//     joined_by: "",
//   });

//   // State for loading, messages, and dynamic dropdowns
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [isError, setIsError] = useState(false);
//   const [cities, setCities] = useState(["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"]);
//   const [areas, setAreas] = useState(["Area 1", "Area 2", "Area 3"]);
//   const [showAddCity, setShowAddCity] = useState(false);
//   const [showAddArea, setShowAddArea] = useState(false);
//   const [newCity, setNewCity] = useState("");
//   const [newArea, setNewArea] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (message) {
//         setMessage("");
//         setIsError(false);
//     }
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const addCity = () => {
//     if (newCity.trim()) {
//       const trimmedCity = newCity.trim();
//       setCities((prev) => [...prev, trimmedCity]);
//       setFormData((prev) => ({ ...prev, city: trimmedCity }));
//       setNewCity("");
//       setShowAddCity(false);
//     }
//   };

//   const addArea = () => {
//     if (newArea.trim()) {
//       const trimmedArea = newArea.trim();
//       setAreas((prev) => [...prev, trimmedArea]);
//       setFormData((prev) => ({ ...prev, area: trimmedArea }));
//       setNewArea("");
//       setShowAddArea(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     // Prevent the form from causing a page reload
//     e.preventDefault();
    
//     // --- CRUCIAL DEBUGGING STEP ---
//     // This will tell us if the function is being called at all.
//     console.log("handleSubmit function triggered!");
//     console.log("Form data being sent:", formData);

//     setLoading(true);
//     setMessage("");
//     setIsError(false);

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/client/add-family-head/", formData);
      
//       setMessage(response.data.message || "Family head saved successfully!");
//       setIsError(false);
      
//       setFormData({
//         first_name: "", last_name: "", middle_name: "", group_type: "", address1: "",
//         city: "", area: "", mobile_no: "", email: "", gender: "", dob: "",
//         client_status: "", business_type: "", aadhar_no: "", marriage_status: "", joined_by: "",
//       });

//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 2000);

//     } catch (error) {
//       console.error("Submission failed:", error);
//        if (error.response && error.response.data) {
//         const errorMessages = Object.entries(error.response.data)
//             .map(([key, value]) => `${key.replace(/_/g, ' ')}: ${Array.isArray(value) ? value.join(', ') : value}`)
//             .join('; ');
//         setMessage(`Submission failed: ${errorMessages}`);
//       } else {
//         setMessage(error.message || "An unexpected error occurred. Please try again.");
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
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Add Family Head</h1>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6 md:p-8 border border-gray-200">
//           <form onSubmit={handleSubmit}>
//             <div className="space-y-8">
//               {/* Personal Information Section */}
//               <div>
//                 <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3 mb-6">
//                   Personal Information
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
//                     <input type="text" name="first_name" value={formData.first_name}
//                       onChange={handleInputChange} required
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
//                     <input type="text" name="middle_name" value={formData.middle_name}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
//                     <input type="text" name="last_name" value={formData.last_name}
//                       onChange={handleInputChange} required
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
//                   </div>
//                 </div>
//               </div>

//               {/* Contact and Address Section */}
//               <div>
//                  <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3 mb-6">
//                   Contact & Address
//                 </h2>
//                 <div className="space-y-6">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
//                         <textarea name="address1" value={formData.address1}
//                         onChange={handleInputChange} rows="3" required
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
//                             <div className="flex space-x-2">
//                                 <select name="city" value={formData.city} onChange={handleInputChange} required className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
//                                 <option value="">Select City</option>
//                                 {cities.map((city, index) => (<option key={index} value={city}>{city}</option>))}
//                                 </select>
//                                 <button type="button" onClick={() => setShowAddCity(true)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//                                 Add
//                                 </button>
//                             </div>
//                             {showAddCity && (
//                                 <div className="mt-2 flex space-x-2 p-2 bg-gray-50 rounded-md">
//                                 <input type="text" value={newCity} onChange={(e) => setNewCity(e.target.value)} placeholder="Enter new city" className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
//                                 <button type="button" onClick={addCity} className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">Save</button>
//                                 <button type="button" onClick={() => setShowAddCity(false)} className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors">Cancel</button>
//                                 </div>
//                             )}
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Area *</label>
//                             <div className="flex space-x-2">
//                                 <select name="area" value={formData.area} onChange={handleInputChange} required className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
//                                 <option value="">Select Area</option>
//                                 {areas.map((area, index) => (<option key={index} value={area}>{area}</option>))}
//                                 </select>
//                                 <button type="button" onClick={() => setShowAddArea(true)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//                                 Add
//                                 </button>
//                             </div>
//                             {showAddArea && (
//                                 <div className="mt-2 flex space-x-2 p-2 bg-gray-50 rounded-md">
//                                 <input type="text" value={newArea} onChange={(e) => setNewArea(e.target.value)} placeholder="Enter new area" className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
//                                 <button type="button" onClick={addArea} className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">Save</button>
//                                 <button type="button" onClick={() => setShowAddArea(false)} className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors">Cancel</button>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
//                             <input type="tel" name="mobile_no" value={formData.mobile_no} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
//                             <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
//                         </div>
//                     </div>
//                 </div>
//               </div>

//               {/* Additional Information Section */}
//               <div>
//                 <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3 mb-6">
//                   Additional Information
//                 </h2>
//                 <div className="space-y-6">
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
//                             <select name="gender" value={formData.gender} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
//                                 <option value="">Select Gender</option>
//                                 <option value="male">Male</option>
//                                 <option value="female">Female</option>
//                                 <option value="other">Other</option>
//                             </select>
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
//                             <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Marriage Status *</label>
//                             <select name="marriage_status" value={formData.marriage_status} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
//                                 <option value="">Select Status</option>
//                                 <option value="single">Single</option>
//                                 <option value="married">Married</option>
//                                 <option value="divorced">Divorced</option>
//                                 <option value="widowed">Widowed</option>
//                             </select>
//                         </div>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Card Number *</label>
//                             <input type="text" name="aadhar_no" value={formData.aadhar_no} onChange={handleInputChange} placeholder="XXXX-XXXX-XXXX" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Group Type *</label>
//                             <select name="group_type" value={formData.group_type} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
//                                 <option value="">Select Group Type</option>
//                                 <option value="new">New</option>
//                                 <option value="existing">Existing</option>
//                             </select>
//                         </div>
//                     </div>
//                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Business Type *</label>
//                             <select name="business_type" value={formData.business_type} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
//                                 <option value="">Select Business Type</option>
//                                 <option value="individual">Individual</option>
//                                 <option value="business">Business</option>
//                                 <option value="corporate">Corporate</option>
//                             </select>
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Client Status *</label>
//                             <select name="client_status" value={formData.client_status} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
//                                 <option value="">Select Status</option>
//                                 <option value="Active">Active</option>
//                                 <option value="Inactive">Inactive</option>
//                                 <option value="Pending">Pending</option>
//                             </select>
//                         </div>
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Client Joined With Us By *</label>
//                         <select name="joined_by" value={formData.joined_by} onChange={handleInputChange} required className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
//                             <option value="">Select Method</option>
//                             <option value="referral">Referral</option>
//                             <option value="online">Online</option>
//                             <option value="agent">Agent</option>
//                             <option value="advertisement">Advertisement</option>
//                             <option value="walk-in">Walk-in</option>
//                         </select>
//                     </div>
//                 </div>
//               </div>

//               {/* Message Display */}
//               {message && (
//                 <div className={`p-4 rounded-md text-center ${isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
//                   {message}
//                 </div>
//               )}

//               {/* Form Actions */}
//               <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
//                 <button type="button" onClick={() => navigate("/dashboard/clientmanage/ManageClients")}
//                   disabled={loading}
//                   className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-gray-400">
//                   Cancel
//                 </button>
//                 <button type="submit" disabled={loading}
//                   className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-400 disabled:cursor-not-allowed flex items-center">
//                   {loading ? (
//                     <>
//                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Saving...
//                     </>
//                   ) : (
//                     "Save"
//                   )}
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddFamilyHead;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  CreditCard, 
  Building, 
  Users, 
  Plus, 
  Check, 
  X, 
  Loader2,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Save
} from "lucide-react";

const AddFamilyHead = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
    group_type: "",
    address1: "",
    city: "",
    area: "",
    mobile_no: "",
    email: "",
    gender: "",
    dob: "",
    client_status: "",
    business_type: "",
    aadhar_no: "",
    marriage_status: "",
    joined_by: "",
  });

  // State for loading, messages, and dynamic dropdowns
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [cities, setCities] = useState(["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"]);
  const [areas, setAreas] = useState(["Area 1", "Area 2", "Area 3"]);
  const [showAddCity, setShowAddCity] = useState(false);
  const [showAddArea, setShowAddArea] = useState(false);
  const [newCity, setNewCity] = useState("");
  const [newArea, setNewArea] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (message) {
        setMessage("");
        setIsError(false);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addCity = () => {
    if (newCity.trim()) {
      const trimmedCity = newCity.trim();
      setCities((prev) => [...prev, trimmedCity]);
      setFormData((prev) => ({ ...prev, city: trimmedCity }));
      setNewCity("");
      setShowAddCity(false);
    }
  };

  const addArea = () => {
    if (newArea.trim()) {
      const trimmedArea = newArea.trim();
      setAreas((prev) => [...prev, trimmedArea]);
      setFormData((prev) => ({ ...prev, area: trimmedArea }));
      setNewArea("");
      setShowAddArea(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit function triggered!");
    console.log("Form data being sent:", formData);

    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const response = await axios.post("http://127.0.0.1:8000/client/add-family-head/", formData);
      
      setMessage(response.data.message || "Family head saved successfully!");
      setIsError(false);
      
      setFormData({
        first_name: "", last_name: "", middle_name: "", group_type: "", address1: "",
        city: "", area: "", mobile_no: "", email: "", gender: "", dob: "",
        client_status: "", business_type: "", aadhar_no: "", marriage_status: "", joined_by: "",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

    } catch (error) {
      console.error("Submission failed:", error);
       if (error.response && error.response.data) {
        const errorMessages = Object.entries(error.response.data)
            .map(([key, value]) => `${key.replace(/_/g, ' ')}: ${Array.isArray(value) ? value.join(', ') : value}`)
            .join('; ');
        setMessage(`Submission failed: ${errorMessages}`);
      } else {
        setMessage(error.message || "An unexpected error occurred. Please try again.");
      }
      setIsError(true);
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 dark:bg-cyan-900/30 rounded-full mb-6">
            <User className="text-cyan-600 dark:text-cyan-400" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Add Family Head
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Create a new family head profile with comprehensive details
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
              
              {/* Personal Information Section */}
              <motion.div variants={sectionVariants}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Personal Information
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      First Name *
                    </label>
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
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Middle Name
                    </label>
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
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Last Name *
                    </label>
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
              </motion.div>

              {/* Contact & Address Section */}
              <motion.div variants={sectionVariants}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Contact & Address
                  </h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Address *
                    </label>
                    <textarea 
                      name="address1" 
                      value={formData.address1}
                      onChange={handleInputChange} 
                      rows="3" 
                      required
                      className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all resize-none"
                      placeholder="Enter complete address"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* City Selection */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        City *
                      </label>
                      <div className="flex gap-2">
                        <select 
                          name="city" 
                          value={formData.city} 
                          onChange={handleInputChange} 
                          required 
                          className="flex-1 px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                        >
                          <option value="">Select City</option>
                          {cities.map((city, index) => (
                            <option key={index} value={city}>{city}</option>
                          ))}
                        </select>
                        <motion.button 
                          type="button" 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowAddCity(true)} 
                          className="px-4 py-3 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                        >
                          <Plus size={18} />
                        </motion.button>
                      </div>
                      
                      <AnimatePresence>
                        {showAddCity && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600"
                          >
                            <div className="flex gap-2">
                              <input 
                                type="text" 
                                value={newCity} 
                                onChange={(e) => setNewCity(e.target.value)} 
                                placeholder="Enter new city" 
                                className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                              />
                              <button 
                                type="button" 
                                onClick={addCity} 
                                className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1"
                              >
                                <Check size={14} />
                                Save
                              </button>
                              <button 
                                type="button" 
                                onClick={() => setShowAddCity(false)} 
                                className="px-3 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors flex items-center gap-1"
                              >
                                <X size={14} />
                                Cancel
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Area Selection */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Area *
                      </label>
                      <div className="flex gap-2">
                        <select 
                          name="area" 
                          value={formData.area} 
                          onChange={handleInputChange} 
                          required 
                          className="flex-1 px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                        >
                          <option value="">Select Area</option>
                          {areas.map((area, index) => (
                            <option key={index} value={area}>{area}</option>
                          ))}
                        </select>
                        <motion.button 
                          type="button" 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowAddArea(true)} 
                          className="px-4 py-3 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                        >
                          <Plus size={18} />
                        </motion.button>
                      </div>
                      
                      <AnimatePresence>
                        {showAddArea && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600"
                          >
                            <div className="flex gap-2">
                              <input 
                                type="text" 
                                value={newArea} 
                                onChange={(e) => setNewArea(e.target.value)} 
                                placeholder="Enter new area" 
                                className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                              />
                              <button 
                                type="button" 
                                onClick={addArea} 
                                className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1"
                              >
                                <Check size={14} />
                                Save
                              </button>
                              <button 
                                type="button" 
                                onClick={() => setShowAddArea(false)} 
                                className="px-3 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors flex items-center gap-1"
                              >
                                <X size={14} />
                                Cancel
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        <div className="flex items-center gap-2">
                          <Phone size={16} />
                          Mobile Number *
                        </div>
                      </label>
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
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        <div className="flex items-center gap-2">
                          <Mail size={16} />
                          Email Address *
                        </div>
                      </label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        required 
                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Additional Information Section */}
              <motion.div variants={sectionVariants}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Additional Information
                  </h2>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Gender *
                      </label>
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
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          Date of Birth *
                        </div>
                      </label>
                      <input 
                        type="date" 
                        name="dob" 
                        value={formData.dob} 
                        onChange={handleInputChange} 
                        required 
                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Marriage Status *
                      </label>
                      <select 
                        name="marriage_status" 
                        value={formData.marriage_status} 
                        onChange={handleInputChange} 
                        required 
                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                      >
                        <option value="">Select Status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="divorced">Divorced</option>
                        <option value="widowed">Widowed</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Aadhar Card Number *
                      </label>
                      <input 
                        type="text" 
                        name="aadhar_no" 
                        value={formData.aadhar_no} 
                        onChange={handleInputChange} 
                        placeholder="XXXX-XXXX-XXXX" 
                        required 
                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Group Type *
                      </label>
                      <select 
                        name="group_type" 
                        value={formData.group_type} 
                        onChange={handleInputChange} 
                        required 
                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                      >
                        <option value="">Select Group Type</option>
                        <option value="new">New</option>
                        <option value="existing">Existing</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        <div className="flex items-center gap-2">
                          <Building size={16} />
                          Business Type *
                        </div>
                      </label>
                      <select 
                        name="business_type" 
                        value={formData.business_type} 
                        onChange={handleInputChange} 
                        required 
                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                      >
                        <option value="">Select Business Type</option>
                        <option value="individual">Individual</option>
                        <option value="business">Business</option>
                        <option value="corporate">Corporate</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Client Status *
                      </label>
                      <select 
                        name="client_status" 
                        value={formData.client_status} 
                        onChange={handleInputChange} 
                        required 
                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                      >
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      <div className="flex items-center gap-2">
                        <Users size={16} />
                        Client Joined With Us By *
                      </div>
                    </label>
                    <select 
                      name="joined_by" 
                      value={formData.joined_by} 
                      onChange={handleInputChange} 
                      required 
                      className="w-full md:w-1/2 px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                    >
                      <option value="">Select Method</option>
                      <option value="referral">Referral</option>
                      <option value="online">Online</option>
                      <option value="agent">Agent</option>
                      <option value="advertisement">Advertisement</option>
                      <option value="walk-in">Walk-in</option>
                    </select>
                  </div>
                </div>
              </motion.div>

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
              <div className="flex flex-col sm:flex-row justify-end gap-4 pt-8 border-t border-slate-200 dark:border-slate-700">
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
                      Save Family Head
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

export default AddFamilyHead;
