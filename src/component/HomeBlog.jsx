
import { Link,useNavigate } from "react-router-dom";
import "../assets/Blog.css"
import { useEffect,useState } from "react";
import axios from "axios";
import Loader from "./loader";
import { motion } from "framer-motion";
import Skeleton from "./Skeleton";


const animations = [
  { x: -50, opacity: 0 },  // slide from left
  { y: -50, opacity: 0 },  // slide from top
  { x: 50, opacity: 0 },   // slide from right
  { y: -25, opacity: 0 },   // slide from bottom
  { scale: 0.5, opacity: 0 }, // scale in
  // { rotate: -45, opacity: 0 } // rotate in
  { x:100, opacity: 0 } // rotate in
  
];

const HomeBlog = () => {
  const elements = [];
  for(let i=0;i<6;i++){
    elements.push(
      <Skeleton></Skeleton>
    )
  }



  const [users , setUsers]=useState([])
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get('/findAllBlog')
      .then((res) => {
        setLoading(false)
        const data = res.data;
        setUsers(Array.isArray(data.users) ? data.users : []);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

    const navigate = useNavigate();
  return (
    <div className="maindiv">
      {loading?<div className="blog-container"><div className="blog-flex">{elements}</div></div>:<div className="blog-containerr">
      <h2 className="blog-title">Latest Blogs</h2>
      <div className="blog-flex">
        {users.slice(-6).map((blog,i) => (

        <motion.div
            key={i}
            initial={animations[i]}
            whileInView={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.5 }}
            className="shadow-sm"
          >
          <Link key={blog._id} to={`/blog/${blog._id}`} className="blog-card">
            <img src={blog.thumbnail} alt={blog.title} className="blog-image" />
            <h3 className="blog-heading">{blog.title}</h3>
            <p className="blog-description">{blog.description}</p>
          </Link>

          </motion.div>          
          
        )) }
      </div>
      <button className="see-more-btn" onClick={() => navigate("/blog")}>
        See More
      </button>
    </div>}
    </div>
  );
};

export default HomeBlog;
