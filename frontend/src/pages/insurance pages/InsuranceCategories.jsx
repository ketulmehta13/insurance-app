// import React from 'react';
// import { Link } from 'react-router-dom';

// const InsuranceCategories = () => {
//   const categories = [
//     {
//       id: 1,
//       title: 'Health Insurance',
//       description: 'Comprehensive medical coverage for you and your family',
//       icon: '❤️',
//       color: 'red',
//       link: '/insurance/health'
//     },
//     {
//       id: 2,
//       title: 'Life Insurance',
//       description: 'Secure your family\'s financial future with life coverage',
//       icon: '👤',
//       color: 'blue',
//       link: '/insurance/life'
//     },
//     {
//       id: 3,
//       title: 'Vehicle Insurance',
//       description: 'Protect your car, bike, and other vehicles',
//       icon: '🚗',
//       color: 'green',
//       link: '/insurance/vehicle'
//     },
//     {
//       id: 4,
//       title: 'Property Insurance',
//       description: 'Safeguard your home and valuable possessions',
//       icon: '🏠',
//       color: 'purple',
//       link: '/insurance/property'
//     },
//     {
//       id: 5,
//       title: 'Business Insurance',
//       description: 'Comprehensive protection for your business',
//       icon: '💼',
//       color: 'orange',
//       link: '/insurance/business'
//     },
//     {
//       id: 6,
//       title: 'Travel Insurance',
//       description: 'Stay protected during your travels worldwide',
//       icon: '✈️',
//       color: 'teal',
//       link: '/insurance/travel'
//     }
//   ];

//   const getColorClasses = (color) => {
//     const colorMap = {
//       red: 'bg-red-100 text-red-600 hover:bg-red-200',
//       blue: 'bg-blue-100 text-blue-600 hover:bg-blue-200',
//       green: 'bg-green-100 text-green-600 hover:bg-green-200',
//       purple: 'bg-purple-100 text-purple-600 hover:bg-purple-200',
//       orange: 'bg-orange-100 text-orange-600 hover:bg-orange-200',
//       teal: 'bg-teal-100 text-teal-600 hover:bg-teal-200'
//     };
//     return colorMap[color] || 'bg-gray-100 text-gray-600 hover:bg-gray-200';
//   };

//   return (
//     <section className="py-20 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//             Insurance Categories
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Explore our comprehensive range of insurance products designed to protect what matters most to you.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//   {categories.map((category) => (
//     <Link
//       key={category.id}
//       to={category.link}
//       className="group bg-white p-8 rounded-xl 
//                  shadow-[0_10px_20px_rgba(99,102,241,0.15)] 
//                  hover:shadow-[0_12px_24px_rgba(99,102,241,0.2)] 
//                  transition-all duration-300 border border-gray-100 hover:border-gray-200"
//     >
//       <div className={`w-16 h-16 rounded-lg ${getColorClasses(category.color)} flex items-center justify-center text-2xl mb-6`}>
//         {category.icon}
//       </div>
//       <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
//         {category.title}
//       </h3>
//       <p className="text-gray-600 leading-relaxed">
//         {category.description}
//       </p>
//       <div className="mt-6 text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
//         Learn More →
//       </div>
//     </Link>
//   ))}
// </div>

//         <div className="text-center mt-12">
//           <Link
//             to="/compare"
//             className="inline-flex items-center bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
//           >
//             Compare All Policies
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default InsuranceCategories;

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, User, Car, Home, Briefcase, Plane, ArrowRight } from 'lucide-react';

const InsuranceCategories = () => {
  const categories = [
    {
      id: 1,
      title: 'Health Insurance',
      description: 'Comprehensive medical coverage for you and your family',
      icon: Heart,
      color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400',
      hoverColor: 'hover:bg-pink-200 dark:hover:bg-pink-800/30',
      link: '/insurance/health'
    },
    {
      id: 2,
      title: 'Life Insurance',
      description: 'Secure your family\'s financial future with life coverage',
      icon: User,
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
      hoverColor: 'hover:bg-blue-200 dark:hover:bg-blue-800/30',
      link: '/insurance/life'
    },
    {
      id: 3,
      title: 'Vehicle Insurance',
      description: 'Protect your car, bike, and other vehicles',
      icon: Car,
      color: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
      hoverColor: 'hover:bg-green-200 dark:hover:bg-green-800/30',
      link: '/insurance/vehicle'
    },
    {
      id: 4,
      title: 'Property Insurance',
      description: 'Safeguard your home and valuable possessions',
      icon: Home,
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
      hoverColor: 'hover:bg-purple-200 dark:hover:bg-purple-800/30',
      link: '/insurance/property'
    },
    {
      id: 5,
      title: 'Business Insurance',
      description: 'Comprehensive protection for your business',
      icon: Briefcase,
      color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
      hoverColor: 'hover:bg-orange-200 dark:hover:bg-orange-800/30',
      link: '/insurance/business'
    },
    {
      id: 6,
      title: 'Travel Insurance',
      description: 'Stay protected during your travels worldwide',
      icon: Plane,
      color: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-400',
      hoverColor: 'hover:bg-cyan-200 dark:hover:bg-cyan-800/30',
      link: '/insurance/travel'
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
    <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Insurance Categories
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Explore our comprehensive range of insurance products designed to protect what matters most to you.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.id}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.03,
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={category.link}
                  className="group block bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-500"
                >
                  <div className={`w-16 h-16 rounded-xl ${category.color} ${category.hoverColor} flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110`}>
                    <IconComponent size={28} />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                    {category.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center text-cyan-600 dark:text-cyan-400 font-medium group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors duration-300">
                    <span className="mr-2">Learn More</span>
                    <ArrowRight 
                      size={18} 
                      className="transform group-hover:translate-x-1 transition-transform duration-300" 
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link
            to="/compare"
            className="inline-flex items-center gap-3 bg-slate-900 dark:bg-cyan-600 text-white px-10 py-4 rounded-2xl font-semibold hover:bg-cyan-600 dark:hover:bg-cyan-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Compare All Policies
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default InsuranceCategories;
