import { useState,useEffect } from 'react';
import { useNavigate} from "react-router-dom";
import '../getUser/User.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import AdminNavbar from '../AdminNavbar';
import Sticky from 'react-sticky-el';
import Loader from './../../component/loader';
const Members = () => {
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
    axios.get('/findAllMembers')
      .then((res) => {
        setLoading(false)
        const data = res.data;
        setUsers(Array.isArray(data.data) ? data.data : []);
      })
      .catch((error) => {
        console.error('Error fetching Services:', error);
      });
  }, []);
    
      

    const UserDelete=async(userID)=>{
        await axios
        .delete("/DeleteMember/"+userID)
        .then((Response)=>{
          setUsers((preuser)=>preuser.filter((user)=> user._id!==userID))
          toast.success(Response.data.message,{position:'top-right'});
        })
        .catch(error=>console.log(error))
    }
    return (
      <div className="dflex">
        <Sticky><AdminNavbar name="Teams"></AdminNavbar></Sticky>
        <div className="userTable">
          <div className="dflex">
          <Link to="/addMember" type="button" className="btn btn-primary">Add Member <i className="fa-solid fa-user-plus"></i></Link>
          </div>
            
            {users.length==0?(
              <div className="noUser">
                <h3>No Team and Member At all </h3>
                <p>Add New Member</p>
            </div>):(
            <table className="table table-bordered">
              <thead>
                  <tr>
                      <th>SL no.</th>
                      <th>Name</th>
                      <th>Image</th>
                      <th>Designation</th>
                      <th>Role</th>
                      <th>Action</th>
                      
                  </tr>
              </thead>
              {loading?<Loader/>:<tbody>
              {users.map((user,index) => 
              (
          <tr key={user._id }>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>
              <img 
                 src={user.image} 
                 alt="Stored" 
                 width="200" 
                />
             </td>
            <td>{user.des}</td>
            <td className="message-column">{user.role}</td>

            <td className="actionButton">
              <Link to={`/updateMemberInfo/${user._id}`} type="button" className='btn btn-info'><i className="fa-solid fa-pen-to-square"></i></Link>
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

export default Members;