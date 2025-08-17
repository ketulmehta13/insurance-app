"use client"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AddSubAgent = () => {
    const navigate = useNavigate();
    // State uses snake_case and matches the provided Django model
    const [formData, setFormData] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        date_of_birth: "",
        gender: "",
        marital_status: "",
        mobile_no: "",
        email: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        agent_code: "",
        joining_date: "",
        experience: "",
        previous_company: "",
        specialization: "",
        bank_name: "",
        account_number: "",
        photo: null,
        resume: null,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData(prev => ({ ...prev, [name]: files[0] || null }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage("");

        // Use FormData to correctly handle file uploads
        const submissionData = new FormData();
        for (const key in formData) {
            if (formData[key] !== null && formData[key] !== "") {
                submissionData.append(key, formData[key]);
            }
        }

        try {
            await axios.post("http://127.0.0.1:8000/agent/sub-agents/", submissionData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage("Sub-agent registered successfully!");
            setTimeout(() => navigate("/subagent/SubAgentManagement"), 2000);
        } catch (err) {
            setError("Failed to register sub-agent. Please check the form and try again.");
            console.error(err.response ? err.response.data : err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Add Sub Agent</h1>
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8 border border-gray-200">
                <form onSubmit={handleSubmit} className="space-y-8">
                    
                    {/* Personal Information */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                                <input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
                                <input type="text" name="middle_name" value={formData.middle_name} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                                <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                                <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                                <select name="gender" value={formData.gender} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md">
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Marital Status</label>
                                <select name="marital_status" value={formData.marital_status} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                                    <option value="">Select Status</option>
                                    <option value="single">Single</option>
                                    <option value="married">Married</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                                <input type="tel" name="mobile_no" value={formData.mobile_no} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                            </div>
                        </div>
                         <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                            <textarea name="address" value={formData.address} onChange={handleInputChange} rows="3" required className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                                <input type="text" name="city" value={formData.city} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                                <input type="text" name="state" value={formData.state} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
                                <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                            </div>
                        </div>
                    </div>
                    
                    {/* Professional Information */}
                    <div>
                         <h2 className="text-xl font-semibold text-gray-900 mb-6">Professional Information</h2>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Agent Code *</label>
                                <input type="text" name="agent_code" value={formData.agent_code} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Joining Date *</label>
                                <input type="date" name="joining_date" value={formData.joining_date} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Experience (Years)</label>
                                <input type="number" name="experience" value={formData.experience} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                            </div>
                         </div>
                    </div>

                     {/* Document Upload Section */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Document Upload</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Photograph *</label>
                                <input type="file" name="photo" onChange={handleFileChange} required className="w-full text-sm"/>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Resume/CV</label>
                                <input type="file" name="resume" onChange={handleFileChange} className="w-full text-sm"/>
                            </div>
                        </div>
                    </div>


                    {message && <div className="p-4 text-center text-green-800 bg-green-100 rounded-md">{message}</div>}
                    {error && <div className="p-4 text-center text-red-800 bg-red-100 rounded-md">{error}</div>}

                    <div className="flex justify-end space-x-4 pt-4 border-t">
                        <button type="button" onClick={() => navigate("/subagent/ManageSubAgents")} disabled={loading} className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
                            {loading ? 'Registering...' : 'Register Sub Agent'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSubAgent;
