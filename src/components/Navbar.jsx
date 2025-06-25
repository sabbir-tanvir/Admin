
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/" className="logo-link">
            <h1>Logo</h1>
          </Link>
        </div>
        
        <div className="nav-search">
          <div className="search-container">
            <span className="search-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M10.7599 13.24C8.41988 10.9 8.41988 7.09999 10.7599 4.74999C13.0999 2.41 16.8999 2.41 19.2499 4.74999C21.5899 7.08999 21.5899 10.89 19.2499 13.24C16.9099 15.58 13.1099 15.58 10.7599 13.24Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10.5 13.5L3 21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg></span>
            <input 
              type="text" 
              placeholder="Search" 
              className="search-input"
            />
          </div>
        </div>
        
        <div className="nav-actions">
          <button className="notification-btn"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21" fill="none">
<path d="M18 4.5C18 6.43 16.43 8 14.5 8C12.57 8 11 6.43 11 4.5C11 2.57 12.57 1 14.5 1C16.43 1 18 2.57 18 4.5ZM16 9.79C15.5 9.92 15 10 14.5 10C13.0421 9.99736 11.6447 9.41705 10.6138 8.38617C9.58295 7.35529 9.00264 5.95788 9 4.5C9 3.03 9.58 1.7 10.5 0.71C10.3185 0.48754 10.0897 0.30837 9.83021 0.185544C9.57072 0.0627174 9.28709 -0.000670227 9 -4.6936e-07C7.9 -4.6936e-07 7 0.899999 7 2V2.29C4.03 3.17 2 5.9 2 9V15L0 17V18H18V17L16 15V9.79ZM9 21C10.11 21 11 20.11 11 19H7C7 19.5304 7.21071 20.0391 7.58579 20.4142C7.96086 20.7893 8.46957 21 9 21Z" fill="black"/>
</svg></button>
          <div className="profile-avatar">
            <img src="https://via.placeholder.com/40" alt="Profile" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
