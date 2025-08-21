// import React, { useState, useContext } from "react";
// import { Link, useLocation, Outlet } from "react-router-dom";
// import {
//   Bell,
//   LayoutDashboard as Dashboard,
//   Users,
//   FileText,
//   Handshake,
//   Shield,
//   ChevronDown,
//   User,
//   LogOut,
// } from "lucide-react";
// import { AuthContext } from "../../pages/AuthProvider";
// import logo from "../../assets/photo insurance.png";
// import NotificationBell from "./NotificationBell";

// const DashboardLayout = () => {
//   const location = useLocation();
//   const [expandedMenus, setExpandedMenus] = useState({});
//   // State for the profile modal
//   const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
//   // Get the logout and user data from AuthContext
//   const { logout, user } = useContext(AuthContext);

//   const toggleMenu = (menuKey) => {
//     setExpandedMenus((prev) => ({
//       ...prev,
//       [menuKey]: !prev[menuKey],
//     }));
//   };

//   // Function to handle logout
//   const handleLogout = () => {
//     logout();
//   };

//   const menuItems = [
    
//     {
//       key: "dashboard",
//       title: "Dashboard",
//       path: "/dashboard",
//       icon: <Dashboard className="w-5 h-5" />,
//     },
//     {
//       key: "client-management",
//       title: "Client Management",
//       icon: <Users className="w-5 h-5" />,
//       subItems: [
//         {
//           title: "Add Family Head",
//           path: "/dashboard/addfamilyhead",
//         },
//         {
//           title: "Add Family Member",
//           path: "/dashboard/addfamilymember",
//         },
//         { title: "Add Firm", path: "/dashboard/addfirm" },
//         { title: "Manage Clients", path: "/dashboard/manageclient" },
//         { title: "Trash Management", path: "/dashboard/trashmanage" },
//       ],
//     },
//     {
//       key: "policy-management",
//       title: "Policy Management",
//       icon: <FileText className="w-5 h-5" />,
//       subItems: [
//         {
//           title: "Add New Policy",
//           path: "/dashboard/policymanagement/addnewpolicy",
//         },
//         {
//           title: "Renewal Policy",
//           path: "/dashboard/policymanagement/renewalpolicy",
//         },
//         {
//           title: "Manage Policy",
//           path: "/dashboard/policymanagement/managepolicy",
//         },
//         {
//           title: "Deleted Policies",
//           path: "/dashboard/policymanagement/deletedpolicies",
//         },
//       ],
//     },
//     {
//       key: "sub-agent-management",
//       title: "Sub Agent Management",
//       path: "/dashboard/subagentmanagement",
//       icon: <Handshake className="w-5 h-5" />,
//     },
//     {
//       key: "inquiries",
//       title: "Customer Inquiries",
//       path: "/dashboard/inquiries",
//       icon: <FileText className="w-5 h-5" />,
//     },
//     // {
//     //   key: "insurance-management",
//     //   title: "Insurance Management",
//     //   path: "/dashboard/insurancemanagement",
//     //   icon: <Shield className="w-5 h-5" />,
//     // },
//   ];

//   const isActiveMenu = (item) => {
//     if (item.path) {
//       return location.pathname === item.path;
//     }
//     if (item.subItems) {
//       return item.subItems.some(
//         (subItem) => location.pathname === subItem.path
//       );
//     }
//     return false;
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="bg-gradient-to-b from-indigo-600 to-purple-700 text-white w-64 min-h-screen flex flex-col shadow-xl">
//         {/* Logo */}
//         <Link
//           to="/dashboard"
//           className="flex items-center justify-center py-6 border-b border-indigo-500/30"
//         >
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              
//                 <img src={logo} className="w-14 h-20 object-contain" />
//             </div>
//             <span className="text-xl font-bold">PR ADVISORS</span>
//           </div>
//         </Link>

//         <nav className="flex-1 p-4 overflow-auto">
//           <ul className="space-y-2">
//             {menuItems.map((item) => (
//               <li key={item.key}>
//                 {item.subItems ? (
//                   <div>
//                     <button
//                       onClick={() => toggleMenu(item.key)}
//                       className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
//                         isActiveMenu(item)
//                           ? "bg-white/20 text-white shadow-lg"
//                           : "hover:bg-white/10"
//                       }`}
//                     >
//                       <div className="flex items-center space-x-3">
//                         {item.icon}
//                         <span className="font-medium">{item.title}</span>
//                       </div>
//                       <ChevronDown
//                         className={`w-4 h-4 transform transition-transform duration-200 ${
//                           expandedMenus[item.key] ? "rotate-180" : ""
//                         }`}
//                       />
//                     </button>
//                     {expandedMenus[item.key] && (
//                       <ul className="mt-2 ml-6 space-y-1">
//                         {item.subItems.map((subItem, index) => (
//                           <li key={index}>
//                             <Link
//                               to={subItem.path}
//                               className={`block p-2 rounded-md transition-all duration-200 ${
//                                 location.pathname === subItem.path
//                                   ? "bg-white/20 text-white shadow-md"
//                                   : "text-indigo-100 hover:bg-white/10 hover:text-white"
//                               }`}
//                             >
//                               {subItem.title}
//                             </Link>
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </div>
//                 ) : (
//                   <Link
//                     to={item.path}
//                     className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
//                       isActiveMenu(item)
//                         ? "bg-white/20 text-white shadow-lg"
//                         : "hover:bg-white/10"
//                     }`}
//                   >
//                     {item.icon}
//                     <span className="font-medium">{item.title}</span>
//                   </Link>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>

//       {/* Main content area */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <div>
//                 <h1 className="text-xl font-semibold text-gray-900">
//                   Safe and Secure Insurance Data Management Software
//                 </h1>
//                 <p className="text-sm text-gray-500 mt-1">
//                   Manage your insurance portfolio with confidence
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center space-x-4">
//               <NotificationBell/>

//               {/* Profile and Logout Buttons */}
//               <div className="flex items-center space-x-3">
//                 {user && (
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={() => setIsProfileModalOpen(true)}
//                       className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
//                     >
//                       <User className="w-4 h-4" />
//                       <span>Profile</span>
//                     </button>
//                   </div>
//                 )}
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors"
//                 >
//                   <LogOut className="w-4 h-4" />
//                   <span>Logout</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* This is where child routes render */}
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
//           <Outlet />
//         </main>
//       </div>

//       {/* Admin Profile Modal */}
//       {isProfileModalOpen && user && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
//           <div className="relative p-8 bg-white w-96 max-w-lg mx-auto rounded-xl shadow-2xl">
//             <div className="text-center">
//               <h2 className="text-2xl font-bold mb-6 text-gray-800">
//                 User Profile
//               </h2>
//               <div className="flex flex-col items-center space-y-4">
//                 <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
//                   <span>{user.username.charAt(0).toUpperCase()}</span>
//                 </div>
//                 <div className="space-y-2">
//                   <p className="text-lg font-semibold text-gray-900">
//                     {user.username}
//                   </p>
//                   <p className="text-sm text-gray-500 capitalize bg-gray-100 px-3 py-1 rounded-full">
//                     {user.role}
//                   </p>
//                   {user.email && (
//                     <p className="text-sm text-gray-600">{user.email}</p>
//                   )}
//                 </div>
//                 <div className="bg-gray-50 p-4 rounded-lg w-full">
//                   <p className="text-sm text-gray-600 text-center">
//                     Welcome to the PR Advisors dashboard. Manage your insurance
//                     operations with ease and security.
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <button
//               onClick={() => setIsProfileModalOpen(false)}
//               className="mt-6 w-full px-4 py-3 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
//             >
//               Close Profile
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DashboardLayout;

import React, { useState, useContext } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  Bell,
  LayoutDashboard as Dashboard,
  Users,
  FileText,
  Handshake,
  Shield,
  ChevronDown,
  User,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../pages/AuthProvider";
import logo from "../../assets/photo insurance.png";
import NotificationBell from "./NotificationBell";

const DashboardLayout = () => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { logout, user } = useContext(AuthContext);

  const toggleMenu = (menuKey) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  const handleLogout = () => {
    logout();
  };

  const menuItems = [
    {
      key: "dashboard",
      title: "Dashboard",
      path: "/dashboard",
      icon: <Dashboard className="w-5 h-5" />,
    },
    {
      key: "client-management",
      title: "Client Management",
      icon: <Users className="w-5 h-5" />,
      subItems: [
        {
          title: "Add Family Head",
          path: "/dashboard/addfamilyhead",
        },
        {
          title: "Add Family Member",
          path: "/dashboard/addfamilymember",
        },
        { title: "Add Firm", path: "/dashboard/addfirm" },
        { title: "Manage Clients", path: "/dashboard/manageclient" },
        { title: "Trash Management", path: "/dashboard/trashmanage" },
      ],
    },
    {
      key: "policy-management",
      title: "Policy Management",
      icon: <FileText className="w-5 h-5" />,
      subItems: [
        {
          title: "Add New Policy",
          path: "/dashboard/policymanagement/addnewpolicy",
        },
        {
          title: "Renewal Policy",
          path: "/dashboard/policymanagement/renewalpolicy",
        },
        {
          title: "Manage Policy",
          path: "/dashboard/policymanagement/managepolicy",
        },
        {
          title: "Deleted Policies",
          path: "/dashboard/policymanagement/deletedpolicies",
        },
      ],
    },
    {
      key: "sub-agent-management",
      title: "Agent Management",
      icon: <Handshake className="w-5 h-5" />,
      subItems: [
        {
          title: "Add Sub Agent",
          path: "/dashboard/subagentmanagement/addsubagent",
        },
        {
          title: "Manage Agents",
          path: "/dashboard/subagentmanagement/managesubagents",
        },
        {
          title: "Assigned Inquiries",
          path: "/dashboard/subagentmanagement/assignedinquiries",
        },
      ],
    },
    
    {
      key: "inquiries",
      title: "Customer Inquiries",
      path: "/dashboard/inquiries",
      icon: <FileText className="w-5 h-5" />,
    },
  ];

  const isActiveMenu = (item) => {
    if (item.path) {
      return location.pathname === item.path;
    }
    if (item.subItems) {
      return item.subItems.some(
        (subItem) => location.pathname === subItem.path
      );
    }
    return false;
  };

  const sidebarVariants = {
    hidden: { x: -264 },
    visible: { 
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  const submenuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: "auto", 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Mobile Sidebar Backdrop */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        variants={sidebarVariants}
        initial="visible"
        animate={isMobileSidebarOpen ? "visible" : { x: 0 }}
        className="bg-gradient-to-b from-cyan-600 via-slate-700 to-slate-800 dark:from-cyan-700 dark:via-slate-800 dark:to-slate-900 text-white w-64 min-h-screen flex flex-col shadow-2xl fixed lg:relative z-50 lg:z-auto"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <Link
            to="/dashboard"
            className="flex items-center justify-center py-6 border-b border-white/20 hover:bg-white/5 transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <img src={logo} className="w-8 h-10 object-contain" />
              </div>
              <div className="text-left">
                <span className="text-xl font-bold"><span className="text-cyan-200">PR-Advisor</span></span>
                <p className="text-xs text-cyan-200 opacity-80">Admin Panel</p>
              </div>
            </div>
          </Link>
          
          {/* Mobile Close Button */}
          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors lg:hidden"
          >
            <X size={20} />
          </button>
        </motion.div>

        <nav className="flex-1 p-4 overflow-auto">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <motion.li
                key={item.key}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 * index }}
              >
                {item.subItems ? (
                  <div>
                    <motion.button
                      onClick={() => toggleMenu(item.key)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                        isActiveMenu(item)
                          ? "bg-white/20 text-white shadow-lg backdrop-blur-sm"
                          : "hover:bg-white/10 text-cyan-100"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {item.icon}
                        <span className="font-medium">{item.title}</span>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedMenus[item.key] ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </motion.button>
                    
                    <AnimatePresence>
                      {expandedMenus[item.key] && (
                        <motion.ul
                          variants={submenuVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          className="mt-2 ml-6 space-y-1 overflow-hidden"
                        >
                          {item.subItems.map((subItem, subIndex) => (
                            <motion.li
                              key={subIndex}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: subIndex * 0.05 }}
                            >
                              <Link
                                to={subItem.path}
                                className={`block p-2 rounded-lg transition-all duration-200 text-sm ${
                                  location.pathname === subItem.path
                                    ? "bg-cyan-500/20 text-cyan-200 shadow-md border-l-4 border-cyan-400"
                                    : "text-cyan-100/80 hover:bg-white/10 hover:text-white"
                                }`}
                                onClick={() => setIsMobileSidebarOpen(false)}
                              >
                                {subItem.title}
                              </Link>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                        isActiveMenu(item)
                          ? "bg-white/20 text-white shadow-lg backdrop-blur-sm"
                          : "hover:bg-white/10 text-cyan-100"
                      }`}
                      onClick={() => setIsMobileSidebarOpen(false)}
                    >
                      {item.icon}
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </motion.div>
                )}
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 border-t border-white/20"
        >
          <div className="text-center">
            <p className="text-xs text-cyan-200 opacity-70">PR-Advisor Dashboard</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700 px-6 py-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors lg:hidden"
              >
                <Menu size={20} className="text-slate-600 dark:text-slate-300" />
              </button>
              
              <div>
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl font-bold text-slate-900 dark:text-white"
                >
                  Safe and Secure Insurance Data Management
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm text-slate-600 dark:text-slate-400 mt-1"
                >
                  Manage your insurance portfolio with confidence
                </motion.p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <NotificationBell />

              {/* Profile and Logout Buttons */}
              <div className="flex items-center space-x-3">
                {user && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsProfileModalOpen(true)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-900/30 hover:bg-cyan-100 dark:hover:bg-cyan-800/50 transition-all duration-200 border border-cyan-200 dark:border-cyan-800"
                  >
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">Profile</span>
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 dark:bg-slate-900 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      {/* Admin Profile Modal */}
      <AnimatePresence>
        {isProfileModalOpen && user && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full flex items-center justify-center z-50 p-4"
            onClick={() => setIsProfileModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative bg-white dark:bg-slate-800 w-full max-w-md mx-auto rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-slate-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                      <span>{user.username.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-slate-800 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {user.username}
                    </h2>
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-cyan-100 to-slate-100 dark:from-cyan-900/30 dark:to-slate-700 text-cyan-700 dark:text-cyan-300">
                      <Shield className="w-4 h-4 mr-2" />
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </div>
                    {user.email && (
                      <p className="text-sm text-slate-600 dark:text-slate-400">{user.email}</p>
                    )}
                  </div>
                  
                  <div className="bg-gradient-to-r from-cyan-50 to-slate-50 dark:from-cyan-900/20 dark:to-slate-800/50 p-4 rounded-xl border border-cyan-200 dark:border-cyan-800/30">
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      Welcome to the Guard.In dashboard. Manage your insurance operations with ease and security.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="px-8 pb-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsProfileModalOpen(false)}
                  className="w-full px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-600 to-slate-700 hover:from-cyan-700 hover:to-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Close Profile
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardLayout;
