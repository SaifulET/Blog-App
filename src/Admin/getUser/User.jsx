import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './User.css';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import AdminNavbar from '../AdminNavbar';
import Sticky from 'react-sticky-el';
import Loader from '../../component/loader';

const User = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/home")
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

  const [users, setUsers] = useState([]);
  const [loading,setLoading]=useState(true);
  useEffect(() => {
    axios.get('/findAll')
      .then((res) => {
        setLoading(false);
        console.log('API Response:', res.data.users);
        setUsers(Array.isArray(res.data.users) ? res.data.users : []);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const UserDelete = async (userID) => {
    await axios
      .delete("/UserDelete/" + userID)
      .then((Response) => {
        setUsers((preuser) => preuser.filter((user) => user._id !== userID));
        toast.success(Response.data.message, { position: 'top-right' });
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="dflex">
      <Sticky><AdminNavbar/></Sticky>
      <div className="userTable">
        {users.length === 0 ? (
          <div className="noUser">
            <h3>No user At all</h3>
            <p>Add New User</p>
          </div>
        ) : (
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
            {loading?<Loader/>:<tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td data-label="SL no.">{index + 1}</td>
                  <td data-label="Name">{user.name}</td>
                  <td data-label="Email">{user.email}</td>
                  <td data-label="Message" className="message-column">{user.message}</td>
                  <td data-label="Action" className="actionButton">
                    <button type="button" onClick={() => UserDelete(user._id)} className='btn btn-danger'>
                      <i className="fa-solid fa-trash"></i>
                    </button>
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

export default User;
