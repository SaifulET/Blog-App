import { useEffect, useState } from "react";

// const teamMembers = [
//   { name: "Mark Twain", role: "CEO", image: "https://th.bing.com/th?id=OIP.NqY3rNMnx2NXYo3KJfg43gHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" },
//   { name: "Dawn Koh", role: "CFO", image: "https://th.bing.com/th?id=OIP.IGNf7GuQaCqz_RPq5wCkPgHaLH&w=204&h=306&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" },
//   { name: "Henry Low", role: "CTO", image: "https://th.bing.com/th?id=OIP.XSZAFm-5JI7nriDLwZqRQQHaE7&w=306&h=203&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" },
//   { name: "Nancy Lee", role: "CMO", image: "https://th.bing.com/th/id/OIP.HKKlRSByiWpdySz9cF5xrQHaLI?rs=1&pid=ImgDetMain" }
// ];




const TeamSection = () => {
  const [users,setUsers]=useState([]);
  useEffect(()=>{
    fetch("/findAllMembers")
          .then((res) => res.json())
          .then((data) => {
            
            setUsers(Array.isArray(data.data) ? data.data : []); // Ensure it's an array
          })
          .catch((error) => console.error("Error fetching Services:", error));
      }, []);
  
    return (
      <section className="py-5" style={{ background: "linear-gradient(to bottom, #6c757d 50%, #ffffff 50%)" }}>
        <div className="container text-center">
          <h2 className="mb-4 text-white">Meet Our Team</h2>
          <div className="row justify-content-center">
            {users.map((member, index) => (
              <div key={index} className="col-md-3 mb-4 text-center position-relative">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="rounded-circle border position-relative" 
                  style={{ width: "120px", height: "120px", borderWidth: "4px", borderColor: "#fff", top: "30px" }} 
                />
                <h5 className="fw-bold mt-4 position-relative"
                style={{ top: "10px" }} >{member.name}</h5>
                <p className="text-muted">{member.role}</p>
                <p className="text-muted small">{member.des}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default TeamSection;


