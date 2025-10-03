import React from 'react';
import BlogSection from '../components/Sections/BlogSection';
import { mockBlogs } from '../mockData'; // Make sure this file exists

const BlogPage = () => {
  return (
    <main>
      <BlogSection blogs={mockBlogs} />
    </main>
  );
};

export default BlogPage;