// src/components/DashboardLayout.jsx
import React, { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import logo from "../../assets/photo insurance.png";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import DescriptionIcon from "@mui/icons-material/Description";
import HandshakeIcon from "@mui/icons-material/Handshake";
import SecurityIcon from "@mui/icons-material/Security";

const DashboardLayout = () => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleMenu = (menuKey) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  const menuItems = [
    {
      key: "dashboard",
      title: "Dashboard",
      path: "/dashboard",
      icon: <DashboardIcon />,
    },
    {
      key: "client-management",
      title: "Client Management",
      icon: <PeopleIcon />,
      subItems: [
        {
          title: "Add Family Head",
          path: "/dashboard/addfamilyhead",  // note the /dashboard prefix for nested routing
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
      icon: <DescriptionIcon />,
      subItems: [
        { title: "Add New Policy", path: "/dashboard/policy-management/add-new-policy" },
        { title: "Renewal Policy", path: "/dashboard/policy-management/renewal-policy" },
        { title: "Manage Policy", path: "/dashboard/policy-management/manage-policy" },
        {
          title: "Deleted Policies",
          path: "/dashboard/policy-management/deleted-policies",
        },
      ],
    },
    {
      key: "sub-agent-management",
      title: "Sub Agent Management",
      path: "/dashboard/sub-agent-management",
      icon: <HandshakeIcon />,
    },
    {
      key: "insurance-management",
      title: "Insurance Management",
      path: "/dashboard/insurance-management",
      icon: <SecurityIcon />,
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

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="bg-indigo-600 text-white w-64 min-h-screen flex flex-col">
        {/* Logo */}
        <Link to="/dashboard" className="flex justify-center py-4 border-b border-indigo-500">
          <img src={logo} className="w-14 h-20 object-contain" alt="Logo" />
        </Link>

        <nav className="flex-1 p-4 overflow-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.key}>
                {item.subItems ? (
                  <div>
                    <button
                      onClick={() => toggleMenu(item.key)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                        isActiveMenu(item) ? "bg-indigo-700" : "hover:bg-indigo-500"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{item.icon}</span>
                        <span className="font-medium">{item.title}</span>
                      </div>
                      <span
                        className={`transform transition-transform ${
                          expandedMenus[item.key] ? "rotate-180" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </button>
                    {expandedMenus[item.key] && (
                      <ul className="mt-2 ml-6 space-y-1">
                        {item.subItems.map((subItem, index) => (
                          <li key={index}>
                            <Link
                              to={subItem.path}
                              className={`block p-2 rounded-md transition-colors ${
                                location.pathname === subItem.path
                                  ? "bg-indigo-700 text-white"
                                  : "text-blue-100 hover:bg-indigo-500 hover:text-white"
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
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      isActiveMenu(item) ? "bg-indigo-700" : "hover:bg-indigo-500"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
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
              <div className="flex items-center space-x-3">
                
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Safe and Secure Insurance Data Management Software
                  </h1>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">RA290325002</span>
                <button className="px-3 py-1 bg-blue-100 text-indigo-700 rounded-md text-sm hover:bg-blue-200 transition-colors">
                  Go to site
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <NotificationsNoneIcon />
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="text-sm font-medium text-gray-700">admin</span>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  ▼
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
    </div>
  );
};

export default DashboardLayout;
