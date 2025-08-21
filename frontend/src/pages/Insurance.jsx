// // src/pages/insurance.jsx
// import React from 'react';

// const insuranceData = [
//   {
//     type: 'Health Insurance',
//     description: 'Covers medical expenses like hospital visits, surgeries, and prescriptions.',
//     coverage: 'Up to ₹10,00,000/year',
//     policies: ['Individual Plan', 'Family Floater', 'Critical Illness'],
//   },
//   {
//     type: 'Life Insurance',
//     description: 'Provides financial support to family in case of the insured’s death.',
//     coverage: 'Up to ₹1 Cr. lump sum',
//     policies: ['Term Life', 'Whole Life', 'Endowment Plans'],
//   },
//   {
//     type: 'Vehicle Insurance',
//     description: 'Covers damages to your vehicle or third-party liabilities.',
//     coverage: 'Up to ₹5,00,000 + Third-party cover',
//     policies: ['Comprehensive', 'Third-Party', 'Own Damage'],
//   },
//   {
//     type: 'Property Insurance',
//     description: 'Protects home or commercial property against fire, theft, or natural disasters.',
//     coverage: 'Up to ₹50,00,000 property value',
//     policies: ['Fire Insurance', 'Burglary Cover', 'Natural Calamity Cover'],
//   },
//   {
//     type: 'Business Insurance',
//     description: 'Covers business operations from potential losses or liabilities.',
//     coverage: 'Custom coverage based on business size',
//     policies: ['Liability Cover', 'Property Loss', 'Employee Insurance'],
//   },
//   {
//     type: 'Travel Insurance',
//     description: 'Covers unexpected travel issues like trip cancellation, lost baggage, or emergencies.',
//     coverage: 'Up to ₹10,00,000 trip cover',
//     policies: ['International', 'Domestic', 'Student Travel Insurance'],
//   },
// ];

// const Insurance = () => {
//   return (
//     <div className="bg-gradient-to-br from-[#e0f2fe] via-[#c7d2fe] to-[#a5b4fc] py-10 min-h-screen">
//       <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h1 className="text-3xl font-bold mb-6 text-indigo-700 text-center">
//           Explore Insurance Options
//         </h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {insuranceData.map((insurance, index) => (
//             <div key={index} className="bg-white shadow-md rounded-xl p-6 space-y-3 border border-gray-200">
//               <h2 className="text-xl font-semibold text-gray-800">{insurance.type}</h2>
//               <p className="text-gray-600">{insurance.description}</p>
//               <p className="text-gray-700 font-medium">
//                 Coverage: <span className="text-green-600">{insurance.coverage}</span>
//               </p>
//               <ul className="list-disc list-inside text-sm text-gray-700">
//                 {insurance.policies.map((policy, i) => (
//                   <li key={i}>{policy}</li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Insurance;

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, User, Car, Home, Briefcase, Plane, Shield, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const insuranceData = [
  {
    type: 'Health Insurance',
    description: 'Covers medical expenses like hospital visits, surgeries, and prescriptions.',
    coverage: 'Up to ₹10,00,000/year',
    policies: ['Individual Plan', 'Family Floater', 'Critical Illness'],
    icon: Heart,
    color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400',
    gradient: 'from-pink-500 to-red-500'
  },
  {
    type: 'Life Insurance',
    description: 'Provides financial support to family in case of the insured death.',
    coverage: 'Up to ₹1 Cr. lump sum',
    policies: ['Term Life', 'Whole Life', 'Endowment Plans'],
    icon: User,
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    gradient: 'from-blue-500 to-indigo-500'
  },
  {
    type: 'Vehicle Insurance',
    description: 'Covers damages to your vehicle or third-party liabilities.',
    coverage: 'Up to ₹5,00,000 + Third-party cover',
    policies: ['Comprehensive', 'Third-Party', 'Own Damage'],
    icon: Car,
    color: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    type: 'Property Insurance',
    description: 'Protects home or commercial property against fire, theft, or natural disasters.',
    coverage: 'Up to ₹50,00,000 property value',
    policies: ['Fire Insurance', 'Burglary Cover', 'Natural Calamity Cover'],
    icon: Home,
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
    gradient: 'from-purple-500 to-violet-500'
  },
  {
    type: 'Business Insurance',
    description: 'Covers business operations from potential losses or liabilities.',
    coverage: 'Custom coverage based on business size',
    policies: ['Liability Cover', 'Property Loss', 'Employee Insurance'],
    icon: Briefcase,
    color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
    gradient: 'from-orange-500 to-amber-500'
  },
  {
    type: 'Travel Insurance',
    description: 'Covers unexpected travel issues like trip cancellation, lost baggage, or emergencies.',
    coverage: 'Up to ₹10,00,000 trip cover',
    policies: ['International', 'Domestic', 'Student Travel Insurance'],
    icon: Plane,
    color: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-400',
    gradient: 'from-cyan-500 to-teal-500'
  },
];

const Insurance = () => {
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
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
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
            <Shield className="text-cyan-600 dark:text-cyan-400" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Explore Insurance Options
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Comprehensive insurance solutions designed to protect what matters most to you and your loved ones.
          </p>
        </motion.div>

        {/* Insurance Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {insuranceData.map((insurance, index) => {
            const IconComponent = insurance.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.03,
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="group bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300"
              >
                {/* Card Header with Gradient */}
                <div className={`bg-gradient-to-r ${insurance.gradient} p-6 relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <IconComponent className="text-white" size={24} />
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Shield className="text-white" size={16} />
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {insurance.type}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                      {insurance.description}
                    </p>
                  </div>

                  {/* Coverage Amount */}
                  <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-4 border border-cyan-100 dark:border-cyan-800">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="text-cyan-600 dark:text-cyan-400" size={16} />
                      <span className="text-xs font-semibold text-cyan-700 dark:text-cyan-300 uppercase tracking-wide">Coverage</span>
                    </div>
                    <p className="text-cyan-800 dark:text-cyan-200 font-bold text-lg">
                      {insurance.coverage}
                    </p>
                  </div>

                  {/* Policy Types */}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                      Available Policies
                    </h3>
                    <ul className="space-y-2">
                      {insurance.policies.map((policy, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i }}
                          className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"
                        >
                          <CheckCircle className="text-green-500 flex-shrink-0" size={14} />
                          {policy}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 bg-slate-900 dark:bg-cyan-600 text-white py-3 rounded-xl font-semibold hover:bg-cyan-600 dark:hover:bg-cyan-500 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Get Quote
                    <Shield size={16} />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Need Help Choosing the Right Insurance?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
            Our expert advisors are here to help you find the perfect insurance solution tailored to your specific needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-slate-700 hover:from-cyan-700 hover:to-slate-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Talk to an Expert
            </Link>
            <Link
              to="/compare"
              className="inline-flex items-center gap-2 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-8 py-3 rounded-xl font-semibold hover:border-cyan-500 hover:text-cyan-600 dark:hover:border-cyan-400 dark:hover:text-cyan-400 transition-all duration-300"
            >
              Compare Policies
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Insurance;

