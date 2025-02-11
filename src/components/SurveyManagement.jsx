import { useState } from "react";

export default function SurveyManagement() {
  const [surveys, setSurveys] = useState([]);
  const [newSurvey, setNewSurvey] = useState({ name: "", questions: [] });
  const [editingSurvey, setEditingSurvey] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const addSurvey = () => {
    if (newSurvey.name.trim()) {
      setSurveys([...surveys, { ...newSurvey, id: Date.now() }]);
      setNewSurvey({ name: "", questions: [] });
      setShowForm(false);
    }
  };

  const deleteSurvey = (id) => {
    if (window.confirm("Are you sure you want to delete this survey?")) {
      setSurveys(surveys.filter((survey) => survey.id !== id));
    }
  };

  const editSurvey = (survey) => {
    setEditingSurvey(survey);
    setShowForm(true);
  };

  const updateSurvey = () => {
    setSurveys(surveys.map((s) => (s.id === editingSurvey.id ? editingSurvey : s)));
    setEditingSurvey(null);
    setShowForm(false);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-1/4 bg-orange-500 text-white p-4 min-h-screen">
        <h2 className="text-xl font-bold mb-4">Manager Dashboard</h2>
        <ul>
          <li className="mb-2 p-2 bg-orange-400 rounded cursor-pointer">Manage Users</li>
          <li className="mb-2 p-2 bg-orange-400 rounded cursor-pointer">Manage Tests</li>
          <li className="mb-2 p-2 bg-orange-400 rounded cursor-pointer">Manage Surveys</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="w-3/4 p-6 bg-orange-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Survey Management</h2>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4" 
          onClick={() => setShowForm(true)}
        >
          Create New Survey
        </button>

        {/* Survey List */}
        <ul>
          {surveys.map((survey) => (
            <li key={survey.id} className="border p-3 rounded flex justify-between items-center mb-2 bg-white">
              <span>{survey.name}</span>
              <div>
                <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2" onClick={() => editSurvey(survey)}>Edit</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => deleteSurvey(survey.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>

        {/* Survey Form */}
        {showForm && (
          <div className="border p-4 rounded mt-4 bg-white">
            <h3 className="text-lg font-semibold">{editingSurvey ? "Edit Survey" : "Create New Survey"}</h3>
            <input
              type="text"
              placeholder="Survey Name"
              className="border p-2 w-full rounded mb-2"
              value={editingSurvey ? editingSurvey.name : newSurvey.name}
              onChange={(e) => 
                editingSurvey 
                  ? setEditingSurvey({ ...editingSurvey, name: e.target.value }) 
                  : setNewSurvey({ ...newSurvey, name: e.target.value })
              }
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded w-full mt-2"
              onClick={editingSurvey ? updateSurvey : addSurvey}
            >
              {editingSurvey ? "Update Survey" : "Save Survey"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
