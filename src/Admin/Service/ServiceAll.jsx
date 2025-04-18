import { useState,useEffect } from 'react';
import { useNavigate} from "react-router-dom";
// import './User.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import AdminNavbar from '../AdminNavbar';
import Sticky from 'react-sticky-el';
import Loader from '../../component/loader';
const ServiceAll = () => {
  const [loading,setLoading]=useState(true);
   const navigate = useNavigate();
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
    axios.get('/findAllService')
      .then((res) => {
        const data = res.data;
        setLoading(false);
        setUsers(Array.isArray(data.users) ? data.users : []);
      })
      .catch((error) => {
        console.error('Error fetching Services:', error);
      });
  }, []);
    
      

    const UserDelete=async(userID)=>{
        await axios
        .delete("/DeleteService/"+userID)
        .then((Response)=>{
          setUsers((preuser)=>preuser.filter((user)=> user._id!==userID))
          toast.success(Response.data.message,{position:'top-right'});
        })
        .catch(error=>console.log(error))
    }
    return (
      <div className="dflex">
        <Sticky><AdminNavbar name="Services"></AdminNavbar></Sticky>
        <div className="userTable">
          <div className="dflex">
          <Link to="/addService" type="button" className="btn btn-primary">Add Service <i className="fa-solid fa-user-plus"></i></Link>
          </div>
            
            {users.length===0?(
              <div className="noUser">
                <h3>No Service At all </h3>
                <p>Add New Service</p>
            </div>):(
              <table className="table table-bordered">
              <thead>
                  <tr>
                      <th>SL no.</th>
                      <th>title</th>
                      <th>Icon</th>
                      <th>Description</th>
                      <th>Action</th>
                      
                  </tr>
              </thead>
              {loading?<Loader/>:<tbody>
              {users.map((user,index) => 
              (
          <tr key={user._id }>
            <td>{index + 1}</td>
            <td>{user.title}</td>
            <td>{<div dangerouslySetInnerHTML={{ __html:user.icon }} />}</td>
            <td className="message-column">{user.description}</td>

            <td className="actionButton">
              <Link to={`/updateService/${user._id}`} type="button" className='btn btn-info'><i className="fa-solid fa-pen-to-square"></i></Link>
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

export default ServiceAll;