<<<<<<< HEAD
import React from "react";
import Button from "../layouts/Button";
import BlogCard from "../layouts/BlogCard";
import img1 from "../assets/img/blog1.jpg";
import img2 from "../assets/img/blog2.jpg";
import img3 from "../assets/img/blog3.jpg";
import img4 from "../assets/img/blog4.jpg";
import img5 from "../assets/img/blog5.jpg";
import img6 from "../assets/img/blog6.jpg";

const Blogs = () => {
  return (
    <div className=" min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-24">
      <div className=" flex flex-col items-center lg:flex-row justify-between">
        <div>
          <h1 className=" text-4xl font-semibold text-center lg:text-start">
            Latest Post
          </h1>
          <p className=" mt-2 text-center lg:text-start">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus,
            quidem.
          </p>
        </div>
        <div className=" mt-4 lg:mt-0">
          <Button title="Our Articles" />
        </div>
      </div>
      <div className=" my-8">
        <div className=" flex flex-wrap justify-center gap-5">
          <BlogCard img={img1} headlines="Unraveling the Mysteries of Sleep" />
          <BlogCard img={img2} headlines="The Heart-Healthy Diet" />
          <BlogCard
            img={img3}
            headlines="Understanding Pediatric Vaccinations"
          />
          <BlogCard img={img4} headlines="Navigating Mental Health" />
          <BlogCard img={img5} headlines="The Importance of Regular Exercise" />
          <BlogCard img={img6} headlines="Skin Health 101" />
        </div>
      </div>
    </div>
  );
};

export default Blogs;
=======
import { useState } from "react";
import BlogCard from "../layouts/BlogCard";

const blogs = [
  {
    id: 1,
    img: "src/assests1/Blog/tinhthan_suc_khoe_tinh_than_1_47bd08cd54.jpg",
    headlines: "Mental Health: Why Is It Important and How to Improve It?",
    content: <p>
      What is mental health, its importance and how to improve it?. Let's learn useful information about mental health and how to improve it.
    </p>,
    fullContent: <p>
      What is mental health?
       Mental health is an integral part of a person's overall health. According to the definition of the World Health Organization (WHO), mental health is a state in which a person realizes his or her own abilities, can cope with normal stresses, still work productively and make a contribution to the community.
       Factors affecting mental health
       Living environment: The place where you live, work and study can cause stress and affect your mental health if it is unsafe and unstable.
       Health status: Problems such as illness, injury, infection, etc. can cause discomfort, anxiety and stress.
       Social relationships: Social relationships, including family, friends, colleagues, partners and people around you can affect your mental health.
       Work and finances: A job with high pressure, difficulty, lack of resources or unsuitability can cause stress and affect your mental health. Poor finances can also cause stress and anxiety.
       Lifestyle habits: Lifestyle habits, including diet, exercise, sleep, and harmful habits (e.g. smoking, drinking).
    </p>
  },
  {
    id: 2,
    img: "src/assests1/Blog/tinhthan_tram_cam_la_gi_dau_hieu_nguyen_nhan_va_cach_dieu_tri_1_362aee6ea8.jpg",
    headlines: "What is Depression? Signs, Causes and Treatment",
    content: "Depression is one of the most common mental health conditions worldwide, yet it is often underestimated or abused due to misunderstandings.",
    fullContent: <p>
      What is depression?
      Depression is a common mental disorder that affects a person's mood, energy, interest, and functioning. Depression can occur at any age, but is most common between the ages of 18 and 45.
      Depression can be caused by a variety of factors, including genetics, stress, life events, hormonal disorders, physical illness, and substance abuse. Depression can be divided into different types, depending on the severity, duration, and cause of the illness.
    </p>
  },
  {
    id: 2,
    img: "src/assests1/Blog/two-friendsholding-hands-in-a-coffee-shop-.jpg",
    headlines: "How do I know if they have depression?",
    content: "The first step is to understand what depression is and what are the signs and symptoms. Major depressive disorder is different from the average person’s low moods, which fluctuate in response to the ups and downs of daily life. Unlike general low moods or mood shifts, depression involves a loss of pleasure or interest in activities and low moods for a prolonged period",
    fullContent: <p>
      The first step is to understand what depression is and what are the signs and symptoms. Major depressive disorder is different from the average person’s low moods, which fluctuate in response to the ups and downs of daily life. Unlike general low moods or mood shifts, depression involves a loss of pleasure or interest in activities and low moods for a prolonged period. It will usually affect all different aspects of a person’s life, from sleep, appetite, libido, relationships, work, self-worth, motivation, to life administration. You can read more in our posts on a comprehensive list of common signs your partner could have depression, as well as how to identify more easily overlooked signs of depression.
It’s important to be able to identify these signs in our loved ones as depression can make someone think, feel, and behave in a way that is not typically them. It can be helpful if you lower your expectations of your loved one. They are going through a lot, more than you can likely comprehend, so they are not functioning at full capacity
    </p>
  },
  {
    id: 2,
    img: "src/assests1/Blog/sixteen-miles-out-odfefv-y2v0-unsplash-1800x1473.jpg",
    headlines: "Help, I Need a Social Anxiety Psychologist!",
    content: "We all get a little nervous, anxious, or shy in social situations, particularly if we have to do something challenging like make a big speech in front of a room of people. Scary, right?! Like a lot of things, anxiety in social situations can occur on a spectrum.",
    fullContent: <p>
      Social Anxiety Disorder Criteria
There are a few main factors that indicate social anxiety disorder, otherwise known as SAD.
The main indicator is the presence of a persistent fear that you will be judged negatively by others.
Understandably so, this can lead to avoiding situations that may trigger this fear, usually meaning the person avoids social situations.
Due to this fear, there is a high level of anxiety felt – this is usually out of proportion to the situation.
The fear and anxiety have a significant impact on your day-to-day living.
    </p>
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
>>>>>>> quynh-hoa1
