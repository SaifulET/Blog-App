import {useState, useEffect } from "react";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import "../assets/service.css";


const ServicesSection = () => {
      const [users , setUsers]=useState([])
      const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
          useEffect(() => {
              fetch("http://localhost:5000/api/findAllService")
                .then((res) => res.json())
                .then((data) => {
                  setUsers(Array.isArray(data.users) ? data.users : []); // Ensure it's an array
                })
                .catch((error) => console.error("Error fetching Services:", error));
            }, []);
    return (
      <div>
        <Navbar></Navbar>
        <section className="py-5 text-center text-white" style={{ background: "url('https://th.bing.com/th/id/R.2647183a8bd718d8a386bcb3d78e5a1f?rik=pPgkreYpHBumEA&pid=ImgRaw&r=0') center/cover no-repeat" }}>
        <div className="container">
          <h2 className="mb-4">Our Services</h2>
          <div className="row">
      {users.map((service, index) => {
        const isExpanded = expandedIndex === index;

        return (
          <div key={index} className="col-md-4 mb-4">
            <div
              className="p-4 border-0 rounded card-hover text-white h-100"
              style={{
                background: "rgba(0, 0, 0, 0.5)",
                cursor: "pointer",
                overflow: "hidden",
              }}
              onClick={() => handleToggle(index)}
            >
              <div
                className="mb-3 icon-wrapper"
                dangerouslySetInnerHTML={{ __html: service.icon }}
              ></div>

              <h5 className="fw-bold mb-2">{service.title}</h5>

              <p
                className={`description ${isExpanded ? "expanded" : "truncated"}`}
              >
                {service.description}
              </p>

              {!isExpanded && (
                <span className="text-warning mt-2 d-block">...Read more</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
        </div>
      </section>
      <Footer></Footer>
      </div>
    );
  };
  export default ServicesSection;