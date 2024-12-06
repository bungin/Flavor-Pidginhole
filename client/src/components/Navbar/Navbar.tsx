import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
// import Logo from '../../../../assets/Production Vision/Logo.png'



interface NavbarProps {
  logo: string;
}

const Navbar: React.FC<NavbarProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  
  return (
    <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
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
        <li>
          
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;