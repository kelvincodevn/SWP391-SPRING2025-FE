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
          programLink: data.programLink || "#",
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
  }, [id]);

  if (loading) {
    return <p className="text-center text-lg text-gray-600">Loading program detail...</p>;
  }

  if (!program) {
    return <p className="text-center text-red-600 font-semibold">Program not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10">
      <ToastContainer />
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center text-indigo-600 hover:underline"
      >
        <FaArrowLeft className="mr-2" /> Back to Programs
      </button>

      <h1 className="text-3xl font-bold text-indigo-700 mb-4 flex items-center">
        <FaChalkboardTeacher className="mr-2 text-indigo-500" />
        {program.programName}
      </h1>

      <p className="text-gray-700 mb-2 flex items-center">
        <FaTag className="mr-2 text-yellow-500" />
        <strong>Category:</strong> {program.programCategory}
      </p>

      <p className="text-gray-700 mb-4 flex items-start">
        <FaInfoCircle className="mr-2 text-blue-500 mt-1" />
        <span>
          <strong>Description:</strong><br />
          {program.programDescription}
        </span>
      </p>

      <p className="text-gray-700 flex items-center">
        <FaLink className="mr-2 text-green-600" />
        <a href={program.programLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">
          Access Program
        </a>
      </p>
    </div>
  );
}

export default ProgramDetail;