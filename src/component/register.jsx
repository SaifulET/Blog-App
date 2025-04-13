import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";


const Register = () => {
  const navigator=useNavigate()
 
    const [Name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [Password, setPassword] = useState(null);

    const NameChange = (e) => {
        const { value } = e.target;
        setName(value);
      };
    const EmailChange = (e) => {
        const {value } = e.target;
        setEmail(value)
      };
    const passwordChange = (e) => {
        const {value } = e.target;
        setPassword(value);
      };

      
    const handleRegister = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/api/register",{"name":Name,"email":email,"password":Password})
          .then(result=>{
            console.log(result)
            if(result.data.data=="success"){
                navigator("/login");
            }
            else{
              console.log("failed")
            }
        })
          .catch(e=>{console.log(e+"yz")})
       
      };
    return (
        <div className="container mt-5">
      <h2 className="mb-4 text-center">Register</h2>
      <form onSubmit={handleRegister} className="card p-4 shadow">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={Name}
            onChange={NameChange}
            required
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={EmailChange}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={Password}
            onChange={passwordChange}
            required
            placeholder="Enter your password"
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit"  className="btn btn-primary">Register</button>
          <Link to="/login"  className="btn btn-primary">Login</Link>
        </div>
      </form>
      
    </div>
 );
};

export default Register;