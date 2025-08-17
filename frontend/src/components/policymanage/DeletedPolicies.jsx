"use client"
import React, { useState, useEffect } from "react";
import axios from 'axios';

const DeletedPolicies = () => {
    const [deletedPolicies, setDeletedPolicies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchDeletedPolicies = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://127.0.0.1:8000/policy/policies/deleted/");
            setDeletedPolicies(response.data);
        } catch (err) {
            setError("Failed to fetch deleted policies.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDeletedPolicies();
    }, []);

    const handleRestore = async (id) => {
        if (window.confirm("Are you sure you want to restore this policy?")) {
            try {
                await axios.post("http://127.0.0.1:8000/policy/policies/deleted/", { id });
                setDeletedPolicies(prev => prev.filter(p => p.id !== id));
            } catch (err) {
                alert("Failed to restore policy.");
            }
        }
    };

    const handlePermanentDelete = async (id) => {
        if (window.confirm("PERMANENTLY DELETE this policy? This action cannot be undone.")) {
            try {
                await axios.delete("http://127.0.0.1:8000/policy/policies/deleted/", { data: { id } });
                setDeletedPolicies(prev => prev.filter(p => p.id !== id));
            } catch (err) {
                alert("Failed to permanently delete policy.");
            }
        }
    };
    
    const filteredPolicies = deletedPolicies.filter((policy) =>
        Object.values(policy).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const totalPages = Math.ceil(filteredPolicies.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const paginatedPolicies = filteredPolicies.slice(startIndex, startIndex + entriesPerPage);

    const formatCurrency = (amount) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Deleted Policies (Trash)</h1>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex justify-end mb-4">
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md" placeholder="Search trash..."/>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-red-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Policy No</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Holder</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deleted Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading && <tr><td colSpan="5" className="text-center py-4">Loading...</td></tr>}
                            {error && <tr><td colSpan="5" className="text-center py-4 text-red-500">{error}</td></tr>}
                            {!loading && paginatedPolicies.map((policy) => (
                                <tr key={policy.id}>
                                    <td className="px-6 py-4">{policy.policy_number}</td>
                                    <td className="px-6 py-4">{policy.policy_holder_name}</td>
                                    <td className="px-6 py-4">{policy.policy_type}</td>
                                    <td className="px-6 py-4">{new Date(policy.deleted_at).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-4">
                                            <button onClick={() => handleRestore(policy.id)} className="text-green-600 hover:text-green-900">Restore</button>
                                            <button onClick={() => handlePermanentDelete(policy.id)} className="text-red-600 hover:text-red-900">Delete Forever</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DeletedPolicies;
