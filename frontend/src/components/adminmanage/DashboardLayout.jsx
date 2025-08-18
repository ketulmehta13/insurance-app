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
} from "lucide-react";
import { AuthContext } from "../../pages/AuthProvider";
import logo from "../../assets/photo insurance.png";
import NotificationBell from "./NotificationBell";

const DashboardLayout = () => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});
  // State for the profile modal
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  // Get the logout and user data from AuthContext
  const { logout, user } = useContext(AuthContext);

  const toggleMenu = (menuKey) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  // Function to handle logout
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
      title: "Sub Agent Management",
      path: "/dashboard/subagentmanagement",
      icon: <Handshake className="w-5 h-5" />,
    },
    {
      key: "inquiries",
      title: "Customer Inquiries",
      path: "/dashboard/inquiries",
      icon: <FileText className="w-5 h-5" />,
    },
    // {
    //   key: "insurance-management",
    //   title: "Insurance Management",
    //   path: "/dashboard/insurancemanagement",
    //   icon: <Shield className="w-5 h-5" />,
    // },
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

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="bg-gradient-to-b from-indigo-600 to-purple-700 text-white w-64 min-h-screen flex flex-col shadow-xl">
        {/* Logo */}
        <Link
          to="/dashboard"
          className="flex items-center justify-center py-6 border-b border-indigo-500/30"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              
                <img src={logo} className="w-14 h-20 object-contain" />
            </div>
            <span className="text-xl font-bold">PR ADVISORS</span>
          </div>
        </Link>

        <nav className="flex-1 p-4 overflow-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.key}>
                {item.subItems ? (
                  <div>
                    <button
                      onClick={() => toggleMenu(item.key)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                        isActiveMenu(item)
                          ? "bg-white/20 text-white shadow-lg"
                          : "hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {item.icon}
                        <span className="font-medium">{item.title}</span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 transform transition-transform duration-200 ${
                          expandedMenus[item.key] ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {expandedMenus[item.key] && (
                      <ul className="mt-2 ml-6 space-y-1">
                        {item.subItems.map((subItem, index) => (
                          <li key={index}>
                            <Link
                              to={subItem.path}
                              className={`block p-2 rounded-md transition-all duration-200 ${
                                location.pathname === subItem.path
                                  ? "bg-white/20 text-white shadow-md"
                                  : "text-indigo-100 hover:bg-white/10 hover:text-white"
                              }`}
                            >
                              {subItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                      isActiveMenu(item)
                        ? "bg-white/20 text-white shadow-lg"
                        : "hover:bg-white/10"
                    }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.title}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Safe and Secure Insurance Data Management Software
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Manage your insurance portfolio with confidence
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <NotificationBell/>

              {/* Profile and Logout Buttons */}
              <div className="flex items-center space-x-3">
                {user && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsProfileModalOpen(true)}
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </button>
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* This is where child routes render */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>

      {/* Admin Profile Modal */}
      {isProfileModalOpen && user && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative p-8 bg-white w-96 max-w-lg mx-auto rounded-xl shadow-2xl">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                User Profile
              </h2>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                  <span>{user.username.charAt(0).toUpperCase()}</span>
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-gray-900">
                    {user.username}
                  </p>
                  <p className="text-sm text-gray-500 capitalize bg-gray-100 px-3 py-1 rounded-full">
                    {user.role}
                  </p>
                  {user.email && (
                    <p className="text-sm text-gray-600">{user.email}</p>
                  )}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg w-full">
                  <p className="text-sm text-gray-600 text-center">
                    Welcome to the PR Advisors dashboard. Manage your insurance
                    operations with ease and security.
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsProfileModalOpen(false)}
              className="mt-6 w-full px-4 py-3 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
            >
              Close Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
