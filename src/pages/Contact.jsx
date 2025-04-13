import { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form fields
  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post("http://localhost:5000/api/contact", formData, {
          headers: { "Content-Type": "application/json" },
        });

        if (response.status === 200) {
          alert("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        } else {
          console.log(response.data,response.status);
          alert("Error sending message.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong.");
      }
    }
  };

  return (
    <div>
        <Navbar></Navbar>
        <div className="d-flex justify-content-center align-items-center min-vh-100 p-4" style={{ 
      backgroundImage: "url('https://th.bing.com/th/id/R.263b7e836625ae25c87cbd037cd63c0b?rik=u0rkKfdkcDF%2bcQ&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2fd%2fc%2f0%2f1090033-new-cool-tech-backgrounds-1920x1080.jpg&ehk=1fwJqrxTUu99j%2fJyLreCgM3iGweARAOKzas5whaHa0Y%3d&risl=&pid=ImgRaw&r=0')",
      backgroundSize: "cover",
      backgroundPosition: "center" ,
    }}>
        
      <div className="card shadow-lg" style={{ width: "100%", maxWidth: "500px",backgroundColor:"rgb(13, 108, 132)" }}>
        <div className="card-body">
          <h2 className="text-center mb-4" style={{color:"rgb(5, 8, 60)"}}>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-danger small">{errors.name}</p>}
            </div>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-danger small">{errors.email}</p>}
            </div>
            <div className="mb-3">
              <textarea
                name="message"
                className="form-control"
                placeholder="Your Message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              {errors.message && <p className="text-danger small">{errors.message}</p>}
            </div>
            <button type="submit" className="btn btn-primary w-100">Send Message</button>
          </form>
        </div>
      </div>
     
    </div>
    <Footer></Footer>
    </div>
    
  );
}
