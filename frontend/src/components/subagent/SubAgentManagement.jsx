import { Link } from "react-router-dom"
import React from "react"

const SubAgentManagement = () => {
  const menuItems = [
    {
      title: "Add Sub Agent",
      description: "Register new sub agents with complete details",
      path: "/dashboard/subagentmanagement/addsubagent",
      icon: "👤",
      color: "bg-blue-500",
    },
    {
      title: "Manage Sub Agents",
      description: "View and manage all sub agent records",
      path: "/dashboard/subagentmanagement/managesubagents",
      icon: "👥",
      color: "bg-green-500",
    },
    {
      title: "Assigned Inquiries",
      description: "View all inquiries assigned to you",
      path: "/agent/inquiries",
      icon: "📋",
      color: "bg-indigo-500",
    },
    
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Sub Agent Management</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center`}>
                <span className="text-white text-xl">{item.icon}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">45</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Sub Agents</p>
              <p className="text-2xl font-bold text-gray-900">45</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">38</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Agents</p>
              <p className="text-2xl font-bold text-gray-900">38</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">₹</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Commission</p>
              <p className="text-2xl font-bold text-gray-900">₹2.5L</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">156</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Policies Sold</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubAgentManagement
