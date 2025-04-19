
import { useParams, Link } from "react-router-dom";
import "../assets/Blog.css"; // Styling for blog details
import Navbar from "./Navbar";
import { useState,useEffect } from 'react';
import axios from "axios"
import Loader from "./loader";
import { motion } from "framer-motion";





const BlogDetails = () => {

  const {id} =useParams();
  const [loading,setLoading]=useState(true);
  const [users , setUsers]=useState([])
    
       
    
        useEffect(() => {
          axios.get(`/findBlogById/${id}`)
          .then((response)=>{
              setLoading(false);
              setUsers(response.data.user)
              
          })
          .catch(error => console.error("Error fetching user:", error));
          }, [id]);

  // const blog = blogs.find((b) => b.id === parseInt(id));

  if (!users) {
    return (<div className="blog-details">
        <Navbar></Navbar>
        <h2>Blog not found!</h2>
        <Link to="/blog" className="back-btn">← Back to Blogs</Link>
        </div>);
  }

  return (
    
    <div className="blog-details">
        <Navbar></Navbar>
        {loading?<Loader/>:
        <div className="container">
          
      <h2>{users.title}</h2>
      <motion.div
                  
                  initial={{scale: 0.5, opacity: 0 }}
                  whileInView={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  viewport={{ once: true}}
                >
      <img src={users.thumbnail} alt={users.thumbnail} className="blog-full-image" />
      </motion.div> <p className="text-start"><div dangerouslySetInnerHTML={{ __html: users.content }} /></p>
      <Link to="/blog" className="back-btn">← Back to Blogs</Link>
      </div>
      }
    </div>
  );
};

export default BlogDetails;
