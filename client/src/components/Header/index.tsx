import { Link } from 'react-router-dom';
import Logo from '../../../../assets/Production Vision/Logo.png';  // Correct import path for the logo
import './header.css';

const Header = () => {
  return (
    <header className="bg-primary text-light mb-3 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            {/* Use the imported logo and make it smaller */}
            <img src={Logo} alt="Flavor Pidginhole Logo" className="logo-sm" />
          </Link>
          <p className="m-0 fs-6">What's on the menu?</p>
        </div>
        
      </div>
    </header>
  );
};

export default Header;
