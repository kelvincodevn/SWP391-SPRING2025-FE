import React, { useState, useEffect } from 'react';
import { FiClipboard, FiFolder, FiCalendar } from "react-icons/fi";

const UserOverview = () => {
    const [stats, setStats] = useState({
        testsCompleted: 15,
        surveysCompleted: 30,
        programsEnrolled: 5,
        counselingSessionsBooked: 2,
    });

    useEffect(() => {
        // Replace with your actual API calls to fetch user-specific stats
        // Example:
        // api.get('/user/stats').then(response => setStats(response.data));
    }, []);

    const StatCard = ({ icon: Icon, title, value, color }) => (
        <div className={`bg-white p-6 rounded-lg shadow-md ${color} transition-transform hover:scale-105`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm">{title}</p>
                    <p className="text-2xl font-bold mt-2">{value}</p>
                </div>
                <Icon className="text-3xl text-gray-400" />
            </div>
        </div>
    );

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-8">Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard icon={FiClipboard} title="Tests Completed" value={stats.testsCompleted} color="border-l-4 border-green-500" />
                <StatCard icon={FiClipboard} title="Surveys Completed" value={stats.surveysCompleted} color="border-l-4 border-yellow-500" />
                <StatCard icon={FiFolder} title="Programs Enrolled" value={stats.programsEnrolled} color="border-l-4 border-purple-500" />
                <StatCard icon={FiCalendar} title="Counseling Sessions Booked" value={stats.counselingSessionsBooked} color="border-l-4 border-indigo-500" />
            </div>
        </div>
    );
};

export default UserOverview;