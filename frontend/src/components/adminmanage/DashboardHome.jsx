// "use client"
// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import StatsCards from "./StatsCard";
// import Calendar from "./Calender";
// import Charts from "./Charts";

// const DashboardHome = () => {
//     const [dashboardData, setDashboardData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchDashboardData = async () => {
//             try {
//                 const response = await axios.get("http://127.0.0.1:8000/dashboard/stats/");
//                 setDashboardData(response.data);
//             } catch (err) {
//                 setError("Failed to load dashboard data.");
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchDashboardData();
//     }, []);

//     if (loading) {
//         return <div className="p-6 text-center">Loading Dashboard...</div>;
//     }
//     if (error) {
//         return <div className="p-6 text-center text-red-500">{error}</div>;
//     }
//     if (!dashboardData) {
//         return <div className="p-6 text-center">No data available.</div>;
//     }

//     return (
//         <div className="space-y-6 p-4 md:p-6">
//             <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

//             {/* Pass the fetched stats data to the StatsCards component */}
//             <StatsCards stats={dashboardData.stats_cards} />

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 <div className="lg:col-span-1">
//                     {/* Pass the fetched calendar events to the Calendar component */}
//                     <Calendar events={dashboardData.calendar_events} />
//                 </div>
//                 <div className="lg:col-span-2">
//                     {/* Pass the fetched chart data to the Charts component */}
//                     <Charts chartData={dashboardData.charts} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DashboardHome;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Loader2,
  AlertCircle,
  BarChart3,
  Calendar as CalendarIcon,
  TrendingUp,
  RefreshCw,
  Plus,
  FileText
} from "lucide-react";

import StatsCards from "./StatsCard";
import Calendar from "./Calender";
import Charts from "./Charts";

const DashboardHome = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchDashboardData = async () => {
    try {
      setError(null);
      const response = await axios.get(
        "http://127.0.0.1:8000/dashboard/stats/"
      );

      console.log("API Response:", response.data);
      setDashboardData(response.data);
      setLastUpdated(new Date());
    } catch (err) {
      setError("Failed to load dashboard data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    fetchDashboardData();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 p-8">
        <div className="mb-4">
          <Loader2 className="w-12 h-12 text-cyan-600 animate-spin" />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Loading Dashboard
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            Fetching your latest insurance data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 p-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 max-w-md w-full text-center border border-red-200 dark:border-red-800">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Unable to Load Dashboard
          </h3>
          <p className="text-red-600 dark:text-red-400 mb-6">{error}</p>
          <button
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-200 shadow-lg"
          >
            <RefreshCw size={18} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 p-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 max-w-md w-full text-center border border-slate-200 dark:border-slate-700">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-slate-600 dark:text-slate-300" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            No Data Available
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Dashboard data is currently unavailable.
          </p>
          <button
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-600 text-white rounded-xl font-semibold hover:bg-slate-700 transition-all duration-200 shadow-lg"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto space-y-8 p-4 md:p-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-2 text-lg">
              Overview of your insurance management system
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Last updated
              </p>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {lastUpdated.toLocaleTimeString()}
              </p>
            </div>
            <button
              onClick={handleRefresh}
              className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-600 transition-all duration-200 shadow-sm hover:shadow-md group"
              title="Refresh Dashboard"
            >
              <RefreshCw className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:rotate-180 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Stats Cards Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Key Metrics
            </h2>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Real-time statistics
            </div>
          </div>
          <StatsCards stats={dashboardData.stats_cards} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                    <CalendarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                      Upcoming Events
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Policy renewals & expirations
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <Calendar events={dashboardData.calendar_events} />
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Analytics & Reports
                      </h2>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Performance insights
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <Charts chartData={dashboardData.charts} />
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default DashboardHome;
