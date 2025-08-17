import { Link } from "react-router-dom"
import React from "react"

const PolicyManagement = () => {
  const menuItems = [
    {
      title: "Add New Policy",
      description: "Create new insurance policy for customers",
      path: "/policy-management/add-new-policy",
      icon: "📋",
      color: "bg-blue-500",
    },
    {
      title: "Renewal Policy",
      description: "Renew existing insurance policies",
      path: "/policy-management/renewal-policy",
      icon: "🔄",
      color: "bg-green-500",
    },
    {
      title: "Manage Policy",
      description: "View and manage all insurance policies",
      path: "/policy-management/manage-policy",
      icon: "📊",
      color: "bg-purple-500",
    },
    {
      title: "Deleted Policies",
      description: "View and restore deleted policy records",
      path: "/policy-management/deleted-policies",
      icon: "🗑️",
      color: "bg-red-500",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Policy Management</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
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
    </div>
  )
}

export default PolicyManagement
