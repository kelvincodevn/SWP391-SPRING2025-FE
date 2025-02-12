import React, { useState } from "react";
import { FaSearch, FaBook } from "react-icons/fa";

const mentalHealthResources = [
  { id: 1, title: "Anxiety Management", description: "Learn how to manage anxiety effectively.", link: "#" },
  { id: 2, title: "Mindfulness Techniques", description: "Techniques to stay mindful and reduce stress.", link: "#" },
  { id: 3, title: "Coping with Depression", description: "Helpful strategies for dealing with depression.", link: "#" },
  { id: 4, title: "Work-Life Balance", description: "How to maintain a healthy work-life balance.", link: "#" },
];

function App() {
  const [search, setSearch] = useState("");

  const filteredResources = mentalHealthResources.filter((resource) =>
    resource.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Mental Health Resources</h1>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search for a topic..."
            className="w-full p-2 border border-gray-300 rounded-lg pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute top-2 left-3 text-gray-400" />
        </div>
        <ul>
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <li key={resource.id} className="mb-3 p-4 bg-blue-100 rounded-lg flex items-center">
                <FaBook className="text-blue-500 mr-3" />
                <div>
                  <h2 className="text-lg font-semibold">{resource.title}</h2>
                  <p className="text-gray-600">{resource.description}</p>
                  <a href={resource.link} className="text-blue-600 hover:underline">Read More</a>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-center">No resources found.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
