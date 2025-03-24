// parent-associate.jsx
import React, { useEffect, useState } from "react";
import { Button, Card, Input, Spin, Alert, Typography, Row, Col } from "antd";
import { toast } from "react-toastify";
import api from "../../config/axios";

const { Title, Text } = Typography;

function ParentAssociate() {
  const [email, setEmail] = useState("");
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [linkedStudents, setLinkedStudents] = useState([]);

  // Tìm kiếm học sinh theo email
  const handleSearchStudent = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/api/parent-student/search-student?email=${email}`);
      setStudent(response.data);
    } catch (error) {
      setError(error.response?.data || "Student not found");
      toast.error(error.response?.data || "Student not found");
      setStudent(null);
    } finally {
      setLoading(false);
    }
  };

  // Gửi yêu cầu liên kết
  const handleSendRequest = async () => {
    setLoading(true);
    try {
      await api.post(`/api/parent-student/send-request?studentId=${student.userID}`);
      toast.success("Link request sent successfully");
      setStudent(null);
      setEmail("");
      fetchLinkedStudents(); // Cập nhật danh sách học sinh đã liên kết
    } catch (error) {
      toast.error(error.response?.data || "Failed to send link request");
    } finally {
      setLoading(false);
    }
  };

//   // Lấy danh sách học sinh đã liên kết
//   const fetchLinkedStudents = async () => {
//     try {
//       const response = await api.get("/api/parent-student/students");
//       setLinkedStudents(response.data);
//     } catch (error) {
//       toast.error(error.response?.data || "Failed to fetch linked students");
//     }
//   };

const fetchLinkedStudents = async () => {
    // setFetchLoading(true);
    try {
      const response = await api.get("/api/parent-student/students");
      console.log("Linked Students Data:", response.data);
      // Đảm bảo linkedStudents luôn là mảng
      const data = Array.isArray(response.data) ? response.data : [];
      setLinkedStudents(data);
    } catch (error) {
      toast.error(error.response?.data || "Failed to fetch linked students");
      setLinkedStudents([]);
    // } finally {
    //   setFetchLoading(false);
    }
  };

  // Lấy danh sách học sinh đã liên kết khi trang được tải
  useEffect(() => {
    fetchLinkedStudents();
  }, []);

  return (
    <div className="p-6">
      <Title level={2} className="mb-6">
        Associate with Student
      </Title>

      {/* Phần tìm kiếm và gửi yêu cầu liên kết */}
      <div className="mb-8">
        <Title level={4} className="mb-4">
          Link a Student Account
        </Title>
        <div className="flex gap-4 mb-4">
          <Input
            type="email"
            placeholder="Enter student's email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
          <Button
            type="primary"
            onClick={handleSearchStudent}
            disabled={loading}
            loading={loading}
          >
            Search
          </Button>
        </div>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            className="mb-4"
          />
        )}

        {student && (
          <Card title="Student Details" className="mb-4 shadow-md">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Text strong>Full Name:</Text>
                <Text className="block">{student.fullName}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Email:</Text>
                <Text className="block">{student.email}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Username:</Text>
                <Text className="block">{student.username}</Text>
              </Col>
            </Row>
            <Button
              type="primary"
              onClick={handleSendRequest}
              disabled={loading}
              className="mt-4"
            >
              {loading ? "Sending..." : "Send Link Request"}
            </Button>
          </Card>
        )}
      </div>

      {/* Danh sách học sinh đã liên kết */}
      <div>
        <Title level={4} className="mb-4">
          Linked Students
        </Title>
        {linkedStudents.length > 0 ? (
          <div className="space-y-4">
            {linkedStudents.map((student) => (
              <Card key={student.userID} title="Linked Student" className="shadow-md">
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Text strong>Full Name:</Text>
                    <Text className="block">{student.fullName}</Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>Email:</Text>
                    <Text className="block">{student.email}</Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>Username:</Text>
                    <Text className="block">{student.username}</Text>
                  </Col>
                </Row>
              </Card>
            ))}
          </div>
        ) : (
          <p>No linked students found.</p>
        )}
      </div>
    </div>
  );
}

export default ParentAssociate;