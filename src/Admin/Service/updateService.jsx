import { useState ,useEffect} from "react";
// import "./updateUser.css"
import axios from "axios"
import toast from "react-hot-toast";
import { Link ,useNavigate,useParams} from 'react-router-dom';
import AdminNavbar from './../AdminNavbar';
import Sticky from 'react-sticky-el';
const UpdateService = () => {
const navigate = useNavigate();
  const user={ 
    title:"",
    icon:"",
    description:"",
    content:""
  };
  const openBootstrapIcons = () => {
    window.open("https://icons.getbootstrap.com/", "_blank"); // Open Bootstrap Icons page
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
    axios.get(`/findServiceById/${id}`)
        .then((response)=>{
            
            setAdd(response.data.user)
            
        })
        .catch(error => console.error("Error fetching user:", error));
}, [id]);
const SubmitForm=async(e)=>{
    
    try {
      e.preventDefault();
      const response= await axios.put("/UpdateService/"+id,add);
      toast.success(response.data.message,{position:"top-right"});
      navigate("/serviceAll")

    } catch (error) {
      console.log(error)
    }
    
    
}
    return (
        <div className="dflex">
        <Sticky><AdminNavbar name="Services"></AdminNavbar></Sticky>
        <div className="addUser">
          <Link to="/serviceAll"type="button" className="btn btn-secondary"><i className="fa-solid fa-backward"></i> Back</Link>
          <h3>Update Service</h3>
          <form className="addUserForm" onSubmit={SubmitForm}>
            <div className="InputGroup">
              <label htmlFor="title">title: </label>
              <input onChange={InputChange} type="text" name="title" value={add.title} id="title"autoComplete="off" placeholder="Enter the title " />
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
          value={add.icon}
          onChange={InputChange}
          required/></div>
            <div className="InputGroup">
              <label htmlFor="description">Description: </label>
              <input onChange={InputChange} type="text" name="description"value={add.description}  id="description"autoComplete="off" placeholder="Enter the Description " />
            </div>
            <div className="InputGroup">
            <button type="submit" className="btn btn-info">Submit</button>
            </div>
          </form>
          
        </div>
        </div>
    );
};

export default UpdateService;