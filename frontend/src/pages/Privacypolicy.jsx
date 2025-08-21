// import React ,{ useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const PrivacyPolicy = () => {
//   // Scroll to top when component mounts
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);


//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
      

//       <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
      
//       <div className="prose prose-indigo">
//         <p className="mb-6">
//           We are committed to ensuring the privacy and confidentiality of your personal information. 
//           By accessing and using our website, you consent to the terms of this privacy policy.
//         </p>

//         <h2 className="text-2xl font-semibold mb-4">Information Collection:</h2>

//         <h3 className="text-xl font-medium mb-3">Personal Information:</h3>
//         <p className="mb-6">
//           We may collect personal information such as your name, contact details, email address, 
//           and other relevant information when you voluntarily provide it to us through website forms, 
//           email communications, or other means.
//         </p>

//         <h3 className="text-xl font-medium mb-3">Non-Personal Information:</h3>
//         <p className="mb-6">
//           We may also collect non-personal information such as your IP address, browser type, 
//           operating system, and website usage data through cookies and similar technologies. 
//           This information is used to analyze trends, administer the website, track user movements, 
//           and gather demographic information.
//         </p>

//         <h3 className="text-xl font-medium mb-3">Information Sharing:</h3>
//         <p className="mb-6">
//           We do not sell, trade, or rent your personal information to third parties. However, 
//           we may share your personal information with trusted service providers who assist us in 
//           operating our website and delivering services to you. These service providers are obligated 
//           to keep your information confidential and use it only for the purposes specified by us.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default PrivacyPolicy;

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Users, FileText, ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      id: 'collection',
      icon: FileText,
      title: 'Information Collection',
      content: [
        {
          subtitle: 'Personal Information',
          text: 'We may collect personal information such as your name, contact details, email address, and other relevant information when you voluntarily provide it to us through website forms, email communications, or other means.'
        },
        {
          subtitle: 'Non-Personal Information',
          text: 'We may also collect non-personal information such as your IP address, browser type, operating system, and website usage data through cookies and similar technologies. This information is used to analyze trends, administer the website, track user movements, and gather demographic information.'
        }
      ]
    },
    {
      id: 'sharing',
      icon: Users,
      title: 'Information Sharing',
      content: [
        {
          subtitle: '',
          text: 'We do not sell, trade, or rent your personal information to third parties. However, we may share your personal information with trusted service providers who assist us in operating our website and delivering services to you. These service providers are obligated to keep your information confidential and use it only for the purposes specified by us.'
        }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
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
    <div className="min-h-screen bg-gradient-to-br from-white via-cyan-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-500 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
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
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 dark:bg-cyan-900/30 rounded-full mb-4">
            <Shield className="text-cyan-600 dark:text-cyan-400" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            We are committed to ensuring the privacy and confidentiality of your personal information. 
            By accessing and using our website, you consent to the terms of this privacy policy.
          </p>
        </motion.div>

        {/* Content Sections */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <motion.div
                key={section.id}
                variants={itemVariants}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl">
                    <IconComponent className="text-cyan-600 dark:text-cyan-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {section.title}
                  </h2>
                </div>

                <div className="space-y-6">
                  {section.content.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 * itemIndex }}
                    >
                      {item.subtitle && (
                        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                          <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                          {item.subtitle}
                        </h3>
                      )}
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                        {item.text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* Additional Security Note */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-cyan-50 to-slate-50 dark:from-cyan-900/20 dark:to-slate-900/20 rounded-2xl border border-cyan-200 dark:border-cyan-800/30 p-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-cyan-600 rounded-xl">
                <Lock className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Your Data Security
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
              We implement appropriate technical and organizational measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction. Your trust 
              is important to us, and we continuously work to maintain the highest standards of data protection.
            </p>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Questions About This Policy?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              If you have any questions or concerns about our privacy policy, please don't hesitate to contact us.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-slate-700 hover:from-cyan-700 hover:to-slate-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Eye size={18} />
              Contact Us
            </Link>
          </motion.div>

          {/* Last Updated */}
          <motion.div
            variants={itemVariants}
            className="text-center py-6"
          >
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Last updated: January 2025
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
