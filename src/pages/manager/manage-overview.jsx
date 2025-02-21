import React from 'react';
import { FiUsers, FiClipboard, FiBarChart, FiFolder } from "react-icons/fi"; // Import used icons

const ManageOverview = () => {

    const mockStats = { // Your actual data fetching would go here
        users: 2547,
        tests: 189,
        surveys: 456,
        programs: 34
    };

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
        <div className="p-8"> {/* Added some padding */}
            <h1 className="text-2xl font-bold mb-8">Overview</h1> {/* Added heading */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={FiUsers} title="Total Users" value={mockStats.users} color="border-l-4 border-blue-500" />
                <StatCard icon={FiClipboard} title="Total Tests" value={mockStats.tests} color="border-l-4 border-green-500" />
                <StatCard icon={FiBarChart} title="Total Surveys" value={mockStats.surveys} color="border-l-4 border-yellow-500" />
                <StatCard icon={FiFolder} title="Active Programs" value={mockStats.programs} color="border-l-4 border-purple-500" />
            </div>
        </div>
    );
};

export default ManageOverview;