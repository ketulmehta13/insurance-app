"use client"
import React from "react"

import { useState } from "react"

const ManageClients = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [hiddenColumns, setHiddenColumns] = useState([])

  // Sample data - in real app this would come from API
  const [clients] = useState([
    {
      id: 1,
      groupWith: "Family Group A",
      fullName: "John Doe Smith",
      relation: "Head",
      gender: "Male",
      anniversary: "2023-06-15",
      mobile: "9876543210",
      whatsapp: "9876543210",
      email: "john@example.com",
      status: "Active",
    },
    {
      id: 2,
      groupWith: "Family Group A",
      fullName: "Jane Doe Smith",
      relation: "Spouse",
      gender: "Female",
      anniversary: "2023-06-15",
      mobile: "9876543211",
      whatsapp: "9876543211",
      email: "jane@example.com",
      status: "Active",
    },
    {
      id: 3,
      groupWith: "Business Corp",
      fullName: "Mike Johnson",
      relation: "Employee",
      gender: "Male",
      anniversary: "",
      mobile: "9876543212",
      whatsapp: "9876543212",
      email: "mike@business.com",
      status: "Inactive",
    },
  ])

  const stats = [
    { title: "Total Groups", value: 45, color: "bg-blue-500" },
    { title: "Family Heads", value: 89, color: "bg-green-500" },
    { title: "Total Members", value: 234, color: "bg-purple-500" },
    { title: "Total Firms", value: 12, color: "bg-orange-500" },
  ]

  const columns = [
    { key: "id", label: "ID", searchable: false },
    { key: "groupWith", label: "Group With", searchable: true },
    { key: "fullName", label: "Full Name", searchable: true },
    { key: "relation", label: "Relation", searchable: true },
    { key: "gender", label: "Gender", searchable: true },
    { key: "anniversary", label: "Anniversary", searchable: false },
    { key: "mobile", label: "Mobile No", searchable: false },
    { key: "whatsapp", label: "WhatsApp No", searchable: false },
    { key: "email", label: "Email", searchable: false },
    { key: "status", label: "Status", searchable: false },
    { key: "actions", label: "Actions", searchable: false },
  ]

  const filteredClients = clients.filter((client) =>
    Object.values(client).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const totalPages = Math.ceil(filteredClients.length / entriesPerPage)
  const startIndex = (currentPage - 1) * entriesPerPage
  const paginatedClients = filteredClients.slice(startIndex, startIndex + entriesPerPage)

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      console.log("Delete client:", id)
      // In real app, this would call API to delete
    }
  }

  const handleEdit = (id) => {
    console.log("Edit client:", id)
    // In real app, this would navigate to edit form
  }

  const toggleColumn = (columnKey) => {
    setHiddenColumns((prev) =>
      prev.includes(columnKey) ? prev.filter((col) => col !== columnKey) : [...prev, columnKey],
    )
  }

  const clearSearch = () => {
    setSearchTerm("")
  }

  const downloadDocument = () => {
    console.log("Download document")
    // In real app, this would generate and download report
  }

  return (
    <div className={`space-y-6 ${isFullScreen ? "fixed inset-0 z-50 bg-white p-6 overflow-auto" : ""}`}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Manage Clients</h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={clearSearch}
            className="px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
          >
            Clear Search
          </button>
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            {isFullScreen ? "Exit Full Screen" : "Full Screen"}
          </button>
          <button
            onClick={downloadDocument}
            className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
          >
            Download
          </button>
          <div className="relative">
            <button className="px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm">
              Hide Columns
            </button>
            {/* Column visibility dropdown would go here */}
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <span className="text-white font-bold text-xl">{stat.value}</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Controls */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
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
              placeholder="Search clients..."
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                      hiddenColumns.includes(column.key) ? "hidden" : ""
                    }`}
                  >
                    {column.label}
                    {column.searchable && <span className="ml-1 text-blue-500">🔍</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${hiddenColumns.includes("id") ? "hidden" : ""}`}
                  >
                    {client.id}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${hiddenColumns.includes("groupWith") ? "hidden" : ""}`}
                  >
                    {client.groupWith}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${hiddenColumns.includes("fullName") ? "hidden" : ""}`}
                  >
                    {client.fullName}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${hiddenColumns.includes("relation") ? "hidden" : ""}`}
                  >
                    {client.relation}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${hiddenColumns.includes("gender") ? "hidden" : ""}`}
                  >
                    {client.gender}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${hiddenColumns.includes("anniversary") ? "hidden" : ""}`}
                  >
                    {client.anniversary || "-"}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${hiddenColumns.includes("mobile") ? "hidden" : ""}`}
                  >
                    {client.mobile}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${hiddenColumns.includes("whatsapp") ? "hidden" : ""}`}
                  >
                    {client.whatsapp}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${hiddenColumns.includes("email") ? "hidden" : ""}`}
                  >
                    {client.email}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${hiddenColumns.includes("status") ? "hidden" : ""}`}>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        client.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {client.status}
                    </span>
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${hiddenColumns.includes("actions") ? "hidden" : ""}`}
                  >
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      <button onClick={() => handleEdit(client.id)} className="text-green-600 hover:text-green-900">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(client.id)} className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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
      </div>
    </div>
  )
}

export default ManageClients
