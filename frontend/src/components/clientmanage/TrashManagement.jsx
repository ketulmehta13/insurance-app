"use client"

import { useState } from "react"
import React from "react"

const TrashManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  // Sample deleted data - in real app this would come from API
  const [deletedClients] = useState([
    {
      id: 1,
      groupWith: "Deleted Family Group",
      fullName: "Deleted User One",
      relation: "Head",
      gender: "Male",
      mobile: "9876543210",
      email: "deleted1@example.com",
      status: "Deleted",
      deletedDate: "2024-01-15",
      deletedBy: "Admin",
      type: "Family Head",
    },
    {
      id: 2,
      groupWith: "Removed Business",
      fullName: "Removed Firm Ltd",
      relation: "Firm",
      gender: "-",
      mobile: "9876543211",
      email: "removed@firm.com",
      status: "Deleted",
      deletedDate: "2024-01-10",
      deletedBy: "Manager",
      type: "Firm",
    },
  ])

  const filteredClients = deletedClients.filter((client) =>
    Object.values(client).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const totalPages = Math.ceil(filteredClients.length / entriesPerPage)
  const startIndex = (currentPage - 1) * entriesPerPage
  const paginatedClients = filteredClients.slice(startIndex, startIndex + entriesPerPage)

  const handleRestore = (id) => {
    if (window.confirm("Are you sure you want to restore this record?")) {
      console.log("Restore client:", id)
      // In real app, this would call API to restore
      alert("Record restored successfully!")
    }
  }

  const handlePermanentDelete = (id) => {
    if (window.confirm("Are you sure you want to permanently delete this record? This action cannot be undone.")) {
      console.log("Permanently delete client:", id)
      // In real app, this would call API to permanently delete
      alert("Record permanently deleted!")
    }
  }

  const handleViewDetails = (client) => {
    alert(`Viewing details for: ${client.fullName}\nDeleted on: ${client.deletedDate}\nDeleted by: ${client.deletedBy}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Trash Management</h1>
        <div className="text-sm text-gray-600">Deleted records are kept for 30 days before permanent deletion</div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Show</label>
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-sm text-gray-600 ml-2">entries</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search:</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search deleted records..."
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-red-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Group/Firm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mobile
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deleted Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deleted By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        client.type === "Family Head"
                          ? "bg-blue-100 text-blue-800"
                          : client.type === "Firm"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {client.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.fullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.groupWith}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.mobile}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.deletedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.deletedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button onClick={() => handleViewDetails(client)} className="text-blue-600 hover:text-blue-900">
                        View
                      </button>
                      <button onClick={() => handleRestore(client.id)} className="text-green-600 hover:text-green-900">
                        Restore
                      </button>
                      <button
                        onClick={() => handlePermanentDelete(client.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete Forever
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginatedClients.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-500">
              <div className="text-4xl mb-4">🗑️</div>
              <p className="text-lg font-medium">No deleted records found</p>
              <p className="text-sm">All deleted records will appear here</p>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, filteredClients.length)} of{" "}
              {filteredClients.length} entries
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 border rounded-md ${
                    currentPage === page ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TrashManagement
