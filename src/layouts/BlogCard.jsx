// import React from "react";

// const BlogCard = ({ img, headlines, content }) => {
//   return (
//     <div className="w-full md:w-1/2 lg:w-1/3 p-15 shadow-md rounded-lg cursor-pointer hover:scale-105 transition duration-300 ease-in-out">
//       <img
//         className="h-64 w-full object-cover rounded-lg"
//         src={img}
//         alt="blog-img"
//       />
//       <h2 className="text-lg text-center font-semibold mt-2">{headlines}</h2>
//       <p className="text-center text-sm text-gray-600 mt-1">
//         {content.length > 100 ? content.substring(0, 100) + "..." : content}
//       </p>
//     </div>
//   );
// };

// export default BlogCard;
import React from "react";

const BlogCard = ({ img, headlines, content }) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-5 shadow-lg rounded-xl cursor-pointer hover:scale-105 transition duration-300 ease-in-out bg-white">
      <img
        className="h-80 w-full object-cover rounded-t-xl"
        src={img}
        alt="blog-img"
      />
      <div className="p-5 text-center">
        <h2 className="text-xl font-semibold text-gray-800">{headlines}</h2>
        <p className="text-md text-gray-600 mt-3">
          {content.length > 150 ? content.substring(0, 150) + "..." : content}
        </p>
      </div>
    </div>
  );
};

const BlogList = ({ blogs }) => {
  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Latest Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogs.map((blog, index) => (
          <BlogCard key={index} img={blog.img} headlines={blog.headlines} content={blog.content} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
