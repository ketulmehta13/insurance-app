"use client"
import React from "react";

const Charts = ({ chartData }) => {
    // The data now comes from the 'chartData' prop
    const charts = [
        { title: "Client Registration", data: chartData.client_registration, color: "bg-indigo-500" },
        { title: "Policy Entry", data: chartData.policy_entry, color: "bg-indigo-500" },
        { title: "Documents Upload", data: chartData.documents_upload, color: "bg-indigo-500" },
    ];
  
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {charts.map((chart, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{chart.title}</h3>
                    <div className="relative h-32 w-full flex justify-center items-end">
                         <div className="text-2xl font-bold text-gray-900 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            {chart.data.used}
                         </div>
                         <div className="w-16 h-full bg-gray-200 rounded-t-lg overflow-hidden">
                             <div 
                                className={`${chart.color} w-full`}
                                style={{ height: `${(chart.data.used / chart.data.total) * 100}%` }}
                                title={`${chart.data.used} / ${chart.data.total}`}
                             ></div>
                         </div>
                    </div>
                    <p className="text-center text-sm text-gray-500 mt-2">
                        {chart.data.used} / {chart.data.total}
                    </p>
                </div>
            ))}
        </div>
    );
};
  
export default Charts;
