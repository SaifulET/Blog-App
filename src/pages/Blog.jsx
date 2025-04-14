
import { Link } from "react-router-dom";
import "../assets/Blog.css"
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { useState,useEffect } from 'react';
import axios from "axios";

const Blog = () => {
  const [users , setUsers]=useState([])
  
  useEffect(() => {
    axios.get('/findAllBlog')
      .then((res) => {
        setUsers(Array.isArray(res.data.users) ? res.data.users : []);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div className="blog-container">
      <Navbar></Navbar>
      <h2 className="blog-title"> Blogs </h2>
      <div className="blog-grid">
        {users.map((blog) => (
          <Link key={blog._id} to={`/blog/${blog._id}`} className="blog-card">
            <img src={blog.thumbnail} alt={blog.title} className="blog-image" />
            <h3 className="blog-heading">{blog.title}</h3>
            <p className="blog-description">{blog.description}</p>
          </Link>
        ))}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Blog;
