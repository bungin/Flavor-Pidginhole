import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

interface NavbarProps {
  logo: string;
}

const Navbar: React.FC<NavbarProps> = ({ logo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  
  return (
    <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      {/* Hamburger menu button */}
      <button className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

     {/* Links */}
      <ul className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
        {/* Home link */}
        <li>
          <Link to="/">Home</Link>
        </li>
        
        <li>
          <Link to="/favorites">Favorites</Link>
        </li>
        <li>
          <Link to="/me">Profile</Link>
        </li>
        <li className="create-post">
          <Link to="/newpost">
            <button className="plus-button" aria-label="Create a Post">
              <span className="plus-icon">+</span>
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;