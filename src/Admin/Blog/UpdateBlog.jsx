import { useState ,useEffect} from "react";
// import "./updateUser.css"
import axios from "axios"
import toast from "react-hot-toast";
import { Link ,useNavigate,useParams} from 'react-router-dom';
import AdminNavbar from './../AdminNavbar';
import Sticky from 'react-sticky-el';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const UpdateBlog = () => {
const navigate = useNavigate();
  const user={ 
    title:"",
    thumbnail:"",
    description:"",
    content:""
  };
  const [content, setContent] = useState("")
  const openWebSiteForThumbnail = () => {
    window.open("about:blank", "_blank", "noopener,noreferrer");
  };
  const {id} =useParams();
  const [add,setAdd]=useState(user);
  const InputChange=(e)=>{
    const {name,value}=e.target;
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

  useEffect(() => {
    axios.get(`/findBlogById/${id}`)
        .then((response)=>{
            setAdd(response.data.user)
            setContent(response.data.user.content)
            
            
        })
        .catch(error => console.error("Error fetching user:", error));
}, [id]);
const SubmitForm=async(e)=>{
    
    try {
      e.preventDefault();
      let tempadd = {
        ...add, 
        content:content
      }; 
      const response= await axios.put("/UpdateBlog/"+id,tempadd);
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
          <Link to="/BLogAll"type="button" className="btn btn-secondary"><i className="fa-solid fa-backward"></i> Back</Link>
          <h3>Update Blog</h3>
          <form className="addUserForm" onSubmit={SubmitForm}>
            <div className="InputGroup">
              <label htmlFor="title">title: </label>
              <input onChange={InputChange} type="text" name="title" value={add.title} id="title"autoComplete="off" placeholder="Enter the title " />
            </div>
            <div className="InputGroup">
              <label htmlFor="thumbnail">Thumbnail: </label>
              <button type="button" onClick={openWebSiteForThumbnail}>Change Thumbnail</button>
              <input onChange={InputChange} type="text" id="thumbnail" name="thumbnail"value={add.thumbnail} accept="image/*"autoComplete="off" placeholder="Enter the Thumbnail "></input>
            </div>
            <div className="InputGroup">
              <label htmlFor="description">Description: </label>
              <input onChange={InputChange} type="text" name="description"value={add.description}  id="description"autoComplete="off"  />
            </div>
            <div className="InputGroup">
                    <label htmlFor="content">Content:</label>
                    <ReactQuill
                      theme="snow"
                      name="content"
                      id="content"
                      value={content}
                      onChange={setContent}
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

export default UpdateBlog;