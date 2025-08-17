"use client"
import React, { useState, useEffect } from "react";
import axios from 'axios';

const TrashManagement = () => {
    const [deletedClients, setDeletedClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchDeletedClients = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://127.0.0.1:8000/client/trash/");
            setDeletedClients(response.data);
        } catch (err) {
            setError("Failed to fetch deleted records.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDeletedClients();
    }, []);

    const handleRestore = async (id, type) => {
        if (window.confirm("Are you sure you want to restore this record?")) {
            try {
                await axios.post("http://127.0.0.1:8000/client/trash/", { id, type });
                // Refresh the list after restoring
                setDeletedClients(prev => prev.filter(c => !(c.id === id && c.type === type)));
            } catch (err) {
                alert("Failed to restore record.");
            }
        }
    };

    const handlePermanentDelete = async (id, type) => {
        if (window.confirm("PERMANENTLY DELETE this record? This action cannot be undone.")) {
            try {
                await axios.delete("http://127.0.0.1:8000/client/trash/", { data: { id, type } });
                // Refresh the list
                setDeletedClients(prev => prev.filter(c => !(c.id === id && c.type === type)));
            } catch (err) {
                alert("Failed to permanently delete record.");
            }
        }
    };

    const filteredClients = deletedClients.filter((client) =>
        Object.values(client).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const totalPages = Math.ceil(filteredClients.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const paginatedClients = filteredClients.slice(startIndex, startIndex + entriesPerPage);

    if (loading) return <div className="p-6 text-center">Loading trash...</div>;
    if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

    return (
        <div className="space-y-6 p-4 md:p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Trash Management</h1>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                {/* Search and Controls */}
                <div className="flex items-center justify-end mb-6">
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md" placeholder="Search trash..." />
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-red-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deleted Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedClients.map((client) => (
                                <tr key={`${client.type}-${client.id}`} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">{client.id}</td>
                                    <td className="px-6 py-4">{client.type}</td>
                                    <td className="px-6 py-4 font-medium">{client.full_name}</td>
                                    <td className="px-6 py-4">{new Date(client.deleted_date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-2">
                                            <button onClick={() => handleRestore(client.id, client.type)} className="text-green-600 hover:text-green-900">Restore</button>
                                            <button onClick={() => handlePermanentDelete(client.id, client.type)} className="text-red-600 hover:text-red-900">Delete Forever</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination and other controls can be added here */}
            </div>
        </div>
    );
};

export default TrashManagement;
