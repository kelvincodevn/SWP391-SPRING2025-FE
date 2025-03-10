import React, { useState, useEffect } from "react";
import { FiUsers, FiClipboard, FiBarChart, FiFolder, FiEdit2, FiTrash2, FiMoreVertical } from "react-icons/fi";
import { AiOutlineHome, AiOutlineFile, AiFillFileText, AiOutlineAppstore } from "react-icons/ai";
import { BsCardChecklist } from "react-icons/bs";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mockStats = {
    users: 2547,
    tests: 189,
    surveys: 456,
    programs: 34
  };

  const mockTests = Array.from({ length: 20 }, (_, i) => ({
    id: `TEST${i + 1}`,
    name: `Test ${i + 1}`,
    description: `Description for Test ${i + 1}`,
  }));

  const mockSurveys = Array.from({ length: 20 }, (_, i) => ({
    id: `SUR${i + 1}`,
    name: `Survey ${i + 1}`,
    description: `Description for Survey ${i + 1}`,
    responses: Math.floor(Math.random() * 1000)
  }));

  const mockPrograms = Array.from({ length: 20 }, (_, i) => ({
    id: `PRG${i + 1}`,
    name: `Program ${i + 1}`,
    description: `Description for Program ${i + 1}`,
    status: Math.random() > 0.5 ? "Active" : "Inactive"
  }));

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

  const Table = ({ data, columns, type }) => {
    const filteredData = data.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    return (
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <div className="p-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border rounded-md"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              {columns.map((column, index) => (
                <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {Object.keys(item).map((key, i) => (
                  <td key={i} className="px-6 py-4 whitespace-nowrap">
                    {key === "status" ? (
                      <span className={`px-2 py-1 rounded-full text-xs ${item[key] === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        {item[key]}
                      </span>
                    ) : (
                      item[key]
                    )}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                    <FiEdit2 />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 flex justify-between items-center">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="px-4 py-2 border rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  const Sidebar = () => (
    <div className={`${isMobile ? "bottom-0 w-full" : "w-64 min-h-screen"} bg-gray-800 text-white`}>
      <div className="p-4">
        <h2 className="text-xl font-bold">Dashboard</h2>
      </div>
      <nav className="mt-4">
        {[
          { id: "overview", label: "Overview", icon: AiOutlineHome },
          { id: "tests", label: "Test Management", icon: AiOutlineFile },
          { id: "surveys", label: "Survey Management", icon: BsCardChecklist },
          { id: "programs", label: "Program Management", icon: AiOutlineAppstore }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center p-4 hover:bg-gray-700 ${activeSection === item.id ? "bg-gray-700" : ""}`}
          >
            <item.icon className="mr-3" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={FiUsers} title="Total Users" value={mockStats.users} color="border-l-4 border-blue-500" />
            <StatCard icon={FiClipboard} title="Total Tests" value={mockStats.tests} color="border-l-4 border-green-500" />
            <StatCard icon={FiBarChart} title="Total Surveys" value={mockStats.surveys} color="border-l-4 border-yellow-500" />
            <StatCard icon={FiFolder} title="Active Programs" value={mockStats.programs} color="border-l-4 border-purple-500" />
          </div>
        );
      case "tests":
        return <Table data={mockTests} columns={["ID", "Name", "Description", "Actions"]} type="tests" />;
      case "surveys":
        return <Table data={mockSurveys} columns={["ID", "Name", "Description", "Responses", "Actions"]} type="surveys" />;
      case "programs":
        return <Table data={mockPrograms} columns={["ID", "Name", "Description", "Status", "Actions"]} type="programs" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-8">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;