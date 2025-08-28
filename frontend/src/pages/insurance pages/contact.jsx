// // src/pages/Contact.jsx
// import React from 'react';
// import { Clock } from 'lucide-react';

// const Contact = () => {
//   return (
//     <div className="max-w-3xl mx-auto px-6 py-10">
//       <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
//       <p className="text-gray-700 mb-6">
//         We'd love to hear from you! Reach out with any questions or support needs.
//       </p>

//       <div className="space-y-4">
//         <div className="flex items-center space-x-3">
//           <Clock className="w-5 h-5 text-blue-600" />
//           <span>Available Digitally: 24 x 7</span>
//         </div>
//         <div className="flex items-center space-x-3">
//           <Clock className="w-5 h-5 text-blue-600" />
//           <span>Phone Support: 11:00am - 6:00pm</span>
//         </div>
//         <div className="mt-6">
//           <h2 className="text-xl font-semibold">Email</h2>
//           <p>support@pradvisors.com</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageCircle, 
  ArrowLeft,
  CheckCircle,
  User,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Clock,
      title: "Digital Support",
      info: "Available 24/7",
      description: "Get instant help through our online platform",
      color: "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
    },
    {
      icon: Phone,
      title: "Phone Support",
      info: "11:00 AM - 6:00 PM",
      description: "Speak directly with our insurance experts",
      color: "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
    },
    {
      icon: Mail,
      title: "Email Support",
      info: "support@guardin.com",
      description: "Send us detailed queries and documentation",
      color: "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
    },
    {
      icon: MapPin,
      title: "Office Location",
      info: "123 Insurance Street",
      description: "Visit us for in-person consultations",
      color: "bg-cyan-100 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400"
    }
  ];

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

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
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
    <div className="min-h-screen bg-gradient-to-br from-white via-cyan-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-24 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 font-medium transition-colors duration-200"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 dark:bg-cyan-900/30 rounded-full mb-6">
            <MessageCircle className="text-cyan-600 dark:text-cyan-400" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Contact <span className="text-cyan-600 dark:text-cyan-400">PR-Advisor</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            We'd love to hear from you! Reach out with any questions or support needs.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                </div>
                Get in Touch
              </h2>
            </motion.div>

            <div className="grid gap-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 ${info.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <IconComponent size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                          {info.title}
                        </h3>
                        <p className="text-lg font-medium text-cyan-600 dark:text-cyan-400 mb-1">
                          {info.info}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Contact Options */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-r from-cyan-600 to-slate-700 dark:from-cyan-700 dark:to-slate-800 rounded-2xl p-6 text-white"
            >
              <h3 className="text-xl font-bold mb-4">Need Immediate Help?</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-cyan-200" />
                  <span className="text-cyan-100">Call us: +91 99999 99999</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-cyan-200" />
                  <span className="text-cyan-100">Email: support@guardin.com</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                <Send className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Send us a Message</h2>
            </div>

            {/* Success Message */}
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-3"
              >
                <CheckCircle className="text-green-500" size={20} />
                <p className="text-green-600 dark:text-green-400 font-medium">
                  Message sent successfully! We'll get back to you soon.
                </p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-slate-400 dark:text-slate-500" size={18} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-slate-400 dark:text-slate-500" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Subject
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 text-slate-400 dark:text-slate-500" size={18} />
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                    placeholder="What's this about?"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  placeholder="Tell us how we can help you..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-cyan-600 to-slate-700 text-white py-3 rounded-xl font-semibold hover:from-cyan-700 hover:to-slate-800 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* FAQ Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700 text-center"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Looking for Quick Answers?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Check out our frequently asked questions for immediate help.
          </p>
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-xl font-semibold hover:bg-cyan-100 hover:text-cyan-700 dark:hover:bg-cyan-900/30 dark:hover:text-cyan-400 transition-all duration-300"
          >
            <FileText size={18} />
            Visit FAQ
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;

