import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AgentAssignedInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get("http://127.0.0.1:8000/inquiry/agent-inquiries/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInquiries(res.data);
      } catch (err) {
        setError("Failed to load assigned inquiries.");
      } finally {
        setLoading(false);
      }
    };
    fetchInquiries();
  }, []);

  if (loading) return <p>Loading assigned inquiries...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (inquiries.length === 0) return <p>No assigned inquiries found.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Assigned Inquiries</h2>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 cursor-pointer">Customer</th>
            <th className="px-4 py-2 cursor-pointer">Policy</th>
            <th className="px-4 py-2 cursor-pointer">Message</th>
            <th className="px-4 py-2 cursor-pointer">Status</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inq) => (
            <tr
              key={inq.id}
              className="border-t hover:bg-indigo-100 cursor-pointer"
              onClick={() => navigate(`/agent/inquiries/${inq.id}`)}
            >
              <td className="px-4 py-2">{inq.customer.full_name}</td>
              <td className="px-4 py-2">{inq.policy.policy_number}</td>
              <td className="px-4 py-2">{inq.message}</td>
              <td className="px-4 py-2">{inq.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgentAssignedInquiries;
