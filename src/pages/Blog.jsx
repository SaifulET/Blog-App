
import { Link } from "react-router-dom";
import "../assets/Blog.css"
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { useState,useEffect } from 'react';
import axios from "axios";
import { motion } from "framer-motion";
import Skeleton from "../component/Skeleton";


const Blog = () => {
  const elements=[];
  for(let i=0;i<8;i++){
    elements.push(
      <Skeleton></Skeleton>
    )
  }

  const [users , setUsers]=useState([])
  const [loading,setLoading]=useState(true)
  useEffect(() => {
    axios.get('/findAllBlog')
      .then((res) => {
        setLoading(false)
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
      <div className="blog-flex-blog">{elements}</div>
      {loading?<div className="blog-flex-blog">{elements}</div>:
      <div className=" blog-flex-blog">
        {users.map((blog,i) => (
          <motion.div
          key={i}
          initial={{scale: 0.5, opacity: 0}}
          whileInView={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }}
          className="shadow-sm"
        >
          <Link key={blog._id} to={`/blog/${blog._id}`} className="card blog-card">
            <img src={blog.thumbnail} alt={blog.title} className="blog-image" />
            <h3 className="blog-heading">{blog.title}</h3>
            <p className="blog-description">{blog.description}</p>
          </Link>
          </motion.div>    
        ))}
      </div>}
      <Footer></Footer>
    </div>
  );
};

export default Blog;
