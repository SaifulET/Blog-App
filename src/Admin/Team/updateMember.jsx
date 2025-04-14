import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "./../AdminNavbar";
import Sticky from 'react-sticky-el';

const UpdateMemberInfo = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [member, setMember] = useState({
    name: "",
    des: "",
    file: null,
    role: "",
  });

  // Handle text input changes
  const handleInputChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setMember({ ...member, file: e.target.files[0] });
     
  };

  // Check authentication on mount
  useEffect(() => {
    axios
      .get("/home")
      .then((res) => {
        if (res.data !== "success") navigate("/login");
      })
      .catch(() => navigate("/login"));
  }, [navigate]);

  // Fetch member data on mount
  useEffect(() => {
    console.log("hellow")
    axios
      .get(`/findMemberById/${id}`)
      .then((res) => setMember(res.data.user))
      .catch((err) => console.error("Error fetching user:", err));
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const uploadData = new FormData();
      uploadData.append("name", member.name);
      uploadData.append("des", member.des);
      uploadData.append("role", member.role);
      uploadData.append("file", member.file);
      console.log(member.file.name)
//       if (member.file) uploadData.append("file", member.file);
// console.log(e.target.image.files)
      console.log("ddd")
      const res = await axios.put(`/UpdateMemberInfo/${id}`, member);
      console.log(res)
      toast.success(res.data.message, { position: "top-right" });
      navigate("/teams");
    } catch (error) {
      console.error("Error updating member:", error);
    }
  };

  return (
    <div className="dflex">
      <Sticky><AdminNavbar name="Teams"></AdminNavbar></Sticky>
      <div className="addUser">
        <Link to="/teams" className="btn btn-secondary">
          <i className="fa-solid fa-backward"></i> Back
        </Link>
        <h3>Update Member Info</h3>
        <form className="addUserForm" onSubmit={handleSubmit}>
          {["name", "des", "role"].map((field) => (
            <div className="InputGroup" key={field}>
              <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
              <input
                type="text"
                name={field}
                value={member[field]}
                id={field}
                autoComplete="off"
                placeholder={`Enter the ${field}`}
                onChange={handleInputChange}
              />
            </div>
          ))}
          <div className="InputGroup">
            <label htmlFor="image">Image:</label>
            <input type="file" id="image" name="image" onChange={handleFileChange} />
          </div>
          <div className="InputGroup">
            <button type="submit" className="btn btn-info">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMemberInfo;
