// import React from 'react';
// import { Link } from 'react-router-dom';
// import InsuranceCard from './InsuranceCard';

// const Health = () => {
//   const healthPolicies = [
//     {
//       id: 1,
//       name: "Comprehensive Health Plus",
//       provider: "HealthSecure",
//       premium: "₹1,200/month",
//       coverage: "₹10,00,000",
//       features: ["Cashless hospitalization", "Pre-existing conditions", "Maternity cover"],
//       rating: 4.8
//     },
//     {
//       id: 2,
//       name: "Family Health Shield",
//       provider: "FamilyCare",
//       premium: "₹2,500/month",
//       coverage: "₹15,00,000 (Family floater)",
//       features: ["Cover for 2 adults + 3 children", "Daycare procedures", "Annual health checkup"],
//       rating: 4.6
//     }
//   ];

//   return (
//     <div className="bg-gradient-to-br from-[#e0f2fe] via-[#c7d2fe] to-[#a5b4fc] min-h-screen py-10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-bold text-indigo-800 mb-4">Health Insurance</h1>
//           <p className="text-xl text-gray-700 max-w-3xl mx-auto">
//             Comprehensive medical coverage for you and your family with cashless hospitalization across India's top hospitals.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 gap-8 mb-12">
//           {healthPolicies.map(policy => (
//             <InsuranceCard key={policy.id} policy={policy} />
//           ))}
//         </div>

//         <div className="bg-white p-8 rounded-xl shadow-lg">
//           <h2 className="text-2xl font-semibold mb-4 text-gray-800">Why Choose Health Insurance?</h2>
//           <ul className="list-disc pl-6 space-y-2 text-gray-700">
//             <li>Coverage for hospitalization expenses including room rent, ICU charges, and doctor fees</li>
//             <li>Pre and post hospitalization expenses covered (typically 30-60 days)</li>
//             <li>Daycare procedures coverage (no need for 24-hour hospitalization)</li>
//             <li>Tax benefits under Section 80D of the Income Tax Act</li>
//           </ul>
//           <div className="mt-6">
//             <Link 
//               to="/compare?type=health" 
//               className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
//             >
//               Compare Health Policies
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Health;

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Shield, 
  Users, 
  ArrowLeft, 
  Star, 
  CheckCircle, 
  TrendingUp,
  Activity,
  Stethoscope,
  Hospital,
  FileText,
  Calculator
} from 'lucide-react';
import InsuranceCard from './InsuranceCard';

const Health = () => {
  const healthPolicies = [
    {
      id: 1,
      name: "Comprehensive Health Plus",
      provider: "HealthSecure",
      premium: "₹1,200/month",
      coverage: "₹10,00,000",
      features: ["Cashless hospitalization", "Pre-existing conditions", "Maternity cover"],
      rating: 4.8,
      icon: Heart,
      color: "from-pink-500 to-red-500",
      popular: true
    },
    {
      id: 2,
      name: "Family Health Shield",
      provider: "FamilyCare",
      premium: "₹2,500/month",
      coverage: "₹15,00,000 (Family floater)",
      features: ["Cover for 2 adults + 3 children", "Daycare procedures", "Annual health checkup"],
      rating: 4.6,
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      popular: false
    }
  ];

  const benefits = [
    {
      icon: Hospital,
      title: "Hospitalization Coverage",
      description: "Coverage for hospitalization expenses including room rent, ICU charges, and doctor fees"
    },
    {
      icon: Activity,
      title: "Pre & Post Hospitalization",
      description: "Pre and post hospitalization expenses covered (typically 30-60 days)"
    },
    {
      icon: Stethoscope,
      title: "Daycare Procedures",
      description: "Daycare procedures coverage (no need for 24-hour hospitalization)"
    },
    {
      icon: FileText,
      title: "Tax Benefits",
      description: "Tax benefits under Section 80D of the Income Tax Act"
    }
  ];

  const healthFeatures = [
    {
      title: "Cashless Treatment",
      description: "Get treated at network hospitals without paying upfront",
      icon: Shield,
      color: "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
    },
    {
      title: "Family Coverage",
      description: "Single policy covering entire family with floater benefits",
      icon: Users,
      color: "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
    },
    {
      title: "Pre-existing Conditions",
      description: "Coverage for pre-existing diseases after waiting period",
      icon: Heart,
      color: "bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400"
    },
    {
      title: "Preventive Care",
      description: "Annual health checkups and preventive care benefits",
      icon: Activity,
      color: "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-full mb-6">
            <Heart className="text-pink-600 dark:text-pink-400" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Health Insurance
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Comprehensive medical coverage for you and your family with cashless hospitalization across India's top hospitals.
          </p>
        </motion.div>

        {/* Health Policies Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {healthPolicies.map((policy) => {
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
                      {policy.popular && (
                        <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                          Popular
                        </span>
                      )}
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

        {/* Health Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Health Insurance Features
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Comprehensive benefits designed to keep you and your family protected.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {healthFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                    <IconComponent size={24} />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-pink-600 dark:text-pink-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Why Choose Health Insurance?</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-pink-50 dark:hover:bg-pink-900/10 transition-colors duration-300"
                >
                  <div className="w-8 h-8 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <IconComponent className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link 
              to="/compare?type=health" 
              className="flex-1 bg-gradient-to-r from-pink-600 to-red-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-pink-700 hover:to-red-600 transition-all duration-300 text-center flex items-center justify-center gap-2"
            >
              <TrendingUp size={18} />
              Compare Health Policies
            </Link>
            <Link 
              to="/health-calculator" 
              className="flex-1 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-8 py-3 rounded-xl font-semibold hover:border-pink-500 hover:text-pink-600 dark:hover:border-pink-400 dark:hover:text-pink-400 transition-all duration-300 text-center flex items-center justify-center gap-2"
            >
              <Calculator size={18} />
              Calculate Health Needs
            </Link>
          </motion.div>
        </motion.div>

        {/* Additional Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 bg-gradient-to-r from-pink-50 to-red-50 dark:from-pink-900/10 dark:to-red-900/10 rounded-2xl p-8 border border-pink-200 dark:border-pink-800/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-pink-600 rounded-xl flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Important Health Insurance Facts
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Coverage Starts</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Most policies have a 30-day waiting period for general illnesses and 2-4 years for pre-existing conditions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Cashless Network</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Treatment at network hospitals without upfront payment. Check network hospitals before choosing.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Claim Process</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Inform insurer within 24 hours of hospitalization. Keep all medical documents for reimbursement.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Health;
