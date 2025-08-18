import React, { useState, useEffect } from "react";
import axios from "axios";

const InquiryForm = ({ onClose, onSuccess, selectedPolicyId }) => {
  const [policies, setPolicies] = useState([]);
  const [policyId, setPolicyId] = useState(selectedPolicyId || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPolicies();
  }, []);
  
  const fetchPolicies = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get("http://127.0.0.1:8000/api/v1/accounts/my-policies/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("InquiryForm policies", res.data); // <-- add this!
      setPolicies(res.data);
    } catch (err) {
      console.error("Failed to load policies (InquiryForm)", err);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!policyId || !message.trim()) {
      setError("Please select a policy and enter your inquiry.");
      return;
    }
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        "http://127.0.0.1:8000/inquiry/inquiries/",
        { policy_id: policyId, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onSuccess();
      onClose();
    } catch (err) {
      setError("Failed to submit inquiry. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">New Inquiry</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-semibold">Select Policy:</label>
          <select
            value={policyId}
            onChange={(e) => setPolicyId(e.target.value)}
            className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">-- Select a policy --</option>
            {policies.map((p) => (
              <option key={p.id} value={p.id}>
                {p.policy_number} ({p.policy_type})
              </option>
            ))}
          </select>

          <label className="block mb-2 font-semibold">Inquiry Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            required
          ></textarea>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InquiryForm;
