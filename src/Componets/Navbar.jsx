import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo" onClick={() => navigate("/")}>
        HireHub
      </div>

      {/* Hamburger (mobile) */}
      <div
        className={`menu-toggle ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Menu Links */}
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li onClick={() => navigate("/jobseeker-dashboard")}>Jobs</li>
        <li onClick={() => navigate("/companies")}>Companies</li>
        <li onClick={() => navigate("/profile")}>Profile</li>
        <li className="logout-btn" onClick={handleLogout}>
          Logout
        </li>
      </ul>
    </nav>
  );
}
