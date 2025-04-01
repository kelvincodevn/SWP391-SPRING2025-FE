// // student-associate.jsx
// import React, { useState, useEffect } from "react";
// import { Button, Card, Spin, Alert, Typography, Row, Col } from "antd";
// import { toast } from "react-toastify";
// import api from "../../config/axios";

// const { Title, Text } = Typography;

// function StudentAssociate() {
//   const [linkRequests, setLinkRequests] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Lấy danh sách yêu cầu liên kết
//   const fetchLinkRequests = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await api.get("/api/parent-student/link-requests");
//       setLinkRequests(response.data);
//     } catch (error) {
//       setError(error.response?.data || "Failed to fetch link requests");
//       toast.error(error.response?.data || "Failed to fetch link requests");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Xác nhận hoặc từ chối yêu cầu liên kết
//   const handleRespondToRequest = async (parentId, confirm) => {
//     setLoading(true);
//     try {
//       await api.post(`/api/parent-student/respond-request?parentId=${parentId}&confirm=${confirm}`);
//       toast.success(confirm ? "Link request confirmed" : "Link request declined");
//       fetchLinkRequests(); // Làm mới danh sách yêu cầu
//     } catch (error) {
//       toast.error(error.response?.data || "Failed to process request");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLinkRequests();
//   }, []);

//   return (
//     <div className="p-6">
//       <Title level={2} className="mb-6">
//         Associate with Parent
//       </Title>

//       {error && (
//         <Alert
//           message={error}
//           type="error"
//           showIcon
//           className="mb-6 max-w-2xl mx-auto"
//         />
//       )}

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <Spin tip="Loading link requests..." size="large" />
//         </div>
//       ) : linkRequests.length > 0 ? (
//         <div className="space-y-4">
//           {linkRequests.map((request) => (
//             <Card
//               key={`${request.parentId}-${request.studentId}`}
//               title="Parent Link Request"
//               className="shadow-md"
//             >
//               <Row gutter={[16, 16]}>
//                 <Col span={12}>
//                   <Text strong>Full Name:</Text>
//                   <Text className="block">{request.parent.fullName}</Text>
//                 </Col>
//                 <Col span={12}>
//                   <Text strong>Email:</Text>
//                   <Text className="block">{request.parent.email}</Text>
//                 </Col>
//                 <Col span={12}>
//                   <Text strong>Username:</Text>
//                   <Text className="block">{request.parent.username}</Text>
//                 </Col>
//               </Row>
//               <div className="flex gap-4 mt-4">
//                 <Button
//                   type="primary"
//                   onClick={() => handleRespondToRequest(request.parentId, true)}
//                   disabled={loading}
//                 >
//                   Confirm
//                 </Button>
//                 <Button
//                   danger
//                   onClick={() => handleRespondToRequest(request.parentId, false)}
//                   disabled={loading}
//                 >
//                   Decline
//                 </Button>
//               </div>
//             </Card>
//           ))}
//         </div>
//       ) : (
//         <p>No link requests found.</p>
//       )}
//     </div>
//   );
// }

// export default StudentAssociate;

import React, { useState, useEffect } from "react";
import { Button, Card, Spin, Alert, Typography, Row, Col } from "antd";
import { toast } from "react-toastify";
import api from "../../config/axios";

const { Title, Text } = Typography;

function StudentAssociate() {
  const [linkRequests, setLinkRequests] = useState([]);
  const [linkedParents, setLinkedParents] = useState([]); // Thêm state để lưu danh sách phụ huynh đã liên kết
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Lấy danh sách yêu cầu liên kết
  const fetchLinkRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/api/parent-student/link-requests");
      console.log("Link Requests Data:", response.data); // Log dữ liệu để kiểm tra
      setLinkRequests(response.data);
    } catch (error) {
      setError(error.response?.data || "Failed to fetch link requests");
      toast.error(error.response?.data || "Failed to fetch link requests");
    } finally {
      setLoading(false);
    }
  };

    // Lấy danh sách phụ huynh đã liên kết
    const fetchLinkedParents = async () => {
      try {
        const response = await api.get("/api/parent-student/parents");
        setLinkedParents(response.data);
      } catch (error) {
        toast.error(error.response?.data || "Failed to fetch linked parents");
      }
    };

  // Xác nhận hoặc từ chối yêu cầu liên kết
  const handleRespondToRequest = async (parentId, confirm) => {
    if (!parentId) {
      toast.error("Parent ID is undefined. Cannot process the request.");
      return;
    }
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

  const handleCancelLink = async (parentId) => {
    setLoading(true);
    try {
      await api.post(`/api/parent-student/cancel-link?parentId=${parentId}`);
      toast.success("Link cancelled successfully");
      fetchLinkedParents(); // Làm mới danh sách phụ huynh đã liên kết
    } catch (error) {
      toast.error(error.response?.data || "Failed to cancel link");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinkRequests();
    fetchLinkedParents();
  }, []);

  return (
    <div className="p-6">
      <Title level={2} className="mb-6">
        Associate with Parent
      </Title>

      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          className="mb-6 max-w-2xl mx-auto"
        />
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin tip="Loading link requests..." size="large" />
        </div>
      ) : linkRequests.length > 0 ? (
        <div className="space-y-4">
          {linkRequests.map((request) => (
            <Card
              key={`${request.id.parentId}-${request.id.studentId}`} // Sửa key để dùng id
              title="Parent Link Request"
              className="shadow-md"
            >
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Text strong>Full Name:</Text>
                  <Text className="block">{request.parent.fullName}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Email:</Text>
                  <Text className="block">{request.parent.email}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Username:</Text>
                  <Text className="block">{request.parent.username}</Text>
                </Col>
              </Row>
              <div className="flex gap-4 mt-4">
                <Button
                  type="primary"
                  onClick={() => handleRespondToRequest(request.id.parentId, true)} // Sửa thành request.id.parentId
                  disabled={loading}
                >
                  Confirm
                </Button>
                <Button
                  danger
                  onClick={() => handleRespondToRequest(request.id.parentId, false)} // Sửa thành request.id.parentId
                  disabled={loading}
                >
                  Decline
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p>No link requests found.</p>
      )}

      {/* Hiển thị danh sách phụ huynh đã liên kết */}
      <div className="mt-8">
  <Title level={4} className="mb-4">
    Linked Parents
  </Title>
  {linkedParents.length > 0 ? (
    <div className="space-y-4">
      {linkedParents.map((parent) => (
        <Card key={parent.userID} title="Linked Parent" className="shadow-md">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Text strong>Full Name:</Text>
              <Text className="block">{parent.fullName}</Text>
            </Col>
            <Col span={12}>
              <Text strong>Email:</Text>
              <Text className="block">{parent.email}</Text>
            </Col>
            <Col span={12}>
              <Text strong>Username:</Text>
              <Text className="block">{parent.username}</Text>
            </Col>
          </Row>
          <Button
            danger
            onClick={() => handleCancelLink(parent.userID)}
            disabled={loading}
            className="mt-4"
          >
            Cancel Link
          </Button>
        </Card>
      ))}
    </div>
  ) : (
    <p>No linked parents found.</p>
  )}
</div>


    </div>
  );
}

export default StudentAssociate;