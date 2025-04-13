import { useState,useEffect } from 'react';
import { useNavigate} from "react-router-dom";
import './User.css'
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import AdminNavbar from '../AdminNavbar';
import Sticky from 'react-sticky-el';
const User = () => {
   const navigate = useNavigate();
   useEffect(() => {
    axios
        .get("http://localhost:5000/api/home",)
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
        fetch("http://localhost:5000/api/findAll")
          .then((res) => res.json())
          .then((data) => {
            console.log("API Response:", data.users);
            setUsers(Array.isArray(data.users) ? data.users : []); // Ensure it's an array
          })
          .catch((error) => console.error("Error fetching users:", error));
      }, []);
    
      

    const UserDelete=async(userID)=>{
        await axios
        .delete("http://localhost:5000/api/UserDelete/"+userID)
        .then((Response)=>{
          setUsers((preuser)=>preuser.filter((user)=> user._id!==userID))
          toast.success(Response.data.message,{position:'top-right'});
        })
        .catch(error=>console.log(error))
    }
    return (
      <div className="dflex">
        <Sticky><AdminNavbar></AdminNavbar></Sticky>
        <div className="userTable">
          {/* <div className="dflex">
          <Link to="/add" type="button" className="btn btn-primary">Add User <i className="fa-solid fa-user-plus"></i></Link>
          <Link to="/login" type="button"><Logout></Logout></Link>
          </div> */}
            
            {users.length===0?(
              <div className="noUser">
                <h3>No user At all </h3>
                <p>Add New User</p>
            </div>):(
              <table className="table table-bordered">
              <thead>
                  <tr>
                      <th>SL no.</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Message</th>
                      <th>Action</th>
                      
                  </tr>
              </thead>
              <tbody>
              {users.map((user,index) => 
              (
          <tr key={user._id }>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td className="message-column">{user.message}</td>

            <td className="actionButton">
              <button type="button"onClick={()=>UserDelete(user._id)} className='btn btn-danger'><i className="fa-solid fa-trash"></i></button>
            </td>
          </tr>
        ))}

             
                  
              </tbody>
          </table>
            )}
        </div>
      </div>    
        
    );
};

export default User;