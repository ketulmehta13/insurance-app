import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DetailItem = ({ label, value }) => (
  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value || '-'}</dd>
  </div>
);

const ViewPolicy = () => {
  // Use the parameter name matching your Router config (id OR policyId)
  const { policyId } = useParams(); 
  const navigate = useNavigate();
  const [policyData, setPolicyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolicyDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/policy/policies/${policyId}/`);
        setPolicyData(response.data);
      } catch (err) {
        setError("Failed to fetch policy details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPolicyDetails();
  }, [policyId]); // match param name here

  if (loading) return <div className="p-6 text-center">Loading Policy Details...</div>;
  if (error) return <div className="p-6 text-center text-red-500 bg-red-50 rounded-lg">{error}</div>;
  if (!policyData) return <div className="p-6 text-center">No policy data found.</div>;

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
        <div className="px-4 py-5 sm:px-6 border-b">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Policy Details
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Viewing Policy: <span className="font-semibold">{policyData.policy_number}</span>
          </p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <dl className="divide-y divide-gray-200">
            {Object.entries(policyData).map(([key, value]) => {
              if (key === 'id' || key === 'content_type' || key === 'object_id' || key === 'policy_document') return null;
              return (
                <DetailItem 
                  key={key} 
                  label={key.replace(/\_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} 
                  value={value} 
                />
              );
            })}
             {policyData.policy_document && (
                <DetailItem 
                  label="Policy Document" 
                  value={<a href={policyData.policy_document} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Document</a>} 
                />
              )}
          </dl>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            onClick={() => navigate('/dashboard/policymanagement/managepolicy')}
            className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700"
          >
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPolicy;
