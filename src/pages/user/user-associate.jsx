import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../config/axios";

const StudentDashboard = () => {
  const [linkRequests, setLinkRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // Lấy danh sách yêu cầu liên kết
  const fetchLinkRequests = async () => {
    try {
      const response = await api.get("/api/parent-student/link-requests");
      setLinkRequests(response.data);
    } catch (error) {
      toast.error(error.response?.data || "Failed to fetch link requests");
    }
  };

  // Xác nhận hoặc từ chối yêu cầu liên kết
  const handleRespondToRequest = async (parentId, confirm) => {
    setLoading(true);
    try {
      await api.post(`/api/parent-student/respond-request?parentId=${parentId}&confirm=${confirm}`);
      toast.success(confirm ? "Link request confirmed" : "Link request declined");
      fetchLinkRequests(); // Làm mới danh sách yêu cầu
    } catch (error) {
      toast.error(error.response?.data || "Failed to process request");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinkRequests();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Student Dashboard</h2>

      {/* Danh sách yêu cầu liên kết */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Link Requests from Parents</h3>
        {linkRequests.length > 0 ? (
          <ul className="space-y-4">
            {linkRequests.map((request) => (
              <li key={`${request.parentId}-${request.studentId}`} className="border p-4 rounded-lg">
                <h4 className="text-lg font-semibold">Parent Details</h4>
                <p><strong>Full Name:</strong> {request.parent.fullName}</p>
                <p><strong>Email:</strong> {request.parent.email}</p>
                <p><strong>Username:</strong> {request.parent.username}</p>
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => handleRespondToRequest(request.parentId, true)}
                    disabled={loading}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleRespondToRequest(request.parentId, false)}
                    disabled={loading}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                  >
                    Decline
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No link requests found.</p>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;