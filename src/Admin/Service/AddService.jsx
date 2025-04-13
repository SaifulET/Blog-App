import { useState } from "react";
import axios from "axios";
import AdminNavbar from "../AdminNavbar";
import toast from "react-hot-toast";
import { Link ,useNavigate} from 'react-router-dom';
import Sticky from 'react-sticky-el';
const AddService = () => {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    icon: "",
    description: "",
  });

  const openBootstrapIcons = () => {
    window.open("https://icons.getbootstrap.com/", "_blank"); // Open Bootstrap Icons page
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Update state dynamically
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, icon, description } = formData;

    if (!title.trim() || !icon.trim() || !description.trim()) {
      alert("All fields are required!");
      return;
    }

    try {
      const response= await axios.post("http://localhost:5000/api/CreateService", formData);
    toast.success(response.data.message,{position:"top-right"});
    navigate("/serviceAll")

    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item.");
    }
  };

  return (
<div className="dflex">
<Sticky><AdminNavbar name="Services"></AdminNavbar></Sticky>
<div className="addUser">
          <Link to="/serviceAll"type="button" className="btn btn-secondary"><i className="fa-solid fa-backward"></i> Back</Link>
          <h3>Create New Blog</h3>
          <form className="addUserForm" onSubmit={handleSubmit}>
            <div className="InputGroup">
              <label htmlFor="title">Title: </label>
              <input onChange={handleChange} type="text" name="title" id="title"autoComplete="off" placeholder="Enter the Title " />
            </div>
            <div className="InputGroup">
           <label htmlFor="icon">Icon:</label>
            <button type="button" onClick={openBootstrapIcons}>
                Choose an Icon
            </button> 
            <input
          type="text"
          name="icon"
          id="icon"
          placeholder="Paste Full <i> Tag (e.g., <i class='bi bi-alarm'></i>)"
          value={formData.icon}
          onChange={handleChange}
          required/>
           </div> 
            <div className="InputGroup">
              <label htmlFor="description">Description: </label>
              <input onChange={handleChange} type="text" name="description" id="description"autoComplete="off" placeholder="Enter the Description " />
            </div>
            <div className="InputGroup">
            <button type="submit" className="btn btn-info">Submit</button>
            </div>
          </form>
          
        </div>

        </div>



    
  );
};

export default AddService;
