import {useState, useEffect } from "react";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import "../assets/service.css";
import axios from "axios";
import Skeleton from "../component/Skeleton";


const ServicesSection = () => {
  const elements = [];

  for (let i = 0; i < 6; i++) {
    elements.push(
      <div className="col-md-4 mb-4">
            <div
              className="p-4 border-0 rounded card-hover text-white h-100"
              style={{
                background: "rgba(151, 114, 114, 0.5)",
                cursor: "pointer",
                overflow: "hidden",
              }}
              
            >
              <Skeleton></Skeleton>

              
            </div>
          </div>
    );
  }


      const [loading, setLoading]=useState(true);
      const [users , setUsers]=useState([])
      const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  useEffect(() => {
    axios.get('/findAllService')
      .then((res) => {
        const data = res.data;
        setLoading(false);
        setUsers(Array.isArray(data.users) ? data.users : []);
      })
      .catch((error) => {
        console.error('Error fetching Services:', error);
      });
  }, []);
    return (
      <div>
        <Navbar></Navbar>
        

      <div className="position-relative vh-200">
      <div className="animated-bg"></div>

      <div className="position-relative  text-white d-flex justify-content-center align-items-center">
        <section className="py-5 text-center text-white " >
        <div className="container">
          <h2 className="mb-4">Our Services</h2>
          {loading?<div className="row">{elements}</div>:<div className="row">
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
    </div>}
        </div>
      </section>
      </div>
    </div>
      <Footer></Footer>
      </div>
    );
  };
  export default ServicesSection;