const TestCard = ({ title, description, image }) => {
    return (
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <img src={image} alt={title} className="w-full h-40 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-bold text-teal-600">{title}</h3>
          <p className="text-gray-600 mt-2">{description}</p>
        </div>
      </div>
    );
  };

  export default TestCard;