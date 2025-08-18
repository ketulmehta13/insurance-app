import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AgentInquiryDetail = () => {
  const { inquiryId } = useParams();
  const navigate = useNavigate();

  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [status, setStatus] = useState("");
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`http://127.0.0.1:8000/inquiry/agent-inquiries/${inquiryId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInquiry(res.data);
        setStatus(res.data.status);
      } catch (err) {
        setError("Failed to load inquiry details.");
      } finally {
        setLoading(false);
      }
    };

    fetchInquiry();
  }, [inquiryId]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdate = async () => {
    setUpdating(true);
    setUpdateError(null);
    try {
      const token = localStorage.getItem("accessToken");
      await axios.patch(
        `http://127.0.0.1:8000/inquiry/agent-inquiries/${inquiryId}/`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Status updated!");
      navigate("/agent/inquiries");
    } catch (err) {
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.status?.[0] ||
        "Failed to update status.";
      setUpdateError(msg);
    }
    
  };

  if (loading) return <p>Loading inquiry details...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!inquiry) return <p>No inquiry found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Inquiry Detail #{inquiry.id}</h2>
      <p><strong>Customer:</strong> {inquiry.customer.full_name || inquiry.customer.username}</p>
      <p><strong>Policy:</strong> {inquiry.policy.policy_number} ({inquiry.policy.policy_type})</p>
      <p><strong>Message:</strong> {inquiry.message}</p>
      <p><strong>Assigned Agent:</strong> {inquiry.assigned_subagent?.first_name} {inquiry.assigned_subagent?.last_name}</p>

      <div className="mt-6">
        <label htmlFor="status" className="block font-semibold mb-2">Update Status:</label>
        <select
          id="status"
          value={status}
          onChange={handleStatusChange}
          className="border border-gray-300 rounded px-3 py-2 w-full max-w-xs"
          disabled={updating}
        >
          <option value="Pending">Pending</option>
          <option value="Assigned">Assigned</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {updateError && <p className="text-red-600 mt-2">{updateError}</p>}

      <div className="mt-4">
        <button
          onClick={handleUpdate}
          disabled={updating}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          {updating ? "Updating..." : "Update Status"}
        </button>
      </div>
    </div>
  );
};

export default AgentInquiryDetail;
