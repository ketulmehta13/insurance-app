// "use client";
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const AddFirm = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     family_head: "", // New field to store selected Family Head id
//     firm_name: "",
//     firm_type: "",
//     contact_person_name: "",
//     designation: "",
//     mobile_no: "",
//     email: "",
//     address1: "",
//     city: "",
//     area: "",
//     business_type: "",
//   });

//   const [familyHeads, setFamilyHeads] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [isError, setIsError] = useState(false);

//   // Fetch Family Heads for dropdown on mount
//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/client/family-heads/")
//       .then((resp) => setFamilyHeads(resp.data))
//       .catch(() => setFamilyHeads([]));
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");
//     setIsError(false);

//     // Create FormData for form POST
//     const submissionData = new FormData();
//     for (const key in formData) {
//       if (formData[key] !== null && formData[key] !== "") {
//         submissionData.append(key, formData[key]);
//       }
//     }

//     try {
//         const response = await axios.post("http://127.0.0.1:8000/client/add-firm/", submissionData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         setMessage(response.data.message || "Firm added successfully!");
//         setIsError(false);
//         setTimeout(() => {
//           navigate("/dashboard");
//         }, 2000);
//       } catch (error) {
//         setMessage(error.response?.data?.detail || "An error occurred.");
//         setIsError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//   return (
//     <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen font-sans">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
//           Add Firm
//         </h1>
//         <div className="bg-white rounded-lg shadow-md p-6 md:p-8 border border-gray-200">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Family Head Dropdown */}
//             <div>
//               <label
//                 htmlFor="family_head"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Family Head *
//               </label>
//               <select
//                 id="family_head"
//                 name="family_head"
//                 value={formData.family_head}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select Family Head</option>
//                 {familyHeads.map((head) => (
//                   <option key={head.id} value={head.id}>
//                     {head.first_name} {head.last_name} ({head.email})
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Other firm fields */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Firm Name *
//               </label>
//               <input
//                 type="text"
//                 name="firm_name"
//                 value={formData.firm_name}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Firm Type *
//               </label>
//               <select
//                 name="firm_type"
//                 value={formData.firm_type}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select Firm Type</option>
//                 <option value="proprietorship">Proprietorship</option>
//                 <option value="partnership">Partnership</option>
//                 <option value="llp">LLP</option>
//                 <option value="private-limited">Private Limited</option>
//                 <option value="public-limited">Public Limited</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Contact Person Name *
//               </label>
//               <input
//                 type="text"
//                 name="contact_person_name"
//                 value={formData.contact_person_name}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Designation *
//               </label>
//               <input
//                 type="text"
//                 name="designation"
//                 value={formData.designation}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Mobile Number *
//               </label>
//               <input
//                 type="tel"
//                 name="mobile_no"
//                 value={formData.mobile_no}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Email Address *
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Address *
//               </label>
//               <textarea
//                 name="address1"
//                 value={formData.address1}
//                 onChange={handleInputChange}
//                 rows={3}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 City *
//               </label>
//               <select
//                 name="city"
//                 value={formData.city}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select City</option>
//                 <option value="Mumbai">Mumbai</option>
//                 <option value="Delhi">Delhi</option>
//                 <option value="Bangalore">Bangalore</option>
//                 <option value="Chennai">Chennai</option>
//                 <option value="Kolkata">Kolkata</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Area *
//               </label>
//               <select
//                 name="area"
//                 value={formData.area}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select Area</option>
//                 <option value="Area 1">Area 1</option>
//                 <option value="Area 2">Area 2</option>
//                 <option value="Area 3">Area 3</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Business Type *
//               </label>
//               <select
//                 name="business_type"
//                 value={formData.business_type}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select Business Type</option>
//                 <option value="manufacturing">Manufacturing</option>
//                 <option value="trading">Trading</option>
//                 <option value="service">Service</option>
//               </select>
//             </div>

//             {message && (
//               <div
//                 className={`p-4 rounded-md text-center font-medium ${
//                   isError
//                     ? "bg-red-100 text-red-800"
//                     : "bg-green-100 text-green-800"
//                 }`}
//               >
//                 {message}
//               </div>
//             )}

//             <div className="flex justify-end space-x-4 pt-4 border-t">
//               <button
//                 type="button"
//                 onClick={() => navigate("/dashboard/clientmanage/ManageClients")}
//                 disabled={loading}
//                 className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors disabled:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
//               >
//                 {loading ? "Saving..." : "Add Firm"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddFirm;
"use client";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { 
  Building, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowLeft,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle,
  Briefcase
} from "lucide-react";

const AddFirm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    family_head: "", // New field to store selected Family Head id
    firm_name: "",
    firm_type: "",
    contact_person_name: "",
    designation: "",
    mobile_no: "",
    email: "",
    address1: "",
    city: "",
    area: "",
    business_type: "",
  });

  const [familyHeads, setFamilyHeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // Fetch Family Heads for dropdown on mount
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/client/family-heads/")
      .then((resp) => setFamilyHeads(resp.data))
      .catch(() => setFamilyHeads([]));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsError(false);

    // Create FormData for form POST
    const submissionData = new FormData();
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== "") {
        submissionData.append(key, formData[key]);
      }
    }

    try {
        const response = await axios.post("http://127.0.0.1:8000/client/add-firm/", submissionData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setMessage(response.data.message || "Firm added successfully!");
        setIsError(false);
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } catch (error) {
        setMessage(error.response?.data?.detail || "An error occurred.");
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-6">
            <Building className="text-orange-600 dark:text-orange-400" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Add Firm
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Register a new business firm with complete details
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Family Head Dropdown */}
            <div>
              <label
                htmlFor="family_head"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
              >
                <div className="flex items-center gap-2">
                  <User size={16} />
                  Family Head *
                </div>
              </label>
              <select
                id="family_head"
                name="family_head"
                value={formData.family_head}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              >
                <option value="">Select Family Head</option>
                {familyHeads.map((head) => (
                  <option key={head.id} value={head.id}>
                    {head.first_name} {head.last_name} ({head.email})
                  </option>
                ))}
              </select>
            </div>

            {/* Other firm fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  <div className="flex items-center gap-2">
                    <Building size={16} />
                    Firm Name *
                  </div>
                </label>
                <input
                  type="text"
                  name="firm_name"
                  value={formData.firm_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  placeholder="Enter firm name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} />
                    Firm Type *
                  </div>
                </label>
                <select
                  name="firm_type"
                  value={formData.firm_type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                >
                  <option value="">Select Firm Type</option>
                  <option value="proprietorship">Proprietorship</option>
                  <option value="partnership">Partnership</option>
                  <option value="llp">LLP</option>
                  <option value="private-limited">Private Limited</option>
                  <option value="public-limited">Public Limited</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Contact Person Name *
                </label>
                <input
                  type="text"
                  name="contact_person_name"
                  value={formData.contact_person_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  placeholder="Enter contact person name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Designation *
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  placeholder="Enter designation"
                />
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

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  Address *
                </div>
              </label>
              <textarea
                name="address1"
                value={formData.address1}
                onChange={handleInputChange}
                rows={3}
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
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                >
                  <option value="">Select City</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Kolkata">Kolkata</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Area *
                </label>
                <select
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                >
                  <option value="">Select Area</option>
                  <option value="Area 1">Area 1</option>
                  <option value="Area 2">Area 2</option>
                  <option value="Area 3">Area 3</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Business Type *
                </label>
                <select
                  name="business_type"
                  value={formData.business_type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                >
                  <option value="">Select Business Type</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="trading">Trading</option>
                  <option value="service">Service</option>
                </select>
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
                className="px-8 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-amber-700 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Add Firm
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

export default AddFirm;
