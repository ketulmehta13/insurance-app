// import React from 'react';
// import { Link } from 'react-router-dom';
// import InsuranceCard from './InsuranceCard';

// const Business = () => {
//   const businessPolicies = [
//     {
//       id: 1,
//       name: "Small Business Shield",
//       provider: "EnterpriseCover",
//       premium: "₹10,000/year",
//       coverage: "₹50,00,000",
//       features: ["Property damage", "Liability coverage", "Business interruption"],
//       rating: 4.5
//     },
//     {
//       id: 2,
//       name: "Professional Liability Protect",
//       provider: "ProCover",
//       premium: "₹15,000/year",
//       coverage: "₹1,00,00,000",
//       features: ["Errors & omissions", "Legal defense costs", "Data breach coverage"],
//       rating: 4.6
//     },
//     {
//       id: 3,
//       name: "Retail Business Plan",
//       provider: "ShopSecure",
//       premium: "₹8,000/year",
//       coverage: "₹25,00,000",
//       features: ["Inventory protection", "Glass breakage", "Money insurance"],
//       rating: 4.3
//     },
//     {
//       id: 4,
//       name: "Cyber Risk Insurance",
//       provider: "DigitalShield",
//       premium: "₹20,000/year",
//       coverage: "₹2,00,00,000",
//       features: ["Data recovery", "Ransomware protection", "Regulatory fines"],
//       rating: 4.7
//     }
//   ];

//   return (
//     <div className="bg-gradient-to-br from-[#e0f2fe] via-[#c7d2fe] to-[#a5b4fc] min-h-screen py-10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-bold text-indigo-800 mb-4">Business Insurance</h1>
//           <p className="text-xl text-gray-700 max-w-3xl mx-auto">
//             Comprehensive protection for your business against various risks and liabilities.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 gap-8 mb-12">
//           {businessPolicies.map(policy => (
//             <InsuranceCard key={policy.id} policy={policy} />
//           ))}
//         </div>

//         <div className="bg-white p-8 rounded-xl shadow-lg">
//           <h2 className="text-2xl font-semibold mb-4 text-gray-800">Business Insurance Coverage</h2>
//           <div className="grid md:grid-cols-2 gap-6">
//             <div>
//               <h3 className="text-lg font-medium text-gray-800 mb-2">Common Coverages:</h3>
//               <ul className="list-disc pl-6 space-y-2 text-gray-700">
//                 <li>Property damage (buildings, equipment, inventory)</li>
//                 <li>General liability (customer injuries, property damage)</li>
//                 <li>Business interruption (lost income due to covered events)</li>
//                 <li>Professional liability (errors and omissions)</li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-lg font-medium text-gray-800 mb-2">Specialized Policies:</h3>
//               <ul className="list-disc pl-6 space-y-2 text-gray-700">
//                 <li>Workers' compensation (employee injuries)</li>
//                 <li>Commercial auto (company vehicles)</li>
//                 <li>Cyber liability (data breaches, cyber attacks)</li>
//                 <li>Directors and officers (management liability)</li>
//               </ul>
//             </div>
//           </div>
          
//           <div className="mt-8">
//             <h3 className="text-lg font-medium text-gray-800 mb-2">Who Needs Business Insurance?</h3>
//             <div className="grid md:grid-cols-3 gap-4">
//               <div className="bg-blue-50 p-4 rounded-lg">
//                 <h4 className="font-medium text-blue-800 mb-1">Small Businesses</h4>
//                 <p className="text-sm text-gray-700">Protect your physical assets and liability exposures</p>
//               </div>
//               <div className="bg-blue-50 p-4 rounded-lg">
//                 <h4 className="font-medium text-blue-800 mb-1">Professionals</h4>
//                 <p className="text-sm text-gray-700">Coverage for service errors and omissions</p>
//               </div>
//               <div className="bg-blue-50 p-4 rounded-lg">
//                 <h4 className="font-medium text-blue-800 mb-1">Online Businesses</h4>
//                 <p className="text-sm text-gray-700">Protection against cyber risks and data breaches</p>
//               </div>
//             </div>
//           </div>

//           <div className="mt-6 flex flex-col sm:flex-row gap-4">
//             <Link 
//               to="/compare?type=business" 
//               className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition text-center"
//             >
//               Compare Business Policies
//             </Link>
//             <Link 
//               to="/business-calculator" 
//               className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition text-center"
//             >
//               Calculate Business Needs
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Business;

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Shield, 
  Building, 
  Users, 
  Laptop, 
  ArrowLeft, 
  Star, 
  CheckCircle, 
  Calculator,
  TrendingUp,
  Lock,
  AlertTriangle
} from 'lucide-react';
import InsuranceCard from './InsuranceCard';

const Business = () => {
  const businessPolicies = [
    {
      id: 1,
      name: "Small Business Shield",
      provider: "EnterpriseCover",
      premium: "₹10,000/year",
      coverage: "₹50,00,000",
      features: ["Property damage", "Liability coverage", "Business interruption"],
      rating: 4.5,
      icon: Building,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      name: "Professional Liability Protect",
      provider: "ProCover",
      premium: "₹15,000/year",
      coverage: "₹1,00,00,000",
      features: ["Errors & omissions", "Legal defense costs", "Data breach coverage"],
      rating: 4.6,
      icon: Shield,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      name: "Retail Business Plan",
      provider: "ShopSecure",
      premium: "₹8,000/year",
      coverage: "₹25,00,000",
      features: ["Inventory protection", "Glass breakage", "Money insurance"],
      rating: 4.3,
      icon: Users,
      color: "from-green-500 to-teal-500"
    },
    {
      id: 4,
      name: "Cyber Risk Insurance",
      provider: "DigitalShield",
      premium: "₹20,000/year",
      coverage: "₹2,00,00,000",
      features: ["Data recovery", "Ransomware protection", "Regulatory fines"],
      rating: 4.7,
      icon: Lock,
      color: "from-red-500 to-orange-500"
    }
  ];

  const coverageTypes = [
    {
      title: "Common Coverages",
      items: [
        "Property damage (buildings, equipment, inventory)",
        "General liability (customer injuries, property damage)",
        "Business interruption (lost income due to covered events)",
        "Professional liability (errors and omissions)"
      ],
      icon: Shield
    },
    {
      title: "Specialized Policies",
      items: [
        "Workers' compensation (employee injuries)",
        "Commercial auto (company vehicles)",
        "Cyber liability (data breaches, cyber attacks)",
        "Directors and officers (management liability)"
      ],
      icon: AlertTriangle
    }
  ];

  const businessTypes = [
    {
      title: "Small Businesses",
      description: "Protect your physical assets and liability exposures",
      icon: Building,
      color: "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
    },
    {
      title: "Professionals",
      description: "Coverage for service errors and omissions",
      icon: Users,
      color: "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
    },
    {
      title: "Online Businesses",
      description: "Protection against cyber risks and data breaches",
      icon: Laptop,
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

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
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
            to="/insurance"
            className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 font-medium transition-colors duration-200"
          >
            <ArrowLeft size={18} />
            Back to Insurance
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
            <Briefcase className="text-cyan-600 dark:text-cyan-400" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Business Insurance
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Comprehensive protection for your business against various risks and liabilities.
          </p>
        </motion.div>

        {/* Business Policies Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {businessPolicies.map((policy) => {
            const IconComponent = policy.icon;
            return (
              <motion.div
                key={policy.id}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.02,
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300"
              >
                {/* Card Header with Gradient */}
                <div className={`bg-gradient-to-r ${policy.color} p-6 relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <IconComponent className="text-white" size={24} />
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="text-white fill-current" size={16} />
                      <span className="text-white font-semibold">{policy.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      {policy.name}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
                      {policy.provider}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Premium</div>
                      <div className="text-lg font-bold text-cyan-600 dark:text-cyan-400">{policy.premium}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-500 dark:text-slate-400">Coverage</div>
                      <div className="text-lg font-bold text-slate-900 dark:text-white">{policy.coverage}</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {policy.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <CheckCircle className="text-green-500 flex-shrink-0" size={14} />
                          {feature}
                        </li>
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
                    <TrendingUp size={16} />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Coverage Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 mb-12"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Business Insurance Coverage</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {coverageTypes.map((coverage, index) => {
              const IconComponent = coverage.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{coverage.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {coverage.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                        <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={14} />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          {/* Business Types */}
          <div className="border-t border-slate-200 dark:border-slate-700 pt-8">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Building className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              Who Needs Business Insurance?
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {businessTypes.map((type, index) => {
                const IconComponent = type.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-xl hover:shadow-md transition-all duration-300"
                  >
                    <div className={`w-12 h-12 ${type.color} rounded-xl flex items-center justify-center mb-4`}>
                      <IconComponent size={24} />
                    </div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">{type.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{type.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Link 
              to="/compare?type=business" 
              className="flex-1 bg-gradient-to-r from-cyan-600 to-slate-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-cyan-700 hover:to-slate-800 transition-all duration-300 text-center flex items-center justify-center gap-2"
            >
              <TrendingUp size={18} />
              Compare Business Policies
            </Link>
            <Link 
              to="/business-calculator" 
              className="flex-1 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-8 py-3 rounded-xl font-semibold hover:border-cyan-500 hover:text-cyan-600 dark:hover:border-cyan-400 dark:hover:text-cyan-400 transition-all duration-300 text-center flex items-center justify-center gap-2"
            >
              <Calculator size={18} />
              Calculate Business Needs
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Business;
