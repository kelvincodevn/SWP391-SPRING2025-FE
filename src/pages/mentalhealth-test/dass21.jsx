import React from "react";

const Dass21TestPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4">
      {/* Header */}
      <div className="w-full max-w-4xl text-center mt-10">
        <h1 className="text-3xl font-bold">Bài Test đánh giá Lo âu - Trầm cảm - Stress (DASS 21)</h1>
      </div>
      
      {/* Main Content */}
      <div className="w-full max-w-4xl mt-6 bg-white p-6 shadow-lg rounded-lg text-center">
        <h2 className="text-2xl font-bold text-teal-600">BÀI TEST ĐÁNH GIÁ LO ÂU, TRẦM CẢM, STRESS</h2>
        <h3 className="text-xl font-bold text-yellow-500">(DASS 21)</h3>
        <p className="mt-4 text-gray-600">
          Bài test (trắc nghiệm) DASS 21 là thang đo giúp đánh giá mức độ rối loạn lo âu, 
          trầm cảm, stress khá phổ biến hiện nay trong cộng đồng. Bài test này thường được sử dụng
          để đánh giá tình trạng tâm lý của những người gặp khó khăn trong cuộc sống.
        </p>
      </div>

      {/* Image */}
      <div className="mt-6 w-full max-w-4xl flex justify-center">
        <img src="src/assests1/mentalhealth-test/IMGS-SEPT-BLOG-D-960x540.jpg" alt="DASS 21 Test" className="rounded-lg shadow-lg w-full" />
      </div>

      {/* Start Button */}
      <div className="mt-10 mb-10">
        <button className="bg-yellow-400 text-white font-bold py-3 px-6 rounded-lg text-xl shadow-md hover:bg-yellow-500 transition">
          START
        </button>
      </div>
    </div>
  );
};

export default Dass21TestPage;