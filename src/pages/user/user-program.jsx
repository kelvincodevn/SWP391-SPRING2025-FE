import React, { useEffect, useState } from 'react';
import { getProgramsForUser } from '../../services/api.program';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaChalkboardTeacher, FaClock, FaInfoCircle, FaTag } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function UserProgram() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // <-- khởi tạo hook

  const fetchPrograms = async () => {
    try {
      const data = await getProgramsForUser();
      console.log("Fetched programs:", data);

      if (Array.isArray(data)) {
        const enrichedPrograms = data.map(program => ({
          ...program,
          startDate: program.startDate || "2025-01-01",
          endDate: program.endDate || "2025-12-31",
          programCategory: program.programCategory || "General",
        }));

        setPrograms(enrichedPrograms);
        toast.success("Programs loaded successfully!");
      } else {
        throw new Error("Invalid data format");
      }
    } catch (error) {
      console.error("Error fetching programs:", error);
      toast.error("Failed to load programs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleDetailClick = (programId) => {
    navigate(`/programdetail/${programId}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 border border-gray-300 rounded-lg shadow-xl">
      <ToastContainer />
      <h2 className="text-4xl font-extrabold text-center mb-8 text-indigo-700">Available Programs</h2>

      <button
        onClick={fetchPrograms}
        className="mb-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
      >
        Refresh Programs
      </button>

      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading programs...</p>
      ) : programs.length === 0 ? (
        <p className="text-center text-gray-500">No programs found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <div key={program.programId} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-indigo-700 mb-2 flex items-center">
                <FaChalkboardTeacher className="mr-2 text-indigo-500" />
                {program.programName}
              </h3>
              <p className="text-gray-600 mb-2 flex items-center">
                <FaTag className="mr-2 text-yellow-500" />
                Category: {program.programCategory}
              </p>
              <p className="text-gray-600 flex items-center mb-4">
                <FaClock className="mr-2 text-purple-500" />
                {program.startDate} ➜ {program.endDate}
              </p>
              <button
                onClick={() => handleDetailClick(program.programId)}
                className="mt-auto bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center"
              >
                <FaInfoCircle className="mr-1" />
                Detail
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserProgram;
