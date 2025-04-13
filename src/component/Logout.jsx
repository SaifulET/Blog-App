import axios from 'axios';
import  { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../assets/logout.css"


const Logout = () => {
    const [loading, setLoading] = useState(false); // Track the loading state of logout
    const navigate = useNavigate();
     const handleLogout = async () => {
            setLoading(true); // Set loading state while logging out
    
            try {
                // Send logout request to backend to clear the cookie
                await axios.post("http://localhost:5000/api/logout", {});
                document.cookie = "token=; path=/; max-age=0"; 
                delete axios.defaults.headers.common["Authorization"];
                navigate("/login"); // Redirect to login page after successful logout
            } catch (error) {
                console.error("Logout failed:", error);
            } finally {
                setLoading(false); // Reset loading state after logout
            }
        };
    return (
        <div>
           <button onClick={handleLogout} disabled={loading}className={`btn ${loading ? 'btn-warning' : 'btn-danger'} w-100`}>
                {loading ? "Logging out..." : "Logout"}
            </button> 
        </div>
    );
};

export default Logout;