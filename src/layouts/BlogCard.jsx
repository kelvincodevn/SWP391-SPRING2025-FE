import React from "react";

const BlogCard = ({ img, headlines, content }) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-15 shadow-md rounded-lg cursor-pointer hover:scale-105 transition duration-300 ease-in-out">
      <img
        className="h-64 w-full object-cover rounded-lg"
        src={img}
        alt="blog-img"
      />
      <h2 className="text-lg text-center font-semibold mt-2">{headlines}</h2>
      <p className="text-center text-sm text-gray-600 mt-1">
        {content.length > 100 ? content.substring(0, 100) + "..." : content}
      </p>
    </div>
  );
};

export default BlogCard;
