"use client";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ManagePolicy = () => {
  const navigate = useNavigate();
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");

  // Fetch data from the backend whenever the dropdown filters change
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (filterStatus) params.append("status", filterStatus);
        if (filterType) params.append("policy_type", filterType);

        const response = await axios.get("http://127.0.0.1:8000/policy/policies/", {
          params,
        });
        setPolicies(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch policy data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPolicies();
  }, [filterStatus, filterType]);

  // Reset currentPage to 1 whenever filter, search term or entries per page change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus, filterType, searchTerm, entriesPerPage]);

  // Filter based on search term applied after data fetching
  const filteredPolicies = policies.filter((policy) =>
    Object.values(policy).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Calculate total pages (ensure minimum 1)
  const totalPages = Math.max(1, Math.ceil(filteredPolicies.length / entriesPerPage));
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedPolicies = filteredPolicies.slice(startIndex, startIndex + entriesPerPage);

  const stats = [
    { title: "Total Policies", value: policies.length, color: "bg-blue-500" },
    {
      title: "Active Policies",
      value: policies.filter((p) => p.status === "Active").length,
      color: "bg-green-500",
    },
    {
      title: "Expired Policies",
      value: policies.filter((p) => p.status === "Expired").length,
      color: "bg-purple-500",
    },
    {
      title: "Cancelled Policies",
      value: policies.filter((p) => p.status === "Cancelled").length,
      color: "bg-red-500",
    },
    {
      title: "Pending Policies",
      value: policies.filter((p) => p.status === "Pending").length,
      color: "bg-yellow-500",
    },
    // Removed "Lapsed Policies" as it is not part of your backend choices
  ];

  // Navigation functions
  const handleView = (id) => navigate(`/dashboard/policy/view/${id}`);
const handleEdit = (id) => navigate(`/dashboard/policy/edit/${id}`);



  const handleRenew = () => navigate("/dashboard/policymanagement/renewal");

  // Delete handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this policy?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/policy/policies/${id}/`);
        setPolicies((prev) => prev.filter((p) => p.id !== id));
      } catch (err) {
        setError("Failed to delete policy.");
        console.error(err);
      }
    }
  };

  // Currency formatter with safe fallback
  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return "-";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Manage Policy</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-sm p-6 border-l-4"
            style={{ borderColor: stat.color.replace("bg-", "#") }}
          >
            <p className="text-sm font-medium text-gray-600">{stat.title}</p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center space-x-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              >
                <option value="">All</option>
                <option value="Active">Active</option>
                <option value="Expired">Expired</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Pending">Pending</option>
                <option value="Due for Renewal">Due for Renewal</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Policy Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              >
                <option value="">All</option>
                <option value="Health">Health</option>
                <option value="Life">Life</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Travel">Travel</option>
                <option value="Property">Property</option>
                <option value="Business">Business</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search policies..."
            className="p-2 border border-gray-300 rounded w-full max-w-xs"
          />
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Policy No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Holder
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Sum Assured
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Expiry Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr key="loading">
                  <td colSpan={7} className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              )}

              {error && (
                <tr key="error">
                  <td colSpan={7} className="text-center py-4 text-red-500">
                    {error}
                  </td>
                </tr>
              )}

              {!loading && paginatedPolicies.map((policy) => (
                <tr key={policy.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {policy.policy_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {policy.policy_holder_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {policy.policy_type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(policy.sum_assured)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        policy.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {policy.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {policy.end_date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleView(policy.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(policy.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleRenew()}
                        className="text-purple-600 hover:text-purple-900"
                      >
                        Renew
                      </button>
                      <button
                        onClick={() => handleDelete(policy.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!loading && paginatedPolicies.length === 0 && (
                <tr key="no-data">
                  <td colSpan={7} className="text-center py-4">
                    No policies found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + entriesPerPage, filteredPolicies.length)} of{" "}
            {filteredPolicies.length} entries
          </div>

          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === pageNum
                      ? "bg-blue-600 text-white"
                      : "border-gray-300"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePolicy;
