
import { Link,useNavigate } from "react-router-dom";
import "../assets/Blog.css"
import { useEffect,useState } from "react";
import axios from "axios";
import Loader from "./loader";

const HomeBlog = () => {
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
      {loading?<Loader/>:<div className="blog-containerr">
      <h2 className="blog-title">Latest Blogs</h2>
      <div className="blog-flex">
        {users.slice(-6).map((blog) => (
          <Link key={blog._id} to={`/blog/${blog._id}`} className="blog-card">
            <img src={blog.thumbnail} alt={blog.title} className="blog-image" />
            <h3 className="blog-heading">{blog.title}</h3>
            <p className="blog-description">{blog.description}</p>
          </Link>
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
