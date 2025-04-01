import React, { useState, useEffect } from 'react';
import { FiClipboard, FiFolder, FiCalendar, FiBarChart } from "react-icons/fi";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getUserStats } from '../../services/api.user';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StudentOverview = () => {
    const [stats, setStats] = useState({
        testsCompleted: 0,
        surveysCompleted: 0,
        programsEnrolled: 0,
        counselingSessionsBooked: 0,
        pendingBookings: 0,
        confirmedBookings: 0,
    });
    const [bookingStatusTrend, setBookingStatusTrend] = useState(null);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchStats = async () => {
            const data = await getUserStats(userId);
            setStats({
                testsCompleted: data.testsCompleted || 0,
                surveysCompleted: data.surveysCompleted || 0,
                programsEnrolled: data.programsEnrolled || 0,
                counselingSessionsBooked: data.counselingSessionsBooked || 0,
                pendingBookings: data.pendingBookings || 0,
                confirmedBookings: data.confirmedBookings || 0,
            });

            const sampleTrendData = data.bookingStatusTrend || [
                { date: '2025-03-10', value: 2 },
                { date: '2025-03-11', value: 3 },
                { date: '2025-03-12', value: 1 },
                { date: '2025-03-13', value: 4 },
            ];
            setBookingStatusTrend(formatChartData(sampleTrendData, 'Booking Status Trend'));
        };
        fetchStats();
    }, [userId]);

    const formatChartData = (data, label = 'Booking Status Trend') => {
        if (!data || data.length === 0) return null;
        const labels = data.map(item => item.date);
        const dataPoints = data.map(item => item.value);
        return {
            labels,
            datasets: [{ label, data: dataPoints, backgroundColor: 'rgba(255, 99, 132, 0.5)' }],
        };
    };

    const StatCard = ({ icon: Icon, title, value, color }) => (
        <div className={`bg-white p-6 rounded-lg shadow-md ${color} hover:scale-105`}>
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
            <h1 className="text-2xl font-bold mb-8">User Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard icon={FiClipboard} title="Tests Completed" value={stats.testsCompleted} color="border-l-4 border-green-500" />
                <StatCard icon={FiClipboard} title="Surveys Completed" value={stats.surveysCompleted} color="border-l-4 border-yellow-500" />
                <StatCard icon={FiFolder} title="Programs Enrolled" value={stats.programsEnrolled} color="border-l-4 border-purple-500" />
                <StatCard icon={FiCalendar} title="Counseling Sessions Booked" value={stats.counselingSessionsBooked} color="border-l-4 border-indigo-500" />
                <StatCard icon={FiCalendar} title="Pending Bookings" value={stats.pendingBookings} color="border-l-4 border-blue-500" />
                <StatCard icon={FiCalendar} title="Confirmed Bookings" value={stats.confirmedBookings} color="border-l-4 border-green-500" />
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">Booking Status Trend</h2>
                {bookingStatusTrend && <Bar data={bookingStatusTrend} />}
            </div>
        </div>
    );
};

export default StudentOverview;