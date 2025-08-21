// import { Link } from "react-router-dom"
// import React from "react"

// const PolicyManagement = () => {
//   const menuItems = [
//     {
//       title: "Add New Policy",
//       description: "Create new insurance policy for customers",
//       path: "/policy-management/add-new-policy",
//       icon: "📋",
//       color: "bg-blue-500",
//     },
//     {
//       title: "Renewal Policy",
//       description: "Renew existing insurance policies",
//       path: "/policy-management/renewal-policy",
//       icon: "🔄",
//       color: "bg-green-500",
//     },
//     {
//       title: "Manage Policy",
//       description: "View and manage all insurance policies",
//       path: "/policy-management/manage-policy",
//       icon: "📊",
//       color: "bg-purple-500",
//     },
//     {
//       title: "Deleted Policies",
//       description: "View and restore deleted policy records",
//       path: "/policy-management/deleted-policies",
//       icon: "🗑️",
//       color: "bg-red-500",
//     },
//   ]

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-900">Policy Management</h1>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
//         {menuItems.map((item, index) => (
//           <Link
//             key={index}
//             to={item.path}
//             className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
//           >
//             <div className="flex items-center space-x-4">
//               <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center`}>
//                 <span className="text-white text-xl">{item.icon}</span>
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
//                 <p className="text-sm text-gray-600 mt-1">{item.description}</p>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default PolicyManagement

import { Link } from "react-router-dom"
import React from "react"
import { motion } from "framer-motion"
import { FileText, Plus, RotateCcw, Settings, Trash2, ArrowRight, Shield } from "lucide-react"

const PolicyManagement = () => {
  const menuItems = [
    {
      title: "Add New Policy",
      description: "Create new insurance policy for customers",
      path: "/policy-management/add-new-policy",
      icon: Plus,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Renewal Policy",
      description: "Renew existing insurance policies",
      path: "/policy-management/renewal-policy",
      icon: RotateCcw,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      textColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "Manage Policy",
      description: "View and manage all insurance policies",
      path: "/policy-management/manage-policy",
      icon: Settings,
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
      textColor: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Deleted Policies",
      description: "View and restore deleted policy records",
      path: "/policy-management/deleted-policies",
      icon: Trash2,
      color: "from-red-500 to-pink-600",
      bgColor: "bg-red-100 dark:bg-red-900/20",
      textColor: "text-red-600 dark:text-red-400",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

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
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            Policy Management
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-2">
            Manage insurance policies, renewals, and records
          </p>
        </div>
      </motion.div>

      {/* Menu Cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          
          return (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02,
                y: -8,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={item.path}
                className="group block bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-cyan-300 dark:hover:border-cyan-500 transition-all duration-300 relative overflow-hidden h-full"
              >
                {/* Background Gradient Decoration */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-5 rounded-full -mr-16 -mt-16 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative flex items-start gap-6 h-full">
                  <div className={`w-16 h-16 ${item.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm flex-shrink-0`}>
                    <IconComponent className={`w-8 h-8 ${item.textColor}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                      {item.description}
                    </p>
                    
                    {/* Additional visual element */}
                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <FileText className="w-4 h-4" />
                        <span>Insurance Management</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-slate-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </Link>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-2xl p-8 border border-indigo-200 dark:border-indigo-800/30"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Policy Management Hub
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Comprehensive insurance policy management system for all your client needs
            </p>
          </div>
          <div className="flex items-center gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">4</div>
              <div className="text-slate-500 dark:text-slate-400 text-sm">Functions</div>
            </div>
            <div className="w-px h-12 bg-slate-300 dark:bg-slate-600"></div>
            <div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">∞</div>
              <div className="text-slate-500 dark:text-slate-400 text-sm">Policies</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default PolicyManagement
