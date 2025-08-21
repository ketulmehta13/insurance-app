// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Bell, X, Check } from "lucide-react";

// const NotificationBell = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   useEffect(() => {
//     fetchNotifications();
//     // Optionally, poll every X seconds:
//     // const interval = setInterval(fetchNotifications, 30000);
//     // return () => clearInterval(interval);
//   }, []);

//   const fetchNotifications = async () => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const res = await axios.get("http://127.0.0.1:8000/notifications/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNotifications(res.data);
//       setUnreadCount(res.data.filter((n) => !n.is_read).length);
//     } catch (err) {
//       console.error("Failed to fetch notifications", err);
//     }
//   };

//   const markAsRead = async (id) => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       await axios.post(
//         `http://127.0.0.1:8000/notifications/mark-read/${id}/`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setNotifications((prev) =>
//         prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
//       );
//       setUnreadCount((prev) => (prev > 0 ? prev - 1 : 0));
//     } catch (err) {
//       console.error("Failed to mark notification read", err);
//     }
//   };

//   const deleteNotification = async (id) => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       await axios.delete(`http://127.0.0.1:8000/notifications/${id}/`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNotifications((prev) => {
//         const target = prev.find((n) => n.id === id);
//         if (!target) return prev;
//         // Remove from unread count only if notification was unread
//         if (!target.is_read) setUnreadCount((count) => (count > 0 ? count - 1 : 0));
//         // Remove notification from the bell dropdown ONLY (not from inquiries page!)
//         return prev.filter((n) => n.id !== id);
//       });
//     } catch (err) {
//       console.error("Failed to delete notification", err);
//     }
//   };

//   return (
//     <div className="relative inline-block text-left z-50">
//       <button
//         onClick={() => setDropdownOpen(!dropdownOpen)}
//         className="relative focus:outline-none"
//         aria-label="Notifications"
//         style={{ lineHeight: 0 }}
//       >
//         <Bell className="w-6 h-6 text-gray-700" style={{ fontSize: "1rem" }} />
//         {unreadCount > 0 && (
//           <span
//             style={{
//               position: "absolute",
//               top: "-4px",
//               right: "-4px",
//               minWidth: "16px",
//               height: "16px",
//               background: "#dc2626",
//               color: "#fff",
//               borderRadius: "50%",
//               fontSize: "0.75rem",
//               fontWeight: "bold",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               border: "2px solid #fff",
//               padding: "0 4px",
//             }}
//           >
//             {unreadCount}
//           </span>
//         )}
//       </button>

//       {dropdownOpen && (
//         <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
//           <div className="py-2 max-h-60 overflow-y-auto">
//             {notifications.length === 0 && (
//               <p className="p-2 text-gray-600 text-center">No notifications</p>
//             )}
//             {notifications.map((n) => (
//               <div
//                 key={n.id}
//                 className={`px-4 py-2 flex flex-col gap-1 hover:bg-gray-100 rounded-md relative ${
//                   !n.is_read ? "font-semibold bg-gray-200" : ""
//                 }`}
//                 style={{
//                   fontSize: "1rem",
//                   marginBottom: "4px",
//                   boxShadow: !n.is_read ? "0 0 0 2px #c7d2fe" : undefined,
//                 }}
//               >
//                 <div className="flex justify-between items-center">
//                   <div
//                     className="flex-1 cursor-pointer"
//                     onClick={() => {
//                       if (n.url) window.location.href = n.url;
//                     }}
//                   >
//                     <p style={{ marginBottom: "0.3rem" }}>{n.message}</p>
//                     <small className="text-xs text-gray-500">
//                       {new Date(n.created_at).toLocaleString()}
//                     </small>
//                   </div>
//                   {/* Delete button (X icon) */}
//                   <button
//                     onClick={() => deleteNotification(n.id)}
//                     title="Delete"
//                     className="ml-2 text-gray-400 hover:text-red-600 p-1"
//                   >
//                     <X size={18} />
//                   </button>
//                 </div>
//                 {/* Mark as read button, only if not read */}
//                 {!n.is_read && (
//                   <button
//                     onClick={() => markAsRead(n.id)}
//                     className="text-xs text-white bg-green-600 hover:bg-green-700 rounded px-2 py-1 inline-flex items-center w-fit mt-1"
//                     style={{ fontWeight: 500 }}
//                   >
//                     <Check size={14} className="mr-1" /> Mark as Read
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NotificationBell;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Check, Clock, AlertCircle, CheckCircle } from "lucide-react";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchNotifications();
    
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const res = await axios.get("http://127.0.0.1:8000/notifications/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data);
      setUnreadCount(res.data.filter((n) => !n.is_read).length);
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        `http://127.0.0.1:8000/notifications/mark-read/${id}/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
      setUnreadCount((prev) => (prev > 0 ? prev - 1 : 0));
    } catch (err) {
      console.error("Failed to mark notification read", err);
    }
  };

  const deleteNotification = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`http://127.0.0.1:8000/notifications/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) => {
        const target = prev.find((n) => n.id === id);
        if (!target) return prev;
        // Remove from unread count only if notification was unread
        if (!target.is_read) setUnreadCount((count) => (count > 0 ? count - 1 : 0));
        // Remove notification from the bell dropdown
        return prev.filter((n) => n.id !== id);
      });
    } catch (err) {
      console.error("Failed to delete notification", err);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const unreadNotifications = notifications.filter(n => !n.is_read);
      
      await Promise.all(
        unreadNotifications.map(n => 
          axios.post(
            `http://127.0.0.1:8000/notifications/mark-read/${n.id}/`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          )
        )
      );
      
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error("Failed to mark all as read", err);
    }
  };

  const getNotificationIcon = (notification) => {
    // You can customize this based on notification type
    if (notification.type === 'error' || notification.message.toLowerCase().includes('error')) {
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
    if (notification.type === 'success' || notification.message.toLowerCase().includes('success')) {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    return <Clock className="w-4 h-4 text-cyan-500" />;
  };

  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95, 
      y: -10,
      transition: { duration: 0.1 } 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 25 
      }
    }
  };

  const notificationVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="relative p-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
        aria-label="Notifications"
      >
        <Bell className="w-6 h-6 text-slate-600 dark:text-slate-300" />
        
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-xs font-bold flex items-center justify-center border-2 border-white dark:border-slate-800 shadow-lg"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="origin-top-right absolute right-0 mt-3 w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-50 to-slate-50 dark:from-cyan-900/20 dark:to-slate-800/50 p-4 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Notifications
                  </h3>
                  {unreadCount > 0 && (
                    <span className="px-2 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-full text-xs font-semibold">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={markAllAsRead}
                    className="text-xs text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-medium"
                  >
                    Mark all read
                  </motion.button>
                )}
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {loading ? (
                <div className="p-6 text-center">
                  <div className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-cyan-600 border-t-transparent rounded-full"
                    />
                    Loading notifications...
                  </div>
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-600 dark:text-slate-300 font-medium">No notifications</p>
                  <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">You're all caught up!</p>
                </div>
              ) : (
                <AnimatePresence>
                  {notifications.map((n) => (
                    <motion.div
                      key={n.id}
                      variants={notificationVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className={`relative p-4 border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${
                        !n.is_read ? "bg-cyan-50/50 dark:bg-cyan-900/10 border-l-4 border-l-cyan-500" : ""
                      }`}
                    >
                      <div className="flex gap-3">
                        {/* Icon */}
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(n)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              if (n.url) window.location.href = n.url;
                            }}
                          >
                            <p className={`text-sm leading-relaxed ${
                              !n.is_read 
                                ? "font-semibold text-slate-900 dark:text-white" 
                                : "text-slate-700 dark:text-slate-300"
                            }`}>
                              {n.message}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Clock className="w-3 h-3 text-slate-400" />
                              <small className="text-xs text-slate-500 dark:text-slate-400">
                                {new Date(n.created_at).toLocaleString()}
                              </small>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 mt-3">
                            {!n.is_read && (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => markAsRead(n.id)}
                                className="inline-flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium transition-colors"
                              >
                                <Check size={12} />
                                Mark Read
                              </motion.button>
                            )}
                          </div>
                        </div>

                        {/* Delete Button */}
                        <div className="flex-shrink-0">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => deleteNotification(n.id)}
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete notification"
                          >
                            <X size={16} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700 text-center">
                <button
                  onClick={() => setDropdownOpen(false)}
                  className="text-xs text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white transition-colors"
                >
                  Close notifications
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;

