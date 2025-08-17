"use client"
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const ManageSubAgents = () => {
    const navigate = useNavigate();
    const [subAgents, setSubAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterStatus, setFilterStatus] = useState("");
    const [filterSpecialization, setFilterSpecialization] = useState("");

    useEffect(() => {
        const fetchSubAgents = async () => {
            try {
                setLoading(true);
                const params = new URLSearchParams();
                if (filterStatus) params.append('status', filterStatus);
                if (filterSpecialization) params.append('specialization', filterSpecialization);

                const response = await axios.get("http://127.0.0.1:8000/agent/sub-agents/", { params });
                setSubAgents(response.data);
            } catch (err) {
                setError("Failed to fetch sub-agent data.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchSubAgents();
    }, [filterStatus, filterSpecialization]);

    const filteredAgents = subAgents.filter((agent) =>
        `${agent.first_name} ${agent.last_name} ${agent.agent_code} ${agent.email}`
        .toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredAgents.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const paginatedAgents = filteredAgents.slice(startIndex, startIndex + entriesPerPage);

    const handleView = (id) => navigate(`/dashboard/subagent/view/${id}`);
    const handleEdit = (id) => navigate(`/dashboard/subagent/edit/${id}`);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this sub-agent?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/agent/sub-agents/${id}/`);
                setSubAgents(prev => prev.filter(agent => agent.id !== id));
            } catch (err) {
                setError("Failed to delete sub-agent.");
            }
        }
    };
    
    const formatCurrency = (amount) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Manage Sub Agents</h1>
            
            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 mb-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Status</label>
                            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 rounded-md">
                                <option value="">All</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Suspended">Suspended</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Specialization</label>
                             <select value={filterSpecialization} onChange={(e) => setFilterSpecialization(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 rounded-md">
                                <option value="">All</option>
                                <option value="Life Insurance">Life Insurance</option>
                                <option value="Health Insurance">Health Insurance</option>
                                <option value="Motor Insurance">Motor Insurance</option>
                            </select>
                        </div>
                    </div>
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md" placeholder="Search by name, code, email..."/>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Agent Code</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Specialization</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading && <tr><td colSpan="6" className="text-center py-4">Loading agents...</td></tr>}
                            {error && <tr><td colSpan="6" className="text-center py-4 text-red-500">{error}</td></tr>}
                            {!loading && paginatedAgents.map((agent) => (
                                <tr key={agent.id}>
                                    <td className="px-6 py-4 text-sm font-medium text-blue-600">{agent.agent_code}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{`${agent.first_name} ${agent.last_name}`}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{agent.mobile_no}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{agent.specialization}</td>
                                    <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${agent.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{agent.status}</span></td>
                                    <td className="px-6 py-4 text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button onClick={() => handleView(agent.id)} className="text-blue-600 hover:text-blue-900">View</button>
                                            <button onClick={() => handleEdit(agent.id)} className="text-green-600 hover:text-green-900">Edit</button>
                                            <button onClick={() => handleDelete(agent.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 {/* Pagination would go here */}
            </div>
        </div>
    );
};

export default ManageSubAgents;
