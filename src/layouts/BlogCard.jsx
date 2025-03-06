import React from "react";

const BlogCard = ({ img, headlines, content, fullContent, onClick }) => {
  return (
    <div 
      className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white shadow-md rounded-lg cursor-pointer hover:scale-105 transition duration-300 ease-in-out"
      onClick={onClick}
    >
      <img
        className="h-56 w-full object-cover rounded-lg"
        src={img}
        alt="blog-img"
      />
      <div className="p-4">
        <h2 className="text-lg text-center font-semibold">{headlines}</h2>
        <p className="text-center text-sm text-gray-600 mt-1">
          {content.length > 100 ? content.substring(0, 100) + "..." : content}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
