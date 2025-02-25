import React from "react";

<<<<<<< HEAD
const BlogCard = ({ img, headlines }) => {
  return (
    <div className=" w-full lg:w-1/4 p-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] space-y-2 rounded-lg cursor-pointer hover:scale-105 transition duration-300 ease-in-out">
      <img
        className=" h-64 md:h-96 lg:h-40 w-full rounded-lg"
        src={img}
        alt="img"
      />
      <h2 className=" text-lg text-center font-semibold">{headlines}</h2>
      <p className=" text-center text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
        repellendus suscipit. Rerum consequatur magni expedita.
      </p>
=======
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
>>>>>>> quynh-hoa1
    </div>
  );
};

export default BlogCard;
