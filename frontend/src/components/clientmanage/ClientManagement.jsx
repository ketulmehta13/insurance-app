import { Link } from "react-router-dom"
import React from "react"

const ClientManagement = () => {
  const menuItems = [
    {
      title: "Add Family Head",
      description: "Add new family head with complete details",
      path: "/client-management/add-family-head",
      icon: "👨‍👩‍👧‍👦",
      color: "bg-blue-500",
    },
    {
      title: "Add Family Member",
      description: "Add family members to existing groups",
      path: "/client-management/add-family-member",
      icon: "👤",
      color: "bg-green-500",
    },
    {
      title: "Add Firm",
      description: "Register new business firms",
      path: "/client-management/add-firm",
      icon: "🏢",
      color: "bg-purple-500",
    },
    {
      title: "Manage Clients",
      description: "View and manage all client records",
      path: "/client-management/manage-clients",
      icon: "📊",
      color: "bg-orange-500",
    },
    {
      title: "Trash Management",
      description: "View and restore deleted records",
      path: "/client-management/trash",
      icon: "🗑️",
      color: "bg-red-500",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
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
    </div>
  )
}

export default ClientManagement
