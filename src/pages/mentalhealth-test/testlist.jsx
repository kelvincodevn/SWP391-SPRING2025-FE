import TestCard from "../../components/templates/testcardTemplate";


const tests = [
  {
    title: "Bài Test đánh giá trầm cảm Beck",
    description: "Bài Test đánh giá trầm cảm Beck",
    image: "src/assests1/mentalhealth-test/images.jpg",
  },
  {
    title: "Bài Test trầm cảm trẻ vị thành niên RADS",
    description: "Bài test trầm cảm trẻ vị thành niên RADS (10 - 20 tuổi)",
    image: "src/assests1/mentalhealth-test/Salud-mental.png",
  },
  {
    title: "Bài Test đánh giá triệu chứng sức khỏe EarlySigns",
    description: "Bài test đánh giá triệu chứng sức khỏe EarlySigns",
    image: "src/assests1/mentalhealth-test/salud-mundial-1.jpg",
  },
  {
    title: "Bài Test đánh giá Lo âu - Trầm cảm - Stress (DASS 21)",
    description: "Bài Test đánh giá Lo âu - Trầm cảm - Stress (DASS 21)",
    image: "src/assests1/mentalhealth-test/IMGS-SEPT-BLOG-D-960x540.jpg",
  },
  {
    title: "Bài Test đánh giá mức độ trầm cảm sau sinh EPDS",
    description: "Bài Test đánh giá mức độ trầm cảm sau sinh EPDS",
    image: "src/assests1/mentalhealth-test/tải xuống.jpg",
  },
  {
    title: "Bài Test đánh giá lo âu ZUNG",
    description: "Bài Test đánh giá lo âu ZUNG",
    image: "src/assests1/mentalhealth-test/images (1).jpg",
  },
];

const TestList = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800">MENTAL HEALTH TEST</h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tests.map((test, index) => (
          <TestCard key={index} {...test} />
        ))}
      </div>
    </div>
  );
};

export default TestList;