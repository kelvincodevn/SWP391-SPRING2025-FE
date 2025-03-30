import { useState } from "react";
import BlogCard from "../layouts/BlogCard";

const blogs = [
  {
    id: 1,
    img: "src/assests1/Blog/tinhthan_suc_khoe_tinh_than_1_47bd08cd54.jpg",
    headlines: "Mental Health: Why Is It Important and How to Improve It?",
    content: (
      <p>
        Discover the core aspects of mental health, why it matters, and practical ways to enhance it every day.
      </p>
    ),
    fullContent: (
      <>
        <p className="mb-4">
          <strong>What is mental health?</strong><br />
          Mental health is not merely the absence of mental illness; it's a state of well-being in which an individual realizes their abilities, copes with normal life stresses, works productively, and contributes to their community.
        </p>
        <p className="mb-4">
          <strong>Why is it important?</strong><br />
          Good mental health improves our relationships, performance at work or school, physical health, and overall quality of life. Poor mental health can lead to disorders like depression, anxiety, and even chronic illnesses.
        </p>
        <p className="mb-4">
          <strong>How to improve it:</strong><br />
          - Practice mindfulness and meditation.<br />
          - Build a strong social network.<br />
          - Exercise regularly and maintain a healthy diet.<br />
          - Seek professional help when needed.
        </p>
        <p>
          <a href="https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            WHO – Mental Health Factsheet
          </a>
        </p>
      </>
    )
  },
  {
    id: 2,
    img: "src/assests1/Blog/tinhthan_tram_cam_la_gi_dau_hieu_nguyen_nhan_va_cach_dieu_tri_1_362aee6ea8.jpg",
    headlines: "What is Depression? Signs, Causes and Treatment",
    content: "Understand depression: one of the most common mental disorders, yet often misunderstood or overlooked.",
    fullContent: (
      <>
        <p className="mb-4">
          Depression is a complex mental health condition that affects how you feel, think, and handle daily activities.
        </p>
        <p className="mb-4">
          <strong>Common signs include:</strong><br />
          - Persistent sadness or low mood<br />
          - Fatigue, low energy<br />
          - Difficulty concentrating<br />
          - Changes in appetite or sleep<br />
          - Feelings of guilt or hopelessness
        </p>
        <p className="mb-4">
          <strong>Causes:</strong><br />
          Depression can result from a combination of genetic, biological, environmental, and psychological factors.
        </p>
        <p className="mb-4">
          <strong>Treatment options:</strong><br />
          - Psychotherapy (Cognitive Behavioral Therapy, Talk Therapy)<br />
          - Medication (Antidepressants)<br />
          - Lifestyle changes (exercise, social engagement, nutrition)
        </p>
        <p>
          <a href="https://www.nimh.nih.gov/health/topics/depression" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            NIMH – Understanding Depression
          </a>
        </p>
      </>
    )
  },
  {
    id: 3,
    img: "src/assests1/Blog/two-friendsholding-hands-in-a-coffee-shop-.jpg",
    headlines: "How Do I Know If They Have Depression?",
    content: "Learn how to recognize signs of depression in your loved ones and how to support them compassionately.",
    fullContent: (
      <>
        <p className="mb-4">
          Depression doesn't always look like sadness. Sometimes, it's silence, withdrawal, or simply "not being themselves."
        </p>
        <p className="mb-4">
          <strong>Key signs include:</strong><br />
          - Withdrawal from social interaction<br />
          - Loss of interest in things they once enjoyed<br />
          - Irritability or unusual emotional reactions<br />
          - Poor sleep, eating changes
        </p>
        <p className="mb-4">
          <strong>How to help:</strong><br />
          - Approach with empathy and without judgment<br />
          - Encourage them to talk or seek help<br />
          - Be patient — recovery is not linear
        </p>
        <p>
          <a href="https://www.healthline.com/health/depression/helping-someone-with-depression" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            Healthline – Supporting a Loved One With Depression
          </a>
        </p>
      </>
    )
  },
  {
    id: 4,
    img: "src/assests1/Blog/sixteen-miles-out-odfefv-y2v0-unsplash-1800x1473.jpg",
    headlines: "Help! I Need a Social Anxiety Psychologist!",
    content: "Understand the spectrum of social anxiety and when it’s time to get help from a professional.",
    fullContent: (
      <>
        <p className="mb-4">
          It's normal to feel nervous in social settings, but if fear of judgment causes you to avoid interaction entirely, it may be social anxiety disorder.
        </p>
        <p className="mb-4">
          <strong>Core symptoms include:</strong><br />
          - Intense fear of social situations<br />
          - Avoidance of group settings<br />
          - Physical symptoms like sweating, shaking, nausea<br />
          - Worrying for days or weeks before an event
        </p>
        <p className="mb-4">
          <strong>Treatment options:</strong><br />
          - Cognitive Behavioral Therapy (CBT)<br />
          - Exposure therapy<br />
          - Anti-anxiety medications
        </p>
        <p>
          <a href="https://adaa.org/understanding-anxiety/social-anxiety-disorder" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            ADAA – Social Anxiety Overview
          </a>
        </p>
      </>
    )
  },
];


export default function BlogBrowser() {
  const [selectedBlog, setSelectedBlog] = useState(null);
  
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Blogs Health Mental</h1>
      <h2>Mental health is the key to a happy life. Each article here will provide knowledge and guidance to help you maintain a strong spirit, deal with stress, and find balance in your life.
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden" onClick={() => setSelectedBlog(blog)}>
            <img src={blog.img} alt={blog.headlines} className="w-full h-56 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{blog.headlines}</h2>
              <p className="text-gray-600">{blog.content}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedBlog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 p-4" onClick={() => setSelectedBlog(null)}>
          <div className="bg-white p-6 rounded-lg max-w-2xl shadow-lg" onClick={(e) => e.stopPropagation()}>
            <img src={selectedBlog.img} alt={selectedBlog.headlines} className="w-full h-64 object-cover rounded-md mb-4" />
            <h2 className="text-2xl font-bold mb-4">{selectedBlog.headlines}</h2>
            <p className="text-gray-700 text-lg">{selectedBlog.fullContent}</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={() => setSelectedBlog(null)}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
}

