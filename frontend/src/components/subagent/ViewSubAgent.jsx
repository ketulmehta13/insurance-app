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

const ViewSubAgent = () => {
    const { agentId } = useParams();
    const navigate = useNavigate();
    const [agentData, setAgentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAgentDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/agent/sub-agents/${agentId}/`);
                setAgentData(response.data);
            } catch (err) {
                setError("Failed to fetch sub-agent details.");
            } finally {
                setLoading(false);
            }
        };
        fetchAgentDetails();
    }, [agentId]);

    if (loading) return <div className="p-6 text-center">Loading...</div>;
    if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
    if (!agentData) return null;

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md border">
                <div className="px-4 py-5 sm:px-6 border-b">
                    <h3 className="text-lg font-medium text-gray-900">Sub-Agent Details</h3>
                </div>
                <div className="px-4 py-5 sm:p-6">
                    <dl className="divide-y divide-gray-200">
                        {Object.entries(agentData).map(([key, value]) => (
                             <DetailItem key={key} label={key.replace(/_/g, ' ')} value={value} />
                        ))}
                    </dl>
                </div>
                 <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button onClick={() => navigate('/dashboard')} className="px-4 py-2 bg-gray-600 text-white rounded-md">
                        Back to List
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewSubAgent;
