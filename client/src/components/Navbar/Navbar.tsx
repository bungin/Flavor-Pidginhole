import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

// Remove or comment out the logo import if it's no longer used
// import Logo from '../../../../assets/Production Vision/Logo.png'

interface NavbarProps {
  // Remove logo prop if it's no longer used
  // logo: string; 
}

const Navbar: React.FC<NavbarProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
      {/* The logo div is already commented out */}
      {/* <div className="logo">
        <img src={Logo} alt="Logo" />
      </div> */}

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
      </ul>
    </nav>
  );
};

export default Navbar;
