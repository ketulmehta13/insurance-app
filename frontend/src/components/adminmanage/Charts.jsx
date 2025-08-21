// "use client"
// import React from "react";

// const Charts = ({ chartData }) => {
//     // The data now comes from the 'chartData' prop
//     const charts = [
//         { title: "Client Registration", data: chartData.client_registration, color: "bg-indigo-500" },
//         { title: "Policy Entry", data: chartData.policy_entry, color: "bg-indigo-500" },
//         { title: "Documents Upload", data: chartData.documents_upload, color: "bg-indigo-500" },
//     ];
  
//     return (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {charts.map((chart, index) => (
//                 <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
//                     <h3 className="text-lg font-semibold text-gray-900 mb-4">{chart.title}</h3>
//                     <div className="relative h-32 w-full flex justify-center items-end">
//                          <div className="text-2xl font-bold text-gray-900 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//                             {chart.data.used}
//                          </div>
//                          <div className="w-16 h-full bg-gray-200 rounded-t-lg overflow-hidden">
//                              <div 
//                                 className={`${chart.color} w-full`}
//                                 style={{ height: `${(chart.data.used / chart.data.total) * 100}%` }}
//                                 title={`${chart.data.used} / ${chart.data.total}`}
//                              ></div>
//                          </div>
//                     </div>
//                     <p className="text-center text-sm text-gray-500 mt-2">
//                         {chart.data.used} / {chart.data.total}
//                     </p>
//                 </div>
//             ))}
//         </div>
//     );
// };
  
// export default Charts;

import React from "react";
import { Users, FileText, Upload, Info, TrendingUp } from "lucide-react";

const Charts = ({ chartData }) => {
    const charts = [
        { 
            title: "Client Registration", 
            data: chartData.client_registration, 
            color: "from-blue-500 to-indigo-600",
            bgColor: "bg-blue-100 dark:bg-blue-900/20",
            icon: Users,
            description: "New client registrations"
        },
        { 
            title: "Policy Entry", 
            data: chartData.policy_entry, 
            color: "from-green-500 to-emerald-600",
            bgColor: "bg-green-100 dark:bg-green-900/20", 
            icon: FileText,
            description: "Policy entries completed"
        },
        { 
            title: "Documents Upload", 
            data: chartData.documents_upload, 
            color: "from-purple-500 to-violet-600",
            bgColor: "bg-purple-100 dark:bg-purple-900/20",
            icon: Upload,
            description: "Documents uploaded"
        },
    ];

    const getPercentage = (used, total) => {
        return total > 0 ? (used / total) * 100 : 0;
    };

    const getStatusColor = (percentage) => {
        if (percentage >= 80) return "text-red-500 dark:text-red-400";
        if (percentage >= 60) return "text-yellow-500 dark:text-yellow-400";
        return "text-green-500 dark:text-green-400";
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {charts.map((chart, index) => {
                const IconComponent = chart.icon;
                const percentage = getPercentage(chart.data.used, chart.data.total);
                const statusColor = getStatusColor(percentage);

                return (
                    <div
                        key={index}
                        className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 ${chart.bgColor} rounded-xl flex items-center justify-center`}>
                                    <IconComponent className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                        {chart.title}
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {chart.description}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                                <Info size={12} />
                                <span>{Math.round(percentage)}%</span>
                            </div>
                        </div>

                        {/* Chart Area */}
                        <div className="relative">
                            {/* Progress Value Display */}
                            <div className="text-center mb-4">
                                <div className="inline-flex items-baseline gap-1">
                                    <span className="text-3xl font-bold text-slate-900 dark:text-white">
                                        {chart.data.used}
                                    </span>
                                    <span className="text-lg text-slate-500 dark:text-slate-400">
                                        / {chart.data.total}
                                    </span>
                                </div>
                                <div className={`text-sm font-medium ${statusColor} mt-1`}>
                                    {Math.round(percentage)}% utilized
                                </div>
                            </div>

                            {/* Chart Visualization */}
                            <div className="relative h-32 w-full flex justify-center items-end">
                                {/* Background Bar */}
                                <div className="relative w-16 h-full bg-slate-100 dark:bg-slate-700 rounded-t-xl overflow-hidden shadow-inner">
                                    {/* Animated Progress Bar */}
                                    <div 
                                        className={`absolute bottom-0 left-0 w-full bg-gradient-to-t ${chart.color} rounded-t-xl shadow-lg transition-all duration-1000 ease-out`}
                                        style={{height: `${percentage}%`}}
                                    >
                                        {/* Shimmer Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                                    </div>
                                    
                                    {/* Grid Lines */}
                                    <div className="absolute inset-0 flex flex-col justify-between py-1">
                                        {[...Array(4)].map((_, i) => (
                                            <div 
                                                key={i} 
                                                className="w-full h-px bg-slate-200 dark:bg-slate-600 opacity-30"
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Floating Tooltip */}
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 dark:bg-slate-700 text-white px-2 py-1 rounded-md text-xs whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span>{chart.data.used} / {chart.data.total}</span>
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-slate-900 dark:border-t-slate-700"></div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Stats */}
                        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                            <div className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                                    <TrendingUp size={14} />
                                    <span>Progress</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                                    <span className="text-slate-500 dark:text-slate-400 text-xs">
                                        {chart.data.total - chart.data.used} remaining
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Charts;
