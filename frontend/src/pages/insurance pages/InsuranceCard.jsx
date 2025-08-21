// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Star } from 'lucide-react';

// const InsuranceCard = ({ policy }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
//       <div className="p-6">
//         <div className="flex justify-between items-start mb-4">
//           <div>
//             <h3 className="text-xl font-bold text-gray-800">{policy.name}</h3>
//             <p className="text-gray-600">{policy.provider}</p>
//           </div>
//           <div className="flex items-center bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
//             <Star className="w-4 h-4 fill-current mr-1" />
//             <span>{policy.rating}</span>
//           </div>
//         </div>

//         <div className="mb-4">
//           <p className="text-sm text-gray-500">Premium</p>
//           <p className="text-lg font-semibold text-indigo-600">{policy.premium}</p>
//         </div>

//         <div className="mb-4">
//           <p className="text-sm text-gray-500">Coverage</p>
//           <p className="text-lg font-semibold">{policy.coverage}</p>
//         </div>

//         <div className="mb-6">
//           <p className="text-sm text-gray-500 mb-2">Key Features</p>
//           <ul className="space-y-1">
//             {policy.features.map((feature, index) => (
//               <li key={index} className="flex items-center">
//                 <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2"></span>
//                 <span className="text-sm">{feature}</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="flex space-x-3">
//           <Link
//             to={`/policy/${policy.id}`}
//             className="flex-1 bg-indigo-600 text-white text-center py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
//           >
//             View Details
//           </Link>
//           <button className="flex-1 border border-indigo-600 text-indigo-600 py-2 rounded-lg font-medium hover:bg-indigo-50 transition">
//             Get Quote
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InsuranceCard;

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Shield, Eye, TrendingUp, CheckCircle } from 'lucide-react';

const InsuranceCard = ({ policy }) => {
  // Generate stars array for rating display
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);
  
  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        y: -8,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      whileTap={{ scale: 0.98 }}
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300 group"
    >
      {/* Card Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-slate-700 dark:from-cyan-700 dark:to-slate-800 p-6 relative overflow-hidden">
        {/* Floating decoration elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Shield className="text-white" size={24} />
            </div>
            {policy.popular && (
              <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full shadow">
                Popular
              </span>
            )}
          </div>
          
          {/* Rating Display */}
          <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
            <div className="flex">
              {stars.map((star) => (
                <Star
                  key={star}
                  className={`w-3 h-3 ${
                    star <= Math.floor(policy.rating)
                      ? 'text-yellow-300 fill-current'
                      : 'text-white/40'
                  }`}
                />
              ))}
            </div>
            <span className="text-white font-semibold text-sm ml-1">
              {policy.rating}
            </span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 space-y-6">
        {/* Policy Info */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
            {policy.name}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 font-medium">
            {policy.provider}
          </p>
        </div>

        {/* Pricing Information */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide mb-1">
              Premium
            </p>
            <p className="text-lg font-bold text-cyan-600 dark:text-cyan-400">
              {policy.premium}
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide mb-1">
              Coverage
            </p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">
              {policy.coverage}
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
              Key Features
            </p>
          </div>
          <ul className="space-y-2">
            {policy.features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {feature}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1"
          >
            <Link
              to={`/policy/${policy.id}`}
              className="w-full bg-gradient-to-r from-cyan-600 to-slate-700 hover:from-cyan-700 hover:to-slate-800 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <Eye size={16} />
              View Details
            </Link>
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 py-3 px-4 rounded-xl font-semibold hover:border-cyan-500 hover:text-cyan-600 dark:hover:border-cyan-400 dark:hover:text-cyan-400 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <TrendingUp size={16} />
            Get Quote
          </motion.button>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/5 to-slate-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default InsuranceCard;
