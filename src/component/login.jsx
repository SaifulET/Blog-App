import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import axios from "axios";
import "../assets/login.css"


const Login = () => {

    const [email, setEmail] = useState(null);
    const [Password, setPassword] = useState(null);
    const [error, setError] = useState(null);

    const navigator= useNavigate();

    const EmailChange = (e) => {
        // const {value } = e.target;
        setEmail(e.target.value);
      };
    const passwordChange = (e) => {
        const { value } = e.target;
        setPassword(value);
      };
    const handleRegister = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/api/login",{"email":email,"password":Password})
          .then(result=>{
            // console.log("Response Headers:", result.headers); // ✅ Print response headers
            // console.log("Response Data:", result.data);
            // console.log(result.data.data)
            // console.log(result.data.token)
            document.cookie = `token=${result.data.token}; path=/; max-age=3600;`;
            axios.defaults.headers.common["Authorization"] = `Bearer ${result.data.token}`;
            // console.log("Token saved in cookie!");
            if(result.data.data=="success"){
                navigator("/user");
            }
            else{
              setError(result.data.msg)
            }
            })
          .catch(e=>{console.log(e)})
       
      };
    return (
      <div className="login-container mt-5">
            <h2 className="text-center login-heading mb-4">Login</h2>
            <form onSubmit={handleRegister} className="login-card p-4 shadow">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label login-label">Email</label>
                    <input
                        type="email"
                        className="form-control login-input"
                        id="email"
                        name="email"
                        value={email}
                        onChange={EmailChange}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label login-label">Password</label>
                    <input
                        type="password"
                        className="form-control login-input"
                        id="password"
                        name="password"
                        value={Password}
                        onChange={passwordChange}
                        required
                        placeholder="Enter your password"
                    />
                </div>
                <div className="d-flex justify-content-between login-buttons">
                    <button type="submit" className="btn btn-primary login-btn">Login</button>
                    <Link to="/" className="btn btn-secondary login-btn">Home</Link>
                </div>
                {error && <p className="text-danger login-error mt-2">{error}</p>}
            </form>
        </div>
 );
};

export default Login;