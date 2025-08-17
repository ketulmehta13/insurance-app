"use client"
import React, { useState } from "react";

const Calendar = ({ events = [] }) => { // Default to an empty array
    const [currentDate, setCurrentDate] = useState(new Date());

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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
    
    // Create a set of dates with events for quick lookup
    const eventDates = new Set(events.map(e => e.date));

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <button onClick={() => navigateMonth(-1)} className="p-2 hover:bg-gray-100 rounded-full">◀</button>
                <h3 className="text-lg font-semibold">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
                <button onClick={() => navigateMonth(1)} className="p-2 hover:bg-gray-100 rounded-full">▶</button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-500 mb-2">
                {daysOfWeek.map((day) => <div key={day}>{day}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => {
                    const isToday = day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();
                    const dateString = day ? `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : null;
                    const hasEvent = dateString && eventDates.has(dateString);

                    return (
                        <div key={index} className={`text-center p-2 text-sm rounded transition-colors ${day ? 'cursor-pointer' : ''} ${isToday ? 'bg-blue-600 text-white' : hasEvent ? 'bg-red-100 text-red-800 font-bold' : 'text-gray-700 hover:bg-blue-50'}`}>
                            {day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;
