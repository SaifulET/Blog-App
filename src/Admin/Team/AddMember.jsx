import { useState } from "react";
import axios from "axios";
import AdminNavbar from "../AdminNavbar";
import toast from "react-hot-toast";
import { Link ,useNavigate} from 'react-router-dom';
import Sticky from 'react-sticky-el';
const AddMember= () => {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    image: null,
    des: "",
    role:"",
  });
  const handleFile=(e)=>{
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file, // Store the file object
      });
    }
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Update state dynamically
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name,des,role} = formData;
    if (!name.trim() || !des.trim() || !role.trim()) {
      alert("All fields are required!");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("name", formData.name);
    uploadData.append("des", formData.des);
    uploadData.append("role", formData.role);
    uploadData.append("file", formData.image);
    console.log(formData.image,uploadData);
    try {
      const response= await axios.post("http://localhost:5000/api/CreateMember", uploadData);
    toast.success(response.data.message,{position:"top-right"});
    navigate("/Teams")

    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item.");
    }
  };

  return (
<div className="dflex">
<Sticky><AdminNavbar name="Teams"></AdminNavbar></Sticky>
<div className="addUser">
          <Link to="/teams"type="button" className="btn btn-secondary"><i className="fa-solid fa-backward"></i> Back</Link>
          <h3>Create New Team Member</h3>
          <form className="addUserForm" onSubmit={handleSubmit}>
            <div className="InputGroup">
              <label htmlFor="Name">Name: </label>
              <input onChange={handleChange} type="text" name="name" id="name"autoComplete="off" placeholder="Enter the Name " />
            </div>
            <div className="InputGroup">
           <label htmlFor="image">Image:</label>
            <input
          type="file"
          name="image"
          id="image"
          placeholder=""
          onChange={handleFile}
          required/>
           </div> 
            <div className="InputGroup">
              <label htmlFor="des">Designation: </label>
              <input onChange={handleChange} type="text" name="des" id="des"autoComplete="off" placeholder="Enter the Designation " />
            </div>
            <div className="InputGroup">
              <label htmlFor="role">Role: </label>
              <input onChange={handleChange} type="text" name="role" id="role"autoComplete="off" placeholder="Enter the role " />
            </div>
            <div className="InputGroup">
            <button type="submit" className="btn btn-info">Submit</button>
            </div>
          </form>
          
        </div>

        </div>



    
  );
};

export default AddMember;
