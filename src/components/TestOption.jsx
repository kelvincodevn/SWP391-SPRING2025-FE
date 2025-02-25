import React from "react";

const tests = [
  { id: 1, name: "Test Toán", description: "Kiểm tra kiến thức Toán học" },
  { id: 2, name: "Test Tiếng Anh", description: "Đánh giá khả năng tiếng Anh" },
  { id: 3, name: "Test IQ", description: "Bài kiểm tra IQ" },
  { id: 4, name: "Test EQ", description: "Đánh giá trí tuệ cảm xúc" },
];

const TestSelectionPage = () => {
  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", textAlign: "center" }}>
      <h1>Chọn Bài Test</h1>
      <div>
        {tests.map((test) => (
          <div key={test.id} style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "15px", marginBottom: "10px" }}>
            <h2>{test.name}</h2>
            <p>{test.description}</p>
            <button style={{ padding: "8px 12px", cursor: "pointer" }}>Bắt đầu</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestSelectionPage;
