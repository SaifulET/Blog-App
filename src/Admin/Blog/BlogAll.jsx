import { useState,useEffect } from 'react';
import { useNavigate} from "react-router-dom";
// import './User.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import AdminNavbar from '../AdminNavbar';
 import Sticky from 'react-sticky-el';
import Loader from '../../component/loader';

 const ExpandableText = ({ text, limit }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <p>
        {expanded ? text : text.slice(0, limit) + "..."}
      </p>
      <button style={{
          marginTop: "4px",
          padding: "4px 4px",
          fontSize: "6px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          backgroundColor: expanded ? "#dc3545" : "#007bff", // Red when expanded, Blue when collapsed
          color: expanded ? "white" : "white",
        }} onClick={() => setExpanded(!expanded)}>
        {expanded ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};


const BlogAll = () => {
  const [loading,setLoading]=useState(true);
   const navigate = useNavigate();
   const extractTextFromHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };
   useEffect(() => {
    axios
        .get("/home",)
        .then((result) => {
            if (result.data !== "success") {
                navigate("/login"); 
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            navigate("/login"); 
        });
}, [navigate]);
   const [users , setUsers]=useState([])

   

   useEffect(() => {
    axios.get('/findAllBlog')
      .then((res) => {
        setLoading(false);
        setUsers(Array.isArray(res.data.users) ? res.data.users : []);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);
    
      

    const UserDelete=async(userID)=>{
        await axios
        .delete("/DeleteBlog/"+userID)
        .then((Response)=>{
          setUsers((preuser)=>preuser.filter((user)=> user._id!==userID))
          toast.success(Response.data.message,{position:'top-right'});
        })
        .catch(error=>console.log(error))
    }
    return (
      <div className="dflex">
        <Sticky><AdminNavbar name="Blogs"></AdminNavbar></Sticky>
        <div className="userTable">
          <div className="dflex">
          <Link to="/addBlog" type="button" className="btn btn-primary">Add Blog <i className="fa-solid fa-user-plus"></i></Link>
          </div>
            
            {users.length===0?(
              <div className="noUser">
                <h3>No Blog At all </h3>
                <p>Add New Blog</p>
            </div>):(
              <table className="table table-bordered">
              <thead>
                  <tr>
                      <th>SL no.</th>
                      <th>title</th>
                      <th>thumbnail</th>
                      <th>Description</th>
                      <th>Content</th>
                      <th>Action</th>
                      
                  </tr>
              </thead>
              {loading?<Loader/>:<tbody>
              {users.map((user,index) => 
              (
          <tr key={user._id }>
            <td>{index + 1}</td>
            <td>{user.title}</td>
            <td>{user.thumbnail && (
        <img
          src={user.thumbnail}
          alt="Preview"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
      )}</td>
            <td className="message-column">{user.description}</td>
            <td className="message-column" ><ExpandableText text={extractTextFromHtml(user.content)} limit={30} /></td>
            <td className="actionButton">
              <Link to={`/updateBlog/${user._id}`} type="button" className='btn btn-info'><i className="fa-solid fa-pen-to-square"></i></Link>
              <button type="button"onClick={()=>UserDelete(user._id)} className='btn btn-danger'><i className="fa-solid fa-trash"></i></button>
            </td>
          </tr>
        ))}

             
                  
              </tbody>}
          </table>
            )}
        </div>
      </div>    
        
    );
};

export default BlogAll;