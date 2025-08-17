"use client"
import React, { useState, useEffect } from "react";
import axios from 'axios';
import StatsCards from "./StatsCard";
import Calendar from "./Calender";
import Charts from "./Charts";

const DashboardHome = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/dashboard/stats/");
                setDashboardData(response.data);
            } catch (err) {
                setError("Failed to load dashboard data.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    if (loading) {
        return <div className="p-6 text-center">Loading Dashboard...</div>;
    }
    if (error) {
        return <div className="p-6 text-center text-red-500">{error}</div>;
    }
    if (!dashboardData) {
        return <div className="p-6 text-center">No data available.</div>;
    }

    return (
        <div className="space-y-6 p-4 md:p-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            
            {/* Pass the fetched stats data to the StatsCards component */}
            <StatsCards stats={dashboardData.stats_cards} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    {/* Pass the fetched calendar events to the Calendar component */}
                    <Calendar events={dashboardData.calendar_events} />
                </div>
                <div className="lg:col-span-2">
                    {/* Pass the fetched chart data to the Charts component */}
                    <Charts chartData={dashboardData.charts} />
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
