import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomerMyInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get("http://127.0.0.1:8000/inquiry/my-inquiries/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInquiries(res.data);
      } catch (err) {
        setError("Failed to load your inquiries.");
      } finally {
        setLoading(false);
      }
    };
    fetchInquiries();
  }, []);

  if (loading) return <p>Loading your inquiries...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (inquiries.length === 0) return <p>No inquiries found.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">My Inquiries</h2>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="px-4 py-2">Policy Number</th>
            <th className="px-4 py-2">Message</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Assigned Agent</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inq) => (
            <tr key={inq.id} className="border-t">
              <td className="px-4 py-2">{inq.policy.policy_number}</td>
              <td className="px-4 py-2">{inq.message}</td>
              <td className="px-4 py-2">{inq.status}</td>
              <td className="px-4 py-2">
                {inq.assigned_subagent
                  ? `${inq.assigned_subagent.first_name} ${inq.assigned_subagent.last_name}`
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerMyInquiries;
