import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProgramDetailsForUser } from '../../services/api.program'; // Sử dụng API chi tiết
import { FaArrowLeft, FaChalkboardTeacher, FaTag, FaInfoCircle, FaLink } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProgramDetail() {
  const { programId } = useParams(); // Lấy id từ URL
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProgramDetail = async () => {
    try {
      const data = await getProgramDetailsForUser(programId); // Sử dụng id từ useParams
      if (data) {
        // Gán giá trị mặc định nếu thiếu
        const enrichedProgram = {
          ...data,
          programCategory: data.programCategory || "General",
          programDescription: data.programDescription || "No description provided.",
        };

        setProgram(enrichedProgram);
      } else {
        toast.error("Program not found.");
      }
    } catch (error) {
      console.error("Error loading program:", error);
      toast.error("Failed to load program detail.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgramDetail();
  }, [programId]);

  if (loading) {
    return <p className="text-center text-lg text-gray-600">Loading program detail...</p>;
  }

  if (!program) {
    return <p className="text-center text-red-600 font-semibold">Program not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-3xl mt-10 border-2 border-gray-300">
      <ToastContainer />
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-indigo-700 hover:underline font-semibold text-lg"
      >
        <FaArrowLeft className="mr-2 text-indigo-600" /> Back to Programs
      </button>

      <h1 className="text-5xl font-extrabold text-blue-900 mb-6 flex items-center">
        <FaChalkboardTeacher className="mr-4 text-indigo-600 text-4xl" />
        {program.programName}
      </h1>

      <p className="text-gray-700 mb-4 flex items-center">
        <FaTag className="mr-4 text-yellow-500 text-xl" />
        <strong className="font-medium text-lg text-gray-900">Category:</strong> {program.programCategory}
      </p>

      <p className="text-gray-700 mb-6 flex items-start">
        <FaInfoCircle className="mr-4 text-teal-500 text-xl mt-1" />
        <span className="text-lg text-gray-800">
          <strong className="font-medium">Description:</strong><br />
          {program.programDescription}
        </span>
      </p>

      <p className="text-gray-700 flex items-center mb-8">
        <FaLink className="mr-4 text-teal-600 text-xl" />
        <a
          href={program.programLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 underline hover:text-blue-900 font-semibold text-lg"
        >
          Access Program
        </a>
      </p>

      
    </div>
  );
}

export default ProgramDetail;
