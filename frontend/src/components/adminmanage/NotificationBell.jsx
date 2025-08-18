import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bell, X, Check } from "lucide-react";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
    // Optionally, poll every X seconds:
    // const interval = setInterval(fetchNotifications, 30000);
    // return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get("http://127.0.0.1:8000/notifications/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data);
      setUnreadCount(res.data.filter((n) => !n.is_read).length);
    } catch (err) {
      console.error("Failed to fetch notifications", err);
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
        // Remove notification from the bell dropdown ONLY (not from inquiries page!)
        return prev.filter((n) => n.id !== id);
      });
    } catch (err) {
      console.error("Failed to delete notification", err);
    }
  };

  return (
    <div className="relative inline-block text-left z-50">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="relative focus:outline-none"
        aria-label="Notifications"
        style={{ lineHeight: 0 }}
      >
        <Bell className="w-6 h-6 text-gray-700" style={{ fontSize: "1rem" }} />
        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-4px",
              right: "-4px",
              minWidth: "16px",
              height: "16px",
              background: "#dc2626",
              color: "#fff",
              borderRadius: "50%",
              fontSize: "0.75rem",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #fff",
              padding: "0 4px",
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {dropdownOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-2 max-h-60 overflow-y-auto">
            {notifications.length === 0 && (
              <p className="p-2 text-gray-600 text-center">No notifications</p>
            )}
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`px-4 py-2 flex flex-col gap-1 hover:bg-gray-100 rounded-md relative ${
                  !n.is_read ? "font-semibold bg-gray-200" : ""
                }`}
                style={{
                  fontSize: "1rem",
                  marginBottom: "4px",
                  boxShadow: !n.is_read ? "0 0 0 2px #c7d2fe" : undefined,
                }}
              >
                <div className="flex justify-between items-center">
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => {
                      if (n.url) window.location.href = n.url;
                    }}
                  >
                    <p style={{ marginBottom: "0.3rem" }}>{n.message}</p>
                    <small className="text-xs text-gray-500">
                      {new Date(n.created_at).toLocaleString()}
                    </small>
                  </div>
                  {/* Delete button (X icon) */}
                  <button
                    onClick={() => deleteNotification(n.id)}
                    title="Delete"
                    className="ml-2 text-gray-400 hover:text-red-600 p-1"
                  >
                    <X size={18} />
                  </button>
                </div>
                {/* Mark as read button, only if not read */}
                {!n.is_read && (
                  <button
                    onClick={() => markAsRead(n.id)}
                    className="text-xs text-white bg-green-600 hover:bg-green-700 rounded px-2 py-1 inline-flex items-center w-fit mt-1"
                    style={{ fontWeight: 500 }}
                  >
                    <Check size={14} className="mr-1" /> Mark as Read
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
