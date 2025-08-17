"use client"
import React, { useState, useEffect } from "react";
import axios from 'axios';

const InsuranceManagement = () => {
    const [activeTab, setActiveTab] = useState("products");
    const [products, setProducts] = useState([]);
    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch both products and claims in parallel
                const [productsResponse, claimsResponse] = await Promise.all([
                    axios.get("http://127.0.0.1:8000/insurance_app/products/"),
                    axios.get("http://127.0.0.1:8000/insurance_app/claims/")
                ]);
                setProducts(productsResponse.data);
                setClaims(claimsResponse.data);
            } catch (err) {
                setError("Failed to load insurance data.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const stats = [
        { title: "Total Products", value: products.length },
        { title: "Active Claims", value: claims.filter(c => c.status !== 'Approved' && c.status !== 'Rejected').length },
        { title: "Premium Collected", value: "₹45.2L" }, // This would typically come from another API endpoint
        { title: "Settlement Ratio", value: "94.5%" },  // This would also be calculated/fetched
    ];
    
    const tabs = [
        { id: "products", label: "Insurance Products", count: products.length },
        { id: "claims", label: "Claims Management", count: claims.length },
        { id: "premiums", label: "Premium Management" },
        { id: "reports", label: "Reports & Analytics" },
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Insurance Management</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                {stats.map(stat => (
                    <div key={stat.title} className="bg-white rounded-lg shadow-sm border p-6">
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border">
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6">
                        {tabs.map((tab) => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                                {tab.label}
                                {tab.count && <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">{tab.count}</span>}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-6">
                    {loading && <p>Loading data...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    
                    {!loading && !error && activeTab === "products" && (
                        <div>
                            {/* Products Table */}
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Active Policies</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {products.map((product) => (
                                        <tr key={product.id}>
                                            <td className="px-6 py-4 font-medium">{product.name}</td>
                                            <td className="px-6 py-4">{product.policy_type}</td>
                                            <td className="px-6 py-4">{product.active_policies}</td>
                                            <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${product.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{product.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {!loading && !error && activeTab === "claims" && (
                         <div>
                            {/* Claims Table */}
                             <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Claim ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Policy No</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Claimant</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {claims.map((claim) => (
                                        <tr key={claim.id}>
                                            <td className="px-6 py-4 font-medium">{claim.claim_id}</td>
                                            <td className="px-6 py-4">{claim.policy_number}</td>
                                            <td className="px-6 py-4">{claim.claimant_name}</td>
                                            <td className="px-6 py-4">₹{claim.claim_amount}</td>
                                            <td className="px-6 py-4">{claim.date_of_claim}</td>
                                            <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${claim.status === "Approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>{claim.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default InsuranceManagement;
