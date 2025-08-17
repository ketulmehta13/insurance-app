"use client"
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditSubAgent = () => {
    const { agentId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");

    // State for new file uploads to distinguish them from existing files
    const [newFiles, setNewFiles] = useState({
        photo: null,
        resume: null,
        license_document: null,
        identity_proof: null,
        address_proof: null,
        bank_passbook: null,
    });

    useEffect(() => {
        const fetchAgentDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/agent/sub-agents/${agentId}/`);
                setFormData(response.data);
            } catch (err) {
                setError("Failed to fetch agent details.");
            } finally {
                setLoading(false);
            }
        };
        fetchAgentDetails();
    }, [agentId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setNewFiles(prev => ({ ...prev, [name]: files[0] || null }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError(null);

        // Use FormData to handle both text fields and potential file uploads
        const submissionData = new FormData();

        // Append all text-based form data
        for (const key in formData) {
            if (formData[key] !== null && !['photo', 'resume', 'license_document', 'identity_proof', 'address_proof', 'bank_passbook'].includes(key)) {
                submissionData.append(key, formData[key]);
            }
        }

        // Append any new files that have been selected
        for (const key in newFiles) {
            if (newFiles[key]) {
                submissionData.append(key, newFiles[key]);
            }
        }

        try {
            await axios.patch(`http://127.0.0.1:8000/agent/sub-agents/${agentId}/`, submissionData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage("Agent updated successfully!");
            setTimeout(() => navigate('/dashboard/subagentmanagement/managesubagents'), 2000);
        } catch (err) {
            setError("Failed to update agent. Please check the form fields.");
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
            <h1 className="text-2xl font-bold mb-6">Edit Sub Agent: {formData.first_name} {formData.last_name}</h1>
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8 border border-gray-200">
                <form onSubmit={handleSubmit} className="space-y-8">
                    
                    {/* Personal Information */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                                <input type="text" name="first_name" value={formData.first_name || ''} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
                                <input type="text" name="middle_name" value={formData.middle_name || ''} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                                <input type="text" name="last_name" value={formData.last_name || ''} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                            </div>
                        </div>
                    </div>

                    {/* Professional Information */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Professional Information</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
                                    <option>Active</option>
                                    <option>Inactive</option>
                                    <option>Suspended</option>
                                </select>
                            </div>
                            
                        </div>
                    </div>

                    {/* Document Uploads */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Update Documents</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Update Photo</label>
                                <input type="file" name="photo" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-gray-50 hover:file:bg-gray-100"/>
                                {formData.photo && <a href={formData.photo} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">View Current Photo</a>}
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Update Resume/CV</label>
                                <input type="file" name="resume" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-gray-50 hover:file:bg-gray-100"/>
                                 {formData.resume && <a href={formData.resume} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">View Current Resume</a>}
                            </div>
                        </div>
                    </div>

                    {message && <p className="text-green-600 bg-green-50 p-3 rounded-md text-center">{message}</p>}
                    {error && <p className="text-red-600 bg-red-50 p-3 rounded-md text-center">{error}</p>}

                    <div className="flex justify-end space-x-4 pt-4 border-t">
                        <button type="button" onClick={() => navigate('/dashboard/subagentmanagement/managesubagents')} className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400">
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditSubAgent;
