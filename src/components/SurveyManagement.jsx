// import { useState } from "react";

// export default function SurveyManagement() {
//   const [surveys, setSurveys] = useState([]);
//   const [newSurvey, setNewSurvey] = useState({ name: "", questions: [] });
//   const [editingSurvey, setEditingSurvey] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   const addSurvey = () => {
//     if (newSurvey.name.trim()) {
//       setSurveys([...surveys, { ...newSurvey, id: Date.now() }]);
//       setNewSurvey({ name: "", questions: [] });
//       setShowForm(false);
//     }
//   };

//   const deleteSurvey = (id) => {
//     if (window.confirm("Are you sure you want to delete this survey?")) {
//       setSurveys(surveys.filter((survey) => survey.id !== id));
//     }
//   };

//   const editSurvey = (survey) => {
//     setEditingSurvey(survey);
//     setShowForm(true);
//   };

//   const updateSurvey = () => {
//     setSurveys(surveys.map((s) => (s.id === editingSurvey.id ? editingSurvey : s)));
//     setEditingSurvey(null);
//     setShowForm(false);
//   };

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <aside className="w-1/4 bg-orange-500 text-white p-4 min-h-screen">
//         <h2 className="text-xl font-bold mb-4">Manager Dashboard</h2>
//         <ul>
//           <li className="mb-2 p-2 bg-orange-400 rounded cursor-pointer">Manage Users</li>
//           <li className="mb-2 p-2 bg-orange-400 rounded cursor-pointer">Manage Tests</li>
//           <li className="mb-2 p-2 bg-orange-400 rounded cursor-pointer">Manage Surveys</li>
//         </ul>
//       </aside>

//       {/* Main Content */}
//       <main className="w-3/4 p-6 bg-orange-100 min-h-screen">
//         <h2 className="text-2xl font-bold mb-4">Survey Management</h2>
//         <button 
//           className="bg-blue-500 text-white px-4 py-2 rounded mb-4" 
//           onClick={() => setShowForm(true)}
//         >
//           Create New Survey
//         </button>

//         {/* Survey List */}
//         <ul>
//           {surveys.map((survey) => (
//             <li key={survey.id} className="border p-3 rounded flex justify-between items-center mb-2 bg-white">
//               <span>{survey.name}</span>
//               <div>
//                 <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2" onClick={() => editSurvey(survey)}>Edit</button>
//                 <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => deleteSurvey(survey.id)}>Delete</button>
//               </div>
//             </li>
//           ))}
//         </ul>

//         {/* Survey Form */}
//         {showForm && (
//           <div className="border p-4 rounded mt-4 bg-white">
//             <h3 className="text-lg font-semibold">{editingSurvey ? "Edit Survey" : "Create New Survey"}</h3>
//             <input
//               type="text"
//               placeholder="Survey Name"
//               className="border p-2 w-full rounded mb-2"
//               value={editingSurvey ? editingSurvey.name : newSurvey.name}
//               onChange={(e) => 
//                 editingSurvey 
//                   ? setEditingSurvey({ ...editingSurvey, name: e.target.value }) 
//                   : setNewSurvey({ ...newSurvey, name: e.target.value })
//               }
//             />
//             <button
//               className="bg-green-500 text-white px-4 py-2 rounded w-full mt-2"
//               onClick={editingSurvey ? updateSurvey : addSurvey}
//             >
//               {editingSurvey ? "Update Survey" : "Save Survey"}
//             </button>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

import axios from "axios";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiX } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const initialTests = [
  {
    id: 1,
    name: "Survey Test",
    description: "Measures severity of depression symptoms",
    questions: [
      {
        id: 1,
        text: "I found it hard to wind down",
        options: ["Never", "Sometimes", "Often", "Always"]
      }
    ]
  },
  {
    id: 2,
    name: "Anxiety Screening Tool",
    description: "Evaluates anxiety levels and symptoms",
    questions: [
      {
        id: 1,
        text: "Feeling nervous, anxious, or on edge",
        options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
      }
    ]
  }
];

const API_URL = "http://127.0.0.1:3658/m2/812338-791499-default/13890318"; // Your API URL

const TestManagementSystem = () => {
  const [tests, setTests] = useState(initialTests);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    questions: []
  });

    // Fetch data on component mount
  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const response = await axios.get(API_URL);
      setTests(response.data);
    } catch (error) {
      console.error("Error fetching tests:", error);
      toast.error("Error fetching tests. Please try again later.");
    }
  };

  const filteredTests = useMemo(() => {
    return tests.filter(test =>
      test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tests, searchQuery]);

  const paginatedTests = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTests.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTests, currentPage]);

  const totalPages = Math.ceil(filteredTests.length / itemsPerPage);

  const handleAddQuestion = () => {
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, {
        id: Date.now(),
        text: "",
        choices: [{ id: Date.now(), text: "", score: "" }] // Initialize with one choice
      }]
    }));
  };

  const handleQuestionChange = (questionId, field, value) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map(q =>
        q.id === questionId ? { ...q, [field]: value } : q
      )
    }));
  };

  const handleDeleteQuestion = (questionId) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId)
    }));
  };

  const handleAddChoice = (questionId) => {
    setFormData(prev => ({
        ...prev,
        questions: prev.questions.map(q =>
            q.id === questionId ? { ...q, choices: [...q.choices, { id: Date.now(), text: "", score: "" }] } : q
        )
    }));
};

const handleChoiceChange = (questionId, choiceId, field, value) => {
    setFormData(prev => ({
        ...prev,
        questions: prev.questions.map(q => {
            if (q.id === questionId) {
                return {
                    ...q,
                    choices: q.choices.map(c =>
                        c.id === choiceId ? { ...c, [field]: value } : c
                    )
                };
            }
            return q;
        })
    }));
};

const handleDeleteChoice = (questionId, choiceId) => {
    setFormData(prev => ({
        ...prev,
        questions: prev.questions.map(q => {
            if (q.id === questionId) {
                return {
                    ...q,
                    choices: q.choices.filter(c => c.id !== choiceId)
                };
            }
            return q;
        })
    }));
};

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.questions.length === 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      if (selectedTest) {
        await axios.put(`${API_URL}/${selectedTest.id}`, formData); // Update
        toast.success("Test updated successfully");
      } else {
        await axios.post("http://127.0.0.1:3658/m2/812338-791499-default/13891684", formData); // Create
        toast.success("Test created successfully");
      }

      fetchTests(); // Refresh test data after CRUD operation
      setShowModal(false);
      setSelectedTest(null);
      setFormData({ name: "", description: "", questions: [] });
    } catch (error) {
      console.error("Error saving test:", error);
      toast.error("Error saving test. Please try again later.");
    }
  };

  const handleEdit = (test) => {
    setSelectedTest(test);
    setFormData(test);
    setShowModal(true);
  };

  const handleDelete = useCallback(async (test) => {
    setSelectedTest(test);
    setShowDeleteModal(true);
  }, []);

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${selectedTest.id}`);
      fetchTests(); // Refresh after delete
      setShowDeleteModal(false);
      setSelectedTest(null);
      toast.success("Test deleted successfully");
    } catch (error) {
      console.error("Error deleting test:", error);
      toast.error("Error deleting test. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <ToastContainer position="top-right" />
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Survey Mental Health</h1>
        <p className="text-gray-600 mt-2">Survey</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="relative flex-1 max-w-md">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Survey..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiPlus /> Add New Survey
        </button>
      </div>

      {/* Test List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Survey </th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedTests.map(test => (
                <tr key={test.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{test.name}</td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">{test.type}</td> */}
                  <td className="px-6 py-4">{test.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(test)}
                        className="text-blue-600 hover:text-blue-800"
                        aria-label="Edit test"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDelete(test)}
                        className="text-red-600 hover:text-red-800"
                        aria-label="Delete test"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{((currentPage - 1) * itemsPerPage) + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(currentPage * itemsPerPage, filteredTests.length)}
                </span>{" "}
                of <span className="font-medium">{filteredTests.length}</span> Results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === page
                      ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                      : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                  >
                    {page}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit} className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {selectedTest ? "Edit Test" : "Add New Test"}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <FiX className="h-6 w-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Survey</label>
                    <input
                      type="text"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700">Test Type</label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={formData.type}
                      onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    >
                      <option value="DASS21">DASS21</option>
                      <option value="BECK">BECK</option>
                      <option value="GAD-7">GAD-7</option>
                      <option value="PHQ-9">PHQ-9</option>
                    </select>
                  </div> */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      rows="3"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    ></textarea>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">Questions</label>
                      <button
                        type="button"
                        onClick={handleAddQuestion}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                      >
                        <FiPlus className="mr-1" /> Add Question
                      </button>
                    </div>
                    <div className="space-y-4">
                      {formData.questions.map((question, index) => (
                        <div key={question.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-sm font-medium text-gray-700">Question {index + 1}</span>
                            <button
                              type="button"
                              onClick={() => handleDeleteQuestion(question.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                          <input
                            type="text"
                            required
                            placeholder="Enter question text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={question.text}
                            onChange={(e) => handleQuestionChange(question.id, "text", e.target.value)}
                          />

                          <div className="mt-4 space-y-2"> {/* Choices section */}
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-700">Choices</span>
                                    <button
                                        type="button"
                                        onClick={() => handleAddChoice(question.id)}
                                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                                    >
                                        <FiPlus className="mr-1" /> Add Choice
                                    </button>
                                </div>
                                {question.choices.map((choice, choiceIndex) => (
                                    <div key={choice.id} className="flex items-center gap-2 mb-2">
                                        <input
                                            type="text"
                                            placeholder="Enter choice text"
                                            className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            value={choice.text}
                                            onChange={(e) => handleChoiceChange(question.id, choice.id, "text", e.target.value)}
                                        />
                                        <input
                                            type="number"
                                            placeholder="Score"
                                            className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            value={choice.score}
                                            onChange={(e) => handleChoiceChange(question.id, choice.id, "score", e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteChoice(question.id, choice.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                ))}
                            </div>
                          {/* <select
                            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={question.type}
                            onChange={(e) => handleQuestionChange(question.id, "type", e.target.value)}
                          >
                            <option value="likert">Likert Scale</option>
                            <option value="multiple">Multiple Choice</option>
                            <option value="text">Free Text</option>
                          </select> */}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    {selectedTest ? "Update" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3 className="text-lg font-medium text-gray-900">Delete Survey</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this survey? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestManagementSystem;
