import { useState } from "react";
import "./AdminNav.css";
import Logout from "../component/Logout";
import { Link } from "react-router-dom";

const AdminNavbar = ({ name }) => {
  let active = name;
  const [activeItem, setActiveItem] = useState(active ? active : "Contacts");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleItemClick = (item) => {
    setActiveItem(item);
    setIsMenuOpen(false); // Close menu on selection (optional)
  };

  return (
    <div className="adminNav">
      {/* Hamburger button */}
      <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        &#9776;
      </button>

      <nav
        className={`navbar navbar-light ${
          isMenuOpen ? "show" : ""
        } bg-secondary.bg-gradient`}
      >
        <div className="container-fluid">
          <ul className="navbar-nav me-auto mb-2 mb-lg-2">
            <li className="nav-item">
              <Link
                to="/BLogAll"
                className={`nav-link ${
                  activeItem === "Blogs" ? "active-item" : ""
                }`}
                onClick={() => handleItemClick("Blogs")}
              >
                Blogs
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/serviceAll"
                className={`nav-link ${
                  activeItem === "Services" ? "active-item" : ""
                }`}
                onClick={() => handleItemClick("Services")}
              >
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/Teams"
                className={`nav-link ${
                  activeItem === "Teams" ? "active-item" : ""
                }`}
                onClick={() => handleItemClick("Teams")}
              >
                Teams
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/user"
                className={`nav-link ${
                  activeItem === "Contacts" ? "active-item" : ""
                }`}
                onClick={() => handleItemClick("Contacts")}
              >
                Contacts
              </Link>
            </li>
            <li>
              <Logout />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default AdminNavbar;
