// import { Link } from "react-router-dom"
// import React from "react"

// const ClientManagement = () => {
//   const menuItems = [
//     {
//       title: "Add Family Head",
//       description: "Add new family head with complete details",
//       path: "/clientmanage/Addfamilyhead",
//       icon: "👨‍👩‍👧‍👦",
//       color: "bg-blue-500",
//     },
//     {
//       title: "Add Family Member",
//       description: "Add family members to existing groups",
//       path: "/clientmanage/AddFamilyMember",
//       icon: "👤",
//       color: "bg-green-500",
//     },
//     {
//       title: "Add Firm",
//       description: "Register new business firms",
//       path: "/clientmanage/AddFirm",
//       icon: "🏢",
//       color: "bg-purple-500",
//     },
//     {
//       title: "Manage Clients",
//       description: "View and manage all client records",
//       path: "/clientmanage/ManageClients",
//       icon: "📊",
//       color: "bg-orange-500",
//     },
//     {
//       title: "Trash Management",
//       description: "View and restore deleted records",
//       path: "/clientmanage/TrashManagement",
//       icon: "🗑️",
//       color: "bg-red-500",
//     },
//   ]

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
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
//     </div>
//   )
// }

// export default ClientManagement
import { Link } from "react-router-dom"
import React from "react"
import { motion } from "framer-motion"
import { Users, UserPlus, Building, BarChart3, Trash2, ArrowRight } from "lucide-react"

const ClientManagement = () => {
  const menuItems = [
    {
      title: "Add Family Head",
      description: "Add new family head with complete details",
      path: "/clientmanage/Addfamilyhead",
      icon: Users,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Add Family Member",
      description: "Add family members to existing groups",
      path: "/clientmanage/AddFamilyMember",
      icon: UserPlus,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      textColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "Add Firm",
      description: "Register new business firms",
      path: "/clientmanage/AddFirm",
      icon: Building,
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
      textColor: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Manage Clients",
      description: "View and manage all client records",
      path: "/clientmanage/ManageClients",
      icon: BarChart3,
      color: "from-orange-500 to-amber-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
      textColor: "text-orange-600 dark:text-orange-400",
    },
    {
      title: "Trash Management",
      description: "View and restore deleted records",
      path: "/clientmanage/TrashManagement",
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
            <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            </div>
            Client Management
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-2">
            Manage family heads, members, and business firms
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
                className="group block bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-cyan-300 dark:hover:border-cyan-500 transition-all duration-300 relative overflow-hidden"
              >
                {/* Background Gradient Decoration */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${item.color} opacity-5 rounded-full -mr-10 -mt-10 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative flex items-start space-x-4">
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-cyan-50 to-slate-50 dark:from-cyan-900/10 dark:to-slate-800/50 rounded-2xl p-6 border border-cyan-200 dark:border-cyan-800/30"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Client Management Hub
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              Efficiently organize and manage all your client relationships in one place
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">5</div>
              <div className="text-slate-500 dark:text-slate-400">Functions</div>
            </div>
            <div className="w-px h-8 bg-slate-300 dark:bg-slate-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-700 dark:text-slate-300">∞</div>
              <div className="text-slate-500 dark:text-slate-400">Clients</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ClientManagement
