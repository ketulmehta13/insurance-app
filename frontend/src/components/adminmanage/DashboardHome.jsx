// src/pages/DashboardHome.jsx
import React from "react";
import StatsCards from "../adminmanage/StatsCard";
import Calendar from "../adminmanage/Calender";
import Charts from "../adminmanage/Charts";

const DashboardHome = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          + Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Calendar />
        </div>
        <div className="lg:col-span-2">
          <Charts />
        </div>
      </div>

      <StatsCards />
    </div>
  );
};

export default DashboardHome;
