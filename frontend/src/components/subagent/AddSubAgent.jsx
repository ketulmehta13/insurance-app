// "use client"
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';

// const AddSubAgent = () => {
//     const navigate = useNavigate();
//     // State uses snake_case and matches the provided Django model
//     const [formData, setFormData] = useState({
//         first_name: "",
//         middle_name: "",
//         last_name: "",
//         date_of_birth: "",
//         gender: "",
//         marital_status: "",
//         mobile_no: "",
//         email: "",
//         address: "",
//         city: "",
//         state: "",
//         pincode: "",
//         agent_code: "",
//         joining_date: "",
//         experience: "",
//         previous_company: "",
//         specialization: "",
//         bank_name: "",
//         account_number: "",
//         photo: null,
//         resume: null,
//     });

//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [message, setMessage] = useState("");

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleFileChange = (e) => {
//         const { name, files } = e.target;
//         setFormData(prev => ({ ...prev, [name]: files[0] || null }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError(null);
//         setMessage("");

//         // Use FormData to correctly handle file uploads
//         const submissionData = new FormData();
//         for (const key in formData) {
//             if (formData[key] !== null && formData[key] !== "") {
//                 submissionData.append(key, formData[key]);
//             }
//         }

//         try {
//             await axios.post("http://127.0.0.1:8000/agent/sub-agents/", submissionData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             setMessage("Sub-agent registered successfully!");
//             setTimeout(() => navigate("/subagent/SubAgentManagement"), 2000);
//         } catch (err) {
//             setError("Failed to register sub-agent. Please check the form and try again.");
//             console.error(err.response ? err.response.data : err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Add Sub Agent</h1>
//             <div className="bg-white rounded-lg shadow-md p-6 md:p-8 border border-gray-200">
//                 <form onSubmit={handleSubmit} className="space-y-8">
                    
//                     {/* Personal Information */}
//                     <div>
//                         <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
//                                 <input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
//                                 <input type="text" name="middle_name" value={formData.middle_name} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
//                                 <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
//                             </div>
//                              <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
//                                 <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
//                                 <select name="gender" value={formData.gender} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md">
//                                     <option value="">Select Gender</option>
//                                     <option value="male">Male</option>
//                                     <option value="female">Female</option>
//                                 </select>
//                             </div>
//                              <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Marital Status</label>
//                                 <select name="marital_status" value={formData.marital_status} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md">
//                                     <option value="">Select Status</option>
//                                     <option value="single">Single</option>
//                                     <option value="married">Married</option>
//                                 </select>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Contact Information */}
//                     <div>
//                         <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                              <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
//                                 <input type="tel" name="mobile_no" value={formData.mobile_no} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
//                                 <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
//                             </div>
//                         </div>
//                          <div className="mt-6">
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
//                             <textarea name="address" value={formData.address} onChange={handleInputChange} rows="3" required className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
//                                 <input type="text" name="city" value={formData.city} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
//                                 <input type="text" name="state" value={formData.state} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
//                                 <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
//                             </div>
//                         </div>
//                     </div>
                    
//                     {/* Professional Information */}
//                     <div>
//                          <h2 className="text-xl font-semibold text-gray-900 mb-6">Professional Information</h2>
//                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Agent Code *</label>
//                                 <input type="text" name="agent_code" value={formData.agent_code} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
//                             </div>
//                              <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Joining Date *</label>
//                                 <input type="date" name="joining_date" value={formData.joining_date} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
//                             </div>
//                              <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Experience (Years)</label>
//                                 <input type="number" name="experience" value={formData.experience} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
//                             </div>
//                          </div>
//                     </div>

//                      {/* Document Upload Section */}
//                     <div>
//                         <h2 className="text-xl font-semibold text-gray-900 mb-6">Document Upload</h2>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Photograph *</label>
//                                 <input type="file" name="photo" onChange={handleFileChange} required className="w-full text-sm"/>
//                             </div>
//                              <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Resume/CV</label>
//                                 <input type="file" name="resume" onChange={handleFileChange} className="w-full text-sm"/>
//                             </div>
//                         </div>
//                     </div>


//                     {message && <div className="p-4 text-center text-green-800 bg-green-100 rounded-md">{message}</div>}
//                     {error && <div className="p-4 text-center text-red-800 bg-red-100 rounded-md">{error}</div>}

//                     <div className="flex justify-end space-x-4 pt-4 border-t">
//                         <button type="button" onClick={() => navigate("/subagent/ManageSubAgents")} disabled={loading} className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700">
//                             Cancel
//                         </button>
//                         <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
//                             {loading ? 'Registering...' : 'Register Sub Agent'}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddSubAgent;

"use client"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import { 
  UserPlus, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Briefcase, 
  Upload, 
  Calendar,
  ArrowLeft,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle,
  CreditCard
} from "lucide-react";

const AddSubAgent = () => {
    const navigate = useNavigate();
    // State uses snake_case and matches the provided Django model
    const [formData, setFormData] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        date_of_birth: "",
        gender: "",
        marital_status: "",
        mobile_no: "",
        email: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        agent_code: "",
        joining_date: "",
        experience: "",
        previous_company: "",
        specialization: "",
        bank_name: "",
        account_number: "",
        photo: null,
        resume: null,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (message || error) {
            setError(null);
            setMessage("");
        }
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData(prev => ({ ...prev, [name]: files[0] || null }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage("");

        // Use FormData to correctly handle file uploads
        const submissionData = new FormData();
        for (const key in formData) {
            if (formData[key] !== null && formData[key] !== "") {
                submissionData.append(key, formData[key]);
            }
        }

        try {
            await axios.post("http://127.0.0.1:8000/agent/sub-agents/", submissionData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage("Sub-agent registered successfully!");
            setTimeout(() => navigate("/subagent/SubAgentManagement"), 2000);
        } catch (err) {
            setError("Failed to register sub-agent. Please check the form and try again.");
            console.error(err.response ? err.response.data : err);
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
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-6">
                        <UserPlus className="text-emerald-600 dark:text-emerald-400" size={32} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        Add Sub Agent
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300">
                        Register a new sub-agent with complete professional details
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
                            
                            {/* Personal Information */}
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
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={16} />
                                                Date of Birth *
                                            </div>
                                        </label>
                                        <input 
                                            type="date" 
                                            name="date_of_birth" 
                                            value={formData.date_of_birth} 
                                            onChange={handleInputChange} 
                                            required 
                                            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                                        />
                                    </div>
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
                                            <option value="male">👨 Male</option>
                                            <option value="female">👩 Female</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                            Marital Status
                                        </label>
                                        <select 
                                            name="marital_status" 
                                            value={formData.marital_status} 
                                            onChange={handleInputChange} 
                                            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                                        >
                                            <option value="">Select Status</option>
                                            <option value="single">💍 Single</option>
                                            <option value="married">👫 Married</option>
                                        </select>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Contact Information */}
                            <motion.div variants={sectionVariants}>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        Contact Information
                                    </h2>
                                </div>
                                <div className="space-y-6">
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
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                            <div className="flex items-center gap-2">
                                                <MapPin size={16} />
                                                Address *
                                            </div>
                                        </label>
                                        <textarea 
                                            name="address" 
                                            value={formData.address} 
                                            onChange={handleInputChange} 
                                            rows="3" 
                                            required 
                                            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all resize-none"
                                            placeholder="Enter complete address"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                                City *
                                            </label>
                                            <input 
                                                type="text" 
                                                name="city" 
                                                value={formData.city} 
                                                onChange={handleInputChange} 
                                                required 
                                                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                                                placeholder="Enter city"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                                State *
                                            </label>
                                            <input 
                                                type="text" 
                                                name="state" 
                                                value={formData.state} 
                                                onChange={handleInputChange} 
                                                required 
                                                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                                                placeholder="Enter state"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                                Pincode *
                                            </label>
                                            <input 
                                                type="text" 
                                                name="pincode" 
                                                value={formData.pincode} 
                                                onChange={handleInputChange} 
                                                required 
                                                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                                                placeholder="Enter pincode"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                            
                            {/* Professional Information */}
                            <motion.div variants={sectionVariants}>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                                        <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        Professional Information
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                            <div className="flex items-center gap-2">
                                                <CreditCard size={16} />
                                                Agent Code *
                                            </div>
                                        </label>
                                        <input 
                                            type="text" 
                                            name="agent_code" 
                                            value={formData.agent_code} 
                                            onChange={handleInputChange} 
                                            required 
                                            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                                            placeholder="Enter agent code"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={16} />
                                                Joining Date *
                                            </div>
                                        </label>
                                        <input 
                                            type="date" 
                                            name="joining_date" 
                                            value={formData.joining_date} 
                                            onChange={handleInputChange} 
                                            required 
                                            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                            Experience (Years)
                                        </label>
                                        <input 
                                            type="number" 
                                            name="experience" 
                                            value={formData.experience} 
                                            onChange={handleInputChange} 
                                            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                                            placeholder="Years of experience"
                                        />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Document Upload Section */}
                            <motion.div variants={sectionVariants}>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                                        <Upload className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        Document Upload
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-orange-50 dark:bg-orange-900/10 rounded-xl p-6 border border-orange-200 dark:border-orange-800/30">
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                                            Photograph *
                                        </label>
                                        <input 
                                            type="file" 
                                            name="photo" 
                                            onChange={handleFileChange} 
                                            required 
                                            accept="image/*"
                                            className="w-full text-sm text-slate-500 dark:text-slate-400
                                                file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0
                                                file:text-sm file:font-semibold file:bg-orange-100 file:text-orange-700
                                                hover:file:bg-orange-200 dark:file:bg-orange-900/30 dark:file:text-orange-300
                                                file:transition-colors cursor-pointer"
                                        />
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                                            Upload a professional photo (JPG, PNG)
                                        </p>
                                    </div>
                                    <div className="bg-orange-50 dark:bg-orange-900/10 rounded-xl p-6 border border-orange-200 dark:border-orange-800/30">
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                                            Resume/CV
                                        </label>
                                        <input 
                                            type="file" 
                                            name="resume" 
                                            onChange={handleFileChange} 
                                            accept=".pdf,.doc,.docx"
                                            className="w-full text-sm text-slate-500 dark:text-slate-400
                                                file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0
                                                file:text-sm file:font-semibold file:bg-orange-100 file:text-orange-700
                                                hover:file:bg-orange-200 dark:file:bg-orange-900/30 dark:file:text-orange-300
                                                file:transition-colors cursor-pointer"
                                        />
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                                            Upload resume (PDF, DOC, DOCX)
                                        </p>
                                    </div>
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
                                    onClick={() => navigate("/subagent/ManageSubAgents")} 
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
                                    className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-green-700 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Registering...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={18} />
                                            Register Sub Agent
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

export default AddSubAgent;
