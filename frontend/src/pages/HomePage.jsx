// import React, { useState } from "react";
// import Hero from "../components/Hero";
// import InsuranceCategories from "./insurance pages/InsuranceCategories";
// import { Link } from "react-router-dom";

// const HomePage = () => {
//   // Initial testimonials state
//   const [testimonials, setTestimonials] = useState([
    
//     {
//       id: 1,
//       name: "Michael Chen",
//       role: "Family Man",
//       content:
//         "The health insurance comparison tool made it so easy to find coverage for my entire family. Great service and expert advice!",
//       rating: 5,
//       avatar:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
//     },
//     {
//       id: 2,
//       name: "Emily Davis",
//       role: "Young Professional",
//       content:
//         "As a first-time insurance buyer, I was overwhelmed. The advisors at InsureWise made everything clear and simple. Highly recommend!",
//       rating: 5,
//       avatar:
//         "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
//     },
//   ]);

//   // State to handle feedback form visibility and inputs
//   const [showFeedbackForm, setShowFeedbackForm] = useState(false);
//   const [newFeedback, setNewFeedback] = useState({
//     name: "",
//     role: "",
//     content: "",
//     rating: 5,
//   });

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewFeedback((prev) => ({
//       ...prev,
//       [name]: name === "rating" ? Number(value) : value,
//     }));
//   };

//   // Handle form submit
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const feedback = {
//       id: testimonials.length + 1,
//       name: newFeedback.name || "Anonymous",
//       role: newFeedback.role || "Customer",
//       content: newFeedback.content,
//       rating: newFeedback.rating,
//       avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
//         newFeedback.name || "Anon"
//       )}&background=4f46e5&color=fff&size=64`,
//     };
//     setTestimonials((prev) => [feedback, ...prev]);
//     // Reset form and close
//     setNewFeedback({ name: "", role: "", content: "", rating: 5 });
//     setShowFeedbackForm(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-[#c7d2fe] to-[#a5b4fc]">
//       {/* Hero + Categories */}
//       <Hero />
//       <InsuranceCategories />

//       {/* Feedback Form Modal */}
//       {showFeedbackForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
//             <button
//               className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
//               onClick={() => setShowFeedbackForm(false)}
//               aria-label="Close feedback form"
//             >
//               ✕
//             </button>
//             <h3 className="text-xl font-bold mb-4">Submit Your Feedback</h3>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input
//                 type="text"
//                 name="name"
//                 value={newFeedback.name}
//                 onChange={handleChange}
//                 placeholder="Your Name"
//                 className="w-full border border-gray-300 rounded px-3 py-2"
//               />
//               <input
//                 type="text"
//                 name="role"
//                 value={newFeedback.role}
//                 onChange={handleChange}
//                 placeholder="Your Role (optional)"
//                 className="w-full border border-gray-300 rounded px-3 py-2"
//               />
//               <textarea
//                 name="content"
//                 value={newFeedback.content}
//                 onChange={handleChange}
//                 required
//                 placeholder="Your Feedback"
//                 className="w-full border border-gray-300 rounded px-3 py-2 resize-none"
//                 rows={4}
//               />
//               <label className="block">
//                 Rating:
//                 <select
//                   name="rating"
//                   value={newFeedback.rating}
//                   onChange={handleChange}
//                   className="ml-2 border border-gray-300 rounded px-2 py-1"
//                 >
//                   {[5, 4, 3, 2, 1].map((r) => (
//                     <option key={r} value={r}>
//                       {r}
//                     </option>
//                   ))}
//                 </select>
//               </label>
//               <button
//                 type="submit"
//                 className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
//               >
//                 Submit
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Testimonials */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-white p-8 rounded-2xl shadow-2xl">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
//                 What Our Customers Say
//               </h2>
//               <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//                 Real stories from our satisfied clients about how InsureWise
//                 made insurance easy and accessible.
//               </p>
//             </div>

//             <div className="grid md:grid-cols-3 gap-8">
//               {testimonials.map((testimonial) => (
//                 <div
//                   key={testimonial.id}
//                   className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300"
//                 >
//                   <div className="flex items-center mb-3">
//                     <span className="text-2xl text-blue-500 mr-2">“</span>
//                     <div className="flex">
//                       {[...Array(testimonial.rating)].map((_, i) => (
//                         <span key={i} className="text-yellow-400 text-lg">
//                           ★
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                   <p className="text-gray-600 mb-6">"{testimonial.content}"</p>
//                   <div className="flex items-center">
//                     <img
//                       src={testimonial.avatar}
//                       alt={testimonial.name}
//                       className="w-12 h-12 rounded-full mr-4"
//                     />
//                     <div>
//                       <h4 className="font-semibold text-gray-800">
//                         {testimonial.name}
//                       </h4>
//                       <p className="text-sm text-gray-500">
//                         {testimonial.role}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-20">
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-white p-10 rounded-2xl shadow-2xl text-center">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
//               Ready to Find Your Perfect Insurance Policy?
//             </h2>
//             <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
//               Join thousands of satisfied customers who found the right coverage
//               with expert help.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link
//                 to="/register"
//                 className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
//               >
//                 Get Started Free
//               </Link>
//               <button
//                 onClick={() => setShowFeedbackForm(true)}
//                 className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
//               >
//                 Add Feedback
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HomePage;

// HomePage.jsx
import React, { useState } from "react";
import Hero from "../components/Hero";
import InsuranceCategories from "./insurance pages/InsuranceCategories";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, MessageCircle, Send } from "lucide-react";

const HomePage = () => {
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Michael Chen",
      role: "Family Man",
      content:
        "The health insurance comparison tool made it so easy to find coverage for my entire family. Great service and expert advice!",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Emily Davis",
      role: "Young Professional",
      content:
        "As a first-time insurance buyer, I was overwhelmed. The advisors at Guard.In made everything clear and simple. Highly recommend!",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
    },
  ]);

  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [newFeedback, setNewFeedback] = useState({
    name: "",
    role: "",
    content: "",
    rating: 5,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFeedback((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const feedback = {
      id: testimonials.length + 1,
      name: newFeedback.name || "Anonymous",
      role: newFeedback.role || "Customer",
      content: newFeedback.content,
      rating: newFeedback.rating,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        newFeedback.name || "Anon"
      )}&background=06b6d4&color=fff&size=64`,
    };
    setTestimonials((prev) => [feedback, ...prev]);
    setNewFeedback({ name: "", role: "", content: "", rating: 5 });
    setShowFeedbackForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cyan-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-500">
      <Hero />
      <InsuranceCategories />

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Real stories from our satisfied clients about how Guard.In made insurance easy and accessible.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700"
              >
                {/* Rating Stars */}
                <div className="flex items-center mb-4">
                  <span className="text-2xl text-cyan-500 mr-3">"</span>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={18} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* User Info */}
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 shadow-md"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Add Feedback Button */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button
              onClick={() => setShowFeedbackForm(true)}
              className="inline-flex items-center gap-3 bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <MessageCircle size={20} />
              Add Your Feedback
            </button>
          </motion.div>
        </div>
      </section>

      {/* Feedback Form Modal */}
      <AnimatePresence>
        {showFeedbackForm && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 w-full max-w-md shadow-2xl relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <button
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                onClick={() => setShowFeedbackForm(false)}
                aria-label="Close feedback form"
              >
                <X size={24} />
              </button>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Share Your Experience
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={newFeedback.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="role"
                    value={newFeedback.role}
                    onChange={handleChange}
                    placeholder="Your Role (optional)"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  />
                </div>

                <div>
                  <textarea
                    name="content"
                    value={newFeedback.content}
                    onChange={handleChange}
                    required
                    placeholder="Share your experience with us..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <label className="text-slate-700 dark:text-slate-300 font-medium">
                    Rating:
                  </label>
                  <select
                    name="rating"
                    value={newFeedback.rating}
                    onChange={handleChange}
                    className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>
                        {r} Star{r !== 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Submit Feedback
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
          <motion.div
            className="bg-white dark:bg-slate-800 p-12 rounded-3xl shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Ready to Find Your Perfect Insurance Policy?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto">
              Join thousands of satisfied customers who found the right coverage with expert help.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/register"
                className="bg-slate-900 dark:bg-cyan-600 text-white px-10 py-4 rounded-2xl font-semibold hover:bg-cyan-600 dark:hover:bg-cyan-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Get Started Free
              </Link>
              <button
                onClick={() => setShowFeedbackForm(true)}
                className="border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-10 py-4 rounded-2xl font-semibold hover:border-cyan-500 hover:text-cyan-600 dark:hover:border-cyan-400 dark:hover:text-cyan-400 transition-all duration-300"
              >
                Share Feedback
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
