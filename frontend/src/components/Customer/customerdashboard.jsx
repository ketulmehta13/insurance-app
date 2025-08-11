import React from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";

const Dashboard = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    userType: "customer",
    joinDate: "2024-01-15",
  };

  const policies = [
    {
      id: 1,
      type: "Health Insurance",
      provider: "HealthCare Plus",
      premium: "$250/month",
      status: "Active",
      expiryDate: "2024-12-31",
    },
    {
      id: 2,
      type: "Vehicle Insurance",
      provider: "AutoSecure",
      premium: "$180/month",
      status: "Active",
      expiryDate: "2024-08-15",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Policy renewed",
      description: "Health Insurance policy renewed for another year",
      date: "2024-01-10",
      type: "renewal",
    },
    {
      id: 2,
      action: "Claim submitted",
      description: "Vehicle insurance claim for minor accident",
      date: "2024-01-05",
      type: "claim",
    },
    {
      id: 3,
      action: "Quote requested",
      description: "Life insurance quote comparison",
      date: "2023-12-28",
      type: "quote",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user.name}!
              </h1>
              <p className="text-indigo-100">
                Manage your insurance policies and explore new coverage options
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <User className="w-16 h-16 text-white/80" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md text-center border border-indigo-100">
            <div className="text-indigo-600 text-3xl font-bold">
              {policies.length}
            </div>
            <div className="text-sm text-gray-500">Active Policies</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center border border-green-100">
            <div className="text-green-600 text-3xl font-bold">$430</div>
            <div className="text-sm text-gray-500">Monthly Premium</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center border border-orange-100">
            <div className="text-orange-600 text-3xl font-bold">2</div>
            <div className="text-sm text-gray-500">Claims Filed</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center border border-purple-100">
            <div className="text-purple-600 text-3xl font-bold">$1,240</div>
            <div className="text-sm text-gray-500">Savings This Year</div>
          </div>
        </div>

        {/* Policy Summary */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Your Policies
            </h2>
            <Link
              to="/policies/new"
              className="text-sm font-medium bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              + Add Policy
            </Link>
          </div>
          <div className="space-y-4">
            {policies.map((policy) => (
              <div
                key={policy.id}
                className="p-4 rounded-lg border border-gray-200 bg-blue-50 hover:shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {policy.type}
                    </h3>
                    <p className="text-sm text-gray-600">{policy.provider}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-indigo-600">
                      {policy.premium}
                    </p>
                    <span
                      className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${
                        policy.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {policy.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <div className="divide-y divide-gray-100">
            {recentActivity.map((item) => (
              <div key={item.id} className="py-4 flex items-start space-x-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    item.type === "renewal"
                      ? "bg-green-100 text-green-600"
                      : item.type === "claim"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {item.type === "renewal"
                    ? "✓"
                    : item.type === "claim"
                    ? "!"
                    : "?"}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{item.action}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
