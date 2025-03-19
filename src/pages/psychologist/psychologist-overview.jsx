import React, { useState, useEffect } from 'react';
import { FiUsers, FiClipboard, FiCalendar, FiBarChart } from "react-icons/fi";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getPsychologistStats } from '../../services/api.psychologist';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PsychologistOverview = () => {
    const [stats, setStats] = useState({
        totalBookings: 0,
        confirmedBookings: 0,
        pendingBookings: 0,
        cancelledBookings: 0,
        totalClients: 0,
        weeklySessions: 0,
    });
    const [bookingTrend, setBookingTrend] = useState(null);
    const psychologistId = localStorage.getItem('psychologistId');

    useEffect(() => {
        const fetchStats = async () => {
            const data = await getPsychologistStats(psychologistId);
            setStats({
                totalBookings: data.totalBookings || 0,
                confirmedBookings: data.confirmedBookings || 0,
                pendingBookings: data.pendingBookings || 0,
                cancelledBookings: data.cancelledBookings || 0,
                totalClients: data.totalClients || 0,
                weeklySessions: data.weeklySessions || 0,
            });

            const sampleTrendData = data.bookingTrend || [
                { date: '2025-03-10', value: 5 },
                { date: '2025-03-11', value: 7 },
                { date: '2025-03-12', value: 3 },
                { date: '2025-03-13', value: 6 },
                { date: '2025-03-14', value: 4 },
            ];
            setBookingTrend(formatChartData(sampleTrendData, 'Booking Trend'));
        };
        fetchStats();
    }, [psychologistId]);

    const formatChartData = (data, label = 'Booking Trend') => {
        if (!data || data.length === 0) return null;
        const labels = data.map(item => item.date);
        const dataPoints = data.map(item => item.value);
        return {
            labels,
            datasets: [{ label, data: dataPoints, backgroundColor: 'rgba(75, 192, 192, 0.5)' }],
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
            <h1 className="text-2xl font-bold mb-8">Psychologist Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard icon={FiCalendar} title="Total Bookings" value={stats.totalBookings} color="border-l-4 border-blue-500" />
                <StatCard icon={FiClipboard} title="Confirmed Bookings" value={stats.confirmedBookings} color="border-l-4 border-green-500" />
                <StatCard icon={FiCalendar} title="Pending Bookings" value={stats.pendingBookings} color="border-l-4 border-yellow-500" />
                <StatCard icon={FiClipboard} title="Cancelled Bookings" value={stats.cancelledBookings} color="border-l-4 border-red-500" />
                <StatCard icon={FiUsers} title="Total Clients" value={stats.totalClients} color="border-l-4 border-purple-500" />
                <StatCard icon={FiBarChart} title="Weekly Sessions" value={stats.weeklySessions} color="border-l-4 border-indigo-500" />
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">Booking Trend</h2>
                {bookingTrend && <Bar data={bookingTrend} />}
            </div>
        </div>
    );
};

export default PsychologistOverview;