"use client"
import React from "react";

const StatsCards = ({ stats }) => {
    // The data now comes from the 'stats' prop
    const statsData = [
        { title: "Total Groups", value: stats.total_groups, color: "bg-blue-500" },
        { title: "Family Heads", value: stats.family_heads, color: "bg-green-500" },
        { title: "Total Members", value: stats.total_members, color: "bg-purple-500" },
        { title: "Total Firms", value: stats.total_firms, color: "bg-orange-500" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center">
                        <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                            <span className="text-white font-bold text-xl">{stat.value}</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsCards;
