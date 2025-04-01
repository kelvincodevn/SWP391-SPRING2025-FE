
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

// import React, { useState, useEffect } from 'react';
// import { FiUsers, FiClipboard, FiBarChart, FiFolder, FiTrendingUp, FiCalendar, FiPhoneCall } from "react-icons/fi";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import { Bar } from 'react-chartjs-2';
// import { Button, Select, DatePicker } from 'antd';
// import api from '../../config/axios'; // Import API client
// import { toast } from 'react-toastify';
// import { saveAs } from 'file-saver'; // For exporting reports

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const { Option } = Select;
// const { RangePicker } = DatePicker;

// const ManageOverview = () => {
//     const [stats, setStats] = useState({
//         totalUsers: 0,
//         totalStudents: 0,
//         totalTests: 0,
//         totalSurveys: 0,
//         activePrograms: 0,
//         highRiskStudents: 0,
//         counselingSessions: 0,
//         completedSurveysWeekly: 0,
//         completedSurveysMonthly: 0,
//     });

//     const [mentalHealthTrend, setMentalHealthTrend] = useState(null);
//     const [surveyCompletionRate, setSurveyCompletionRate] = useState(null);
//     const [testCompletionRate, setTestCompletionRate] = useState(null);
//     const [programParticipationRate, setProgramParticipationRate] = useState(null);
//     const [mentalHealthAnalysis, setMentalHealthAnalysis] = useState(null); // New chart for mental health analysis
//     const [programEffectiveness, setProgramEffectiveness] = useState(null); // New chart for program effectiveness

//     // Filters
//     const [timeRange, setTimeRange] = useState(null);
//     const [selectedClass, setSelectedClass] = useState(null);
//     const [classes, setClasses] = useState([]); // List of classes for filtering

//     useEffect(() => {
//         // Fetch overview stats
//         const fetchStats = async () => {
//             try {
//                 const response = await api.get('/api/manager/dashboard/stats', {
//                     params: {
//                         startDate: timeRange ? timeRange[0].format('YYYY-MM-DD') : null,
//                         endDate: timeRange ? timeRange[1].format('YYYY-MM-DD') : null,
//                         class: selectedClass,
//                     },
//                 });
//                 setStats(response.data);
//             } catch (error) {
//                 toast.error('Failed to fetch dashboard stats');
//             }
//         };

//         // Fetch mental health trend
//         const fetchMentalHealthTrend = async () => {
//             try {
//                 const response = await api.get('/api/manager/dashboard/mental-health-trend', {
//                     params: {
//                         startDate: timeRange ? timeRange[0].format('YYYY-MM-DD') : null,
//                         endDate: timeRange ? timeRange[1].format('YYYY-MM-DD') : null,
//                         class: selectedClass,
//                     },
//                 });
//                 setMentalHealthTrend(formatChartData(response.data, 'Mental Health Index'));
//             } catch (error) {
//                 toast.error('Failed to fetch mental health trend');
//             }
//         };

//         // Fetch survey completion rate
//         const fetchSurveyCompletionRate = async () => {
//             try {
//                 const response = await api.get('/api/manager/dashboard/survey-completion-rate', {
//                     params: {
//                         startDate: timeRange ? timeRange[0].format('YYYY-MM-DD') : null,
//                         endDate: timeRange ? timeRange[1].format('YYYY-MM-DD') : null,
//                         class: selectedClass,
//                     },
//                 });
//                 setSurveyCompletionRate(formatChartData(response.data, 'Survey Completion Rate (%)'));
//             } catch (error) {
//                 toast.error('Failed to fetch survey completion rate');
//             }
//         };

//         // Fetch test completion rate
//         const fetchTestCompletionRate = async () => {
//             try {
//                 const response = await api.get('/api/manager/dashboard/test-completion-rate', {
//                     params: {
//                         startDate: timeRange ? timeRange[0].format('YYYY-MM-DD') : null,
//                         endDate: timeRange ? timeRange[1].format('YYYY-MM-DD') : null,
//                         class: selectedClass,
//                     },
//                 });
//                 setTestCompletionRate(formatChartData(response.data, 'Test Completion Rate (%)'));
//             } catch (error) {
//                 toast.error('Failed to fetch test completion rate');
//             }
//         };

//         // Fetch program participation rate
//         const fetchProgramParticipationRate = async () => {
//             try {
//                 const response = await api.get('/api/manager/dashboard/program-participation-rate', {
//                     params: {
//                         startDate: timeRange ? timeRange[0].format('YYYY-MM-DD') : null,
//                         endDate: timeRange ? timeRange[1].format('YYYY-MM-DD') : null,
//                         class: selectedClass,
//                     },
//                 });
//                 setProgramParticipationRate(formatChartData(response.data, 'Program Participation Rate (%)'));
//             } catch (error) {
//                 toast.error('Failed to fetch program participation rate');
//             }
//         };

//         // Fetch mental health analysis (e.g., anxiety/depression levels)
//         const fetchMentalHealthAnalysis = async () => {
//             try {
//                 const response = await api.get('/api/manager/dashboard/mental-health-analysis', {
//                     params: {
//                         startDate: timeRange ? timeRange[0].format('YYYY-MM-DD') : null,
//                         endDate: timeRange ? timeRange[1].format('YYYY-MM-DD') : null,
//                         class: selectedClass,
//                     },
//                 });
//                 setMentalHealthAnalysis(formatMentalHealthAnalysisData(response.data));
//             } catch (error) {
//                 toast.error('Failed to fetch mental health analysis');
//             }
//         };

//         // Fetch program effectiveness
//         const fetchProgramEffectiveness = async () => {
//             try {
//                 const response = await api.get('/api/manager/dashboard/program-effectiveness', {
//                     params: {
//                         startDate: timeRange ? timeRange[0].format('YYYY-MM-DD') : null,
//                         endDate: timeRange ? timeRange[1].format('YYYY-MM-DD') : null,
//                         class: selectedClass,
//                     },
//                 });
//                 setProgramEffectiveness(formatProgramEffectivenessData(response.data));
//             } catch (error) {
//                 toast.error('Failed to fetch program effectiveness');
//             }
//         };

//         // Fetch classes for filtering
//         const fetchClasses = async () => {
//             try {
//                 const response = await api.get('/api/manager/classes');
//                 setClasses(response.data);
//             } catch (error) {
//                 toast.error('Failed to fetch classes');
//             }
//         };

//         fetchStats();
//         fetchMentalHealthTrend();
//         fetchSurveyCompletionRate();
//         fetchTestCompletionRate();
//         fetchProgramParticipationRate();
//         fetchMentalHealthAnalysis();
//         fetchProgramEffectiveness();
//         fetchClasses();
//     }, [timeRange, selectedClass]);

//     const formatChartData = (data, label = 'Mental Health Index') => {
//         if (!data || data.length === 0) {
//             return null;
//         }

//         const labels = data.map(item => item.date);
//         const dataPoints = data.map(item => item.value);

//         return {
//             labels,
//             datasets: [
//                 {
//                     label: label,
//                     data: dataPoints,
//                     backgroundColor: 'rgba(53, 162, 235, 0.5)',
//                 },
//             ],
//         };
//     };

//     const formatMentalHealthAnalysisData = (data) => {
//         if (!data || data.length === 0) {
//             return null;
//         }

//         const labels = data.map(item => item.category); // e.g., ['Low Anxiety', 'Moderate Anxiety', 'High Anxiety']
//         const dataPoints = data.map(item => item.count);

//         return {
//             labels,
//             datasets: [
//                 {
//                     label: 'Number of Students',
//                     data: dataPoints,
//                     backgroundColor: 'rgba(255, 99, 132, 0.5)',
//                 },
//             ],
//         };
//     };

//     const formatProgramEffectivenessData = (data) => {
//         if (!data || data.length === 0) {
//             return null;
//         }

//         const labels = data.map(item => item.programName);
//         const dataPoints = data.map(item => item.improvementRate);

//         return {
//             labels,
//             datasets: [
//                 {
//                     label: 'Improvement Rate (%)',
//                     data: dataPoints,
//                     backgroundColor: 'rgba(75, 192, 192, 0.5)',
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

//     const handleExportReport = async () => {
//         try {
//             const response = await api.get('/api/manager/dashboard/export-report', {
//                 params: {
//                     startDate: timeRange ? timeRange[0].format('YYYY-MM-DD') : null,
//                     endDate: timeRange ? timeRange[1].format('YYYY-MM-DD') : null,
//                     class: selectedClass,
//                 },
//                 responseType: 'blob', // For downloading files
//             });
//             const blob = new Blob([response.data], { type: 'application/pdf' });
//             saveAs(blob, 'dashboard-report.pdf');
//             toast.success('Report exported successfully');
//         } catch (error) {
//             toast.error('Failed to export report');
//         }
//     };

//     return (
//         <div className="p-8">
//             <h1 className="text-2xl font-bold mb-8">Manager Dashboard</h1>

//             {/* Filters */}
//             <div className="mb-6 flex gap-4">
//                 <RangePicker onChange={(dates) => setTimeRange(dates)} />
//                 <Select
//                     placeholder="Select Class"
//                     style={{ width: 200 }}
//                     onChange={(value) => setSelectedClass(value)}
//                     allowClear
//                 >
//                     {classes.map((cls) => (
//                         <Option key={cls} value={cls}>{cls}</Option>
//                     ))}
//                 </Select>
//                 <Button type="primary" onClick={handleExportReport}>
//                     Export Report
//                 </Button>
//             </div>

//             {/* Stat Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                 <StatCard icon={FiUsers} title="Total Users" value={stats.totalUsers} color="border-l-4 border-blue-500" />
//                 <StatCard icon={FiUsers} title="Total Students" value={stats.totalStudents} color="border-l-4 border-blue-600" />
//                 <StatCard icon={FiClipboard} title="Total Tests" value={stats.totalTests} color="border-l-4 border-green-500" />
//                 <StatCard icon={FiBarChart} title="Total Surveys" value={stats.totalSurveys} color="border-l-4 border-yellow-500" />
//                 <StatCard icon={FiFolder} title="Active Programs" value={stats.activePrograms} color="border-l-4 border-purple-500" />
//                 <StatCard icon={FiTrendingUp} title="High-Risk Students" value={stats.highRiskStudents} color="border-l-4 border-red-500" />
//                 <StatCard icon={FiCalendar} title="Counseling Sessions" value={stats.counselingSessions} color="border-l-4 border-indigo-500" />
//                 <StatCard icon={FiClipboard} title="Completed Surveys (Weekly)" value={stats.completedSurveysWeekly} color="border-l-4 border-pink-500" />
//                 <StatCard icon={FiClipboard} title="Completed Surveys (Monthly)" value={stats.completedSurveysMonthly} color="border-l-4 border-gray-500" />
//             </div>

//             {/* Charts */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 <div>
//                     <h2 className="text-xl font-semibold mb-4">Mental Health Trend</h2>
//                     {mentalHealthTrend && <Bar data={mentalHealthTrend} />}
//                 </div>
//                 <div>
//                     <h2 className="text-xl font-semibold mb-4">Survey Completion Rate</h2>
//                     {surveyCompletionRate && <Bar data={surveyCompletionRate} />}
//                 </div>
//                 <div>
//                     <h2 className="text-xl font-semibold mb-4">Test Completion Rate</h2>
//                     {testCompletionRate && <Bar data={testCompletionRate} />}
//                 </div>
//                 <div>
//                     <h2 className="text-xl font-semibold mb-4">Program Participation Rate</h2>
//                     {programParticipationRate && <Bar data={programParticipationRate} />}
//                 </div>
//                 <div>
//                     <h2 className="text-xl font-semibold mb-4">Mental Health Analysis</h2>
//                     {mentalHealthAnalysis && <Bar data={mentalHealthAnalysis} />}
//                 </div>
//                 <div>
//                     <h2 className="text-xl font-semibold mb-4">Program Effectiveness</h2>
//                     {programEffectiveness && <Bar data={programEffectiveness} />}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ManageOverview;

// import React, { useState, useEffect } from 'react';
// import { FiUsers, FiClipboard, FiBarChart, FiFolder, FiTrendingUp, FiCalendar, FiPhoneCall } from "react-icons/fi";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import { Bar } from 'react-chartjs-2';
// import { Select, Button, DatePicker } from 'antd';
// import api from '../../config/axios'; // Giả sử bạn đã cấu hình axios
// import { toast } from 'react-toastify';
// import { saveAs } from 'file-saver'; // Thư viện để xuất file

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
// );

// const { Option } = Select;
// const { RangePicker } = DatePicker;

// const ManageOverview = () => {
//     const [stats, setStats] = useState({
//         users: 0,
//         tests: 0,
//         surveys: 0,
//         programs: 0,
//         highRiskStudents: 0,
//         counselingSessions: 0,
//         completedSurveysWeekly: 0,
//         completedSurveysMonthly: 0,
//     });

//     const [mentalHealthTrend, setMentalHealthTrend] = useState(null);
//     const [surveyCompletionRate, setSurveyCompletionRate] = useState(null);
//     const [testCompletionRate, setTestCompletionRate] = useState(null);
//     const [programParticipationRate, setProgramParticipationRate] = useState(null);
//     const [highRiskBreakdown, setHighRiskBreakdown] = useState(null); // Phân tích học sinh nguy cơ cao
//     const [programEffectiveness, setProgramEffectiveness] = useState(null); // Hiệu quả chương trình

//     // State cho bộ lọc
//     const [filterTimeRange, setFilterTimeRange] = useState(null);
//     const [filterClass, setFilterClass] = useState(null);
//     const [filterAgeGroup, setFilterAgeGroup] = useState(null);

//     useEffect(() => {
//         fetchDashboardData();
//     }, [filterTimeRange, filterClass, filterAgeGroup]);

//     const fetchDashboardData = async () => {
//         try {
//             const response = await api.get('/api/manager/dashboard', {
//                 params: {
//                     startDate: filterTimeRange ? filterTimeRange[0].format('YYYY-MM-DD') : null,
//                     endDate: filterTimeRange ? filterTimeRange[1].format('YYYY-MM-DD') : null,
//                     class: filterClass,
//                     ageGroup: filterAgeGroup,
//                 },
//             });

//             const data = response.data;

//             // Cập nhật Stat Cards
//             setStats({
//                 users: data.totalUsers,
//                 tests: data.totalTests,
//                 surveys: data.totalSurveys,
//                 programs: data.activePrograms,
//                 highRiskStudents: data.highRiskStudents,
//                 counselingSessions: data.counselingSessions,
//                 completedSurveysWeekly: data.completedSurveysWeekly,
//                 completedSurveysMonthly: data.completedSurveysMonthly,
//             });

//             // Cập nhật biểu đồ
//             setMentalHealthTrend(formatChartData(data.mentalHealthTrend, 'Mental Health Index'));
//             setSurveyCompletionRate(formatChartData(data.surveyCompletionRate, 'Survey Completion Rate (%)'));
//             setTestCompletionRate(formatChartData(data.testCompletionRate, 'Test Completion Rate (%)'));
//             setProgramParticipationRate(formatChartData(data.programParticipationRate, 'Program Participation Rate (%)'));
//             setHighRiskBreakdown(formatChartData(data.highRiskBreakdown, 'High-Risk Students by Category'));
//             setProgramEffectiveness(formatChartData(data.programEffectiveness, 'Program Effectiveness (%)'));
//         } catch (error) {
//             toast.error('Failed to fetch dashboard data');
//         }
//     };

//     const formatChartData = (data, label = 'Value') => {
//         if (!data || data.length === 0) {
//             return null;
//         }

//         const labels = data.map(item => item.label || item.date);
//         const dataPoints = data.map(item => item.value);

//         return {
//             labels,
//             datasets: [
//                 {
//                     label: label,
//                     data: dataPoints,
//                     backgroundColor: 'rgba(53, 162, 235, 0.5)',
//                 },
//             ],
//         };
//     };

//     const exportReport = async () => {
//         try {
//             const response = await api.get('/api/manager/export-report', {
//                 responseType: 'blob',
//                 params: {
//                     startDate: filterTimeRange ? filterTimeRange[0].format('YYYY-MM-DD') : null,
//                     endDate: filterTimeRange ? filterTimeRange[1].format('YYYY-MM-DD') : null,
//                     class: filterClass,
//                     ageGroup: filterAgeGroup,
//                 },
//             });

//             const blob = new Blob([response.data], { type: 'application/pdf' });
//             saveAs(blob, 'dashboard-report.pdf');
//             toast.success('Report exported successfully');
//         } catch (error) {
//             toast.error('Failed to export report');
//         }
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
//             <h1 className="text-2xl font-bold mb-8">Manager Dashboard</h1>

//             {/* Bộ lọc */}
//             <div className="mb-6 flex gap-4">
//                 <RangePicker onChange={(dates) => setFilterTimeRange(dates)} />
//                 <Select
//                     placeholder="Select Class"
//                     onChange={(value) => setFilterClass(value)}
//                     style={{ width: 200 }}
//                     allowClear
//                 >
//                     <Option value="Class 1">Class 1</Option>
//                     <Option value="Class 2">Class 2</Option>
//                     <Option value="Class 3">Class 3</Option>
//                 </Select>
//                 <Select
//                     placeholder="Select Age Group"
//                     onChange={(value) => setFilterAgeGroup(value)}
//                     style={{ width: 200 }}
//                     allowClear
//                 >
//                     <Option value="10-12">10-12</Option>
//                     <Option value="13-15">13-15</Option>
//                     <Option value="16-18">16-18</Option>
//                 </Select>
//                 <Button type="primary" onClick={exportReport}>
//                     Export Report
//                 </Button>
//             </div>

//             {/* Stat Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                 <StatCard icon={FiUsers} title="Total Users" value={stats.users} color="border-l-4 border-blue-500" />
//                 <StatCard icon={FiClipboard} title="Total Tests" value={stats.tests} color="border-l-4 border-green-500" />
//                 <StatCard icon={FiBarChart} title="Total Surveys" value={stats.surveys} color="border-l-4 border-yellow-500" />
//                 <StatCard icon={FiFolder} title="Active Programs" value={stats.programs} color="border-l-4 border-purple-500" />
//                 <StatCard icon={FiTrendingUp} title="High-Risk Students" value={stats.highRiskStudents} color="border-l-4 border-red-500" />
//                 <StatCard icon={FiCalendar} title="Counseling Sessions" value={stats.counselingSessions} color="border-l-4 border-indigo-500" />
//                 <StatCard icon={FiClipboard} title="Completed Surveys (Weekly)" value={stats.completedSurveysWeekly} color="border-l-4 border-pink-500" />
//                 <StatCard icon={FiClipboard} title="Completed Surveys (Monthly)" value={stats.completedSurveysMonthly} color="border-l-4 border-gray-500" />
//             </div>

//             {/* Charts */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 <div>
//                     <h2 className="text-xl font-semibold mb-4">Mental Health Trend</h2>
//                     {mentalHealthTrend && <Bar data={mentalHealthTrend} />}
//                 </div>
//                 <div>
//                     <h2 className="text-xl font-semibold mb-4">Survey Completion Rate</h2>
//                     {surveyCompletionRate && <Bar data={surveyCompletionRate} />}
//                 </div>
//                 <div>
//                     <h2 className="text-xl font-semibold mb-4">Test Completion Rate</h2>
//                     {testCompletionRate && <Bar data={testCompletionRate} />}
//                 </div>
//                 <div>
//                     <h2 className="text-xl font-semibold mb-4">Program Participation Rate</h2>
//                     {programParticipationRate && <Bar data={programParticipationRate} />}
//                 </div>
//                 <div>
//                     <h2 className="text-xl font-semibold mb-4">High-Risk Students Breakdown</h2>
//                     {highRiskBreakdown && <Bar data={highRiskBreakdown} />}
//                 </div>
//                 <div>
//                     <h2 className="text-xl font-semibold mb-4">Program Effectiveness</h2>
//                     {programEffectiveness && <Bar data={programEffectiveness} />}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ManageOverview;