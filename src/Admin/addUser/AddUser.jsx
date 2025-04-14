import { useState,useEffect } from "react";
import "./addUser.css"
import axios from "axios"
import toast from "react-hot-toast";
import { Link ,useNavigate} from 'react-router-dom';
import AdminNavbar from "../AdminNavbar";
const AddUser = () => {
const navigate = useNavigate();
  const user={
    name:"",
    email:"",
    message:"",
  };
  const [add,setAdd]=useState(user);
  const InputChange=(e)=>{
    const {name,value}=e.target;
    console.log(name,value);
    setAdd({...add,[name]:value});
  }

    
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

const SubmitForm=async(e)=>{
    
    try {
      e.preventDefault();
      const response= await axios.post("/UserCreate",add);
      toast.success(response.data.message,{position:"top-right"});
      navigate("/user")

    } catch (error) {
      console.log(error)
    }
    
    
}
    return (
        <div className="dflex">
          <AdminNavbar></AdminNavbar>
          <div className="addUser">
          <Link to="/user"type="button" className="btn btn-secondary"><i className="fa-solid fa-backward"></i> Back</Link>
          <h3>Add New User</h3>
          <form className="addUserForm" onSubmit={SubmitForm}>
            <div className="InputGroup">
              <label htmlFor="name">Name: </label>
              <input onChange={InputChange} type="text" name="name" id="name"autoComplete="off" placeholder="Enter the Name " />
            </div>
            <div className="InputGroup">
              <label htmlFor="email">Email: </label>
              <input onChange={InputChange} type="email" name="email" id="email"autoComplete="off" placeholder="Enter the email " />
            </div>
            <div className="InputGroup">
              <label htmlFor="address">message: </label>
              <input onChange={InputChange} type="text" name="message" id="message"autoComplete="off" placeholder="Enter the message " />
            </div>
            <div className="InputGroup">
            <button type="submit" className="btn btn-info">Submit</button>
            </div>
          </form>
          
        </div>

        </div>
    );
};

export default AddUser;