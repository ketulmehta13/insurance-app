

import React, { useState } from 'react';
import { Search, Filter, Check, X, Star, Shield, ArrowLeft, Eye, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const ComparePage = () => {
  const [selectedPolicies, setSelectedPolicies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const policies = [
    {
      id: 1,
      name: 'Premium Health Plus',
      company: 'HealthFirst Insurance',
      category: 'health',
      premium: '$299/month',
      coverage: '$500,000',
      deductible: '$1,000',
      claimRatio: '95%',
      rating: 4.8,
      features: ['Emergency Care', 'Prescription Drugs', 'Mental Health', 'Preventive Care'],
      popular: true
    },
    {
      id: 2,
      name: 'Family Life Secure',
      company: 'LifeGuard Corp',
      category: 'life',
      premium: '$89/month',
      coverage: '$1,000,000',
      deductible: 'N/A',
      claimRatio: '98%',
      rating: 4.9,
      features: ['Term Life', 'Accidental Death', 'Disability Rider', 'Child Coverage'],
      popular: false
    },
    {
      id: 3,
      name: 'Complete Vehicle Protection',
      company: 'AutoSafe Insurance',
      category: 'vehicle',
      premium: '$156/month',
      coverage: '$50,000',
      deductible: '$500',
      claimRatio: '92%',
      rating: 4.6,
      features: ['Collision Coverage', 'Comprehensive', 'Roadside Assistance', 'Rental Car'],
      popular: true
    },
    {
      id: 4,
      name: 'Essential Health Basic',
      company: 'Budget Health Co',
      category: 'health',
      premium: '$149/month',
      coverage: '$200,000',
      deductible: '$2,500',
      claimRatio: '88%',
      rating: 4.2,
      features: ['Basic Coverage', 'Emergency Care', 'Generic Drugs', 'Annual Checkup'],
      popular: false
    }
  ];

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterCategory === 'all' || policy.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const handlePolicySelect = (policy) => {
    if (selectedPolicies.find(p => p.id === policy.id)) {
      setSelectedPolicies(selectedPolicies.filter(p => p.id !== policy.id));
    } else if (selectedPolicies.length < 3) {
      setSelectedPolicies([...selectedPolicies, policy]);
    }
  };

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
      y: 20,
      scale: 0.95 
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 dark:bg-cyan-900/30 rounded-full mb-6">
            <Shield className="text-cyan-600 dark:text-cyan-400" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Compare Insurance Policies
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Find the perfect policy by comparing features, prices, and benefits side by side.
          </p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg mb-10 border border-slate-200 dark:border-slate-700"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 h-5 w-5" />
              <input
                type="text"
                placeholder="Search policies or companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 h-5 w-5" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="pl-12 pr-8 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              >
                <option value="all">All Categories</option>
                <option value="health">Health Insurance</option>
                <option value="life">Life Insurance</option>
                <option value="vehicle">Vehicle Insurance</option>
                <option value="property">Property Insurance</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Selected Policies for Comparison */}
        <AnimatePresence>
          {selectedPolicies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg mb-8 border border-cyan-200 dark:border-cyan-700"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Selected for Comparison ({selectedPolicies.length}/3)
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                {selectedPolicies.map((policy) => (
                  <motion.div
                    key={policy.id}
                    layout
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="border-2 border-cyan-200 dark:border-cyan-700 rounded-xl p-4 bg-cyan-50 dark:bg-cyan-900/20"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-cyan-900 dark:text-cyan-100">{policy.name}</h3>
                      <button
                        onClick={() => handlePolicySelect(policy)}
                        className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm text-cyan-700 dark:text-cyan-300 mb-2">{policy.company}</p>
                    <p className="text-lg font-bold text-cyan-900 dark:text-cyan-100">{policy.premium}</p>
                  </motion.div>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-cyan-600 to-slate-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-cyan-700 hover:to-slate-800 transition-all duration-300 shadow-lg"
              >
                Compare Selected Policies
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Policies Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPolicies.map((policy) => {
            const isSelected = selectedPolicies.find(p => p.id === policy.id);
            return (
              <motion.div
                key={policy.id}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.02,
                  y: -4,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className={`bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 transition-all duration-300 border ${
                  isSelected 
                    ? 'ring-2 ring-cyan-500 border-cyan-300 dark:border-cyan-600 bg-cyan-50 dark:bg-cyan-900/10' 
                    : 'border-slate-200 dark:border-slate-700 hover:shadow-xl'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                      {policy.name}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">{policy.company}</p>
                  </div>
                  {policy.popular && (
                    <span className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                      Popular
                    </span>
                  )}
                </div>

                <div className="flex items-center mb-6">
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${
                            i < Math.floor(policy.rating) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-slate-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium text-slate-600 dark:text-slate-300">{policy.rating}</span>
                  </div>
                  <span className="mx-3 text-slate-300">|</span>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">{policy.claimRatio} claim ratio</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                    <span className="text-slate-600 dark:text-slate-300 font-medium">Premium:</span>
                    <span className="font-bold text-cyan-600 dark:text-cyan-400">{policy.premium}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                    <span className="text-slate-600 dark:text-slate-300 font-medium">Coverage:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{policy.coverage}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                    <span className="text-slate-600 dark:text-slate-300 font-medium">Deductible:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{policy.deductible}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {policy.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                    {policy.features.length > 3 && (
                      <li className="text-sm text-cyan-600 dark:text-cyan-400 font-medium ml-7">
                        +{policy.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePolicySelect(policy)}
                    disabled={selectedPolicies.length >= 3 && !isSelected}
                    className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                      isSelected
                        ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/30'
                        : selectedPolicies.length >= 3
                        ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                        : 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-200 dark:hover:bg-cyan-800/50'
                    }`}
                  >
                    {isSelected ? 'Remove' : 'Compare'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gradient-to-r from-cyan-600 to-slate-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-cyan-700 hover:to-slate-800 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Eye size={16} />
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* No Results */}
        {filteredPolicies.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Shield className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No Policies Found</h3>
            <p className="text-slate-600 dark:text-slate-300">No policies found matching your criteria. Try adjusting your search or filters.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ComparePage;

