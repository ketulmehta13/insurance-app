// import React from 'react';
// import { Link } from 'react-router-dom';
// import InsuranceCard from './InsuranceCard';

// const Property = () => {
//   const propertyPolicies = [
//     {
//       id: 1,
//       name: "Home Shield Plus",
//       provider: "HomeSecure",
//       premium: "₹3,000/year",
//       coverage: "₹50,00,000",
//       features: ["Fire & lightning", "Natural calamities", "Burglary & theft"],
//       rating: 4.4
//     },
//     {
//       id: 2,
//       name: "Renter's Protection",
//       provider: "RentalCover",
//       premium: "₹1,500/year",
//       coverage: "₹10,00,000",
//       features: ["Content insurance", "Liability coverage", "Alternative accommodation"],
//       rating: 4.2
//     }
//   ];

//   return (
//     <div className="bg-gradient-to-br from-[#e0f2fe] via-[#c7d2fe] to-[#a5b4fc] min-h-screen py-10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-bold text-indigo-800 mb-4">Property Insurance</h1>
//           <p className="text-xl text-gray-700 max-w-3xl mx-auto">
//             Protect your home and valuable possessions against unforeseen damages and losses.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 gap-8 mb-12">
//           {propertyPolicies.map(policy => (
//             <InsuranceCard key={policy.id} policy={policy} />
//           ))}
//         </div>

//         <div className="bg-white p-8 rounded-xl shadow-lg">
//           <h2 className="text-2xl font-semibold mb-4 text-gray-800">Property Insurance Benefits</h2>
//           <ul className="list-disc pl-6 space-y-2 text-gray-700">
//             <li>Protection against fire, explosion, lightning, and natural disasters</li>
//             <li>Coverage for burglary, theft, and housebreaking</li>
//             <li>Optional coverage for earthquakes and floods</li>
//             <li>Some policies cover temporary accommodation costs if home becomes uninhabitable</li>
//           </ul>
//           <div className="mt-6">
//             <Link 
//               to="/compare?type=property" 
//               className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
//             >
//               Compare Property Policies
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Property;
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Shield, 
  Key, 
  ArrowLeft, 
  Star, 
  CheckCircle, 
  TrendingUp,
  Flame,
  Zap,
  Cloud,
  Lock,
  Calculator,
  MapPin,
  Umbrella,
  AlertTriangle
} from 'lucide-react';
import InsuranceCard from './InsuranceCard';

const Property = () => {
  const propertyPolicies = [
    {
      id: 1,
      name: "Home Shield Plus",
      provider: "HomeSecure",
      premium: "₹3,000/year",
      coverage: "₹50,00,000",
      features: ["Fire & lightning", "Natural calamities", "Burglary & theft"],
      rating: 4.4,
      icon: Home,
      color: "from-purple-500 to-indigo-500",
      popular: true
    },
    {
      id: 2,
      name: "Renter's Protection",
      provider: "RentalCover",
      premium: "₹1,500/year",
      coverage: "₹10,00,000",
      features: ["Content insurance", "Liability coverage", "Alternative accommodation"],
      rating: 4.2,
      icon: Key,
      color: "from-green-500 to-teal-500",
      popular: false
    }
  ];

  const benefits = [
    {
      icon: Flame,
      title: "Fire & Explosion Protection",
      description: "Protection against fire, explosion, lightning, and natural disasters"
    },
    {
      icon: Lock,
      title: "Theft & Burglary",
      description: "Coverage for burglary, theft, and housebreaking incidents"
    },
    {
      icon: Cloud,
      title: "Natural Disasters",
      description: "Optional coverage for earthquakes, floods, and weather-related damages"
    },
    {
      icon: Home,
      title: "Alternative Accommodation",
      description: "Some policies cover temporary accommodation costs if home becomes uninhabitable"
    }
  ];

  const propertyTypes = [
    {
      title: "Homeowners Insurance",
      description: "Comprehensive protection for your house and belongings",
      icon: Home,
      color: "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
      features: ["Structure coverage", "Personal property", "Liability protection", "Additional living expenses"]
    },
    {
      title: "Renters Insurance",
      description: "Protection for tenants' personal belongings and liability",
      icon: Key,
      color: "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400",
      features: ["Personal belongings", "Liability coverage", "Temporary housing", "Medical payments"]
    },
    {
      title: "Commercial Property",
      description: "Coverage for business premises and equipment",
      icon: Shield,
      color: "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
      features: ["Building coverage", "Business equipment", "Loss of income", "Extra expenses"]
    }
  ];

  const coverageAreas = [
    {
      icon: Flame,
      title: "Fire & Lightning",
      description: "Damage caused by fire, lightning strikes, and explosions"
    },
    {
      icon: Cloud,
      title: "Weather Damage",
      description: "Storm, hail, wind damage, and water damage from weather"
    },
    {
      icon: Lock,
      title: "Theft & Vandalism",
      description: "Loss or damage from burglary, theft, and vandalism"
    },
    {
      icon: AlertTriangle,
      title: "Accidental Damage",
      description: "Unexpected damage to your property and belongings"
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-6">
            <Home className="text-purple-600 dark:text-purple-400" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Property Insurance
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Protect your home and valuable possessions against unforeseen damages and losses.
          </p>
        </motion.div>

        {/* Property Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Types of Property Insurance
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Different property insurance options to match your specific needs and situation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {propertyTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-12 h-12 ${type.color} rounded-xl flex items-center justify-center mb-4`}>
                    <IconComponent size={24} />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                    {type.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                    {type.description}
                  </p>
                  <ul className="space-y-1">
                    {type.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <CheckCircle className="text-green-500 flex-shrink-0" size={12} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Property Policies Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {propertyPolicies.map((policy) => {
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
                        <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full shadow">
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

        {/* Coverage Areas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              What's Covered?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Comprehensive protection against various risks and damages to your property.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coverageAreas.map((coverage, index) => {
              const IconComponent = coverage.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 text-center"
                >
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                    {coverage.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {coverage.description}
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
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
              <Umbrella className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Property Insurance Benefits</h2>
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
                  className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors duration-300"
                >
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <IconComponent className="w-4 h-4 text-purple-600 dark:text-purple-400" />
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
              to="/compare?type=property" 
              className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-600 transition-all duration-300 text-center flex items-center justify-center gap-2"
            >
              <TrendingUp size={18} />
              Compare Property Policies
            </Link>
            <Link 
              to="/property-calculator" 
              className="flex-1 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-8 py-3 rounded-xl font-semibold hover:border-purple-500 hover:text-purple-600 dark:hover:border-purple-400 dark:hover:text-purple-400 transition-all duration-300 text-center flex items-center justify-center gap-2"
            >
              <Calculator size={18} />
              Calculate Property Value
            </Link>
          </motion.div>
        </motion.div>

        {/* Important Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 rounded-2xl p-8 border border-purple-200 dark:border-purple-800/30"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-purple-600 rounded-xl flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Property Insurance Tips
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Document Everything</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Keep detailed records, photos, and receipts of your belongings for easier claim processing.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Regular Updates</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Update your coverage amount regularly to reflect current property values and new purchases.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Security Measures</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Installing security systems may qualify you for discounts on your property insurance premiums.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Property;
