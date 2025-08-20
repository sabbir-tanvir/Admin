import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/components/Navbar.css';

// Lightweight JWT payload decoder (no signature verification) to avoid external dep
function decodeJwtRole() {
  const token = localStorage.getItem('access_token');
  if (!token) return null;
  try {
    const part = token.split('.')[1];
    if (!part) return null;
    const padded = part.replace(/-/g, '+').replace(/_/g, '/');
    const json = atob(padded + '=='.slice((padded.length + 3) % 4));
    const payload = JSON.parse(json);
    return payload.role || null;
  } catch {
    return null;
  }
}

const Navbar = ({ onMobileMenuToggle, isMobileMenuOpen }) => {
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Toggle mobile search visibility
  const toggleMobileSearch = () => {
    setMobileSearchVisible(!mobileSearchVisible);
  };

  // Toggle mobile menu (leftbar)
  const toggleMobileMenu = () => {
    if (onMobileMenuToggle) {
      onMobileMenuToggle();
    }
  };

  // Close mobile search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMobileSearchVisible(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Derive role from stored access token (strict JWT source)
  const role = user?.role || decodeJwtRole();
  const profileLink = role === 'marketer' ? '/marketor-panel/profile' : '/profile';
  const logoLink = role === 'seller' ? '/seller-panel' : role === 'marketer' ? '/marketor-panel' : '/';
  const displayName = user?.username || 'User';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar" ref={navRef}>
      <div className="nav-container">
        {/* Mobile menu button */}
        <button 
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`} 
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
        </button>
        
        <div className="nav-logo">
          <Link to={logoLink} className="logo-link">
            <h1>Logo</h1>
          </Link>
        </div>
        
        {/* Mobile search toggle button */}
        <button 
          className="mobile-search-toggle" 
          onClick={toggleMobileSearch}
          aria-label="Toggle search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M10.7599 13.24C8.41988 10.9 8.41988 7.09999 10.7599 4.74999C13.0999 2.41 16.8999 2.41 19.2499 4.74999C21.5899 7.08999 21.5899 10.89 19.2499 13.24C16.9099 15.58 13.1099 15.58 10.7599 13.24Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.5 13.5L3 21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className={`nav-search ${mobileSearchVisible ? 'mobile-visible' : ''}`}>
          <div className="search-container">
            <span className="search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M10.7599 13.24C8.41988 10.9 8.41988 7.09999 10.7599 4.74999C13.0999 2.41 16.8999 2.41 19.2499 4.74999C21.5899 7.08999 21.5899 10.89 19.2499 13.24C16.9099 15.58 13.1099 15.58 10.7599 13.24Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.5 13.5L3 21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search"
              className="search-input"
            />
            {/* Close button for mobile search */}
            {mobileSearchVisible && (
              <button className="mobile-search-close" onClick={toggleMobileSearch} aria-label="Close search">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
        </div>


        <div className="nav-actions" ref={userMenuRef}>
          <button className="notification-btn" aria-label="Notifications">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21" fill="none">
              <path d="M18 4.5C18 6.43 16.43 8 14.5 8C12.57 8 11 6.43 11 4.5C11 2.57 12.57 1 14.5 1C16.43 1 18 2.57 18 4.5ZM16 9.79C15.5 9.92 15 10 14.5 10C13.0421 9.99736 11.6447 9.41705 10.6138 8.38617C9.58295 7.35529 9.00264 5.95788 9 4.5C9 3.03 9.58 1.7 10.5 0.71C10.3185 0.48754 10.0897 0.30837 9.83021 0.185544C9.57072 0.0627174 9.28709 -0.000670227 9 -4.6936e-07C7.9 -4.6936e-07 7 0.899999 7 2V2.29C4.03 3.17 2 5.9 2 9V15L0 17V18H18V17L16 15V9.79ZM9 21C10.11 21 11 20.11 11 19H7C7 19.5304 7.21071 20.0391 7.58579 20.4142C7.96086 20.7893 8.46957 21 9 21Z" fill="black" />
            </svg>
          </button>
          <button className="profile-avatar" onClick={() => setUserMenuOpen(o => !o)} aria-haspopup="menu" aria-expanded={userMenuOpen}>
            <img src="https://via.placeholder.com/40" alt="Profile" />
          </button>
          {userMenuOpen && (
            <div className="user-dropdown" role="menu">
              <div className="user-dropdown-header">
                <div className="user-header-avatar" aria-hidden="true">
                  <span>
                    {(displayName || 'U').charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="user-header-meta">
                  <div className="user-name" title={displayName}>{displayName}</div>
                  <div className="user-role-badge">{role ? role.charAt(0).toUpperCase() + role.slice(1) : ''}</div>
                </div>
              </div>
              <ul className="user-dropdown-list">
                <li>
                  <Link to={profileLink} onClick={() => setUserMenuOpen(false)} className="dropdown-item">
                    <span className="navbar-dropdown-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5Z"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></svg>
                    </span>
                    <span className="dropdown-text">Profile</span>
                  </Link>
                </li>
                <li>
                  <Link to={profileLink} onClick={() => setUserMenuOpen(false)} className="dropdown-item">
                    <span className="navbar-dropdown-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.6h.09A1.65 1.65 0 0 0 10.6 3.09V3a2 2 0 0 1 4 0v.09c0 .69.4 1.31 1.02 1.6.63.29 1.37.18 1.87-.32l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 21 9v.09c0 .69.4 1.31 1.02 1.6.63.29 1.37.18 1.87-.32"/></svg>
                    </span>
                    <span className="dropdown-text">Change Password</span>
                  </Link>
                </li>
                <li>
                  <button type="button" onClick={handleLogout} className="dropdown-item danger">
                    <span className="navbar-dropdown-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    </span>
                    <span className="dropdown-text">Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
