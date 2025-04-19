import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./loader";
import { motion } from "framer-motion";




const TeamSection = () => {
  const [users,setUsers]=useState([]);
  const [loading,setLoading]=useState(true);
  
  useEffect(() => {
    axios.get('/findAllMembers')
      .then((res) => {
        setLoading(false);
        setUsers(Array.isArray(res.data.data) ? res.data.data : []);
      })
      .catch((error) => {
        console.error('Error fetching Services:', error);
      });
  }, []);
    return (
      <section className="py-5" style={{ background: "linear-gradient(to bottom, #6c757d 50%, #ffffff 50%)" }}>
        <div className="container text-center">
          <h2 className="mb-4 text-white">Meet Our Team</h2>
          {loading?<Loader/>:<div className="row justify-content-center">
            {users.map((member, index) => (
              <div key={index} className="col-md-3 mb-4 text-center position-relative">
                <motion.div
                  
                  initial={{scale: 0.5, opacity: 0 }}
                  whileInView={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  viewport={{ once: true}}
                ><img 
                  src={member.image} 
                  alt={member.name} 
                  className="rounded-circle border position-relative" 
                  style={{ width: "120px", height: "120px", borderWidth: "4px", borderColor: "#fff", top: "30px" }} 
                /></motion.div>
                <h5 className="fw-bold mt-4 position-relative"
                style={{ top: "10px" }} >{member.name}</h5>
                <p className="text-muted">{member.role}</p>
                <p className="text-muted small">{member.des}</p>
              </div>
            ))}
          </div>}
        </div>
      </section>
    );
  };
  
  export default TeamSection;


