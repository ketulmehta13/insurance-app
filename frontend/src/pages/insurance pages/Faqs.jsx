// import React ,{useEffect}from 'react';
// import { Link } from 'react-router-dom';

// const FAQ = () => {

//     useEffect(() => {
//         window.scrollTo(0, 0);
//       }, []);
//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <div className="text-sm font-bold mb-6 text-center">
//         <span>FAQs</span>
//       </div>

//       <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>

//       <div className="mb-8">
//         <input
//           type="text"
//           placeholder="Search"
//           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         />
//       </div>

//       <div className="space-y-6">
//         <div>
//           <h2 className="text-2xl font-semibold mb-4">Life Insurance</h2>
//           <ul className="space-y-2 pl-5">
//             <li className="list-disc">Mediclaim</li>
//             <li className="list-disc">Vehicle Insurance</li>
//             <li className="list-disc">General Insurance</li>
//             <li className="list-disc">Mutual Funds</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FAQ;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  ArrowLeft,
  Heart,
  Car,
  Shield,
  TrendingUp,
  FileText,
  Users
} from 'lucide-react';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openItems, setOpenItems] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqData = [
    {
      category: 'life',
      icon: Heart,
      categoryName: 'Life Insurance',
      color: 'bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400',
      questions: [
        {
          id: 1,
          question: "What is life insurance and why do I need it?",
          answer: "Life insurance provides financial protection for your beneficiaries in case of your death. It helps replace lost income, pay off debts, cover funeral expenses, and ensure your family's financial security."
        },
        {
          id: 2,
          question: "What's the difference between term and whole life insurance?",
          answer: "Term life insurance provides coverage for a specific period at lower premiums, while whole life insurance combines coverage with an investment component and lasts your entire life."
        },
        {
          id: 3,
          question: "How much life insurance coverage do I need?",
          answer: "A general rule is 10-12 times your annual income, but this varies based on your debts, dependents, lifestyle, and financial goals. Our advisors can help calculate your specific needs."
        }
      ]
    },
    {
      category: 'health',
      icon: Shield,
      categoryName: 'Health Insurance',
      color: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
      questions: [
        {
          id: 4,
          question: "What does health insurance typically cover?",
          answer: "Health insurance typically covers hospitalization, medical treatments, prescription drugs, preventive care, emergency services, and some dental and vision care, depending on your plan."
        },
        {
          id: 5,
          question: "What is a deductible and how does it work?",
          answer: "A deductible is the amount you pay out-of-pocket before your insurance starts covering costs. Higher deductibles usually mean lower premiums, but more upfront costs when you need care."
        },
        {
          id: 6,
          question: "Can I keep my current doctor with a new health plan?",
          answer: "This depends on whether your doctor is in the insurance plan's network. Check the provider directory or ask your doctor's office if they accept your insurance plan."
        }
      ]
    },
    {
      category: 'vehicle',
      icon: Car,
      categoryName: 'Vehicle Insurance',
      color: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
      questions: [
        {
          id: 7,
          question: "What's the difference between comprehensive and collision coverage?",
          answer: "Collision coverage pays for damage to your car from accidents, while comprehensive covers theft, vandalism, natural disasters, and other non-collision incidents."
        },
        {
          id: 8,
          question: "How can I lower my car insurance premiums?",
          answer: "You can lower premiums by maintaining a clean driving record, choosing higher deductibles, bundling policies, taking defensive driving courses, and installing safety features."
        },
        {
          id: 9,
          question: "What factors affect my car insurance rates?",
          answer: "Factors include your driving record, age, location, vehicle type, credit score, annual mileage, and coverage levels. Safer drivers and areas typically get lower rates."
        }
      ]
    },
    {
      category: 'general',
      icon: FileText,
      categoryName: 'General Insurance',
      color: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
      questions: [
        {
          id: 10,
          question: "How do I file an insurance claim?",
          answer: "Contact your insurance company immediately, provide all necessary documentation, cooperate with the investigation, and keep records of all communications. We can assist you through this process."
        },
        {
          id: 11,
          question: "What should I do if my claim is denied?",
          answer: "Review the denial letter carefully, gather additional evidence if needed, file an appeal with your insurer, or contact us for assistance in resolving the dispute."
        },
        {
          id: 12,
          question: "How often should I review my insurance policies?",
          answer: "Review your policies annually or whenever you have major life changes like marriage, divorce, new home, job change, or children. This ensures adequate coverage."
        }
      ]
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories', icon: HelpCircle },
    { value: 'life', label: 'Life Insurance', icon: Heart },
    { value: 'health', label: 'Health Insurance', icon: Shield },
    { value: 'vehicle', label: 'Vehicle Insurance', icon: Car },
    { value: 'general', label: 'General Insurance', icon: FileText }
  ];

  const filteredFAQs = faqData.filter(category => {
    if (selectedCategory !== 'all' && category.category !== selectedCategory) {
      return false;
    }
    if (searchTerm) {
      return category.questions.some(q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return true;
  });

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
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
    <div className="min-h-screen bg-gradient-to-br from-white via-cyan-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-24 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
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
            <HelpCircle className="text-cyan-600 dark:text-cyan-400" size={32} />
          </div>
          <div className="inline-block px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-full text-sm font-semibold mb-4">
            FAQs
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Find answers to common questions about insurance policies and services.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-12 border border-slate-200 dark:border-slate-700"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500" size={20} />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                      selectedCategory === category.value
                        ? 'bg-cyan-600 text-white shadow-lg'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 hover:text-cyan-600 dark:hover:text-cyan-400'
                    }`}
                  >
                    <IconComponent size={16} />
                    <span className="hidden sm:inline">{category.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* FAQ Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {filteredFAQs.map((category) => {
            const IconComponent = category.icon;
            const filteredQuestions = searchTerm 
              ? category.questions.filter(q => 
                  q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  q.answer.toLowerCase().includes(searchTerm.toLowerCase())
                )
              : category.questions;

            if (filteredQuestions.length === 0) return null;

            return (
              <motion.div
                key={category.category}
                variants={itemVariants}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                {/* Category Header */}
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center`}>
                      <IconComponent size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {category.categoryName}
                    </h2>
                  </div>
                </div>

                {/* Questions */}
                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                  {filteredQuestions.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="w-full text-left p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors focus:outline-none focus:bg-slate-50 dark:focus:bg-slate-700/50"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-white pr-4">
                            {item.question}
                          </h3>
                          <div className="flex-shrink-0">
                            {openItems[item.id] ? (
                              <ChevronUp className="text-cyan-600 dark:text-cyan-400" size={20} />
                            ) : (
                              <ChevronDown className="text-slate-400 dark:text-slate-500" size={20} />
                            )}
                          </div>
                        </div>
                      </button>

                      <AnimatePresence>
                        {openItems[item.id] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6">
                              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <HelpCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No Questions Found</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Try adjusting your search terms or browse all categories.
            </p>
          </motion.div>
        )}

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-cyan-600 to-slate-700 dark:from-cyan-700 dark:to-slate-800 rounded-2xl p-8 text-center text-white"
        >
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-cyan-100 mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? Our expert team is here to help you with personalized answers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-slate-700 px-8 py-3 rounded-xl font-semibold hover:bg-slate-100 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <Users size={18} />
              Contact Support
            </Link>
            <Link
              to="/register"
              className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-slate-700 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <TrendingUp size={18} />
              Get Started
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
