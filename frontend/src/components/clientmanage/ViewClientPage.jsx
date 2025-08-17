"use client"
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DetailItem = ({ label, value }) => (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value || '-'}</dd>
    </div>
);

const ViewClient = () => {
    const { clientType, clientId } = useParams();
    const navigate = useNavigate();
    const [clientData, setClientData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClientDetails = async () => {
            try {
                const decodedClientType = decodeURIComponent(clientType);
                const response = await axios.get(`http://127.0.0.1:8000/client/client-detail/${decodedClientType}/${clientId}/`);
                setClientData(response.data);
            } catch (err) {
                setError("Failed to fetch client details.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchClientDetails();
    }, [clientType, clientId]);

    if (loading) return <div className="p-6 text-center">Loading...</div>;
    if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
    if (!clientData) return <div className="p-6 text-center">No client data found.</div>;

    const decodedClientType = decodeURIComponent(clientType);

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
                <div className="px-4 py-5 sm:px-6 border-b">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Client Details - {decodedClientType}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Viewing record for ID: {clientId}
                    </p>
                </div>
                <div className="px-4 py-5 sm:p-6">
                    <dl className="divide-y divide-gray-200">
                        {Object.entries(clientData).map(([key, value]) => (
                            <DetailItem key={key} label={key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} value={value} />
                        ))}
                    </dl>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700"
                    >
                        Back to List
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewClient;
