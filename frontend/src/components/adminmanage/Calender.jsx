// "use client"
// import React, { useState } from "react";

// const Calendar = ({ events = [] }) => { // Default to an empty array
//     const [currentDate, setCurrentDate] = useState(new Date());

//     const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//     const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

//     const getDaysInMonth = (date) => {
//         const year = date.getFullYear();
//         const month = date.getMonth();
//         const firstDay = new Date(year, month, 1);
//         const lastDay = new Date(year, month + 1, 0);
//         const daysInMonth = lastDay.getDate();
//         const startingDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

//         const days = [];
//         for (let i = 0; i < startingDayOfWeek; i++) {
//             days.push(null);
//         }
//         for (let day = 1; day <= daysInMonth; day++) {
//             days.push(day);
//         }
//         return days;
//     };

//     const navigateMonth = (direction) => {
//         const newDate = new Date(currentDate);
//         newDate.setMonth(currentDate.getMonth() + direction);
//         setCurrentDate(newDate);
//     };

//     const days = getDaysInMonth(currentDate);
    
//     // Create a set of dates with events for quick lookup
//     const eventDates = new Set(events.map(e => e.date));

//     return (
//         <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
//             <div className="flex items-center justify-between mb-4">
//                 <button onClick={() => navigateMonth(-1)} className="p-2 hover:bg-gray-100 rounded-full">◀</button>
//                 <h3 className="text-lg font-semibold">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
//                 <button onClick={() => navigateMonth(1)} className="p-2 hover:bg-gray-100 rounded-full">▶</button>
//             </div>
//             <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-500 mb-2">
//                 {daysOfWeek.map((day) => <div key={day}>{day}</div>)}
//             </div>
//             <div className="grid grid-cols-7 gap-1">
//                 {days.map((day, index) => {
//                     const isToday = day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();
//                     const dateString = day ? `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : null;
//                     const hasEvent = dateString && eventDates.has(dateString);

//                     return (
//                         <div key={index} className={`text-center p-2 text-sm rounded transition-colors ${day ? 'cursor-pointer' : ''} ${isToday ? 'bg-blue-600 text-white' : hasEvent ? 'bg-red-100 text-red-800 font-bold' : 'text-gray-700 hover:bg-blue-50'}`}>
//                             {day}
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// export default Calendar;

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Circle } from "lucide-react";

const Calendar = ({ events = [] }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

        const days = [];
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day);
        }
        return days;
    };

    const navigateMonth = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + direction);
        setCurrentDate(newDate);
    };

    const days = getDaysInMonth(currentDate);
    const eventDates = new Set(events.map(e => e.date));
    const getEventsForDate = (dateString) => {
        return events.filter(e => e.date === dateString);
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900/20 p-4">
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={() => navigateMonth(-1)}
                        className="p-2 hover:bg-white/80 dark:hover:bg-slate-700/80 rounded-full transition-colors duration-200 group"
                    >
                        <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                    </button>
                    
                    <div className="flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </h3>
                    </div>
                    
                    <button
                        onClick={() => navigateMonth(1)}
                        className="p-2 hover:bg-white/80 dark:hover:bg-slate-700/80 rounded-full transition-colors duration-200 group"
                    >
                        <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                    </button>
                </div>

                {/* Days of week header */}
                <div className="grid grid-cols-7 gap-1 text-center">
                    {daysOfWeek.map((day) => (
                        <div key={day} className="text-xs font-semibold text-slate-500 dark:text-slate-400 py-2">
                            {day}
                        </div>
                    ))}
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="p-4">
                <div className="grid grid-cols-7 gap-1">
                    {days.map((day, index) => {
                        const isToday = day === new Date().getDate() && 
                                       currentDate.getMonth() === new Date().getMonth() && 
                                       currentDate.getFullYear() === new Date().getFullYear();
                        
                        const dateString = day ? 
                            `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : 
                            null;
                        
                        const hasEvent = dateString && eventDates.has(dateString);
                        const dayEvents = dateString ? getEventsForDate(dateString) : [];

                        return (
                            <div
                                key={`${currentDate.getMonth()}-${index}`}
                                className={`
                                    relative aspect-square flex flex-col items-center justify-center text-sm rounded-lg transition-all duration-200 cursor-pointer
                                    ${day ? 'hover:shadow-sm' : ''}
                                    ${isToday ? 
                                        'bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md font-bold' : 
                                        hasEvent ? 
                                            'bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 text-red-800 dark:text-red-300 font-semibold border-2 border-red-200 dark:border-red-800' : 
                                            'text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700/50'
                                    }
                                `}
                                title={hasEvent ? `${dayEvents.length} event${dayEvents.length > 1 ? 's' : ''}` : ''}
                            >
                                {day && (
                                    <>
                                        <span className="relative z-10">{day}</span>
                                        {hasEvent && !isToday && (
                                            <div className="absolute bottom-1 flex gap-0.5">
                                                {dayEvents.slice(0, 3).map((_, i) => (
                                                    <Circle
                                                        key={i}
                                                        className="w-1.5 h-1.5 fill-current text-red-500 dark:text-red-400"
                                                    />
                                                ))}
                                                {dayEvents.length > 3 && (
                                                    <span className="text-xs">+</span>
                                                )}
                                            </div>
                                        )}
                                        {isToday && (
                                            <div className="absolute bottom-1">
                                                <Circle className="w-1.5 h-1.5 fill-current text-blue-200" />
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Events Summary */}
                {events.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                <Circle className="w-2 h-2 fill-current text-red-500" />
                                <span>Events this month: {events.filter(e => {
                                    const eventDate = new Date(e.date);
                                    return eventDate.getMonth() === currentDate.getMonth() && 
                                           eventDate.getFullYear() === currentDate.getFullYear();
                                }).length}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                <Circle className="w-2 h-2 fill-current text-blue-600" />
                                <span>Today</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Calendar;
