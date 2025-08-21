// import { Link } from "react-router-dom"
// import React from "react"

// const SubAgentManagement = () => {
//   const menuItems = [
//     {
//       title: "Add Sub Agent",
//       description: "Register new sub agents with complete details",
//       path: "/dashboard/subagentmanagement/addsubagent",
//       icon: "👤",
//       color: "bg-blue-500",
//     },
//     {
//       title: "Manage Sub Agents",
//       description: "View and manage all sub agent records",
//       path: "/dashboard/subagentmanagement/managesubagents",
//       icon: "👥",
//       color: "bg-green-500",
//     },
//     {
//       title: "Assigned Inquiries",
//       description: "View all inquiries assigned to you",
//       path: "/agent/inquiries",
//       icon: "📋",
//       color: "bg-indigo-500",
//     },
    
//   ]

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-900">Sub Agent Management</h1>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

//       {/* Quick Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
//           <div className="flex items-center">
//             <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold text-xl">45</span>
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Total Sub Agents</p>
//               <p className="text-2xl font-bold text-gray-900">45</p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
//           <div className="flex items-center">
//             <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold text-xl">38</span>
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Active Agents</p>
//               <p className="text-2xl font-bold text-gray-900">38</p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
//           <div className="flex items-center">
//             <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold text-xl">₹</span>
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Total Commission</p>
//               <p className="text-2xl font-bold text-gray-900">₹2.5L</p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
//           <div className="flex items-center">
//             <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold text-xl">156</span>
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Policies Sold</p>
//               <p className="text-2xl font-bold text-gray-900">156</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SubAgentManagement

import { Link } from "react-router-dom"
import React from "react"
import { motion } from "framer-motion"
import { UserPlus, Users, MessageSquare, ArrowRight, UserCheck, DollarSign, FileText, Award } from "lucide-react"

const SubAgentManagement = () => {
  const menuItems = [
    {
      title: "Add Sub Agent",
      description: "Register new sub agents with complete details",
      path: "/dashboard/subagentmanagement/addsubagent",
      icon: UserPlus,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Manage Sub Agents",
      description: "View and manage all sub agent records",
      path: "/dashboard/subagentmanagement/managesubagents",
      icon: Users,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      textColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "Assigned Inquiries",
      description: "View all inquiries assigned to you",
      path: "/agent/inquiries",
      icon: MessageSquare,
      color: "from-indigo-500 to-purple-600",
      bgColor: "bg-indigo-100 dark:bg-indigo-900/20",
      textColor: "text-indigo-600 dark:text-indigo-400",
    },
  ]

  const stats = [
    {
      title: "Total Sub Agents",
      value: "45",
      icon: Users,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      change: "+5 this month"
    },
    {
      title: "Active Agents",
      value: "38",
      icon: UserCheck,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      change: "84% active"
    },
    {
      title: "Total Commission",
      value: "₹2.5L",
      icon: DollarSign,
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
      change: "+12% from last month"
    },
    {
      title: "Policies Sold",
      value: "156",
      icon: FileText,
      color: "from-orange-500 to-amber-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
      change: "+23 this month"
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
            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            Sub Agent Management
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-2">
            Manage your sub-agent network and track performance
          </p>
        </div>
      </motion.div>

      {/* Menu Cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
                className="group block bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-cyan-300 dark:hover:border-cyan-500 transition-all duration-300 relative overflow-hidden h-full"
              >
                {/* Background Gradient Decoration */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${item.color} opacity-5 rounded-full -mr-10 -mt-10 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative flex items-center gap-4">
                  <div className={`w-14 h-14 ${item.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <IconComponent className={`w-7 h-7 ${item.textColor}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
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
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={cardVariants}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-slate-600 rounded-xl flex items-center justify-center">
              <Award className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Performance Overview
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-5 rounded-full -mr-10 -mt-10`}></div>
                <div className="relative flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-2">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                      {stat.value}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {stat.change}
                    </p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 rounded-2xl p-8 border border-emerald-200 dark:border-emerald-800/30"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Sub Agent Network
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Comprehensive management system for your sub-agent network with real-time performance tracking
            </p>
          </div>
          <div className="flex items-center gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">3</div>
              <div className="text-slate-500 dark:text-slate-400 text-sm">Functions</div>
            </div>
            <div className="w-px h-12 bg-slate-300 dark:bg-slate-600"></div>
            <div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">45</div>
              <div className="text-slate-500 dark:text-slate-400 text-sm">Total Agents</div>
            </div>
            <div className="w-px h-12 bg-slate-300 dark:bg-slate-600"></div>
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">156</div>
              <div className="text-slate-500 dark:text-slate-400 text-sm">Policies</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default SubAgentManagement
