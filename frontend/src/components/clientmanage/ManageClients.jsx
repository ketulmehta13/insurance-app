"use client"
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from 'axios';

const ManageClients = () => {
    const navigate = useNavigate(); // Initialize the navigate function
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    
    // Fetch data from the backend when the component mounts
    useEffect(() => {
        const fetchClients = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://127.0.0.1:8000/client/manage-clients/");
                setClients(response.data);
                setError(null);
            } catch (err) {
                setError("Failed to fetch client data. Please try again later.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchClients();
    }, []);

    const stats = [
        { title: "Total Groups", value: clients.filter(c => c.client_type === 'Family Head').length, color: "bg-blue-500" },
        { title: "Family Heads", value: clients.filter(c => c.client_type === 'Family Head').length, color: "bg-green-500" },
        { title: "Total Members", value: clients.filter(c => c.client_type === 'Family Member').length, color: "bg-purple-500" },
        { title: "Total Firms", value: clients.filter(c => c.client_type === 'Firm').length, color: "bg-orange-500" },
    ];

    const columns = [
        { key: "id", label: "ID" },
        { key: "client_type", label: "Type" },
        { key: "group_with", label: "Group With" },
        { key: "full_name", label: "Full Name" },
        { key: "relation", label: "Relation/Designation" },
        { key: "gender", label: "Gender" },
        { key: "mobile_no", label: "Mobile No" },
        { key: "email", label: "Email" },
        { key: "client_status", label: "Status" },
        { key: "actions", label: "Actions" },
    ];

    const filteredClients = clients.filter((client) =>
        Object.values(client).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const totalPages = Math.ceil(filteredClients.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const paginatedClients = filteredClients.slice(startIndex, startIndex + entriesPerPage);

    const handleView = (id, client_type) => {
        // CORRECTED: Added '/dashboard' prefix to the URL
        navigate(`/dashboard/client/view/${encodeURIComponent(client_type)}/${id}`);
    };

    const handleEdit = (id, client_type) => {
        // CORRECTED: Added '/dashboard' prefix to the URL
        navigate(`/dashboard/client/edit/${encodeURIComponent(client_type)}/${id}`);
    };

    const handleDelete = async (id, client_type) => {
        if (window.confirm(`Are you sure you want to delete this ${client_type}?`)) {
            try {
                await axios.delete("http://127.0.0.1:8000/client/manage-clients/", {
                    data: { id, client_type } // Send payload in the 'data' property for DELETE requests
                });
                // Refresh the list by filtering out the deleted client
                setClients(prevClients => prevClients.filter(c => !(c.id === id && c.client_type === client_type)));
            } catch (err) {
                setError("Failed to delete client. Please try again.");
                console.error(err);
            }
        }
    };

    if (loading) return <div className="p-6 text-center text-gray-600">Loading client data...</div>;
    if (error) return <div className="p-6 text-center text-red-600 bg-red-50 rounded-lg">{error}</div>;

    return (
        <div className="space-y-6 p-4 md:p-6">
            <h1 className="text-2xl font-bold text-gray-900">Manage Clients</h1>
            
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm p-6 border-l-4" style={{ borderColor: stat.color.replace('bg-', '#') }}>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Search and Controls */}
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-2">
                        <label className="text-sm font-medium text-gray-700">Show</label>
                        <select
                            value={entriesPerPage}
                            onChange={(e) => { setEntriesPerPage(Number(e.target.value)); setCurrentPage(1); }}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                        <span className="text-sm text-gray-600">entries</span>
                    </div>
                    <div className="w-full md:w-auto">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Search clients..."
                        />
                    </div>
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto mt-4">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {columns.map((column) => (
                                    <th key={column.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {column.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedClients.map((client) => (
                                <tr key={`${client.client_type}-${client.id}`} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.client_type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.group_with}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.full_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.relation}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.gender}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.mobile_no}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${client.client_status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                            {client.client_status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button onClick={() => handleView(client.id, client.client_type)} className="text-blue-600 hover:text-blue-900">View</button>
                                            <button onClick={() => handleEdit(client.id, client.client_type)} className="text-green-600 hover:text-green-900">Edit</button>
                                            <button onClick={() => handleDelete(client.id, client.client_type)} className="text-red-600 hover:text-red-900">Delete</button>
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
                        Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, filteredClients.length)} of {filteredClients.length} entries
                    </div>
                    <div className="flex space-x-1">
                        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50">Prev</button>
                        {[...Array(totalPages).keys()].map(page => (
                            <button key={page + 1} onClick={() => setCurrentPage(page + 1)} className={`px-3 py-1 border rounded-md ${currentPage === page + 1 ? 'bg-blue-600 text-white' : 'border-gray-300'}`}>{page + 1}</button>
                        ))}
                        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageClients;
