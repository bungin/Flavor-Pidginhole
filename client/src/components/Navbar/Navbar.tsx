import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import './Navbar.css'; 

const Navbar: React.FC<any> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false); // Close menu on link click
  };

  const logout = () => {
    Auth.logout(); // Call the logout function from Auth
    setIsMenuOpen(false); // Close the menu when logged out
  };

  return (
    <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
      {/* Hamburger menu button */}
      <button className="hamburger" onClick={toggleMenu} aria-label="Toggle navigation menu">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* Links */}
      <ul className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
        {/* Home link */}
        <li>
          <Link to="/" onClick={handleLinkClick}>Home</Link>
        </li>
        
        <li>
          <Link to="/favorites" onClick={handleLinkClick}>Favorites</Link>
        </li>

        <li>
          <Link to="/me" onClick={handleLinkClick}>Profile</Link>
        </li>

        {/* Conditionally render Login/Signup or Profile/Logout buttons */}
        {Auth.loggedIn() ? (
          <>
            <li>
              <Link to="/me" onClick={handleLinkClick} className="btn btn-info btn-sm">
                {Auth.getProfile().data.username}'s Profile
              </Link>
            </li>
            <li>
              <button className="btn btn-light btn-sm" onClick={logout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" onClick={handleLinkClick} className="btn btn-info btn-sm">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" onClick={handleLinkClick} className="btn btn-light btn-sm">
                Signup
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
