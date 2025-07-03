import React from 'react';
import '../styles/Navbar.css';
import { FaUserGraduate } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <FaUserGraduate className="navbar-icon" />
          <h1>College Registration Portal</h1>
        </div>
        <div className="navbar-links">
          <a href="/" className="nav-link active">Home</a>
          <a href="/users" className="nav-link">Registrations</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;