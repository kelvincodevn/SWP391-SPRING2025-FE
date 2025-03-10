// import React, { useState, useEffect } from "react";
// import { FiEdit2, FiTrash2, FiEye, FiDownload, FiPrinter } from "react-icons/fi";
// import { Line } from "react-chartjs-2";
// import { Chart as ChartJS } from "chart.js/auto";

// const MentalHealthAssessment = () => {
//   const [tests, setTests] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [selectedTest, setSelectedTest] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const mockTests = [
//     {
//       id: 1,
//       type: "DASS21",
//       date: "2024-01-15",
//       patientId: "PT****789",
//       score: 42,
//       subscales: { depression: 14, anxiety: 16, stress: 12 },
//       notes: "Moderate levels observed across all scales"
//     },
//     {
//       id: 2,
//       type: "PHQ-9",
//       date: "2024-01-14",
//       patientId: "PT****456",
//       score: 15,
//       subscales: { depression: 15 },
//       notes: "Moderately severe depression indicated"
//     }
//   ];

//   useEffect(() => {
//     setTests(mockTests);
//   }, []);

//   const TestTable = () => (
//     <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
//       <table className="min-w-full table-auto">
//         <thead className="bg-gray-50 dark:bg-gray-700">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Test Type</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Patient ID</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Score</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//           {tests.map((test) => (
//             <tr key={test.id}>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{test.type}</td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{test.date}</td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{test.patientId}</td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{test.score}</td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
//                 <button
//                   onClick={() => {
//                     setSelectedTest(test);
//                     setShowModal(true);
//                   }}
//                   className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
//                 >
//                   <FiEye className="inline-block w-5 h-5" />
//                 </button>
//                 <button
//                   onClick={() => {
//                     setSelectedTest(test);
//                     setShowForm(true);
//                   }}
//                   className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
//                 >
//                   <FiEdit2 className="inline-block w-5 h-5" />
//                 </button>
//                 <button
//                   onClick={() => handleDelete(test.id)}
//                   className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
//                 >
//                   <FiTrash2 className="inline-block w-5 h-5" />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

//   const TestForm = ({ test, onSubmit, onClose }) => {
//     const [formData, setFormData] = useState(
//       test || {
//         type: "",
//         date: "",
//         patientId: "",
//         score: "",
//         subscales: {},
//         notes: ""
//       }
//     );

//     return (
//       <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
//         <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
//           <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
//             {test ? "Edit Test" : "New Test"}
//           </h2>
//           <form className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Test Type</label>
//               <select
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                 value={formData.type}
//                 onChange={(e) => setFormData({ ...formData, type: e.target.value })}
//               >
//                 <option value="">Select a test type</option>
//                 <option value="DASS21">DASS21</option>
//                 <option value="BECK">BECK</option>
//                 <option value="GAD-7">GAD-7</option>
//                 <option value="PHQ-9">PHQ-9</option>
//               </select>
//             </div>
//             {/* Add other form fields */}
//             <div className="flex justify-end space-x-3 mt-6">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
//               >
//                 Save
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     );
//   };

//   const TestModal = ({ test, onClose }) => {
//     if (!test) return null;

//     const chartData = {
//       labels: Object.keys(test.subscales),
//       datasets: [
//         {
//           label: "Scores",
//           data: Object.values(test.subscales),
//           borderColor: "rgb(75, 192, 192)",
//           tension: 0.1
//         }
//       ]
//     };

//     return (
//       <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
//         <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-2xl w-full">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Test Details</h2>
//             <div className="space-x-2">
//               <button className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
//                 <FiDownload className="w-5 h-5" />
//               </button>
//               <button className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
//                 <FiPrinter className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//           <div className="space-y-6">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Test Type</p>
//                 <p className="mt-1 text-lg text-gray-900 dark:text-white">{test.type}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</p>
//                 <p className="mt-1 text-lg text-gray-900 dark:text-white">{test.date}</p>
//               </div>
//             </div>
//             <div className="h-64">
//               <Line data={chartData} options={{ maintainAspectRatio: false }} />
//             </div>
//             <div className="mt-4">
//               <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Notes</p>
//               <p className="mt-1 text-gray-900 dark:text-white">{test.notes}</p>
//             </div>
//           </div>
//           <div className="mt-8 flex justify-end">
//             <button
//               onClick={onClose}
//               className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this test?")) {
//       setTests(tests.filter((test) => test.id !== id));
//     }
//   };

//   return (
//     <div className={`min-h-screen p-8 ${isDarkMode ? "dark" : ""}`}>
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mental Health Assessment Tests</h1>
//           <div className="space-x-4">
//             <button
//               onClick={() => setIsDarkMode(!isDarkMode)}
//               className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
//             >
//               Toggle Theme
//             </button>
//             <button
//               onClick={() => setShowForm(true)}
//               className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
//             >
//               New Test
//             </button>
//           </div>
//         </div>

//         <TestTable />

//         {showModal && <TestModal test={selectedTest} onClose={() => setShowModal(false)} />}
//         {showForm && (
//           <TestForm
//             test={selectedTest}
//             onClose={() => {
//               setShowForm(false);
//               setSelectedTest(null);
//             }}
//             onSubmit={(data) => {
//               // Handle form submission
//               setShowForm(false);
//               setSelectedTest(null);
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default MentalHealthAssessment;