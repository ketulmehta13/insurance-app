"use client"
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPolicy = () => {
    const { policyId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(null);
    const [newPolicyDocument, setNewPolicyDocument] = useState(null); // State for new file upload
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchPolicyDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/policy/policies/${policyId}/`);
                setFormData(response.data);
            } catch (err) {
                setError("Failed to fetch policy details for editing.");
            } finally {
                setLoading(false);
            }
        };
        fetchPolicyDetails();
    }, [policyId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleFileChange = (e) => {
        setNewPolicyDocument(e.target.files[0] || null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError(null);

        const submissionData = new FormData();

        // Append all form fields EXCEPT the policy_document URL
        Object.entries(formData).forEach(([key, value]) => {
            if (key !== 'policy_holder_name' && key !== 'policy_document') {
                submissionData.append(key, value);
            }
        });

        // If a new document was selected, append it to the form data.
        if (newPolicyDocument) {
            submissionData.append('policy_document', newPolicyDocument);
        }

        try {
            await axios.patch(`http://127.0.0.1:8000/policy/policies/${policyId}/`, submissionData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage("Policy updated successfully!");
            setTimeout(() => navigate('/dashboard/policymanagement/managepolicy'), 2000);
        } catch (err) {
            setError("Failed to update policy.");
            console.error(err.response ? err.response.data : err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-6 text-center">Loading form...</div>;
    if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
    if (!formData) return null;

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Edit Policy: {formData.policy_number}</h1>
                <div className="bg-white rounded-lg shadow-md p-6 md:p-8 border border-gray-200">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Policy Holder</label>
                                <input type="text" value={formData.policy_holder_name} disabled className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"/>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                                    <option value="Active">Active</option>
                                    <option value="Expired">Expired</option>
                                    <option value="Cancelled">Cancelled</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Due for Renewal">Due for Renewal</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Premium Amount</label>
                                <input type="number" name="premium_amount" value={formData.premium_amount} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Sum Assured</label>
                                <input type="number" name="sum_assured" value={formData.sum_assured} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                                <input type="date" name="end_date" value={formData.end_date} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Upload New Policy Document</label>
                                <input type="file" name="policy_document" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                                {formData.policy_document && !newPolicyDocument && (
                                    <p className="text-xs text-gray-500 mt-1">Current: <a href={formData.policy_document} target="_blank" rel="noopener noreferrer" className="text-blue-600">View Document</a></p>
                                )}
                            </div>
                        </div>
                        
                        {message && <div className="p-4 text-center text-green-800 bg-green-100 rounded-md">{message}</div>}
                        {error && <div className="p-4 text-center text-red-800 bg-red-100 rounded-md">{error}</div>}

                        <div className="flex justify-end space-x-4 pt-4 border-t">
                            <button type="button" onClick={() => navigate("/dashboard/policymanagement/managepolicy")} disabled={loading} className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700">
                                Cancel
                            </button>
                            <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPolicy;
