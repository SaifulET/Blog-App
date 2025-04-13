
import { Link,useNavigate } from "react-router-dom";
import "../assets/Blog.css"
import { useEffect,useState } from "react";


const HomeBlog = () => {
  const [users , setUsers]=useState([])
      useEffect(() => {
          fetch("http://localhost:5000/api/findAllBlog")
            .then((res) => res.json())
            .then((data) => {
              setUsers(Array.isArray(data.users) ? data.users : []); // Ensure it's an array
            })
            .catch((error) => console.error("Error fetching users:", error));
        }, []);
    const navigate = useNavigate();
  return (
    <div className="maindiv">
      <div className="blog-containerr">
      <h2 className="blog-title">Latest Blogs</h2>
      <div className="blog-flex">
        {users.slice(-6).map((blog) => (
          <Link key={blog._id} to={`/blog/${blog._id}`} className="blog-card">
            <img src={blog.thumbnail} alt={blog.title} className="blog-image" />
            <h3 className="blog-heading">{blog.title}</h3>
            <p className="blog-description">{blog.description}</p>
          </Link>
        ))}
      </div>
      <button className="see-more-btn" onClick={() => navigate("/blog")}>
        See More
      </button>
    </div>
    </div>
  );
};

export default HomeBlog;
