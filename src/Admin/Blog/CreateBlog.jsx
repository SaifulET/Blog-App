import { useState,useEffect } from "react";
// import "./addUser.css"
import axios from "axios"
import toast from "react-hot-toast";
import { Link ,useNavigate} from 'react-router-dom';
import AdminNavbar from "../AdminNavbar";
import Sticky from 'react-sticky-el';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateBlog = () => {
const navigate = useNavigate();
  const user={
    title:"",
    thumbnail:"",
    description:"",
    content:""
  };
  const openWebSiteForThumbnail = () => {
    window.open("about:blank", "_blank", "noopener,noreferrer");
  };
  const [add,setAdd]=useState(user);
  const InputChange=(e)=>{
    const {name,value}=e.target;

    setAdd({...add,[name]:value});
  }

  const handleQuillChange = (value) => {
    setAdd({ ...add, content: value });
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

const SubmitForm=async(e)=>{
    
    try {
      e.preventDefault();
      const response= await axios.post("/CreateBlog",add);
      
      toast.success(response.data.message,{position:"top-right"});
      navigate("/BLogAll")

    } catch (error) {
      console.log(error)
    }
    
    
}
    return (
        <div className="dflex">
        <Sticky><AdminNavbar name="Blogs"></AdminNavbar></Sticky>
        <div className="addUser">
          <Link to="/BlogAll"type="button" className="btn btn-secondary"><i className="fa-solid fa-backward"></i> Back</Link>
          <h3>Create New Blog</h3>
          <form className="addUserForm" onSubmit={SubmitForm}>
            <div className="InputGroup">
              <label htmlFor="title">Title: </label>
              <input onChange={InputChange} type="text" name="title" id="title"autoComplete="off" placeholder="Enter the Title " />
            </div>
            {/* <div className="InputGroup">
              <label htmlFor="thumbnail">Thumbnail: </label>
              <input onChange={InputChange} type="file" id="thumbnail" name="thumbnail" accept="image/*"autoComplete="off" placeholder="Enter the Thumbnail "></input>
            </div> */}
            <div className="InputGroup">
              <label htmlFor="thumbnail">Thumbnail: </label>
              <button  onClick={openWebSiteForThumbnail}>Search image and paste the link</button>
              <input onChange={InputChange} type="text" id="thumbnail" name="thumbnail" accept="image/*"autoComplete="off" placeholder="Enter the Thumbnail "></input>
            </div>
            <div className="InputGroup">
              <label htmlFor="description">Description: </label>
              <input onChange={InputChange} type="text" name="description" id="description"autoComplete="off" placeholder="Enter the Description " />
            </div>
            {/* <div className="InputGroup">
              <label htmlFor="content">Content: </label>
              <textarea onChange={InputChange} type="text" name="content" id="content"autoComplete="off" placeholder="Enter the Content " />
            </div> */}
            <div className="InputGroup">
        <label htmlFor="content">Content:</label>
        <ReactQuill
          theme="snow"
          name="content"
          id="content"
          value={add.content}
          onChange={handleQuillChange}
          placeholder="Enter the content"
        />
      </div>
            <div className="InputGroup">
            <button type="submit" className="btn btn-info">Submit</button>
            </div>
          </form>
          
        </div>

        </div>
    );
};

export default CreateBlog;