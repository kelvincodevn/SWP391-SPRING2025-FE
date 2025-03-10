// import React, { useState, useEffect } from 'react';
// import { FiUsers, FiClipboard, FiBarChart, FiFolder, FiTrendingUp, FiCalendar, FiPhoneCall } from "react-icons/fi";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import { Bar } from 'react-chartjs-2';
// import axios from 'axios'; // For data fetching

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
// );

// const ManageOverview = () => {
//     const [stats, setStats] = useState({  // More comprehensive stats
//         // users: 0,
//         // tests: 0,
//         // surveys: 0,
//         // programs: 0,
//         // highRiskStudents: 0,
//         // completedSurveysWeekly: 0,
//         // completedSurveysMonthly: 0,
//         // counselingSessions: 0,
//         // activePrograms: 0

//         users: 2547,
//         tests: 189,
//         surveys: 456,
//         programs: 34,
//         highRiskStudents: 120, // Sample data
//         completedSurveysWeekly: 200,
//         completedSurveysMonthly: 800,
//         counselingSessions: 75,
//         activePrograms: 28  // Updated
//     });

//     const [mentalHealthTrend, setMentalHealthTrend] = useState(null); // Chart data
//     const [surveyCompletionRate, setSurveyCompletionRate] = useState(null);

//     useEffect(() => {
//         // Fetch data (replace with your actual API endpoints)
//         const fetchData = async () => {
//             try {
//                 const statsResponse = await axios.get('/api/overview/stats'); // Example endpoint
//                 setStats(statsResponse.data);

//                 const trendResponse = await axios.get('/api/overview/trend'); // Example for trend data
//                 setMentalHealthTrend(formatChartData(trendResponse.data));

//                 const surveyRateResponse = await axios.get('/api/overview/survey-rate'); // Example for survey completion rate
//                 setSurveyCompletionRate(formatChartData(surveyRateResponse.data, 'Completion Rate'));

//             } catch (error) {
//                 console.error("Error fetching overview data:", error);
//                 // Handle error (e.g., display a message)
//             }
//         };

//         fetchData();
//     }, []);


//     const formatChartData = (data, label = 'Mental Health Index') => {
//         if (!data || data.length === 0) {
//             return null; // Handle empty data
//         }

//         const labels = data.map(item => item.date); // Assuming your data has a date field
//         const dataPoints = data.map(item => item.value); // And a value field

//         return {
//             labels,
//             datasets: [
//                 {
//                     label: label,
//                     data: dataPoints,
//                     backgroundColor: 'rgba(53, 162, 235, 0.5)', // Customize colors
//                 },
//             ],
//         };
//     };

//     const StatCard = ({ icon: Icon, title, value, color }) => (
//         <div className={`bg-white p-6 rounded-lg shadow-md ${color} transition-transform hover:scale-105`}>
//             <div className="flex items-center justify-between">
//                 <div>
//                     <p className="text-gray-500 text-sm">{title}</p>
//                     <p className="text-2xl font-bold mt-2">{value}</p>
//                 </div>
//                 <Icon className="text-3xl text-gray-400" />
//             </div>
//         </div>
//     );



//     return (
//         <div className="p-8">
//             <h1 className="text-2xl font-bold mb-8">Overview</h1>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"> {/* Added margin bottom */}
//                 <StatCard icon={FiUsers} title="Total Users" value={stats.users} color="border-l-4 border-blue-500" />
//                 <StatCard icon={FiClipboard} title="Total Tests" value={stats.tests} color="border-l-4 border-green-500" />
//                 <StatCard icon={FiBarChart} title="Total Surveys" value={stats.surveys} color="border-l-4 border-yellow-500" />
//                 <StatCard icon={FiFolder} title="Active Programs" value={stats.activePrograms} color="border-l-4 border-purple-500" />
//                 <StatCard icon={FiTrendingUp} title="High-Risk Students" value={stats.highRiskStudents} color="border-l-4 border-red-500" /> {/* Example */}
//                 <StatCard icon={FiCalendar} title="Counseling Sessions" value={stats.counselingSessions} color="border-l-4 border-indigo-500" />
//                 <StatCard icon={FiClipboard} title="Completed Surveys (Weekly)" value={stats.completedSurveysWeekly} color="border-l-4 border-pink-500" />
//                 <StatCard icon={FiClipboard} title="Completed Surveys (Monthly)" value={stats.completedSurveysMonthly} color="border-l-4 border-gray-500" />
//             </div>

//             {/* Charts */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 <div>
//                     <h2 className="text-xl font-semibold mb-4">Mental Health Trend</h2>
//                     {mentalHealthTrend && <Bar data={mentalHealthTrend} />} {/* Conditionally render */}
//                 </div>
//                 <div>
//                     <h2 className="text-xl font-semibold mb-4">Survey Completion Rate</h2>
//                     {surveyCompletionRate && <Bar data={surveyCompletionRate} />}
//                 </div>
//             </div>

//         </div>
//     );
// };

// export default ManageOverview;


import React, { useState, useEffect } from 'react';
import { FiUsers, FiClipboard, FiBarChart, FiFolder, FiTrendingUp, FiCalendar, FiPhoneCall } from "react-icons/fi";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ManageOverview = () => {
    const [stats, setStats] = useState({
        users: 2547,
        tests: 189,
        surveys: 456,
        programs: 34,
        highRiskStudents: 120, // Sample data
        completedSurveysWeekly: 200,
        completedSurveysMonthly: 800,
        counselingSessions: 75,
        activePrograms: 28  // Updated
    });

    const [mentalHealthTrend, setMentalHealthTrend] = useState(null);
    const [surveyCompletionRate, setSurveyCompletionRate] = useState(null);
    const [testCompletionRate, setTestCompletionRate] = useState(null); // New state for test completion
    const [programParticipationRate, setProgramParticipationRate] = useState(null); // New state

    useEffect(() => {
        // Sample data (replace with your actual API calls)
        const sampleTrendData = [
            { date: '2024-01-01', value: 75 },
            { date: '2024-01-08', value: 82 },
            { date: '2024-01-15', value: 78 },
            { date: '2024-01-22', value: 85 },
            { date: '2024-01-29', value: 80 },
        ];

        const sampleTestRateData = [
            { date: 'Week 1', value: 70 },
            { date: 'Week 2', value: 82 },
            { date: 'Week 3', value: 78 },
            { date: 'Week 4', value: 90 },
        ];

        const sampleSurveyRateData = [
            { date: 'Week 1', value: 85 },
            { date: 'Week 2', value: 92 },
            { date: 'Week 3', value: 88 },
            { date: 'Week 4', value: 95 },
        ];

        const sampleProgramParticipationData = [
            { date: 'Jan', value: 65 },
            { date: 'Feb', value: 78 },
            { date: 'Mar', value: 85 },
            { date: 'Apr', value: 72 },
            { date: 'May', value: 90 },
        ];
        

        setMentalHealthTrend(formatChartData(sampleTrendData));
        setSurveyCompletionRate(formatChartData(sampleSurveyRateData, 'Completion Rate (%)'));
        setTestCompletionRate(formatChartData(sampleTestRateData, 'Test Completion Rate (%)'));
        setProgramParticipationRate(formatChartData(sampleProgramParticipationData, 'Program Participation Rate (%)'));

    }, []);


    const formatChartData = (data, label = 'Mental Health Index') => {
        if (!data || data.length === 0) {
            return null;
        }

        const labels = data.map(item => item.date);
        const dataPoints = data.map(item => item.value);

        return {
            labels,
            datasets: [
                {
                    label: label,
                    data: dataPoints,
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
            ],
        };
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
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-8">Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard icon={FiUsers} title="Total Users" value={stats.users} color="border-l-4 border-blue-500" />
                <StatCard icon={FiClipboard} title="Total Tests" value={stats.tests} color="border-l-4 border-green-500" />
                <StatCard icon={FiBarChart} title="Total Surveys" value={stats.surveys} color="border-l-4 border-yellow-500" />
                <StatCard icon={FiFolder} title="Active Programs" value={stats.programs} color="border-l-4 border-purple-500" />
                <StatCard icon={FiTrendingUp} title="High-Risk Students" value={stats.highRiskStudents} color="border-l-4 border-red-500" />
                <StatCard icon={FiCalendar} title="Counseling Sessions" value={stats.counselingSessions} color="border-l-4 border-indigo-500" />
                <StatCard icon={FiClipboard} title="Completed Surveys (Weekly)" value={stats.completedSurveysWeekly} color="border-l-4 border-pink-500" />
                <StatCard icon={FiClipboard} title="Completed Surveys (Monthly)" value={stats.completedSurveysMonthly} color="border-l-4 border-gray-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Mental Health Trend</h2>
                    {mentalHealthTrend && <Bar data={mentalHealthTrend} />}
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-4">Survey Completion Rate</h2>
                    {surveyCompletionRate && <Bar data={surveyCompletionRate} />}
                </div>
                <div> {/* New chart container */}
                    <h2 className="text-xl font-semibold mb-4">Test Completion Rate</h2>
                    {testCompletionRate && <Bar data={testCompletionRate} />}
                </div>
                <div> {/* New chart container */}
                    <h2 className="text-xl font-semibold mb-4">Program Participation Rate</h2>
                    {programParticipationRate && <Bar data={programParticipationRate} />}
                </div>
            </div>

        </div>
    );
};

export default ManageOverview;