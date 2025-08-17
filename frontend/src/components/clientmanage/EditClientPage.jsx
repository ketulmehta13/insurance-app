"use client"
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditClient = () => {
    const { clientType, clientId } = useParams();
    const decodedClientType = decodeURIComponent(clientType);
    const navigate = useNavigate();

    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchClientDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/client/client-detail/${decodedClientType}/${clientId}/`);
                setFormData(response.data);
            } catch (err) {
                setError("Failed to fetch client details for editing.");
            } finally {
                setLoading(false);
            }
        };
        fetchClientDetails();
    }, [decodedClientType, clientId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError(null);
        try {
            await axios.patch(`http://127.0.0.1:8000/client/client-detail/${decodedClientType}/${clientId}/`, formData);
            setMessage("Client updated successfully!");
            setTimeout(() => navigate('/dashboard/manageclient'), 2000);
        } catch (err) {
            setError("Failed to update client.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-6 text-center">Loading form...</div>;
    if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
    if (!formData) return null;

    const renderFormFields = () => {
        return Object.keys(formData).map(key => {
            if (key === 'id' || key.includes('_at') || key.includes('_file') || key.includes('_logo')) return null;
            
            return (
                <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </label>
                    <input
                        type="text"
                        name={key}
                        value={formData[key] || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            );
        });
    };

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Edit {decodedClientType}</h1>
                <div className="bg-white rounded-lg shadow-md p-6 md:p-8 border border-gray-200">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {renderFormFields()}
                        
                        {message && <div className="p-4 text-center text-green-800 bg-green-100 rounded-md">{message}</div>}
                        {error && <div className="p-4 text-center text-red-800 bg-red-100 rounded-md">{error}</div>}

                        <div className="flex justify-end space-x-4 pt-4 border-t">
                            <button type="button" onClick={() => navigate("/dashboard")} disabled={loading} className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors disabled:bg-gray-400">
                                Cancel
                            </button>
                            <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400">
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditClient;
