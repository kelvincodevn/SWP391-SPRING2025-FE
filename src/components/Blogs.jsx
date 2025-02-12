import { useState } from "react";
import BlogCard from "../layouts/BlogCard";

const blogs = [
  {
    id: 1,
    img: "https://via.placeholder.com/150",
    headlines: "How to Learn React",
    content: "React is a JavaScript library for building user interfaces. It allows developers to build reusable UI components and manage state efficiently."
  },
  {
    id: 2,
    img: "https://via.placeholder.com/150",
    headlines: "Mastering Tailwind CSS",
    content: "Tailwind CSS is a utility-first CSS framework that makes it easy to build modern, responsive designs without writing custom CSS."
  },
  {
    id: 3,
    img: "https://via.placeholder.com/150",
    headlines: "Next.js for Beginners",
    content: "Next.js is a powerful React framework that enables server-side rendering and static site generation for optimized performance."
  },
  {
    id: 4,
    img: "https://via.placeholder.com/150",
    headlines: "Understanding JavaScript Closures",
    content: "Closures are a fundamental concept in JavaScript that allow functions to retain access to their lexical scope even when executed outside of their original context."
  },
  {
    id: 5,
    img: "https://via.placeholder.com/150",
    headlines: "A Guide to CSS Grid",
    content: "CSS Grid is a powerful layout system in CSS that enables developers to create complex web layouts with ease."
  },
  {
    id: 6,
    img: "https://via.placeholder.com/150",
    headlines: "Effective Debugging Techniques",
    content: "Debugging is an essential skill for developers. Learn techniques to efficiently identify and fix bugs in your code."
  }
];

export default function BlogBrowser() {
  const [selectedBlog, setSelectedBlog] = useState(null);
  
   
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Latest Blogs</h1>
      <div className="grid grid-cols-5 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {blogs.map((blog) => (
          <div key={blog.id} className="w-full" onClick={() => setSelectedBlog(blog)}>
            <BlogCard img={blog.img} headlines={blog.headlines} content={blog.content} />
          </div>
        ))}
      </div>

      {/* Pop-up Dialog */}
      {selectedBlog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50" onClick={() => setSelectedBlog(null)}>
          <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-2">{selectedBlog.headlines}</h2>
            <p className="text-gray-600 mb-4">{selectedBlog.content}</p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setSelectedBlog(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}