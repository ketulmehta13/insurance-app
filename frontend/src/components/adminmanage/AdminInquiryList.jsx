import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminInquiryList = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [agents, setAgents] = useState([]);
  const [assigningId, setAssigningId] = useState(null);
  const [selectedAgentId, setSelectedAgentId] = useState("");
  const [filterStatus, setFilterStatus] = useState("Pending");

  useEffect(() => {
    fetchInquiries();
    fetchAgents();
  }, []);

  const fetchInquiries = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get("http://127.0.0.1:8000/inquiry/inquiries/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInquiries(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load inquiries");
      setLoading(false);
    }
  };

  const fetchAgents = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get("http://127.0.0.1:8000/agent/sub-agents/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAgents(res.data);
    } catch {
      setAgents([]);
    }
  };

  const updateInquiry = async (id, updates) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.patch(
        `http://127.0.0.1:8000/inquiry/inquiries/${id}/`,
        updates,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchInquiries();
      setAssigningId(null);
      setSelectedAgentId("");
    } catch {
      alert("Failed to update inquiry");
    }
  };

  const filteredInquiries = inquiries.filter(inq =>
    filterStatus === "All" ? true : inq.status === filterStatus
  );

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Customer Inquiries</h2>
      <div className="flex space-x-3 mb-4">
        {["All", "Pending", "Accepted", "Rejected", "Assigned"].map((status) => (
          <button
            key={status}
            className={`px-3 py-1 rounded ${
              filterStatus === status ? "bg-indigo-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilterStatus(status)}
          >
            {status}
          </button>
        ))}
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : filteredInquiries.length === 0 ? (
        <p>No inquiries found.</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Policy</th>
              <th className="px-4 py-2">Message</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Agent</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInquiries.map((inq) => (
              <tr key={inq.id} className="border-t">
                <td className="px-4 py-2">{inq.customer.full_name}</td>
                <td className="px-4 py-2">
                  {inq.policy.policy_number} ({inq.policy.policy_type})
                </td>
                <td className="px-4 py-2">{inq.message}</td>
                <td className="px-4 py-2">{inq.status}</td>
                <td className="px-4 py-2">
                  {inq.assigned_subagent
                    ? inq.assigned_subagent.first_name +
                      " " +
                      inq.assigned_subagent.last_name
                    : "-"}
                </td>
                <td className="px-4 py-2 space-x-2">
                  {inq.status === "Pending" && (
                    <>
                      <button
                        onClick={() =>
                          updateInquiry(inq.id, { status: "Accepted" })
                        }
                        className="bg-green-600 text-white px-2 py-1 rounded text-sm"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          updateInquiry(inq.id, { status: "Rejected" })
                        }
                        className="bg-red-600 text-white px-2 py-1 rounded text-sm"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {inq.status === "Accepted" && (
                    <>
                      <button
                        className="bg-blue-600 text-white px-2 py-1 rounded text-sm"
                        onClick={() => setAssigningId(inq.id)}
                      >
                        Assign Agent
                      </button>
                      {assigningId === inq.id && (
                        <div className="mt-2">
                          <select
                            className="border rounded px-2 py-1"
                            value={selectedAgentId}
                            onChange={e => setSelectedAgentId(e.target.value)}
                          >
                            <option value="">Select agent</option>
                            {agents.map(agent => (
                              <option key={agent.id} value={agent.id}>
                                {agent.first_name} {agent.last_name}
                              </option>
                            ))}
                          </select>
                          <button
                            className="ml-2 bg-indigo-600 text-white px-2 py-1 rounded text-sm"
                            disabled={!selectedAgentId}
                            onClick={() =>
                              updateInquiry(inq.id, {
                                status: "Assigned",
                                assigned_subagent_id: selectedAgentId,
                              })
                            }
                          >
                            Save
                          </button>
                          <button
                            className="ml-2 px-2 py-1 text-sm"
                            onClick={() => setAssigningId(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </>
                  )}
                  {inq.status === "Assigned" && (
                    <span className="text-green-800 font-semibold">Assigned</span>
                  )}
                  {inq.status === "Rejected" && (
                    <span className="text-red-800 font-semibold">Rejected</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminInquiryList;
