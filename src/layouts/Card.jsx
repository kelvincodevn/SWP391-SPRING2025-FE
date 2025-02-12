import { Link } from "react-router-dom";

const cards = [
  {
    id: 1,
    title: "Take Survey",
    description: "Take a survey to assess your psychological status according to various types.",
    link: "#",
    icon: "🧪",
  },
  {
    id: 2,
    title: "View Document About Mental Health",
    description: "Access mental health educational materials, guides, and research papers.",
    link: "/mental-health-resources", // ✅ Navigates to the resource list
    icon: "🛡️",
  },
  {
    id: 3,
    title: "Psychology Seminar",
    description: "Join seminars to learn more about psychological health.",
    link: "#",
    icon: "💖",
  },
];

export default function MentalHealthCards() {
  return (
    <div className="p-6 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
      {cards.map((card) => (
        <Link to={card.link} key={card.id} className="block">
          <div className="p-6 bg-white shadow-lg rounded-lg text-center border hover:shadow-xl transition">
            <div className="text-3xl mb-2">{card.icon}</div>
            <h2 className="text-lg font-bold">{card.title}</h2>
            <p className="text-gray-600">{card.description}</p>
            <span className="text-teal-500 mt-2 inline-block">Learn more</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
