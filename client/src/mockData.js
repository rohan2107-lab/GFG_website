// src/mockData.js

export const mockBlogs = [
  {
    id: 1,
    title: 'Getting Started with MERN Stack',
    author: 'Tech Admin',
    date: 'Sep 16, 2025',
    content: 'A comprehensive guide to building a web application with MongoDB, Express, React, and Node.js. Learn the core principles and start your full-stack journey!',
    image: '/images/team.jpg',
  },
  {
    id: 2,
    title: 'A Guide to Competitive Programming',
    author: 'Code Master',
    date: 'Aug 28, 2025',
    content: 'Tips and tricks to excel in competitive programming and win contests. Focus on speed, precision, and problem decomposition.',
    image: '/images/team.jpg',
  },
  {
    id: 3,
    title: 'Top 5 Interview Questions for Beginners',
    author: 'PR Admin',
    date: 'Aug 10, 2025',
    content: 'Prepare for your first tech interview by mastering these foundational data structure and algorithm questions.',
    image: '/images/team.jpg',
  },
  // Add more blog objects here
];

export const teamMembers = [
  // Faculty 
  {
    id: 1,
    name: "Dr. Rajeev Bedi",
    position: "Chief Advisor",
    image: "/images/hod.jpg",
    category: "Advisors"
  },
  {
    id: 2,
    name: "Dr. Anshu Bhasin",
    position: "Faculty Advisor",
    image: "/images/anshu_mam.jpg",
    category: "Advisors"
  },
  // Campus Mantri
  {
    id: 3,
    name: "Alok Kumar Jha",
    position: "Campus Mantri",
    image: "/images/mantri.jpg",
    category: "Advisors"
  },

  // Core Team Leads
  {
    id: 4,
    name: "Priya Ranjan",
    position: "Head (Tech)",
    image: "/images/priya.jpg",
    category: "Core Team"
  },
    {
    id: 5,
    name: "Abhijeet",
    position: "Co-Head (Tech)",
    image: "/images/abhijeet.jpg",
    category: "Core Team"
  },
    {
    id: 6,
    name: "Rohan",
    position: "Executive (Tech)",
    image: "/images/rohan.jpg",
    category: "Core Team"
  },
  {
    id: 7,
    name: "Aayushi",
    position: "Head (Event M.)",
    image: "/images/ayushi.jpg",
    category: "Core Team"
  },
    {
    id: 8,
    name: "Vaishnavi",
    position: "Co-Head (Event M.)",
    image: "/images/vaishnavi.jpg",
    category: "Core Team"
  },
      {
    id: 9,
    name: "Prince Pawan",
    position: "Executive (Event M.)",
    image: "/images/prince.jpg",
    category: "Core Team"
  },
  {
    id: 10,
    name: "Sudeep",
    position: "Head (C&D)",
    image: "/images/sudeep.jpg",
    category: "Core Team"
  },
    {
    id: 11,
    name: "Manvir",
    position: "Co-Head (C&D)",
    image: "/images/manvir.jpg",
    category: "Core Team"
  },
    {
    id: 12,
    name: "Hitesh K.s.",
    position: "Executive (C&D)",
    image: "/images/hitesh.jpg",
    category: "Core Team"
  },
  {
    id: 13,
    name: "Anu",
    position: "Head (PR)",
    image: "/images/anu.jpg",
    category: "Core Team"
  },
    {
    id: 14,
    name: "Bismanl Kaur",
    position: "Co-Head (PR)",
    image: "/images/bisman.jpg",
    category: "Core Team"
  },
  {
    id: 15,
    name: "Vinayak",
    position: "Head (CC)",
    image: "/images/vinayak.jpg",
    category: "Core Team"
  },
  {
    id: 16,
    name: "Vikash Kumar",
    position: "Co-Head (CC)",
    image: "/images/vikash.jpg",
    category: "Core Team"
  },
    {
    id: 17,
    name: "Ananya",
    position: "Head (Media)",
    image: "/images/ananya.jpg",
    category: "Core Team"
  },
    {
    id: 18,
    name: "Himansh",
    position: "Co-Head (Media)",
    image: "/images/himansh.jpg",
    category: "Core Team"
  },
];

// src/mockData.js

// ... (Your existing mock data: mockBlogs, teamMembers)

export const mockEvents = [
  {
    id: 101,
    title: "GFG IKGPTU Hackathon 3.0",
    date: "October 28, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Auditorium Hall",
    description: "Our annual, flagship coding competition. Solve real-world problems and win exciting prizes!",
    status: "Upcoming",
    link: "#register-hackathon",
    image: "/images/team.jpg"
  },
  {
    id: 102,
    title: "DSA Workshop: Linked Lists",
    date: "October 10, 2025",
    time: "4:00 PM - 5:30 PM",
    location: "CSE Lab 305",
    description: "A deep dive into Linked Lists and their applications in competitive programming.",
    status: "Upcoming",
    link: "#register-dsa",
    image: "/images/team.jpg"
  },
  {
    id: 103,
    title: "Introduction to Web Development",
    date: "August 15, 2025",
    time: "10:00 AM - 1:00 PM",
    location: "Main Seminar Hall",
    description: "A beginner-friendly workshop on HTML, CSS, and JavaScript fundamentals.",
    status: "Past",
    link: "#view-photos",
    image: "/images/team.jpg"
  },
  {
    id: 104,
    title: "Tech Career Panel 2024",
    date: "April 5, 2025",
    time: "6:00 PM - 7:30 PM",
    location: "Online (Zoom)",
    description: "Panel discussion with alumni working at top tech companies.",
    status: "Past",
    link: "#view-recap",
    image: "/images/team.jpg"
  },
];