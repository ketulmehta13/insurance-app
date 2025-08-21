// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const InquiryForm = ({ onClose, onSuccess, selectedPolicyId }) => {
//   const [policies, setPolicies] = useState([]);
//   const [policyId, setPolicyId] = useState(selectedPolicyId || "");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchPolicies();
//   }, []);
  
//   const fetchPolicies = async () => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const res = await axios.get("http://127.0.0.1:8000/api/v1/accounts/my-policies/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log("InquiryForm policies", res.data); // <-- add this!
//       setPolicies(res.data);
//     } catch (err) {
//       console.error("Failed to load policies (InquiryForm)", err);
//     }
//   };
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     if (!policyId || !message.trim()) {
//       setError("Please select a policy and enter your inquiry.");
//       return;
//     }
//     try {
//       const token = localStorage.getItem("accessToken");
//       await axios.post(
//         "http://127.0.0.1:8000/inquiry/inquiries/",
//         { policy_id: policyId, message },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       onSuccess();
//       onClose();
//     } catch (err) {
//       setError("Failed to submit inquiry. Please try again.");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
//       <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
//         <h2 className="text-xl font-bold mb-4">New Inquiry</h2>
//         {error && <p className="text-red-500 mb-2">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <label className="block mb-2 font-semibold">Select Policy:</label>
//           <select
//             value={policyId}
//             onChange={(e) => setPolicyId(e.target.value)}
//             className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
//             required
//           >
//             <option value="">-- Select a policy --</option>
//             {policies.map((p) => (
//               <option key={p.id} value={p.id}>
//                 {p.policy_number} ({p.policy_type})
//               </option>
//             ))}
//           </select>

//           <label className="block mb-2 font-semibold">Inquiry Message:</label>
//           <textarea
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             rows="4"
//             className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
//             required
//           ></textarea>

//           <div className="flex justify-end space-x-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//             >
//               Cancel
//             </button>
//             <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default InquiryForm;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Send, 
  FileText, 
  MessageCircle, 
  Loader2, 
  AlertCircle,
  CheckCircle,
  User
} from "lucide-react";

const InquiryForm = ({ onClose, onSuccess, selectedPolicyId }) => {
  const [policies, setPolicies] = useState([]);
  const [policyId, setPolicyId] = useState(selectedPolicyId || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPolicies();
  }, []);
  
  const fetchPolicies = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get("http://127.0.0.1:8000/api/v1/accounts/my-policies/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("InquiryForm policies", res.data);
      setPolicies(res.data);
    } catch (err) {
      console.error("Failed to load policies (InquiryForm)", err);
      setError("Failed to load policies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    
    if (!policyId || !message.trim()) {
      setError("Please select a policy and enter your inquiry.");
      setSubmitting(false);
      return;
    }
    
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        "http://127.0.0.1:8000/inquiry/inquiries/",
        { policy_id: policyId, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onSuccess();
      onClose();
    } catch (err) {
      setError("Failed to submit inquiry. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
      transition: { duration: 0.2 }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 dark:border-slate-700"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">New Inquiry</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">Submit your policy inquiry</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            </motion.button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Policy Selection */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Select Policy
                  </div>
                </label>
                <div className="relative">
                  <select
                    value={policyId}
                    onChange={(e) => setPolicyId(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all appearance-none"
                    required
                    disabled={loading}
                  >
                    <option value="">-- Select a policy --</option>
                    {policies.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.policy_number} ({p.policy_type})
                      </option>
                    ))}
                  </select>
                  {loading && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <Loader2 className="w-4 h-4 text-cyan-600 animate-spin" />
                    </div>
                  )}
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    {!loading && (
                      <div className="w-2 h-2 border-r-2 border-b-2 border-slate-400 transform rotate-45"></div>
                    )}
                  </div>
                </div>
                {policies.length === 0 && !loading && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    No policies available
                  </p>
                )}
              </motion.div>

              {/* Message Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Inquiry Message
                  </div>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="4"
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="Describe your inquiry in detail..."
                  required
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Be as specific as possible for better assistance
                  </p>
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {message.length} / 500
                  </span>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex gap-3 pt-4"
              >
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200"
                  disabled={submitting}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-600 to-slate-700 text-white rounded-xl font-semibold hover:from-cyan-700 hover:to-slate-800 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  disabled={submitting || loading}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Inquiry
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>

            {/* Success State */}
            {onSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="hidden" // This will be shown by parent component
              >
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-1">
                    Inquiry Submitted!
                  </h3>
                  <p className="text-green-600 dark:text-green-400 text-sm">
                    Your inquiry has been sent successfully. We'll get back to you soon.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InquiryForm;

