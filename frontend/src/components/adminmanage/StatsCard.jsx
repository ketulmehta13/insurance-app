"use client"
import React from "react";
import { Users, User, Building, UserCheck, TrendingUp, ArrowUpRight, Briefcase, UsersRound } from "lucide-react";

const StatsCards = ({ stats }) => {
    // Enhanced stats data with better styling
    const statsData = [
        { 
            title: "Total Groups", 
            value: stats?.total_groups || 0, 
            color: "bg-gradient-to-br from-blue-500 to-blue-600",
            lightBg: "bg-blue-50 dark:bg-blue-900/20",
            textColor: "text-blue-600 dark:text-blue-400",
            icon: UsersRound,
            subtitle: "Family groups"
        },
        { 
            title: "Family Heads", 
            value: stats?.family_heads || 0, 
            color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
            lightBg: "bg-emerald-50 dark:bg-emerald-900/20",
            textColor: "text-emerald-600 dark:text-emerald-400",
            icon: UserCheck,
            subtitle: "Primary members"
        },
        { 
            title: "Total Members", 
            value: stats?.total_members || 0, 
            color: "bg-gradient-to-br from-violet-500 to-violet-600",
            lightBg: "bg-violet-50 dark:bg-violet-900/20",
            textColor: "text-violet-600 dark:text-violet-400",
            icon: User,
            subtitle: "Family members"
        },
        { 
            title: "Total Firms", 
            value: stats?.total_firms || 0, 
            color: "bg-gradient-to-br from-amber-500 to-amber-600",
            lightBg: "bg-amber-50 dark:bg-amber-900/20",
            textColor: "text-amber-600 dark:text-amber-400",
            icon: Building,
            subtitle: "Business entities"
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, index) => {
                const IconComponent = stat.icon;
                
                return (
                    <div
                        key={index}
                        className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden"
                    >
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                            <div className={`w-full h-full rounded-full ${stat.color}`}></div>
                        </div>
                        
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4 relative z-10">
                            <div className={`w-12 h-12 ${stat.lightBg} rounded-xl flex items-center justify-center`}>
                                <IconComponent className={`w-6 h-6 ${stat.textColor}`} />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                            <div className="mb-2">
                                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                                    {stat.title}
                                </div>
                            </div>
                            
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                                {stat.subtitle}
                            </div>
                        </div>

                        {/* Progress indicator */}
                        <div className="mt-4 relative z-10">
                            <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                                <div 
                                    className={`h-2 rounded-full ${stat.color} transition-all duration-1000 ease-out`}
                                    style={{width: `${Math.min((stat.value / 10) * 100, 100)}%`}}
                                ></div>
                            </div>
                        </div>

                        {/* Hover effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    </div>
                );
            })}
        </div>
    );
};

export default StatsCards;
